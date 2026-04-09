import { firstNames } from "./leaderboardNames.js";
import { lastNames } from "./leaderboardNames.js";
const LS = {
  displayName: "pysche_settings_display_name",
  timer: "pysche_settings_show_timer",
  hints: "pysche_settings_hints",
  motion: "pysche_settings_reduced_motion",
  diff: "pysche_settings_difficulty",
};

const mainMenu = document.getElementById("main-menu");
const leaderBoardPopUp = document.getElementById("leaderBoardPopUp");
const gameScreen = document.getElementById("puzzle-screen");
const startButton = document.getElementById("start");
const backToMenuButtons = document.querySelectorAll(".back-to-menu");
const nameCreationScreen = document.getElementById("nameCreationScreen");
const overlays = document.querySelectorAll(".overlay");
let playerName = "";
const firstNameDisplay = document.getElementById("firstNameDisplay");
const firstNameMenu = document.getElementById("firstNameDropdown");
const firstNameButton = document.getElementById("firstNameDropdownButton");
const lastNameDisplay = document.getElementById("lastNameDisplay");
const lastNameMenu = document.getElementById("lastNameDropdown");
const lastNameButton = document.getElementById("lastNameDropdownButton");
const beginGameButton = document.getElementById("beginGame");
const leaderBoardButton = document.getElementById("leaderboard");
const instructionsButton = document.getElementById("instructions");
const instructionsPopUp = document.getElementById("instructionsPopUp");
const settingsButton = document.getElementById("settings");
const settingsPopUp = document.getElementById("settingsPopUp");
const closeSettingsButton = document.getElementById("closeSettings");
const soundEffectsToggle = document.getElementById("soundEffectsToggle");
const backgroundMusicToggle = document.getElementById("backgroundMusicToggle");
const resetSettingsButton = document.getElementById("resetSettings");
const settingSound = document.getElementById("settingSound");
const settingMusic = document.getElementById("settingMusic");
const settingDisplayName = document.getElementById("settingDisplayName");
const settingShowTimer = document.getElementById("settingShowTimer");
const settingHints = document.getElementById("settingHints");
const settingReducedMotion = document.getElementById("settingReducedMotion");
const settingDifficulty = document.getElementById("settingDifficulty");
const runTimerDisplay = document.getElementById("run-timer-display");
const runTimerEl = document.getElementById("run-timer");
const creditsButton = document.getElementById("credits");
const creditsPopUp = document.getElementById("creditsPopUp");

const exitButton = document.getElementById("exit");
const exitPopUp = document.getElementById("exitPopUp");
const cancelExitButton = document.getElementById("cancelExit");
const confirmExitButton = document.getElementById("confirmExit");

// Event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
startButton.addEventListener("click", function() {
  startNameCreation();
  showOverlay();
});
firstNameButton.addEventListener("click", function() {
  firstNameMenu.classList.toggle("show");
});
lastNameButton.addEventListener("click", function() {
  lastNameMenu.classList.toggle("show");
});
let runTimerInterval = null;

function applyReducedMotion() {
  if (settingReducedMotion) {
    document.documentElement.classList.toggle(
      "pysche-reduced-motion",
      settingReducedMotion.checked
    );
  }
}

function loadGameplaySettings() {
  if (settingDisplayName) {
    const name = localStorage.getItem(LS.displayName);
    settingDisplayName.value = name === null ? "" : name;
  }
  if (settingShowTimer)
    settingShowTimer.checked = localStorage.getItem(LS.timer) !== "false";
  if (settingHints)
    settingHints.checked = localStorage.getItem(LS.hints) !== "false";
  if (settingReducedMotion)
    settingReducedMotion.checked = localStorage.getItem(LS.motion) === "true";
  if (settingDifficulty) {
    const d = localStorage.getItem(LS.diff);
    settingDifficulty.value =
      d === "challenge" || d === "normal" ? d : "normal";
  }
  applyReducedMotion();
}

function resetSettingsToDefaults() {
  if (
    !confirm(
      "Reset all settings to defaults? Your display name will be cleared."
    )
  )
    return;
  Object.values(LS).forEach((k) => localStorage.removeItem(k));
  if (settingSound) settingSound.checked = true;
  if (settingMusic) settingMusic.checked = true;
  loadGameplaySettings();
  updateAudioSettings();
}

function formatRunTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function stopRunTimer() {
  if (runTimerInterval !== null) {
    clearInterval(runTimerInterval);
    runTimerInterval = null;
  }
}

function startRunTimer() {
  stopRunTimer();
  if (!runTimerDisplay || !runTimerEl) return;
  const showTimer = !settingShowTimer || settingShowTimer.checked;
  if (!showTimer) {
    runTimerDisplay.style.display = "none";
    return;
  }
  runTimerDisplay.style.display = "block";
  const started = Date.now();
  runTimerEl.textContent = formatRunTime(0);
  runTimerInterval = setInterval(() => {
    runTimerEl.textContent = formatRunTime(Date.now() - started);
  }, 250);
}

backToMenuButtons.forEach((btn) => {
  btn.addEventListener("click", backToMenu);
});
beginGameButton.addEventListener("click", startPuzzle);
leaderBoardButton.addEventListener("click", startLeaderBoard);
instructionsButton.addEventListener("click", startInstructions);
creditsButton.addEventListener("click", startCredits);


if (settingsButton && settingsPopUp && closeSettingsButton) {
  settingsButton.addEventListener("click", openSettings);
  closeSettingsButton.addEventListener("click", closeSettings);
  if (resetSettingsButton) {
    resetSettingsButton.addEventListener("click", resetSettingsToDefaults);
  }
  if (settingDisplayName) {
    settingDisplayName.addEventListener("blur", () => {
      localStorage.setItem(LS.displayName, settingDisplayName.value.trim());
    });
    settingDisplayName.addEventListener("keydown", (e) => {
      if (e.key === "Enter") settingDisplayName.blur();
    });
  }
  settingsPopUp.addEventListener("change", (e) => {
    const t = e.target;
    if (t === settingSound || t === settingMusic) updateAudioSettings();
    else if (t === settingShowTimer)
      localStorage.setItem(LS.timer, String(t.checked));
    else if (t === settingHints)
      localStorage.setItem(LS.hints, String(t.checked));
    else if (t === settingReducedMotion) {
      localStorage.setItem(LS.motion, String(t.checked));
      applyReducedMotion();
    } else if (t === settingDifficulty)
      localStorage.setItem(LS.diff, t.value);
  });
}

  if (resetSettingsButton) {
    resetSettingsButton.addEventListener("click", resetSettingsToDefaults);
  }
  if (settingDisplayName) {
    settingDisplayName.addEventListener("blur", () => {
      localStorage.setItem(LS.displayName, settingDisplayName.value.trim());
    });
    settingDisplayName.addEventListener("keydown", (e) => {
      if (e.key === "Enter") settingDisplayName.blur();
    });
  }
  settingsPopUp.addEventListener("change", (e) => {
    const t = e.target;
    if (t === settingSound || t === settingMusic) updateAudioSettings();
    else if (t === settingShowTimer)
      localStorage.setItem(LS.timer, String(t.checked));
    else if (t === settingHints)
      localStorage.setItem(LS.hints, String(t.checked));
    else if (t === settingReducedMotion) {
      localStorage.setItem(LS.motion, String(t.checked));
      applyReducedMotion();
    } else if (t === settingDifficulty)
      localStorage.setItem(LS.diff, t.value);
  });

updateAudioSettings();

if (exitButton && exitPopUp && cancelExitButton && confirmExitButton) {
  exitButton.addEventListener("click", openExitConfirm);
  cancelExitButton.addEventListener("click", closeExitConfirm);
  confirmExitButton.addEventListener("click", confirmExitGame);
}
loadGameplaySettings();

function backToMenu() {
  stopRunTimer();
  closeExitConfirm();
  closeSettings();
  hideOverlay();
  gameScreen.style.display = "none";
  leaderBoardPopUp.style.display = "none";
  instructionsPopUp.style.display = "none";
  nameCreationScreen.style.display = "none";
  creditsPopUp.style.display = "none";
  mainMenu.style.display = "";
}



