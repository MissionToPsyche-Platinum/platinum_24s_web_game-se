
import { puzzles } from "./puzzles/puzzleList.js";
import { nextMissionFact, resetMissionFactQueue } from "./missionFactQueue.js";
import { startTangramPuzzle } from "./puzzles/tangramPuzzle.js";

const solvePuzzleButton = document.getElementById("solve-puzzle");
const skipPuzzleButton = document.getElementById("skip-puzzle");
const gameScreenHeader = document.getElementById("second-header");
const newGameButton = document.getElementById("new-game");
const winMessage = document.getElementById("win-message");
const solvePuzzleMessage = document.getElementById("solve-puzzle-message");
export const puzzleSolvedMessage = document.getElementById("puzzle-solved-message");
export const puzzleNotSolvedMessage = document.getElementById("puzzle-not-solved-message");
const nextPuzzleButton = document.getElementById("next-puzzle");
const displayFactMessage = document.getElementById("display-fact-message");
const missionFactSection = document.getElementById("mission-fact");
const missionFactTitle = document.getElementById("mission-fact-title");
const gridContainer = document.getElementById("grid-container");
const matchingHeader = document.getElementById("matching-header");
const progressElement = document.getElementById("puzzles-completed");
const progressBar = document.getElementById("puzzle-progress-bar");
const puzzleHelpButton = document.getElementById("puzzle-help");
const settingHints = document.getElementById("settingHints");
const currentScore = document.getElementById("currentScore");
const correctScore = 100;
const skippedScore = 75;
let playerScore = 0;
const settingDifficulty = document.getElementById("settingDifficulty");
let puzzleStartTime = null;
let puzzleElapsedTime = 0;
const skipsLeft = document.getElementById("skipsLeft");
const puzzleSkippedMessage = document.getElementById("puzzle-skipped-message");
const noSkipsLeftMessage = document.getElementById("no-skips-left-message");

function clearMissionFact() {
    if (!displayFactMessage) return;
    displayFactMessage.textContent = "";
    displayFactMessage.hidden = true;
    displayFactMessage.style.display = "none";
    missionFactSection.classList.remove("is-reward");
    missionFactTitle.textContent = "Mission Intel";
}

// Fixed: Use the same randomized Mission Intel queue as main.
function showRandomMissionFact() {
    if (!displayFactMessage) return;

    displayFactMessage.textContent = nextMissionFact();
    displayFactMessage.hidden = false;
    displayFactMessage.style.display = "block";
    missionFactTitle.textContent = "Intel Unlocked!";
    missionFactSection.classList.remove("is-reward");
    void missionFactSection.offsetWidth;
    missionFactSection.classList.add("is-reward");
}

export function updateScore(wrongAnswer) {
    if (wrongAnswer === 0) {
        currentScore.textContent = playerScore;
    } else {
        currentScore.textContent = currentScore.textContent - wrongAnswer;
    }
}

const PUZZLES_TO_WIN = 5;
const PUZZLE_BREAK_SECONDS = 3;
const MAX_SKIPS = 2;
let isGameOver;
let puzzleBreakTimer = null;

const gameScreen = document.getElementById("puzzle-screen");
const gamePageContent = gameScreen.innerHTML;

const gameState = {
    puzzleOrder: [],
    currentPuzzleIndex: 0,
    solvedPuzzles: 0,
    skippedPuzzles: 0
};

function completedPuzzles() {
    return gameState.solvedPuzzles + gameState.skippedPuzzles;
}

