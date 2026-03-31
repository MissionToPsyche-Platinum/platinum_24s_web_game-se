export function startMatchingPuzzle({ containerID }) {
    // containerID.textContent = "Matching Puzzle";
    // containerID.innerHTML = `
    //     <header>
    //         <h3 id="matching-puzzle-header">Matching Puzzle</h3>
    //     </header>
    // `;
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


gridItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        item.style.backgroundColor = "blue";
    });
});

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
    // shuffleArray(numberArray);

    gridItems.forEach((item, index) => {
        item.textContent = numberArray[index];
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

populateMatchingPuzzle();
// matchingTile0.addEventListener("click", clickTile);
// gridContainer.addEventListener("click", clickTile);