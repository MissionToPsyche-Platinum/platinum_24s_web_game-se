import test from "node:test";
import assert from "node:assert/strict";

import {
    CHALLENGE_LEVEL,
    DEFAULT_LEVEL,
    NORMAL_LEVEL_2,
    NORMAL_LEVEL_3,
    SNAKE_LEVEL,
    getCellsConnectedToSource,
    getConnectedDirections,
    getOpenDirections,
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

test("validateLevel accepts every packed tube level", () => {
    for (const level of [DEFAULT_LEVEL, NORMAL_LEVEL_2, NORMAL_LEVEL_3, CHALLENGE_LEVEL, SNAKE_LEVEL]) {
        assert.equal(validateLevel(level), true, level.id);
    }
});

test("getOpenDirections rotates pipe ports clockwise", () => {
    assert.deepEqual(getOpenDirections("straight", 0), [0, 2]);
    assert.deepEqual(getOpenDirections("straight", 1), [1, 3]);
    assert.deepEqual(getOpenDirections("corner", 0), [0, 1]);
    assert.deepEqual(getOpenDirections("source", 0), [2]);
    assert.deepEqual(getOpenDirections("empty", 0), []);
    assert.deepEqual(getOpenDirections("unknown", 0), []);
});

test("getConnectedDirections reports joined edges from the intro source", () => {
    assert.deepEqual(getConnectedDirections(DEFAULT_LEVEL, 0, 2), [2]);
    assert.deepEqual(getConnectedDirections(DEFAULT_LEVEL, 2, 2), []);
});

test("getCellsConnectedToSource stops at the broken intro pipe", () => {
    const connected = getCellsConnectedToSource(DEFAULT_LEVEL);
    assert.equal(connected.has("0,2"), true);
    assert.equal(connected.has("1,2"), true);
    assert.equal(connected.has("2,2"), false);
    assert.equal(connected.has("4,2"), false);
});

test("isSourceConnectedToGoal is false on packed unsolved levels", () => {
    assert.equal(isSourceConnectedToGoal(NORMAL_LEVEL_2), false);
    assert.equal(isSourceConnectedToGoal(CHALLENGE_LEVEL), false);
});

test("isSourceConnectedToGoal is true when challenge straights are aligned", () => {
    const solved = cloneLevel(CHALLENGE_LEVEL);
    for (const row of solved.cells) {
        for (const cell of row) {
            if (cell.kind === "straight") cell.rotation = 0;
        }
    }
    assert.equal(isSourceConnectedToGoal(solved), true);
});
