const mainMenu = document.getElementById("main-menu");
const leaderBoardPopUp = document.getElementById("leaderBoardPopUp");
const gameScreen = document.getElementById("puzzle-screen");
const startButton = document.getElementById("start");
const backToMenuButtons = document.querySelectorAll(".back-to-menu");
const leaderBoardButton = document.getElementById("leaderboard");

startButton.addEventListener("click", startPuzzle);
backToMenuButtons.forEach(btn => {
  btn.addEventListener("click", backToMenu);
});
leaderBoardButton.addEventListener("click", startLeaderBoard);

function startPuzzle() {
  mainMenu.style.display = "none";
  gameScreen.style.display = "block";
}

function startLeaderBoard() {
  mainMenu.style.display = "none";
  leaderBoardPopUp.style.display = "block";
}

function backToMenu() {
  console.log("Back button pressed");
  gameScreen.style.display = "none";
  leaderBoardPopUp.style.display = "none";
  mainMenu.style.display = "";
}
