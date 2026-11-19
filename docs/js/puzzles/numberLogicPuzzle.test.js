import test from "node:test";
import assert from "node:assert/strict";

import { fillSudokuPuzzle, isValid, shuffle } from "./numberLogicPuzzleHelpers.js";

//Helper function that hecks whether an array contains numbers 1-9 without duplicates
function containsNumbersOneToNine(arr) {
    return arr.length === 9 &&
        [...arr].sort().every((num, i) => num === i + 1);
}

//Checks that fillSudokuPuzzle generates a full board
test("fillSudokuPuzzle generates a completed board", () => {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));
    let result = fillSudokuPuzzle(board);
    assert.equal(result, true);
    //Check that all cells contain numbers
    for(let row of board) {
        for(let cell of row) {
            assert.ok(cell >= 1 && cell <= 9);
        }
    }
});

//Checks that fillSudokuPuzzle generates valid rows
test("fillSudokuPuzzle generates valid rows", () => {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillSudokuPuzzle(board);
    for (let row of board) {
        assert.equal(containsNumbersOneToNine(row), true);
    }
});

//Checks that fillSudokuPuzzle generates valid columns
test("fillSudokuPuzzle generates valid columns", () => {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillSudokuPuzzle(board);
    for(let col = 0; col < 9; col++) {
        let column = board.map(row => row[col]);
        assert.equal(containsNumbersOneToNine(column), true);
    }
});

//Checks that fillSudokuPuzzle generates valid 3x3 squares
test("fillSudokuPuzzle generates valid 3x3 boxes", () => {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillSudokuPuzzle(board);
    for(let boxRow = 0; boxRow < 9; boxRow += 3) {
        for(let boxCol = 0; boxCol < 9; boxCol += 3) {
            let box = [];
            for(let row = 0; row < 3; row++) {
                for(let col = 0; col < 3; col++) {
                    box.push(board[boxRow + row][boxCol + col]);
                }
            }
            assert.equal(containsNumbersOneToNine(box), true);
        }
    }
});

//Test for shuffle function

//Test for isValid function