import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
    isSlidingPuzzleSolved,
    isTangramSolved,
    isNumberLogicSolved,
    isMatchingPuzzleSolved,
    isMazeSolved,
    isPatternPuzzleSolved,
} from "./winConditions.js";
import { DEFAULT_LEVEL, isSourceConnectedToGoal } from "./tubePuzzleModel.js";

describe("sliding puzzle win", () => {
    it("returns true when every tile is in finalPos", () => {
        const solved = [
            { value: 0, finalPos: 0 },
            { value: 1, finalPos: 1 },
            { value: 2, finalPos: 2 },
            { value: null, finalPos: 3 },
        ];
        assert.equal(isSlidingPuzzleSolved(solved), true);
    });

    it("returns false when a tile is out of place", () => {
        const unsolved = [
            { value: 1, finalPos: 1 },
            { value: 0, finalPos: 0 },
            { value: 2, finalPos: 2 },
            { value: null, finalPos: 3 },
        ];
        assert.equal(isSlidingPuzzleSolved(unsolved), false);
        assert.equal(isSlidingPuzzleSolved([]), false);
    });
});

describe("tangram win", () => {
    it("returns true only when every piece is in place", () => {
        assert.equal(isTangramSolved([{ inPlace: true }, { inPlace: true }]), true);
        assert.equal(isTangramSolved([{ inPlace: true }, { inPlace: false }]), false);
        assert.equal(isTangramSolved([]), false);
    });
});

describe("number logic win", () => {
    const solution = [
        [1, 2],
        [3, 4],
    ];

    it("returns true when the board matches the solution", () => {
        assert.equal(isNumberLogicSolved([[1, 2], [3, 4]], solution), true);
    });

    it("returns false for a wrong or incomplete board", () => {
        assert.equal(isNumberLogicSolved([[1, 2], [3, 0]], solution), false);
        assert.equal(isNumberLogicSolved([[1, 2]], solution), false);
        assert.equal(isNumberLogicSolved(null, solution), false);
    });
});

describe("matching puzzle win", () => {
    it("returns true when all pairs are found", () => {
        assert.equal(isMatchingPuzzleSolved(8, 16), true);
        assert.equal(isMatchingPuzzleSolved(7, 16), false);
        assert.equal(isMatchingPuzzleSolved(0, 16), false);
    });
});

describe("maze win", () => {
    it("returns true only when the player is on the end tile", () => {
        assert.equal(isMazeSolved(24, 24), true);
        assert.equal(isMazeSolved(0, 24), false);
    });
});

describe("pattern puzzle win", () => {
    it("returns true for a correct final-length sequence", () => {
        assert.equal(isPatternPuzzleSolved([0, 2, 1], [0, 2, 1], 3), true);
    });

    it("returns false for a mismatch or a shorter round", () => {
        assert.equal(isPatternPuzzleSolved([0, 1, 1], [0, 2, 1], 3), false);
        assert.equal(isPatternPuzzleSolved([0, 2], [0, 2], 3), false);
        assert.equal(isPatternPuzzleSolved([], [], 3), false);
    });
});

describe("tube puzzle win", () => {
    function cloneLevel(level) {
        return {
            ...level,
            cells: level.cells.map((row) => row.map((cell) => ({ ...cell }))),
        };
    }

    it("returns false on the default unsolved intro level", () => {
        assert.equal(isSourceConnectedToGoal(DEFAULT_LEVEL), false);
    });

    it("returns true when source pipes line up with the goal", () => {
        const solved = cloneLevel(DEFAULT_LEVEL);
        solved.cells[2][2].rotation = 0;
        assert.equal(isSourceConnectedToGoal(solved), true);
    });
});
