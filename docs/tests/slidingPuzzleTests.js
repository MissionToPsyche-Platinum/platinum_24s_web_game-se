import { buildPuzzle, checkSwap } from "../js/puzzles/slidingPuzzle.js";

test("buildPuzzle", () => {
    const puzzle = buildPuzzle(3);
    expect(puzzle.length).toBe(9);
    expect(puzzle[8].value).toBe(null);

    const puzzle4 = buildPuzzle(4);
    expect(puzzle4.length).toBe(16);
    expect(puzzle4[15].value).toBe(null);
});

test("checkSwap", () => {
    const gridSize = 3;
    const emptyIndex = 8;
    const index = 5;
    expect(checkSwap(index, emptyIndex, gridSize)).toBe(true);
    const index2 = 4;
    expect(checkSwap(index2, emptyIndex, gridSize)).toBe(false);
});