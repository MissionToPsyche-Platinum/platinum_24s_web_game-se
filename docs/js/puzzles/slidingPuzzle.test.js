import test from "node:test";
import assert from "node:assert/strict";

import { buildPuzzle, checkSwap , shufflePieces} from "./slidingPuzzleModel.js";

test("buildPuzzle", () => {
    const puzzle = buildPuzzle(3);
    assert.strictEqual(puzzle.length, 9);
    assert.strictEqual(puzzle[8].value, null);

    const puzzle4 = buildPuzzle(4);
    assert.strictEqual(puzzle4.length, 16);
    assert.strictEqual(puzzle4[15].value, null);
});

test("checkSwap", () => {
    const gridSize = 3;
    const emptyIndex = 8;
    const index = 5;
    assert.strictEqual(checkSwap(index, emptyIndex, gridSize), true);
    const index2 = 4;
    assert.strictEqual(checkSwap(index2, emptyIndex, gridSize), false);
});

test("checkSwap with 4x4 grid", () => {
    const gridSize = 4;
    const emptyIndex = 15;
    const index = 11;
    assert.strictEqual(checkSwap(index, emptyIndex, gridSize), true);
    const index2 = 10;
    assert.strictEqual(checkSwap(index2, emptyIndex, gridSize), false);
});

test("shufflePuzzle", () => {
    const puzzle = buildPuzzle(3);
    const shuffledPuzzle = shufflePieces(puzzle, 3);
    assert.strictEqual(shuffledPuzzle.length, 9);

    assert.strictEqual(
        shuffledPuzzle.every(tile => tile !== undefined),
        true
    );

    const puzzle2 = buildPuzzle(4);

    const shuffledPuzzle2 = shufflePieces(puzzle2, 4);
    assert.strictEqual(shuffledPuzzle2.length, 16);

    assert.strictEqual(
        shuffledPuzzle2.every(tile => tile !== undefined),
        true
    );


});