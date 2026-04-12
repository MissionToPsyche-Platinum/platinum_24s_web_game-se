export function startMazePuzzle({ containerID }) {
    containerID.innerHTML = `
        <div id="maze-puzzle-layout">
            <header>
                <h3 id="maze-puzzle-header">Maze Puzzle</h3>
            </header>
            <div class="maze-container" id="gridContainer">
                <div id="maze-tile-0" class="maze-item">Start</div>
                <div id="maze-tile-1" class="maze-item">Tile 1</div>
                <div id="maze-tile-2" class="maze-item">Tile 2</div>
                <div id="maze-tile-3" class="maze-item">Tile 3</div>
                <div id="maze-tile-4" class="maze-item">Tile 4</div>
                <div id="maze-tile-5" class="maze-item">Tile 5</div>
                <div id="maze-tile-6" class="maze-item">Tile 6</div>
                <div id="maze-tile-7" class="maze-item">End</div>
            </div>
        </div>
    `;
}

class mazeTile {
    constructor(top, bottom, left, right) {
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }
}

function populateMazePuzzle () {
    
}