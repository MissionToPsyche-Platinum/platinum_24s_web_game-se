const mainMenu = document.getElementById("main-menu");
const gameScreen = document.getElementById("puzzle-screen");
const startButton = document.getElementById("start");
const backToMenuButton = document.getElementById("back-to-menu");
const exitButton = document.getElementById("exit");
const exitPopUp = document.getElementById("exitPopUp");
const cancelExitButton = document.getElementById("cancelExit");
const confirmExitButton = document.getElementById("confirmExit");

startButton.addEventListener("click", startPuzzle);
backToMenuButton.addEventListener("click", backToMenu);
exitButton.addEventListener("click", openExitConfirm);
cancelExitButton.addEventListener("click", closeExitConfirm);
confirmExitButton.addEventListener("click", confirmExitGame);


function startPuzzle() {
  closeExitConfirm();
  mainMenu.style.display = "none";
  gameScreen.style.display = "block";
    
}

function backToMenu() {
  gameScreen.style.display = "none";
  mainMenu.style.display = "";
}

function openExitConfirm() {
  exitPopUp.style.display = "block";
}

function closeExitConfirm() {
  exitPopUp.style.display = "none";
}

function confirmExitGame() {
  closeExitConfirm();

  stopRunTimer();
  closeSettings();

  const instructionsPopUp = document.getElementById("instructionsPopUp");
  if (instructionsPopUp) {
    instructionsPopUp.style.display = "none";
  }

  mainMenu.style.display = "none";
  gameScreen.style.display = "none";

  window.close();

  window.setTimeout(() => {
    document.body.innerHTML =
      '<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Arial,sans-serif;background:#1a1a24;color:#e8e8f0;text-align:center;padding:24px;box-sizing:border-box;"><p style="font-size:1.25rem;margin-bottom:12px;">Thanks for playing Mission to Pysche.</p><p style="max-width:420px;line-height:1.5;">This site cannot close the tab for you. Close this browser tab or window when you are finished.</p></div>';
  }, 150);

}