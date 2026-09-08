//Import files for name creation
import { firstNames } from "./leaderboardNames.js";
import { lastNames } from "./leaderboardNames.js";

//Constant values
const LS = {
  displayName: "pysche_settings_display_name",
  timer: "pysche_settings_show_timer",
  hints: "pysche_settings_hints",
  motion: "pysche_settings_reduced_motion",
  colorBlind: "pysche_settings_color_blind",
  diff: "pysche_settings_difficulty",
};

const mainMenu = document.getElementById("main-menu");
const leaderBoardPopUp = document.getElementById("leaderBoardPopUp");
const gameScreen = document.getElementById("puzzle-screen");
const startButton = document.getElementById("start");
const backToMenuButtons = document.querySelectorAll(".back-to-menu");
const nameCreationScreen = document.getElementById("nameCreationScreen");
const overlays = document.querySelectorAll(".overlay");
let firstName = "";
let lastName = "";
const firstNameDisplay = document.getElementById("firstNameDisplay");
const firstNameMenu = document.getElementById("firstNameDropdown");
const firstNameButton = document.getElementById("firstNameDropdownButton");
const lastNameDisplay = document.getElementById("lastNameDisplay");
const lastNameMenu = document.getElementById("lastNameDropdown");
const lastNameButton = document.getElementById("lastNameDropdownButton");
const okayButton = document.getElementById("okayButton");
const emptyNameScreen = document.getElementById("emptyNameScreen");
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
const settingColorBlind = document.getElementById("settingColorBlind");
const settingDifficulty = document.getElementById("settingDifficulty");
const runTimerDisplay = document.getElementById("run-timer-display");
const runTimerEl = document.getElementById("run-timer");
const creditsButton = document.getElementById("credits");
const creditsPopUp = document.getElementById("creditsPopUp");
const exitScreen = document.getElementById("exit-screen");
const exitReturnMenuButton = document.getElementById("exit-return-menu");
const exitCloseTabButton = document.getElementById("exit-close-tab");
const winScreen = document.getElementById("win-screen");
const winPlayerName = document.getElementById("win-player-name");
const winPuzzlesSolved = document.getElementById("win-puzzles-solved");
const winPlayAgainButton = document.getElementById("win-play-again");
const winReturnMenuButton = document.getElementById("win-return-menu");

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
firstNameButton.addEventListener("click", function(event) {
  event.stopPropagation();
  firstNameMenu.classList.remove("fold");
  firstNameMenu.classList.add("show");
});
lastNameButton.addEventListener("click", function() {
  lastNameMenu.classList.remove("fold");
  lastNameMenu.classList.add("show");
});
okayButton.addEventListener("click", startNameCreation);
backToMenuButtons.forEach((btn) => {
  btn.addEventListener("click", backToMenu);
});
beginGameButton.addEventListener("click", function() {
  if(firstName === "" || lastName === "") {
    displayEmptyNameSelection();
  } else {
    startPuzzle();
  }
});
leaderBoardButton.addEventListener("click", startLeaderBoard);
instructionsButton.addEventListener("click", startInstructions);
creditsButton.addEventListener("click", startCredits);

let runTimerInterval = null;
let runActive = false;
let runTimerIsRunning = false;
let runTimerElapsedMs = 0;
let runTimerSegmentStart = 0;
let timerHold = false;


function applyReducedMotion() {
  if (settingReducedMotion) {
    document.documentElement.classList.toggle(
      "pysche-reduced-motion",
      settingReducedMotion.checked
    );
  }
}

