import { puzzles } from "./puzzles/puzzleList.js";
import { missionFacts } from "./factList.js";
import { startTangramPuzzle } from "./puzzles/tangramPuzzle.js";


const solvePuzzleButton = document.getElementById("solve-puzzle");
const gameScreenHeader = document.getElementById("second-header");
const newGameButton = document.getElementById("new-game");
const winMessage = document.getElementById("win-message");
const solvePuzzleMessage = document.getElementById("solve-puzzle-message");
export const puzzleSolvedMessage = document.getElementById("puzzle-solved-message");
export const puzzleNotSolvedMessage = document.getElementById("puzzle-not-solved-message");
const nextPuzzleButton = document.getElementById("next-puzzle");
const displayFactMessage = document.getElementById("display-fact-message");
const gridContainer = document.getElementById("grid-container");
const matchingHeader = document.getElementById("matching-header");
const progressElement = document.getElementById("puzzles-completed");
const puzzleHelpButton = document.getElementById("puzzle-help");

function clearMissionFact() {
    if (!displayFactMessage) return;
    displayFactMessage.textContent = "";
    displayFactMessage.hidden = true;
    displayFactMessage.style.display = "none";
}

function showMissionFactForSolveCount(solvedCount) {
    if (!displayFactMessage) return;
    const idx = Math.min(Math.max(solvedCount - 1, 0), missionFacts.length - 1);
    displayFactMessage.textContent = missionFacts[idx] ?? "";
    displayFactMessage.hidden = false;
    displayFactMessage.style.display = "block";
}

const PUZZLES_TO_WIN = 5;
let isGameOver;

const gameScreen = document.getElementById("puzzle-screen");
const gamePageContent = gameScreen.innerHTML;


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
    // gridContainer.style.display = 'none';
    // matchingHeader.style.display = 'none';
    solvePuzzleButton.disabled = false;
    nextPuzzleButton.disabled = true;
    newGameButton.style.display = 'none';
    winMessage.style.display= 'none';
    puzzleSolvedMessage.style.display = 'none';
    puzzleNotSolvedMessage.style.display = 'none';
    clearMissionFact();
    solvePuzzleMessage.style.display = 'none';
    gameState.puzzleOrder = shufflePuzzles(puzzles);
    updateProgress();
    gameIsOver(false);
    displayNextPuzzle();
}

function playGame() {

}

function gameIsOver(x) {
    isGameOver = x;
}

export function solvePuzzle() {
    gameState.solvedPuzzles += 1;
    puzzleNotSolvedMessage.style.display = 'none';
    puzzleSolvedMessage.style.display = 'block';
    solvePuzzleMessage.style.display = 'none';
    showMissionFactForSolveCount(gameState.solvedPuzzles);
    nextPuzzleButton.disabled = false;
    solvePuzzleButton.disabled = true;
    puzzleHelpButton.disabled = true;
    updateProgress();
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
    puzzleSolvedMessage.style.display = 'none';
    nextPuzzleButton.style.display = 'none';
    gameIsOver(true);
    newGameButton.addEventListener("click", startGame);
}

function displayNextPuzzle() {
    solvePuzzleMessage.style.display = 'block';
    puzzleSolvedMessage.style.display = 'none';
    clearMissionFact();
    nextPuzzleButton.disabled = true;
    solvePuzzleButton.disabled = false;
    puzzleHelpButton.disabled = false;
    loadPuzzle(gameState.puzzleOrder[gameState.solvedPuzzles]);
}



function loadPuzzle(puzzle) {
    const container = document.getElementById("puzzle-window");
    puzzle.start({ containerID: container });
    
}

function updateProgress() {
    progressElement.textContent = `Puzzles Completed: ${gameState.solvedPuzzles}`;
}

function showPuzzleHelp() {
    alert(`${gameState.puzzleOrder[gameState.solvedPuzzles].helpText}`);
}

solvePuzzleButton.addEventListener("click", solvePuzzle);
newGameButton.addEventListener("click", startGame);
nextPuzzleButton.addEventListener("click", displayNextPuzzle);
puzzleHelpButton.addEventListener("click", showPuzzleHelp);

startGame();