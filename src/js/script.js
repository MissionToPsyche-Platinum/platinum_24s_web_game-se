const mainMenu = document.getElementById("main-menu");
const leaderBoardPopUp = document.getElementById("leaderBoardPopUp");
const gameScreen = document.getElementById("puzzle-screen");
const startButton = document.getElementById("start");
const backToMenuButtons = document.querySelectorAll(".back-to-menu");
const leaderBoardButton = document.getElementById("leaderboard");
const instructionsButton = document.getElementById("instructions");
const instructionsPopUp = document.getElementById("instructionsPopUp");

// Event listeners for buttons
startButton.addEventListener("click", startPuzzle);
backToMenuButtons.forEach(btn => {
  btn.addEventListener("click", backToMenu);
});
leaderBoardButton.addEventListener("click", startLeaderBoard);
instructionsButton.addEventListener("click", startInstructions);

function startPuzzle() {
  mainMenu.style.display = "none";
  gameScreen.style.display = "block";
}

function startLeaderBoard() {
  mainMenu.style.display = "none";
  leaderBoardPopUp.style.display = "block";
}

function startInstructions() {
  mainMenu.style.display = "none";
  instructionsPopUp.style.display = "block";
}

function backToMenu() {
  gameScreen.style.display = "none";
  leaderBoardPopUp.style.display = "none";
  instructionsPopUp.style.display = "none";
  mainMenu.style.display = "";
}
