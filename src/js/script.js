const mainMenu = document.getElementById("main-menu");
const leaderBoardPopUp = document.getElementById("leaderBoardPopUp");
const gameScreen = document.getElementById("puzzle-screen");
const startButton = document.getElementById("start");
const backToMenuButtons = document.querySelectorAll(".back-to-menu");
const leaderBoardButton = document.getElementById("leaderboard");
const instructionsButton = document.getElementById("instructions");
const instructionsPopUp = document.getElementById("instructionsPopUp");

const exitButton = document.getElementById("exit");
const exitPopUp = document.getElementById("exitPopUp");
const cancelExitButton = document.getElementById("cancelExit");
const confirmExitButton = document.getElementById("confirmExit");

// Event listeners for buttons
startButton.addEventListener("click", startPuzzle);
backToMenuButtons.forEach((btn) => {
  btn.addEventListener("click", backToMenu);
});
leaderBoardButton.addEventListener("click", startLeaderBoard);
instructionsButton.addEventListener("click", startInstructions);

if (exitButton && exitPopUp && cancelExitButton && confirmExitButton) {
  exitButton.addEventListener("click", openExitConfirm);
  cancelExitButton.addEventListener("click", closeExitConfirm);
  confirmExitButton.addEventListener("click", confirmExitGame);
}

function startPuzzle() {
  closeExitConfirm();
  mainMenu.style.display = "none";
  gameScreen.style.display = "block";
}

function startLeaderBoard() {
  closeExitConfirm();
  mainMenu.style.display = "none";
  leaderBoardPopUp.style.display = "block";
}

function startInstructions() {
  closeExitConfirm();
  mainMenu.style.display = "none";
  instructionsPopUp.style.display = "block";
}

function backToMenu() {
  closeExitConfirm();
  gameScreen.style.display = "none";
  leaderBoardPopUp.style.display = "none";
  instructionsPopUp.style.display = "none";
  mainMenu.style.display = "";
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
  closeExitConfirm();

  // Hide all app screens/popups before attempting to close
  mainMenu.style.display = "none";
  gameScreen.style.display = "none";
  leaderBoardPopUp.style.display = "none";
  instructionsPopUp.style.display = "none";

  // Works when allowed by browser context
  window.close();

  // Fallback for normal tabs where window.close() is blocked
  window.setTimeout(() => {
    document.body.innerHTML =
      '<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Arial,sans-serif;background:#1a1a24;color:#e8e8f0;text-align:center;padding:24px;box-sizing:border-box;"><p style="font-size:1.25rem;margin-bottom:12px;">Thanks for playing Mission to Pysche.</p><p style="max-width:420px;line-height:1.5;">This site cannot close the tab for you. Close this browser tab or window when you are finished.</p></div>';
  }, 150);
}