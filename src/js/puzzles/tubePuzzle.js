import { DEFAULT_LEVEL, validateLevel } from "./tubePuzzleModel.js";

export function startTubePuzzle({ containerID }) {
    if (!validateLevel(DEFAULT_LEVEL)) {
        throw new Error("Invalid default tube level");
    }
    containerID.innerHTML = `
        <h3>Tube Puzzle</h3>
    `;
}