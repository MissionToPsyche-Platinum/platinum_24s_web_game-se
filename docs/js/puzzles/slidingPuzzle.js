
import { solvePuzzle } from "../gameController.js";
import { buildPuzzle, checkSwap , shufflePieces, swapTiles, getEmptyTile} from "./slidingPuzzleModel.js";
import { isSlidingPuzzleSolved } from "./winConditions.js";

// Track the current keyboard listener to prevent duplicates.
let activeKeyHandler = null;

export function startSlidingPuzzle({ containerID }) {
    const settings = typeof window !== "undefined"
        ? window.getPyscheSettings?.()
        : undefined;
    const difficulty = settings?.difficulty === "challenge"
        ? "challenge"
        : "normal";

    const gridSize = difficulty === "challenge" ? 4 : 3;

    containerID.innerHTML = `
    <div class="sliding-wrapper">
        <h2 class="puzzle-title">Sliding Puzzle</h2>
        <div class="sliding-board">
            <div id="sliding-grid"></div>
            <div id="solved-overlay"></div>
        </div>
        <button id="solved-puzzle" class="button">View Solved Puzzle</button>
        <p>Hold button to view solved puzzle image</p>
    </div>
`;

    let state = buildPuzzle(gridSize);

    state = shufflePieces(state, gridSize);

    renderSlidingPuzzle(containerID, state, gridSize);

    setupHelpButton();

    setupKeys(state, containerID, gridSize);
}



function setupHelpButton() {
    const btn = document.getElementById("solved-puzzle");
    const overlay = document.getElementById("solved-overlay");

    btn.addEventListener("mousedown", () => {
        overlay.style.display = "block";
    });

    btn.addEventListener("mouseup", () => {
        overlay.style.display = "none";
    });
}





function checkWin(state) {
    return isSlidingPuzzleSolved(state);
}

function moveTile(index, state, container, gridSize) {
    // Ignore input from a sliding puzzle that is no longer displayed.
    if (!container.isConnected ||
        !container.querySelector("#sliding-grid")) {
        return;
    }

    if (checkWin(state)) {
        return;
    }

    const emptyIndex = getEmptyTile(state);

    if (checkSwap(index, emptyIndex, gridSize)) {
        swapTiles(state, index, emptyIndex);
        renderSlidingPuzzle(container, state, gridSize);

        if (checkWin(state)) {
            solvePuzzle();
        }
    } else {
        return;
    }
}

function renderSlidingPuzzle(container, state, gridSize) {
    const grid = document.getElementById("sliding-grid");

    grid.innerHTML = "";

    const puzzleSize = 600;
    const tileSize = puzzleSize / gridSize;

    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    state.forEach((tile, index) => {
        const btn = document.createElement("button");
        btn.className = "sliding-tile";

        if (tile.value === null) {
            btn.classList.add("empty");
            btn.disabled = true;
        } else {
            const row = Math.floor(tile.value / gridSize);
            const col = tile.value % gridSize;

            btn.style.backgroundImage =
                `url("images/Psyche_Illustration.jpg")`;
            btn.style.backgroundSize =
                `${gridSize * 100}% ${gridSize * 100}%`;

            const x = (col / (gridSize - 1)) * 100;
            const y = (row / (gridSize - 1)) * 100;

            btn.style.backgroundPosition = `${x}% ${y}%`;

            if (isColorBlindMode()) {
                btn.textContent = tile.value;
            }

            btn.addEventListener("click", () => {
                moveTile(index, state, container, gridSize);
            });
        }

        grid.appendChild(btn);
    });
}

function setupKeys(state, container, gridSize) {
    // Remove the previous handler before adding a new one.
    // This prevents listeners from accumulating when the
    // sliding puzzle is loaded multiple times.
    if (activeKeyHandler) {
        document.removeEventListener("keydown", activeKeyHandler);
        activeKeyHandler = null;
    }

    activeKeyHandler = (event) => {
        // Only respond when this sliding puzzle is active.
        // Do not interfere with controls on other puzzles.
        if (!container.isConnected ||
            !container.querySelector("#sliding-grid")) {
            return;
        }

        // Allow normal typing and editing in form fields.
        const target = event.target;
        if (target instanceof Element &&
            (target.closest("input, textarea, select") ||
             target.isContentEditable)) {
            return;
        }

        // Do not intercept keys once this puzzle is solved.
        if (checkWin(state)) {
            return;
        }

        const emptyIndex = getEmptyTile(state);
        let targetIndex;

        switch (event.key) {
            case "ArrowUp":
                targetIndex = emptyIndex + gridSize;
                break;
            case "ArrowDown":
                targetIndex = emptyIndex - gridSize;
                break;
            case "ArrowLeft":
                targetIndex = emptyIndex + 1;
                break;
            case "ArrowRight":
                targetIndex = emptyIndex - 1;
                break;
            default:
                return;
        }

        // Prevent default arrow-key behavior only when
        // the sliding puzzle is actively using the keys.
        event.preventDefault();

        if (targetIndex >= 0 && targetIndex < state.length) {
            moveTile(targetIndex, state, container, gridSize);
        }
    };

    document.addEventListener("keydown", activeKeyHandler);
}

function isColorBlindMode() {
    return !!window.getPyscheSettings?.()?.colorBlind;
}
