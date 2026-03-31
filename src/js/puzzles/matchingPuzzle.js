export function startMatchingPuzzle({ containerID }) {
    containerID.innerHTML = `
        <header>
            <h3>Matching Puzzle</h3>
        </header>
        <div class="grid-container">
            <div class="grid-item">Tile 1</div>
            <div class="grid-item">Tile 2</div>
            <div class="grid-item">Tile 3</div>
            <div class="grid-item">Tile 4</div>
            <div class="grid-item">Tile 5</div>
            <div class="grid-item">Tile 6</div>
            <div class="grid-item">Tile 7</div>
            <div class="grid-item">Tile 8</div>
            <div class="grid-item">Tile 9</div>
            <div class="grid-item">Tile 10</div>
            <div class="grid-item">Tile 11</div>
            <div class="grid-item">Tile 12</div>
            <div class="grid-item">Tile 13</div>
            <div class="grid-item">Tile 14</div>
            <div class="grid-item">Tile 15</div>
            <div class="grid-item">Tile 16</div>
        </div>
    `;
}


const NUM_TILES = 16;
const puzzleWindow = document.getElementById("puzzle-window");
function setupMatchingPuzzle () {

}

function populateMatchingPuzzle () {

}

function checkForMatch() {

}