function applyColorBlindMode() {
  if (settingColorBlind) {
    document.documentElement.classList.toggle(
      "pysche-color-blind",
      settingColorBlind.checked
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
  if (settingColorBlind)
    settingColorBlind.checked = localStorage.getItem(LS.colorBlind) === "true";
  if (settingDifficulty) {
    const d = localStorage.getItem(LS.diff);
    settingDifficulty.value =
      d === "challenge" || d === "normal" ? d : "normal";
  }
  applyReducedMotion();
  applyColorBlindMode();
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

function getRunTimerMs() {
  if (runTimerIsRunning) {
    return runTimerElapsedMs + (Date.now() - runTimerSegmentStart);
  }
  return runTimerElapsedMs;
}

function applyTimerVisibility() {
  if (!runTimerDisplay) return;
  const showTimer = !settingShowTimer || settingShowTimer.checked;
  runTimerDisplay.style.display = showTimer && runActive ? "block" : "none";
}

function updateRunTimerDisplay() {
  if (runTimerEl) runTimerEl.textContent = formatRunTime(getRunTimerMs());
}

function stopRunTimerTick() {
  if (runTimerInterval !== null) {
    clearInterval(runTimerInterval);
    runTimerInterval = null;
  }
}

function startRunTimerTick() {
  stopRunTimerTick();
  applyTimerVisibility();
  updateRunTimerDisplay();
  runTimerInterval = setInterval(updateRunTimerDisplay, 250);
}

function pauseRunTimer() {
  if (!runActive) return;
  if (runTimerIsRunning) {
    runTimerElapsedMs = getRunTimerMs();
    runTimerIsRunning = false;
  }
  stopRunTimerTick();
  updateRunTimerDisplay();
}

function resumeRunTimer() {
  if (!runActive || timerHold || runTimerIsRunning || document.hidden) return;
  runTimerSegmentStart = Date.now();
  runTimerIsRunning = true;
  startRunTimerTick();
}

function holdRunTimer() {
  if (!runActive) return;
  timerHold = true;
  pauseRunTimer();
}

function releaseRunTimerHold() {
  timerHold = false;
  resumeRunTimer();
}

function stopRunTimer() {
  if (runTimerIsRunning) {
    runTimerElapsedMs = getRunTimerMs();
    runTimerIsRunning = false;
  }
  runActive = false;
  timerHold = false;
  stopRunTimerTick();
  updateRunTimerDisplay();
  applyTimerVisibility();
}

function startRunTimer() {
  stopRunTimerTick();
  runActive = true;
  timerHold = false;
  runTimerElapsedMs = 0;
  runTimerSegmentStart = Date.now();
  runTimerIsRunning = true;
  applyTimerVisibility();
  if (!runTimerDisplay || !runTimerEl) return;
  startRunTimerTick();
}

function hideWinScreen() {
  if (winScreen) winScreen.style.display = "none";
}

function showWinScreen({ playerName, puzzlesSolved } = {}) {
  stopRunTimer();
  closeExitConfirm();
  closeSettings();

  mainMenu.style.display = "none";
  gameScreen.style.display = "none";
  leaderBoardPopUp.style.display = "none";
  instructionsPopUp.style.display = "none";
  nameCreationScreen.style.display = "none";
  creditsPopUp.style.display = "none";
  if (exitScreen) exitScreen.style.display = "none";

  if (winPlayerName) {
    winPlayerName.textContent = playerName?.trim() || "Astronaut";
  }
  if (winPuzzlesSolved) {
    winPuzzlesSolved.textContent = String(puzzlesSolved ?? 0);
  }
  if (winScreen) winScreen.style.display = "flex";
}

function playAgainFromWinScreen() {
  hideWinScreen();
  closeExitConfirm();
  closeSettings();
  document.getElementById("playerNameDisplay").textContent = firstName + " " + lastName;
  mainMenu.style.display = "none";
  gameScreen.style.display = "block";
  nameCreationScreen.style.display = "none";
  loadGameplaySettings();
  startRunTimer();
  hideOverlay();
  window.onWinPlayAgain?.();
}


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
    else if (t === settingShowTimer) {
      localStorage.setItem(LS.timer, String(t.checked));
      applyTimerVisibility();
    }
    else if (t === settingHints)
      localStorage.setItem(LS.hints, String(t.checked));
    else if (t === settingReducedMotion) {
      localStorage.setItem(LS.motion, String(t.checked));
      applyReducedMotion();
    } else if (t === settingColorBlind) {
      localStorage.setItem(LS.colorBlind, String(t.checked));
      applyColorBlindMode();
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
    else if (t === settingShowTimer) {
      localStorage.setItem(LS.timer, String(t.checked));
      applyTimerVisibility();
    }
    else if (t === settingHints)
      localStorage.setItem(LS.hints, String(t.checked));
    else if (t === settingReducedMotion) {
      localStorage.setItem(LS.motion, String(t.checked));
      applyReducedMotion();
    } else if (t === settingColorBlind) {
      localStorage.setItem(LS.colorBlind, String(t.checked));
      applyColorBlindMode();
    } else if (t === settingDifficulty)
      localStorage.setItem(LS.diff, t.value);
  });

updateAudioSettings();

if (exitButton && exitPopUp && cancelExitButton && confirmExitButton) {
  exitButton.addEventListener("click", openExitConfirm);
  cancelExitButton.addEventListener("click", closeExitConfirm);
  confirmExitButton.addEventListener("click", confirmExitGame);
}
if (exitReturnMenuButton) {
  exitReturnMenuButton.addEventListener("click", backToMenu);
}
if (exitCloseTabButton) {
  exitCloseTabButton.addEventListener("click", tryCloseTabFromExitScreen);
}
if (winPlayAgainButton) {
  winPlayAgainButton.addEventListener("click", playAgainFromWinScreen);
}
if (winReturnMenuButton) {
  winReturnMenuButton.addEventListener("click", backToMenu);
}
loadGameplaySettings();

//Resets the screen back to the main menu
function backToMenu() {
  stopRunTimer();
  closeExitConfirm();
  closeSettings();
  hideOverlay();
  hideWinScreen();
  gameScreen.style.display = "none";
  leaderBoardPopUp.style.display = "none";
  instructionsPopUp.style.display = "none";
  nameCreationScreen.style.display = "none";
  creditsPopUp.style.display = "none";
  if (exitScreen) exitScreen.style.display = "none";
  mainMenu.style.display = "";
}


//Loads the puzzle screen
function startPuzzle() {
  closeExitConfirm();
  closeSettings();
  hideWinScreen();
  document.getElementById("playerNameDisplay").textContent = firstName + " " + lastName;
  mainMenu.style.display = "none";
  gameScreen.style.display = "block";
  nameCreationScreen.style.display = "none";
  loadGameplaySettings();
  // Reset puzzle state from a previous win
  window.onWinPlayAgain?.();
  startRunTimer();
  hideOverlay();
}

//Loads the credits screen
function startCredits() {
  closeExitConfirm();
  closeSettings();
  creditsPopUp.style.display = "block";
}

//Loads the leaderboard screen
function startLeaderBoard() {
  closeExitConfirm();
  closeSettings();
  leaderBoardPopUp.style.display = "block";
}

//Loads the instructions screen
function startInstructions() {
  closeExitConfirm();
  closeSettings();
  instructionsPopUp.style.display = "block";
}

//Opens the name creation screen for the user and populates the dropdown menus
function startNameCreation() {
  emptyNameScreen.style.display = "none";
  firstNames.forEach(name => {
    const menuItem = document.createElement("button");
    menuItem.textContent = name;
    menuItem.href = "#";
    menuItem.addEventListener("click", function() {
      document.getElementById(firstNameDisplay.textContent = name);
      firstName = name;
      firstNameMenu.classList.remove("show");
      firstNameMenu.classList.add("fold");
    });
    firstNameMenu.appendChild(menuItem);
  });
  lastNames.forEach(name => {
    const menuItem = document.createElement("button");
    menuItem.textContent = name;
    menuItem.href = "#";
    menuItem.addEventListener("click", function() {
      document.getElementById(lastNameDisplay.textContent = name);
      lastName = name;
      lastNameMenu.classList.remove("show");
      lastNameMenu.classList.add("fold");
    });
    lastNameMenu.appendChild(menuItem);
  });
  sessionStorage.setItem("firstName", firstName);
  sessionStorage.setItem("lastName", lastName);
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

//Displays a popup if the user did not enter a name
function displayEmptyNameSelection() {
  nameCreationScreen.style.display = "none";
  emptyNameScreen.style.display = "block";
}


//Loads the settings screen
function openSettings() {
  if (!settingsPopUp) return;
  closeExitConfirm();
  loadGameplaySettings();
  loadGameplaySettings();
  if(!(firstName == null || lastName == null)) {
    document.getElementById("settingDisplayName").textContent = firstName + " " + lastName;
  }
  pauseRunTimer();
  settingsPopUp.style.display = "block";
}

//Closes the settings screen
function closeSettings() {
  if (!settingsPopUp) return;
  settingsPopUp.style.display = "none";
  resumeRunTimer();
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
  pauseRunTimer();
  exitPopUp.style.display = "block";
}

function closeExitConfirm() {
  if (!exitPopUp) return;
  exitPopUp.style.display = "none";
  resumeRunTimer();
}

function confirmExitGame() {
  stopRunTimer();
  closeExitConfirm();
  closeSettings();
  hideWinScreen();

  mainMenu.style.display = "none";
  gameScreen.style.display = "none";
  leaderBoardPopUp.style.display = "none";
  instructionsPopUp.style.display = "none";
  nameCreationScreen.style.display = "none";
  creditsPopUp.style.display = "none";
  if (exitScreen) exitScreen.style.display = "flex";
}
function tryCloseTabFromExitScreen() {
  window.close();

  if (exitCloseTabButton) {
    exitCloseTabButton.textContent = "Could not close tab (browser blocked)";
    exitCloseTabButton.disabled = true;
  }
}

function getPyscheSettings() {
  return {
    displayName: settingDisplayName?.value.trim() ?? "",
    soundEnabled: !!settingSound?.checked,
    musicEnabled: !!settingMusic?.checked,
    showTimer: settingShowTimer?.checked ?? true,
    hintsEnabled: settingHints?.checked ?? true,
    reducedMotion: !!settingReducedMotion?.checked,
    colorBlind: !!settingColorBlind?.checked,
    difficulty: settingDifficulty?.value ?? "normal",
  };
}

window.getPyscheSettings = getPyscheSettings;
window.showWinScreen = showWinScreen;
window.hideWinScreen = hideWinScreen;
window.getPlayerDisplayName = () => `${firstName} ${lastName}`.trim();
window.startRunTimer = startRunTimer;
window.stopRunTimer = stopRunTimer;
window.pauseRunTimer = pauseRunTimer;
window.resumeRunTimer = resumeRunTimer;
window.holdRunTimer = holdRunTimer;
window.releaseRunTimerHold = releaseRunTimerHold;
window.isRunTimerRunning = () => runTimerIsRunning;
window.getRunTimerMs = getRunTimerMs;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) pauseRunTimer();
  else resumeRunTimer();
});
});