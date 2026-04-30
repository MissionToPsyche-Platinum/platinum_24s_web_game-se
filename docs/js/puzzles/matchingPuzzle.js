import { solvePuzzle } from '../gameController.js';
export function startMatchingPuzzle({ containerID }) {
    containerID.innerHTML = `
        <div id="puzzle-layout">
            <header>
                <h3 id="puzzle-header">Matching Puzzle</h3>
            </header>
            <div class="grid-container" id="gridContainer">
                <div data-id="0" class="grid-item">Tile 0</div>
                <div data-id="1" class="grid-item">Tile 1</div>
                <div data-id="2" class="grid-item">Tile 2</div>
                <div data-id="3" class="grid-item">Tile 3</div>
                <div data-id="4" class="grid-item">Tile 4</div>
                <div data-id="5" class="grid-item">Tile 5</div>
                <div data-id="6" class="grid-item">Tile 6</div>
                <div data-id="7" class="grid-item">Tile 7</div>
                <div data-id="8" class="grid-item">Tile 8</div>
                <div data-id="9" class="grid-item">Tile 9</div>
                <div data-id="10" class="grid-item">Tile 10</div>
                <div data-id="11" class="grid-item">Tile 11</div>
                <div data-id="12" class="grid-item">Tile 12</div>
                <div data-id="13" class="grid-item">Tile 13</div>
                <div data-id="14" class="grid-item">Tile 14</div>
                <div data-id="15" class="grid-item">Tile 15</div>
            </div>
        </div>
    `;

    const gridItems = document.querySelectorAll(".grid-item");
    populateMatchingPuzzle();

    gridItems.forEach(item => {
        item.addEventListener('click', clickTile);
    });
}

let clickedElement1;
let clickedElement2;
let pairsFound = 0;
let numberArray = [];
const NUM_TILES = 16;


function populateMatchingPuzzle () {
    for (let i = 0; i < NUM_TILES; i++) {
        numberArray[i] = i % (NUM_TILES/2);
    }

    numberArray = shuffleArray(numberArray);

    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item, index) => {
        item.textContent = "";
        item.style.color = "white";
    });
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


function clickTile() {
    if (clickedElement1 == null) {
        clickedElement1 = this;
        let element1Index = +clickedElement1.dataset.id;
        console.log(element1Index);
        clickedElement1.textContent = numberArray[element1Index];
        clickedElement1.style.backgroundColor = "red";
    }
    else if (clickedElement2 == null) {
        clickedElement2 = this;
        let element2Index = +clickedElement2.dataset.id;
        clickedElement2.textContent = numberArray[element2Index];
        if (clickedElement1.textContent === clickedElement2.textContent && clickedElement1 !== clickedElement2) {
            clickedElement1.style.backgroundColor = "blue";
            clickedElement2.style.backgroundColor = "blue";
            clickedElement1.removeEventListener('click', clickTile);
            clickedElement2.removeEventListener('click', clickTile);
            clickedElement1 = null;
            clickedElement2 = null;
            pairsFound++;
        }
        else {
            clickedElement2.style.backgroundColor = "red";
            setTimeout(rehideNumber, 1000);

        }
        
        if (pairsFound === NUM_TILES/2) {
            solvePuzzle();
        }
    }

    function rehideNumber () {
        clickedElement1.style.backgroundColor = "white";
        clickedElement2.style.backgroundColor = "white";
        clickedElement1.textContent = "";
        clickedElement2.textContent = "";
        clickedElement1 = null;
        clickedElement2 = null;
    }
}
