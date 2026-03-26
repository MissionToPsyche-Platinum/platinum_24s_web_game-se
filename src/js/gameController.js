function startGame() {}
function playGame() {}
function gameIsOver() {}
function SolvePuzzle() {}
function detectWin() {}
function updateHeader() {}

const solvePuzzleButton = document.getElementById("solve-puzzle");
const gameScreenHeader = document.getElementById("second-header");
const newGameButton = document.getElementById("new-game");
const winMessage = document.getElementById("win-message");
newGameButton.classList.add("hidden");
winMessage.classList.add("hidden");

let solvedPuzzles = 0;
const PUZZLES_TO_WIN = 5;
var gameOver;


const gamePageContent = gameScreen.innerHTML;



function startGame() {
    solvedPuzzles = 0;
    solvePuzzleButton.disabled = false;
    newGameButton.style.display = 'none';
    winMessage.style.display= 'none';
    gameIsOver(false);
}

function playGame() {

}

function gameIsOver(x) {
    gameOver = x;
}

function solvePuzzle() {
    solvedPuzzles += 1;
    if (detectWin()) {
        updateHeader();
    }
}

function detectWin() {
    if (solvedPuzzles >= PUZZLES_TO_WIN) {
        return true;
    }
    return false;
}

function updateHeader() {
    
    newGameButton.style.display = 'inline';
    winMessage.style.display = 'block';
    solvePuzzleButton.disabled = true;
    
    gameIsOver(true);
    newGameButton.addEventListener("click", startGame);
}

solvePuzzleButton.addEventListener("click", solvePuzzle);
newGameButton.addEventListener("click", startGame);

startGame();