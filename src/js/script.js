const mainMenu = document.getElementById("main-menu");
const gameScreen = document.getElementById("puzzle-screen");
const startButton = document.getElementById("start");
const backToMenuButton = document.getElementById("back-to-menu");

startButton.addEventListener("click", startPuzzle);
backToMenuButton.addEventListener("click", backToMenu);

function startPuzzle() {
  mainMenu.style.display = "none";
  gameScreen.style.display = "block";
    
}

function backToMenu() {
  gameScreen.style.display = "none";
  mainMenu.style.display = "";
}