function startPuzzle() {
  closeExitConfirm();
  closeSettings();
  document.getElementById("playerNameDisplay").textContent = playerName;
  mainMenu.style.display = "none";
  gameScreen.style.display = "block";
  nameCreationScreen.style.display = "none";
  loadGameplaySettings();
  startRunTimer();
  hideOverlay();
}

function startCredits() {
  closeExitConfirm();
  closeSettings();
  mainMenu.style.display = "none";
  creditsPopUp.style.display = "block";
}

function startLeaderBoard() {
  closeExitConfirm();
  closeSettings();
  mainMenu.style.display = "none";
  leaderBoardPopUp.style.display = "block";
}

function startInstructions() {
  closeExitConfirm();
  closeSettings();
  mainMenu.style.display = "none";
  instructionsPopUp.style.display = "block";
}

//Opens the name creation screen for the user and populates the dropdown menus
function startNameCreation() {
  firstNames.forEach(name => {
    const menuItem = document.createElement("a");
    menuItem.textContent = name;
    menuItem.href = "#";
    menuItem.addEventListener("click", function() {
      document.getElementById(firstNameDisplay.textContent = name);
      playerName = name + " " + playerName;
      firstNameMenu.classList.toggle("fold");
    });
    firstNameMenu.appendChild(menuItem);
  });
  lastNames.forEach(name => {
    const menuItem = document.createElement("a");
    menuItem.textContent = name;
    menuItem.href = "#";
    menuItem.addEventListener("click", function() {
      document.getElementById(lastNameDisplay.textContent = name);
      playerName = playerName + " " + name;
      lastNameMenu.classList.toggle("fold");
    });
    lastNameMenu.appendChild(menuItem);
  });
  sessionStorage.setItem("playerName", playerName);
  closeExitConfirm();
  closeSettings();
  mainMenu.style.display = "none";
  nameCreationScreen.style.display = "block";
}

//Displays the overlay screens
function showOverlay() {
  overlays.forEach(overlay => {
    overlay.style.display = "block";
  });
}

//Hides the overlay screens
function hideOverlay() {
  overlays.forEach(overlay => {
    overlay.style.display = "none";
  });
}

function openSettings() {
  if (!settingsPopUp) return;
  closeExitConfirm();
  loadGameplaySettings();
  loadGameplaySettings();
  settingsPopUp.style.display = "block";
}

function closeSettings() {
  if (!settingsPopUp) return;
  settingsPopUp.style.display = "none";
}

function updateAudioSettings() {
  window.gameAudioSettings = {
    soundEffectsEnabled: !!settingSound?.checked,
    backgroundMusicEnabled: !!settingMusic?.checked,
    soundEffectsEnabled: !!settingSound?.checked,
    backgroundMusicEnabled: !!settingMusic?.checked,
  };
}

function openExitConfirm() {
  if (!exitPopUp) return;
  exitPopUp.style.display = "block";
}

function closeExitConfirm() {
  if (!exitPopUp) return;
  exitPopUp.style.display = "none";
}

function confirmExitGame() {
  stopRunTimer();
  stopRunTimer();
  closeExitConfirm();
  closeSettings();

  mainMenu.style.display = "none";
  gameScreen.style.display = "none";
  leaderBoardPopUp.style.display = "none";
  instructionsPopUp.style.display = "none";

  window.close();

  window.setTimeout(() => {
    document.body.innerHTML =
      '<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Arial,sans-serif;background:#1a1a24;color:#e8e8f0;text-align:center;padding:24px;box-sizing:border-box;"><p style="font-size:1.25rem;margin-bottom:12px;">Thanks for playing Mission to Pysche.</p><p style="max-width:420px;line-height:1.5;">This site cannot close the tab for you. Close this browser tab or window when you are finished.</p></div>';
  }, 150);
}

function getPyscheSettings() {
  return {
    displayName: settingDisplayName?.value.trim() ?? "",
    soundEnabled: !!settingSound?.checked,
    musicEnabled: !!settingMusic?.checked,
    showTimer: settingShowTimer?.checked ?? true,
    hintsEnabled: settingHints?.checked ?? true,
    reducedMotion: !!settingReducedMotion?.checked,
    difficulty: settingDifficulty?.value ?? "normal",
  };
}

window.getPyscheSettings = getPyscheSettings;
});