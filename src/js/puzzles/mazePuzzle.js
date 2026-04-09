export function startMazePuzzle({ containerID }) {
    containerID.innerHTML = `
        <h3>Maze Puzzle</h3>
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