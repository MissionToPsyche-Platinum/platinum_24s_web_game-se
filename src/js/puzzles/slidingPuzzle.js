import { solvePuzzle } from "../gameController.js";

export function startSlidingPuzzle({ containerID }) {
    containerID.innerHTML = `
    <div class="sliding-wrapper">
        <h3 class="sliding-header">Sliding Puzzle</h3>
        <div id="sliding-grid"></div>
    </div>
`;

    let state = [
        {value: 0, finalPos: 0},
        {value: 1, finalPos: 1},
        {value: 2, finalPos: 2},
        {value: 3, finalPos: 3},
        {value: 4, finalPos: 4},
        {value: 5, finalPos: 5},
        {value: 6, finalPos: 6},
        {value: 7, finalPos: 7},
        {value: null, finalPos: 8}
    ]

    state = shufflePieces (state);
    renderSlidingPuzzle (containerID, state);


    
}

function shufflePieces (pieces) {
    const arr = [...pieces];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getEmptyTile(state){
    return state.findIndex(tile => tile.value === null);
}

function checkSwap (index , emptyIndex) {
    const posValue = index - emptyIndex;
    if(posValue === 3 || posValue == -3) return true;

    if(posValue === -1 || posValue === 1){
        return Math.floor(index / 3) === Math.floor(emptyIndex / 3);
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

function handleClick (index, state, container){
    const emptyIndex = getEmptyTile(state);
    
    if(checkSwap(index , emptyIndex)){
        swapTiles(state, index , emptyIndex);
        renderSlidingPuzzle(container , state);
        checkWin(state);
    } else {
        return;
    }
}

function renderSlidingPuzzle (container, state) {
    

    const grid = document.getElementById("sliding-grid");

    grid.innerHTML = "";
    

    state.forEach((tile , index) => {
        const btn = document.createElement("button");
        btn.className = "sliding-tile";

        if(tile.value === null) {
            btn.classList.add("empty");
            btn.disabled = true;
        } else {
            btn.textContent = tile.value;
            btn.addEventListener("click", () => {
                handleClick(index, state, container);
            })
        }

        grid.appendChild(btn);
    });

    
}