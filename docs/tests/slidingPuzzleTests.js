import { buildPuzzle, checkSwap , shufflePieces} from "../js/puzzles/slidingPuzzle.js";

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

test("checkSwap with 4x4 grid", () => {
    const gridSize = 4;
    const emptyIndex = 15;
    const index = 11;
    expect(checkSwap(index, emptyIndex, gridSize)).toBe(true);
    const index2 = 10;
    expect(checkSwap(index2, emptyIndex, gridSize)).toBe(false);
});

test("shufflePuzzle", () => {
    const puzzle = buildPuzzle(3);
    const shuffledPuzzle = shufflePieces(puzzle, 3);
    expect(shuffledPuzzle.length).toBe(9);

    expect(
        shuffledPuzzle.every(tile => tile !== undefined)
    ).toBe(true);

    const shuffledPuzzle2 = shufflePieces(puzzle, 4);
    expect(shuffledPuzzle2.length).toBe(16);

    expect(
        shuffledPuzzle2.every(tile => tile !== undefined)
    ).toBe(true);


});