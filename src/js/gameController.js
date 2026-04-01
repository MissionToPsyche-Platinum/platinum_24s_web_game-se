import { puzzles } from "./puzzles/puzzleList.js";

const solvePuzzleButton = document.getElementById("solve-puzzle");
const gameScreenHeader = document.getElementById("second-header");
const newGameButton = document.getElementById("new-game");
const winMessage = document.getElementById("win-message");
const solvePuzzleMessage = document.getElementById("solve-puzzle-message");
const puzzleSolvedMessage = document.getElementById("puzzle-solved-message");
const nextPuzzleButton = document.getElementById("next-puzzle");
const displayFactMessage = document.getElementById("display-fact-message");



const PUZZLES_TO_WIN = 5;
let isGameOver;








const gameState = {
    puzzleOrder: [],
    solvedPuzzles: 0
};

function shufflePuzzles(puzzles) {
    const arr = [...puzzles];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function startGame() {
    gameState.solvedPuzzles = 0;
    nextPuzzleButton.style.display = 'inline';
    solvePuzzleButton.disabled = false;
    nextPuzzleButton.disabled = true;
    newGameButton.style.display = 'none';
    winMessage.style.display= 'none';
    puzzleSolvedMessage.style.display = 'none';
    displayFactMessage.style.display = 'none';
    solvePuzzleMessage.style.display = 'none';
    gameState.puzzleOrder = shufflePuzzles(puzzles);
    
    gameIsOver(false);
    displayNextPuzzle();
}

function playGame() {

}

function gameIsOver(x) {
    isGameOver = x;
}

function solvePuzzle() {
    gameState.solvedPuzzles += 1;
    
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
    if (gameState.solvedPuzzles >= PUZZLES_TO_WIN) {
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
    loadPuzzle(gameState.puzzleOrder[gameState.solvedPuzzles]);
}



function loadPuzzle(puzzle) {
    const container = document.getElementById("puzzle-window");
    container.innerHTML = "";
    puzzle.start({ containerID: container });
}

solvePuzzleButton.addEventListener("click", solvePuzzle);
newGameButton.addEventListener("click", startGame);
nextPuzzleButton.addEventListener("click", displayNextPuzzle);

startGame();