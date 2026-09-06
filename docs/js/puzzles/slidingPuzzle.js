import { solvePuzzle } from "../gameController.js";


export function startSlidingPuzzle({ containerID }) {
    const settings = typeof window !== "undefined" ? window.getPyscheSettings?.() : undefined;
    const difficulty = settings?.difficulty === "challenge" ? "challenge" : "normal";

    const gridSize = difficulty === "challenge" ? 4 : 3;
    
    containerID.innerHTML = `
    <div class="sliding-wrapper">
        <h3 class="sliding-header">Sliding Puzzle - ${difficulty} - ${gridSize}</h3>
        <div id="sliding-grid"></div>
        <div id="solved-overlay"></div>
        <button id="solved-puzzle" class="button">View Solved Puzzle</button>
        <p>Hold button to view solved puzzle image</p>
    </div>
`;

    let state = buildPuzzle(gridSize);
    
    
    state = shufflePieces (state, gridSize);
    
    renderSlidingPuzzle (containerID, state, gridSize);
    
    setupHelpButton();
    
    
}

function buildPuzzle(gridSize) {
    const tileQuantity = gridSize * gridSize;

    const state = [];

    for (let i = 0; i < tileQuantity - 1; i++) {
        state.push({
            value: i,
            finalPos: i
        });
    }

    state.push({
        value: null,
        finalPos : tileQuantity - 1
    });

    return state;
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

function shufflePieces (state, gridSize) {
    let lastIndex = null;

    for(let i = 0; i < 50; i++) {
        const emptyIndex = getEmptyTile(state);

        let movableTiles = state
            .map((tile, index) => index)
            .filter(index => checkSwap(index, emptyIndex, gridSize));

        let possibleMoves = movableTiles.filter(
            index => index !== lastIndex
        );

        if (possibleMoves.length === 0) {
            possibleMoves = movableTiles;
        }

        const randomIndex =
            possibleMoves[
                Math.floor(Math.random() * possibleMoves.length)
            ];

        swapTiles(state, randomIndex, emptyIndex);
        lastIndex = emptyIndex;
    }

    return state;
}

function getEmptyTile(state){
    return state.findIndex(tile => tile.value === null);
}

function checkSwap (index , emptyIndex, gridSize) {
    const posValue = index - emptyIndex;
    if(posValue === gridSize || posValue == -gridSize) return true;

    if(posValue === -1 || posValue === 1){
        return Math.floor(index / gridSize) === Math.floor(emptyIndex / gridSize);
    } 

    return false;
}

function swapTiles (state , index , emptyIndex) {
    [state[index] , state[emptyIndex]] = [state[emptyIndex] , state[index]];
}

function checkWin(state){
    const puzzleSolved = state.every((tile, index) => {
        return index === tile.finalPos;
    });

    if(puzzleSolved) {
        solvePuzzle();
    }
}

function handleClick (index, state, container, gridSize){
    const emptyIndex = getEmptyTile(state);
    
    if(checkSwap(index , emptyIndex, gridSize)){
        swapTiles(state, index , emptyIndex);
        renderSlidingPuzzle(container , state, gridSize);
        checkWin(state);
    } else {
        return;
    }
}

function renderSlidingPuzzle (container, state, gridSize) {
    

    const grid = document.getElementById("sliding-grid");

    grid.innerHTML = "";
    
    const puzzleSize = 600;
    const tileSize = puzzleSize / gridSize;

    grid.style.gridTemplateColumns = `repeat(${gridSize}, ${tileSize}px)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, ${tileSize}px)`;

    state.forEach((tile , index) => {
        const btn = document.createElement("button");
        btn.className = "sliding-tile";

        if(tile.value === null) {
            btn.classList.add("empty");
            btn.disabled = true;
        } else {
            const row = Math.floor(tile.value / gridSize);
            const col = tile.value % gridSize;

            btn.style.backgroundImage = `url("images/Psyche_Launch.jpg")`;
            btn.style.backgroundSize = `${puzzleSize}px ${puzzleSize}px`;
            btn.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;
            btn.textContent = tile.value;
            btn.addEventListener("click", () => {
                handleClick(index, state, container, gridSize);
            })
        }

        grid.appendChild(btn);
    });

    
}