function shufflePuzzles(puzzles) {
    const arr = [...puzzles];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function hidePuzzleBreak() {
    clearInterval(puzzleBreakTimer);
    puzzleBreakTimer = null;
    const overlay = document.getElementById("puzzle-break-overlay");
    if (overlay) overlay.style.display = "none";
}

function startPuzzleBreak() {
    if (isGameOver || detectWin()) return;
    const overlay = document.getElementById("puzzle-break-overlay");
    const countEl = document.getElementById("puzzle-break-count");

    if (!overlay || !countEl) {
        displayNextPuzzle();
        return;
    }

    hidePuzzleBreak();
    nextPuzzleButton.disabled = true;
    solvePuzzleButton.disabled = true;
    skipPuzzleButton.disabled = true;
    puzzleHelpButton.disabled = true;

    let remaining = PUZZLE_BREAK_SECONDS;
    countEl.textContent = remaining;
    overlay.style.display = "flex";

    puzzleBreakTimer = setInterval(() => {
        remaining -= 1;

        if (remaining <= 0) {
            hidePuzzleBreak();
            displayNextPuzzle();
            return;
        }

        countEl.textContent = remaining;
    }, 1000);
}

function startGame() {
    hidePuzzleBreak();

    // Reset all puzzle progress for a new game.
    gameState.currentPuzzleIndex = 0;
    gameState.solvedPuzzles = 0;
    gameState.skippedPuzzles = 0;

    playerScore = 0;
    updateScore(0);

    // Restore all three available skips.
    skipsLeft.textContent = String(MAX_SKIPS);
    skipPuzzleButton.disabled = false;

    nextPuzzleButton.style.display = 'inline';
    solvePuzzleButton.disabled = false;
    nextPuzzleButton.disabled = true;

    if (newGameButton) newGameButton.style.display = 'none';
    if (winMessage) winMessage.style.display = 'none';

    noSkipsLeftMessage.style.display = 'none';
    puzzleSkippedMessage.style.display = 'none';
    puzzleSolvedMessage.style.display = 'none';
    puzzleNotSolvedMessage.style.display = 'none';

    clearMissionFact();
    solvePuzzleMessage.style.display = 'none';

    // Generate a new randomized puzzle order for each game.
    gameState.puzzleOrder = shufflePuzzles(puzzles);

    // Fixed: Reset Mission Intel queue for each new game.
    resetMissionFactQueue();

    updateProgress();
    gameIsOver(false);
    displayNextPuzzle();
}

function startPuzzleTimer() {
    puzzleStartTime = Date.now();
}

function stopPuzzleTimer() {
    puzzleElapsedTime = Date.now() - puzzleStartTime;
    return Math.floor(puzzleElapsedTime / 1000);
}

function calculateTimeScore(seconds) {
    if (settingDifficulty.value === "normal") {
        if (seconds <= 10) return 100;
        if (seconds <= 20) return 75;
        if (seconds <= 30) return 50;
        if (seconds <= 45) return 25;
        if (seconds <= 60) return 0;
        return -25;
    } else {
        if (seconds <= 20) return 100;
        if (seconds <= 30) return 75;
        if (seconds <= 45) return 50;
        if (seconds <= 60) return 25;
        if (seconds <= 75) return 0;
        return -25;
    }
}

function gameIsOver(value) {
    isGameOver = value;
}

function skipPuzzle() {
    // Prevent duplicate skips and enforce the maximum.
    if (
        isGameOver ||
        skipPuzzleButton.disabled ||
        gameState.skippedPuzzles >= MAX_SKIPS
    ) {
        return;
    }

    gameState.skippedPuzzles += 1;
    gameState.currentPuzzleIndex += 1;

    playerScore -= skippedScore;
    updateScore(0);

    skipsLeft.textContent = String(MAX_SKIPS - gameState.skippedPuzzles);

    skipPuzzleButton.disabled = true;
    puzzleNotSolvedMessage.style.display = 'none';
    puzzleSkippedMessage.style.display = 'block';
    solvePuzzleMessage.style.display = 'none';
    solvePuzzleButton.disabled = true;
    puzzleHelpButton.disabled = true;
    nextPuzzleButton.disabled = false;

    updateProgress();
    window.holdRunTimer?.();

    if (detectWin()) {
        updateHeader();
    }
}

export function solvePuzzle() {
    // Prevent the same puzzle from being scored more than once.
    if (isGameOver || solvePuzzleButton.disabled) return;

    const timeTaken = stopPuzzleTimer();
    const timeScore = calculateTimeScore(timeTaken);

    playerScore += correctScore + timeScore;
    gameState.solvedPuzzles += 1;
    gameState.currentPuzzleIndex += 1;

    updateScore(0);

    puzzleNotSolvedMessage.style.display = 'none';
    puzzleSolvedMessage.style.display = 'block';
    solvePuzzleMessage.style.display = 'none';

    // Fixed: Display Mission Intel without undefined missionFacts.
    showRandomMissionFact();

    nextPuzzleButton.disabled = false;
    solvePuzzleButton.disabled = true;
    skipPuzzleButton.disabled = true;
    puzzleHelpButton.disabled = true;

    updateProgress();
    window.holdRunTimer?.();

    if (detectWin()) {
        updateHeader();
    }
}

function detectWin() {
    // A mission ends after five completed rounds.
    // Both solved and skipped puzzles count toward this total.
    return completedPuzzles() >= PUZZLES_TO_WIN;
}

function updateHeader() {
    if (newGameButton) newGameButton.style.display = 'inline';
    if (winMessage) winMessage.style.display = 'block';

    solvePuzzleButton.disabled = true;
    skipPuzzleButton.disabled = true;
    puzzleSolvedMessage.style.display = 'none';
    nextPuzzleButton.style.display = 'none';

    gameIsOver(true);

    const playerName =
        window.getPlayerDisplayName?.() ||
        document.getElementById("playerNameDisplay")?.textContent?.trim() ||
        "Astronaut";

    // Pass both solved and skipped counts to the win screen.
    window.showWinScreen?.({
        playerName,
        puzzlesSolved: gameState.solvedPuzzles,
        puzzlesSkipped: gameState.skippedPuzzles,
    });
}

function displayNextPuzzle() {
    if (isGameOver || detectWin()) return;

    window.releaseRunTimerHold?.();

    puzzleSkippedMessage.style.display = 'none';
    solvePuzzleMessage.style.display = 'block';
    puzzleSolvedMessage.style.display = 'none';
    noSkipsLeftMessage.style.display = 'none';

    clearMissionFact();

    nextPuzzleButton.disabled = true;
    solvePuzzleButton.disabled = false;

    // Re-enable skipping only if the player has skips remaining.
    skipPuzzleButton.disabled = gameState.skippedPuzzles >= MAX_SKIPS;

    puzzleHelpButton.disabled = !settingHints.checked;

    const puzzle = gameState.puzzleOrder[gameState.currentPuzzleIndex];

    if (puzzle) {
        loadPuzzle(puzzle);
    } else {
        // Avoid loading an undefined puzzle if the list is exhausted.
        console.error(
            "No puzzle available at index",
            gameState.currentPuzzleIndex
        );

        solvePuzzleButton.disabled = true;
        skipPuzzleButton.disabled = true;
        puzzleHelpButton.disabled = true;
    }
}

function loadPuzzle(puzzle) {
    const container = document.getElementById("puzzle-window");
    puzzle.start({ containerID: container });
}

function updateProgress() {
    const completed = completedPuzzles();

    progressElement.textContent =
        `Puzzles completed: ${completed} / ${PUZZLES_TO_WIN}`;

    if (progressBar) {
        progressBar.max = PUZZLES_TO_WIN;
        progressBar.value = completed;
    }
}

function showPuzzleHelp() {
    if (!settingHints.checked) {
        puzzleHelpButton.disabled = true;
        return;
    }

    const help =
        gameState.puzzleOrder[gameState.currentPuzzleIndex]?.helpText ?? "";

    const puzzleHelpText = document.getElementById("puzzleHelpText");
    const puzzleHelpPopUp = document.getElementById("puzzleHelpPopUp");

    if (puzzleHelpText) {
        puzzleHelpText.textContent = help;
    }

    window.pauseRunTimer?.();

    if (puzzleHelpPopUp) {
        puzzleHelpPopUp.style.display = "block";
    }
}

function closePuzzleHelp() {
    const puzzleHelpPopUp = document.getElementById("puzzleHelpPopUp");

    if (puzzleHelpPopUp) {
        puzzleHelpPopUp.style.display = "none";
    }

    window.resumeRunTimer?.();
}

// Register event listeners.
skipPuzzleButton.addEventListener("click", skipPuzzle);
solvePuzzleButton.addEventListener("click", solvePuzzle);

if (newGameButton) {
    newGameButton.addEventListener("click", startGame);
}

nextPuzzleButton.addEventListener("click", startPuzzleBreak);

window.cancelPuzzleBreak = hidePuzzleBreak;

puzzleHelpButton.addEventListener("click", showPuzzleHelp);

document.getElementById("closePuzzleHelp")?.addEventListener(
    "click",
    closePuzzleHelp
);

// Allow script.js to reset the controller when Play Again is clicked.
window.onWinPlayAgain = startGame;

// Initialize the puzzle controller.
startGame();
