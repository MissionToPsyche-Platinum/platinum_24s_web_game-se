export function startSlidingPuzzle({ containerID }) {
    containerID.innerHTML = `
    <div class="sliding-wrapper">
        <h3 class="sliding-header">Sliding Puzzle</h3>
        <div id="sliding-grid"></div>
    </div>
`;

    const state = [
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

    renderSlidingPuzzle (containerID, state);


    
}

function renderSlidingPuzzle (container, state) {
    

    const grid = document.getElementById("sliding-grid");
    

    state.forEach(tile => {
        const btn = document.createElement("button");
        btn.className = "sliding-tile";

        if(tile.value === null) {
            btn.classList.add("empty");
            btn.disabled = true;
        } else {
            btn.textContent = tile.value;
        }

        grid.appendChild(btn);
    });

    
}