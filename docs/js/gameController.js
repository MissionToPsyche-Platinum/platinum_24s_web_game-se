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
let skipsLeft = document.getElementById("skipsLeft");
let puzzleSkippedMessage = document.getElementById("puzzle-skipped-message");
let noSkipsLeftMessage = document.getElementById("no-skips-left-message");
let puzzlesShown = [];
let puzzleSkipped = false;

function clearMissionFact() {
    if (!displayFactMessage) return;
    displayFactMessage.textContent = "";
    displayFactMessage.hidden = true;
    displayFactMessage.style.display = "none";
    missionFactSection.classList.remove("is-reward");
    missionFactTitle.textContent = "Mission Intel";
}

const MISSION_INTEL_TRIGGER = {
    solve: "solve",
    skip: "skip",
};

function shouldShowMissionIntel(trigger) {
    if (trigger === MISSION_INTEL_TRIGGER.skip) {
        return false;
    }
    if (trigger !== MISSION_INTEL_TRIGGER.solve) {
        return false;
    }
    return true;
}

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

function tryShowMissionIntel(trigger) {
    if (!shouldShowMissionIntel(trigger)) {
        return;
    }
    showRandomMissionFact();
}

export function updateScore(wrongAnswer) {
    if(wrongAnswer === 0) {
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
    nextPuzzleIndex: 0,
    solvedPuzzles: 0,
    skippedPuzzles: 0
};

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
    const overlay = document.getElementById("puzzle-break-overlay");
    const countEl = document.getElementById("puzzle-break-count");
    if (!overlay || !countEl) {
        displayNextPuzzle();
        return;
    }

    hidePuzzleBreak();
    nextPuzzleButton.disabled = true;
    updateSkipButtonState(false);
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
    puzzlesShown = [];
    gameState.solvedPuzzles = 0;
    playerScore = 0;
    updateScore(0);
    nextPuzzleButton.style.display = 'inline';
    solvePuzzleButton.disabled = false;
    nextPuzzleButton.disabled = true;
    if (newGameButton) newGameButton.style.display = 'none';
    if (winMessage) winMessage.style.display= 'none';
    noSkipsLeftMessage.style.display = 'none';
    puzzleSkippedMessage.style.display = 'none';
    puzzleSolvedMessage.style.display = 'none';
    puzzleNotSolvedMessage.style.display = 'none';
    clearMissionFact();
    solvePuzzleMessage.style.display = 'none';
    resetSkipState();
    gameState.puzzleOrder = shufflePuzzles(puzzles);
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
    const seconds = Math.floor(puzzleElapsedTime / 1000);
    return seconds;
}

function calculateTimeScore(seconds) {
    if(settingDifficulty.value === "normal") {
        if(seconds <= 10) {
            return 100;
        } else if(seconds <= 20) {
            return 75;
        } else if(seconds <= 30) {
            return 50;
        } else if(seconds <= 45) {
            return 25;
        } else if(seconds <= 60) {
            return 0;
        } else {
            return -25;
        }
    } else {
        if(seconds <= 20) {
            return 100;
        } else if(seconds <= 30) {
            return 75;
        } else if(seconds <= 45) {
            return 50;
        } else if(seconds <= 60) {
            return 25;
        } else if(seconds <= 75) {
            return 0;
        } else {
            return -25;
        }
    }
}

function gameIsOver(x) {
    isGameOver = x;
}

function getSkipsRemaining() {
    const remaining = Number.parseInt(skipsLeft?.textContent, 10);
    return Number.isFinite(remaining) ? remaining : 0;
}

function resetSkipState() {
    puzzleSkipped = false;
    gameState.skippedPuzzles = 0;
    if (skipsLeft) {
        skipsLeft.textContent = String(MAX_SKIPS);
    }
    if (noSkipsLeftMessage) {
        noSkipsLeftMessage.style.display = "none";
    }
}

function updateSkipButtonState(allowSkip) {
    if (!skipPuzzleButton) return;
    const canSkip = Boolean(allowSkip) && !isGameOver && getSkipsRemaining() > 0;
    skipPuzzleButton.disabled = !canSkip;
}

function skipPuzzle() {
    if (skipPuzzleButton?.disabled) {
        return;
    }

    puzzleSkipped = true;
    playerScore -= skippedScore;
    updateScore(0);
    gameState.skippedPuzzles += 1;
    puzzleNotSolvedMessage.style.display = 'none';
    let skipsAmount = getSkipsRemaining();
    if(skipsAmount <= 0) {
        noSkipsLeftMessage.style.display = 'block';
        updateSkipButtonState(false);
    } else {
        skipsAmount -= 1;
        skipsLeft.textContent = skipsAmount;
        puzzleSkippedMessage.style.display = 'block';
        solvePuzzleMessage.style.display = 'none';
        tryShowMissionIntel(MISSION_INTEL_TRIGGER.skip);
        nextPuzzleButton.disabled = false;
        solvePuzzleButton.disabled = true;
        puzzleHelpButton.disabled = true;
        updateSkipButtonState(false);
        updateProgress();
        window.holdRunTimer?.();
        if (detectWin()) {
            updateHeader();
        }
    }
}

