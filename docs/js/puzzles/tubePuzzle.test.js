import test from "node:test";
import assert from "node:assert/strict";

import {
    DEFAULT_LEVEL,
    isSourceConnectedToGoal,
    validateLevel,
} from "./tubePuzzleModel.js";

function cloneLevel(level) {
    return {
        ...level,
        cells: level.cells.map((row) => row.map((cell) => ({ ...cell }))),
    };
}

test("validateLevel accepts a complete grid", () => {
    assert.equal(validateLevel(DEFAULT_LEVEL), true);
});

test("validateLevel rejects missing or mismatched rows", () => {
    assert.equal(validateLevel(null), false);
    assert.equal(validateLevel({ rows: 2, cols: 2, cells: [[{ kind: "source" }]] }), false);
    assert.equal(
        validateLevel({
            rows: 1,
            cols: 2,
            cells: [[{ kind: "source" }]],
        }),
        false,
    );
});

test("isSourceConnectedToGoal is false on the unsolved intro level", () => {
    assert.equal(isSourceConnectedToGoal(DEFAULT_LEVEL), false);
});

test("isSourceConnectedToGoal is true when the intro pipes line up", () => {
    const solved = cloneLevel(DEFAULT_LEVEL);
    solved.cells[2][2].rotation = 0;
    assert.equal(isSourceConnectedToGoal(solved), true);
});

test("isSourceConnectedToGoal is false when source or goal is missing", () => {
    const noGoal = cloneLevel(DEFAULT_LEVEL);
    noGoal.cells[4][2].kind = "empty";
    assert.equal(isSourceConnectedToGoal(noGoal), false);
});
