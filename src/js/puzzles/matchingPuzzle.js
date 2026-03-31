export function startMatchingPuzzle({ containerID }) {
    // containerID.textContent = "Matching Puzzle";
    containerID.innerHTML = `
        <header>
            <h3 id="matching-puzzle-header">Matching Puzzle</h3>
        </header>
        <div class="grid-container" id="gridContainer">
            <div id="matching-tile-0" class="grid-item">Tile 0</div>
            <div id="matching-tile-1" class="grid-item">Tile 1</div>
            <div id="matching-tile-2" class="grid-item">Tile 2</div>
            <div id="matching-tile-3" class="grid-item">Tile 3</div>
            <div id="matching-tile-4" class="grid-item">Tile 4</div>
            <div id="matching-tile-5" class="grid-item">Tile 5</div>
            <div id="matching-tile-6" class="grid-item">Tile 6</div>
            <div id="matching-tile-7" class="grid-item">Tile 7</div>
            <div id="matching-tile-8" class="grid-item">Tile 8</div>
            <div id="matching-tile-9" class="grid-item">Tile 9</div>
            <div id="matching-tile-10" class="grid-item">Tile 10</div>
            <div id="matching-tile-11" class="grid-item">Tile 11</div>
            <div id="matching-tile-12" class="grid-item">Tile 12</div>
            <div id="matching-tile-13" class="grid-item">Tile 13</div>
            <div id="matching-tile-14" class="grid-item">Tile 14</div>
            <div id="matching-tile-15" class="grid-item">Tile 15</div>
        </div>
    `;
    const gridItems = document.querySelectorAll(".grid-item");
    populateMatchingPuzzle();
    gridItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            item.style.backgroundColor = "blue";
        });
    });
    // gridContainer.style.display = 'block';
}


const NUM_TILES = 16;
const puzzleWindow = document.getElementById("puzzle-window");
const gridContainer = document.getElementById("gridContainer");
const gridItems = document.querySelectorAll(".grid-item");
const matchingTile0 = document.getElementById("matching-tile-0");
const matchingTile1 = document.getElementById("matching-tile-1");
const matchingTile2 = document.getElementById("matching-tile-2");
const matchingTile3 = document.getElementById("matching-tile-3");
const matchingTile4 = document.getElementById("matching-tile-4");
const matchingTile5 = document.getElementById("matching-tile-5");
const matchingTile6 = document.getElementById("matching-tile-6");
const matchingTile7 = document.getElementById("matching-tile-7");
const matchingTile8 = document.getElementById("matching-tile-8");
const matchingTile9 = document.getElementById("matching-tile-9");
const matchingTile10 = document.getElementById("matching-tile-10");
const matchingTile11 = document.getElementById("matching-tile-11");
const matchingTile12 = document.getElementById("matching-tile-12");
const matchingTile13 = document.getElementById("matching-tile-13");
const matchingTile14 = document.getElementById("matching-tile-14");
const matchingTile15 = document.getElementById("matching-tile-15");


// matchingTile0.addEventListener("click", function(event) {
//     if (event.target.matches('.grid-item')) {
//         event.target.classList.toggle('clicked');
//     }
// });


// gridItems.forEach(item => {
//     item.addEventListener('click', () => {
//         // item.classList.toggle('.clicked');
//         item.
//     });
// });

// populateMatchingPuzzle();

function setupMatchingPuzzle () {
    
}

function populateMatchingPuzzle () {
    let numberArray = [];
    for (let i = 0; i < NUM_TILES; i++) {
        numberArray[i] = i % (NUM_TILES/2);
        console.log(numberArray[i]);
    }

    numberArray = shuffleArray(numberArray);
    console.log(numberArray);

    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item, index) => {
        item.textContent = numberArray[index];
        console.log(numberArray[index]);
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

function checkForMatch() {

}

function clickTile() {
    matchingTile0.textContent = "clicked";
}

// populateMatchingPuzzle();
// matchingTile0.addEventListener("click", clickTile);
// gridContainer.addEventListener("click", clickTile);