export function solvePuzzle() {
    const timeTaken = stopPuzzleTimer();
    const timeScore = calculateTimeScore(timeTaken);
    playerScore += correctScore;
    playerScore += timeScore;
    updateScore(0);
    gameState.solvedPuzzles += 1;
    puzzleNotSolvedMessage.style.display = 'none';
    puzzleSolvedMessage.style.display = 'block';
    solvePuzzleMessage.style.display = 'none';
    tryShowMissionIntel(MISSION_INTEL_TRIGGER.solve);
    nextPuzzleButton.disabled = false;
    solvePuzzleButton.disabled = true;
    puzzleHelpButton.disabled = true;
    updateSkipButtonState(false);
    updateProgress();
    window.holdRunTimer?.();
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
    
    if (newGameButton) newGameButton.style.display = 'inline';
    if (winMessage) winMessage.style.display = 'block';
    solvePuzzleButton.disabled = true;
    puzzleSolvedMessage.style.display = 'none';
    nextPuzzleButton.style.display = 'none';
    gameIsOver(true);
    updateSkipButtonState(false);
    if (newGameButton) newGameButton.addEventListener("click", startGame);

    const playerName =
        window.getPlayerDisplayName?.() ||
        document.getElementById("playerNameDisplay")?.textContent?.trim() ||
        "Astronaut";

    window.showWinScreen?.({
        playerName,
        puzzlesSolved: gameState.solvedPuzzles,
    });
}

function displayNextPuzzle() {
    window.releaseRunTimerHold?.();
    //Check to make sure there are more puzzles available, otherwise reset
    if(gameState.nextPuzzleIndex >= gameState.puzzleOrder.length) {
        gameState.nextPuzzleIndex = 0;
    }
    puzzleSkippedMessage.style.display = 'none';
    solvePuzzleMessage.style.display = 'block';
    puzzleSolvedMessage.style.display = 'none';
    clearMissionFact();
    nextPuzzleButton.disabled = true;
    solvePuzzleButton.disabled = false;
    puzzleHelpButton.disabled = !settingHints.checked;
    updateSkipButtonState(true);
    const puzzle = gameState.puzzleOrder[gameState.nextPuzzleIndex];
    gameState.nextPuzzleIndex++;
    puzzlesShown.push(puzzle);
    loadPuzzle(puzzle);
    startPuzzleTimer();
}



function loadPuzzle(puzzle) {
    const container = document.getElementById("puzzle-window");
    puzzle.start({ containerID: container });
    
}

function updateProgress() {
    const solved = gameState.solvedPuzzles;
    progressElement.textContent = `Puzzles completed: ${solved} / ${PUZZLES_TO_WIN}`;
    if (progressBar) {
        progressBar.max = PUZZLES_TO_WIN;
        progressBar.value = solved;
    }
}

function showPuzzleHelp() {
    if (!settingHints.checked) {
        puzzleHelpButton.disabled = true;
        return;
    }
    const help = gameState.puzzleOrder[gameState.solvedPuzzles]?.helpText ?? "";
    const puzzleHelpText = document.getElementById("puzzleHelpText");
    const puzzleHelpPopUp = document.getElementById("puzzleHelpPopUp");
    if (puzzleHelpText) puzzleHelpText.textContent = help;
    window.pauseRunTimer?.();
    if (puzzleHelpPopUp) puzzleHelpPopUp.style.display = "block";
}

function closePuzzleHelp() {
    const puzzleHelpPopUp = document.getElementById("puzzleHelpPopUp");
    if (puzzleHelpPopUp) puzzleHelpPopUp.style.display = "none";
    window.resumeRunTimer?.();
}

skipPuzzleButton.addEventListener("click", skipPuzzle);
solvePuzzleButton.addEventListener("click", solvePuzzle);
if (newGameButton) newGameButton.addEventListener("click", startGame);
nextPuzzleButton.addEventListener("click", startPuzzleBreak);
window.cancelPuzzleBreak = hidePuzzleBreak;
puzzleHelpButton.addEventListener("click", showPuzzleHelp);
document.getElementById("closePuzzleHelp")?.addEventListener("click", closePuzzleHelp);

window.onWinPlayAgain = startGame;

startGame();