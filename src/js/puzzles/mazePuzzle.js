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

    const mazeItems = document.querySelectorAll(".maze-item");
    populateMazePuzzle();

    mazeItems.forEach(item => {
        item.addEventListener('click', move);
    });
}

const NUM_TILES = 8;
let location = [];
let index = 0;
class mazeTile {
    constructor(top, bottom, left, right, text, position) {
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        this.text = text;
        this.position = position;
    }
}

function populateMazePuzzle () {
    for (let i = 0; i < NUM_TILES; i++) {
        // location[i] = 0;
        location[i] = new mazeTile(true, true, true, true, 0, i);
    }

    location[0] = 1; //represents current location

    const mazeItems = document.querySelectorAll(".maze-item");

    mazeItems.forEach((item, index) => {
        item.textContent = location[index].text;
        //item.style.color = "grey";
    });
}

function move() {
    location[index] = 0;
    index++;
    location[index] = 1;
    const mazeItems = document.querySelectorAll(".maze-item");
    mazeItems.forEach((item, index) => {
        item.textContent = location[index];
        //item.style.color = "grey";
    });
}