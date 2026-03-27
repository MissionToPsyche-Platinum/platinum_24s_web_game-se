function startGame() {}
function playGame() {}
function gameIsOver() {}
function SolvePuzzle() {}
function detectWin() {}
function updateHeader() {}
function displayNextPuzzle() {}

const solvePuzzleButton = document.getElementById("solve-puzzle");
const gameScreenHeader = document.getElementById("second-header");
const newGameButton = document.getElementById("new-game");
const winMessage = document.getElementById("win-message");
const solvePuzzleMessage = document.getElementById("solve-puzzle-message");
const puzzleSolvedMessage = document.getElementById("puzzle-solved-message");
const nextPuzzleButton = document.getElementById("next-puzzle");
const displayFactMessage = document.getElementById("display-fact-message");


let solvedPuzzles = 0;
const PUZZLES_TO_WIN = 5;
let isGameOver;


const gamePageContent = gameScreen.innerHTML;



function startGame() {
    solvedPuzzles = 0;
    nextPuzzleButton.style.display = 'inline';
    solvePuzzleButton.disabled = false;
    nextPuzzleButton.disabled = true;
    newGameButton.style.display = 'none';
    winMessage.style.display= 'none';
    puzzleSolvedMessage.style.display = 'none';
    displayFactMessage.style.display = 'none';
    solvePuzzleMessage.style.display = 'none';
    gameIsOver(false);
    displayNextPuzzle();
}

function playGame() {

}

function gameIsOver(x) {
    isGameOver = x;
}

function solvePuzzle() {
    solvedPuzzles += 1;
    
    puzzleSolvedMessage.style.display = 'block';
    displayFactMessage.style.display = 'none';
    solvePuzzleMessage.style.display = 'none';
    displayFactMessage.style.display = 'block';
    nextPuzzleButton.disabled = false;
    solvePuzzleButton.disabled = true;
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
    displayFactMessage.style.display = 'none';
    puzzleSolvedMessage.style.display = 'none';
    nextPuzzleButton.style.display = 'none';
    gameIsOver(true);
    newGameButton.addEventListener("click", startGame);
}

function displayNextPuzzle() {
    solvePuzzleMessage.style.display = 'block';
    puzzleSolvedMessage.style.display = 'none';
    displayFactMessage.style.display = 'none';
    nextPuzzleButton.disabled = true;
    solvePuzzleButton.disabled = false;
}

solvePuzzleButton.addEventListener("click", solvePuzzle);
newGameButton.addEventListener("click", startGame);
nextPuzzleButton.addEventListener("click", displayNextPuzzle);

startGame();