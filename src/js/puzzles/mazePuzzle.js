import { solvePuzzle } from '../gameController.js';
export function startMazePuzzle({ containerID }) {
    containerID.innerHTML = `
        <div id="maze-puzzle-layout">
            <header>
                <h3 id="maze-puzzle-header">Maze Puzzle</h3>
            </header>
            <div class="maze-container" id="gridContainer">
                <div data-id="0" class="maze-item" tabIndex = "0">Start</div>
                <div data-id="1" class="maze-item" tabIndex = "0">Tile 1</div>
                <div data-id="2" class="maze-item" tabIndex = "0">Tile 2</div>
                <div data-id="3" class="maze-item" tabIndex = "0">Tile 3</div>
                <div data-id="4" class="maze-item" tabIndex = "0">Tile 4</div>
                <div data-id="5" class="maze-item" tabIndex = "0">Tile 5</div>
                <div data-id="6" class="maze-item" tabIndex = "0">Tile 6</div>
                <div data-id="7" class="maze-item" tabIndex = "0">Tile 7</div>
                <div data-id="8" class="maze-item" tabIndex = "0">Tile 8</div>
                <div data-id="9" class="maze-item" tabIndex = "0">Tile 9</div>
                <div data-id="10" class="maze-item" tabIndex = "0">Tile 10</div>
                <div data-id="11" class="maze-item" tabIndex = "0">Tile 11</div>
                <div data-id="12" class="maze-item" tabIndex = "0">Tile 12</div>
                <div data-id="13" class="maze-item" tabIndex = "0">Tile 13</div>
                <div data-id="14" class="maze-item" tabIndex = "0">Tile 14</div>
                <div data-id="15" class="maze-item" tabIndex = "0">End</div>
            </div>
        </div>
    `;

    const mazeItems = document.querySelectorAll(".maze-item");
    populateMazePuzzle();

    mazeItems.forEach(item => {
        item.addEventListener('keydown', handleKeyDown);
    });

}

const NUM_TILES = 16;
const NUM_ROWS = 4;
const NUM_COLS = 4;
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

    location[0] = new mazeTile(false, true, false, false, 1, 0);
    location[1] = new mazeTile(false, true, false, true, "", 1);
    location[2] = new mazeTile(false, false, true, true, "", 2);
    location[3] = new mazeTile(false, true, true, false, "", 3);

    location[4] = new mazeTile(true, false, false, true, "", 4);
    location[5] = new mazeTile(true, false, true, false, "", 5);
    location[6] = new mazeTile(false, false, false, false, "", 6);
    location[7] = new mazeTile(true, true, false, false, "", 7);

    location[8] = new mazeTile(false, true, false, true, "", 8);
    location[9] = new mazeTile(false, false, true, true, "", 9);
    location[10] = new mazeTile(false, false, true, true, "", 10);
    location[11] = new mazeTile(true, false, true, false, "", 11);

    location[12] = new mazeTile(true, false, false, true, "", 12);
    location[13] = new mazeTile(false, false, true, true, "", 13);
    location[14] = new mazeTile(false, false, true, true, "", 14);
    location[15] = new mazeTile(false, false, true, false, "End", 15);
    
    setBorderStyle();

    const mazeItems = document.querySelectorAll(".maze-item");

    mazeItems.forEach((item, i) => {
        item.textContent = location[i].text;
    });
}

function moveUp () {
    if (location[index].top) {
        location[index].text = "";
        index  = index - NUM_COLS;
        location[index].text = 1;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
        detectWin();
    }
}

function moveDown () {
    if (location[index].bottom) {
        location[index].text = "";
        index  = index + NUM_COLS;
        location[index].text = 1;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
        detectWin();
    }
}

function moveRight () {
    if (location[index].right) {
        location[index].text = "";
        index++;
        location[index].text = 1;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
        detectWin();
    }
}

function moveLeft () {
    if (location[index].left) {
        location[index].text = "";
        index--;
        location[index].text = 1;
    
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
        detectWin();
    }
}

function detectWin () {
    if (index === NUM_TILES - 1) {
        solvePuzzle();
        index = 0;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach(item => {
            item.removeEventListener('keydown', handleKeyDown);
        });

    }
}

function setBorderStyle () {
    const mazeItems = document.querySelectorAll(".maze-item");

    mazeItems.forEach((item, i) => {
        if (location[i].top) {
            item.style.borderTop = 'none'; 
        }
        if (location[i].bottom) {
            item.style.borderBottom = 'none';
        }
        if (location[i].left) {
            item.style.borderLeft = 'none';
        }
        if (location[i].right) {
            item.style.borderRight = 'none';
        }
    });
}

function handleKeyDown (event) {
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
}