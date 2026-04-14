import { solvePuzzle } from '../gameController.js';
export function startMazePuzzle({ containerID }) {
    containerID.innerHTML = `
        <div id="maze-puzzle-layout">
            <header>
                <h3 id="maze-puzzle-header">Maze Puzzle</h3>
            </header>
            <div class="maze-container" id="gridContainer">
                <div id="maze-tile-0" class="maze-item" tabIndex = "0">Start</div>
                <div id="maze-tile-1" class="maze-item" tabIndex = "0">Tile 1</div>
                <div id="maze-tile-2" class="maze-item" tabIndex = "0">Tile 2</div>
                <div id="maze-tile-3" class="maze-item" tabIndex = "0">Tile 3</div>
                <div id="maze-tile-4" class="maze-item" tabIndex = "0">Tile 4</div>
                <div id="maze-tile-5" class="maze-item" tabIndex = "0">Tile 5</div>
                <div id="maze-tile-6" class="maze-item" tabIndex = "0">Tile 6</div>
                <div id="maze-tile-7" class="maze-item" tabIndex = "0">End</div>
            </div>
        </div>
    `;

    const mazeItems = document.querySelectorAll(".maze-item");
    populateMazePuzzle();

    mazeItems.forEach(item => {
        item.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    moveUp();
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    moveDown();
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    moveLeft();
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    moveRight();
                    break;
            }
        });
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

    location[0] = new mazeTile(true, true, true, true, 1, 0);
    for (let i = 1; i < NUM_TILES; i++) {
        location[i] = new mazeTile(true, true, true, true, 0, i);
    }


    const mazeItems = document.querySelectorAll(".maze-item");

    mazeItems.forEach((item, i) => {
        item.textContent = location[i].text;
    });
}

function moveUp () {
    if (index >= NUM_TILES / 2) {
        location[index].text = 0;
        index  = index - NUM_TILES / 2;
        location[index].text = 1;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
    }
}

function moveDown () {
    if (index <= NUM_TILES / 2) {
        location[index].text = 0;
        index  = index + NUM_TILES / 2;
        location[index].text = 1;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
    }
}

function moveRight () {
    if (index < NUM_TILES - 1) {
        location[index].text = 0;
        index++;
        location[index].text = 1;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
    }
}

function moveLeft () {
    if (index > 0) {
        location[index].text = 0;
        index--;
        location[index].text = 1;
    
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
    }
}