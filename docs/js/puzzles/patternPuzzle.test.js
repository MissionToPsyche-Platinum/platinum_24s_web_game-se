import test from "node:test";
import assert from "node:assert/strict";

import {
    DIFFICULTY_CONFIG,
    clampIndex,
    createPattern,
    getDifficultyConfig,
    isCorrectStep,
    isRoundComplete,
    nextPatternLength,
    nextTileIndex,
} from "./patternPuzzleModel.js";
import { isPatternPuzzleSolved } from "./winConditions.js";

test("getDifficultyConfig uses normal unless challenge is set", () => {
    assert.equal(getDifficultyConfig("normal").startLength, 3);
    assert.equal(getDifficultyConfig("normal").maxLength, 6);
    assert.equal(getDifficultyConfig(undefined), DIFFICULTY_CONFIG.normal);
    assert.equal(getDifficultyConfig("challenge").startLength, 4);
    assert.equal(getDifficultyConfig("challenge").maxLength, 8);
    assert.ok(getDifficultyConfig("challenge").flashMs < getDifficultyConfig("normal").flashMs);
});

test("createPattern builds a sequence of tile indexes", () => {
    const pattern = createPattern(5, 4, () => 0.99);
    assert.equal(pattern.length, 5);
    assert.ok(pattern.every((index) => index >= 0 && index < 4));
    assert.deepEqual(createPattern(3, 4, () => 0), [0, 0, 0]);
    assert.deepEqual(createPattern(0), []);
});

test("isCorrectStep checks only the latest press", () => {
    const pattern = [0, 2, 1];
    assert.equal(isCorrectStep([0], pattern), true);
    assert.equal(isCorrectStep([0, 2], pattern), true);
    assert.equal(isCorrectStep([0, 1], pattern), false);
    assert.equal(isCorrectStep([], pattern), false);
    assert.equal(isCorrectStep([0, 2, 1, 3], pattern), false);
});

test("isRoundComplete requires a full matching sequence", () => {
    const pattern = [1, 3, 0];
    assert.equal(isRoundComplete([1, 3, 0], pattern), true);
    assert.equal(isRoundComplete([1, 3], pattern), false);
    assert.equal(isRoundComplete([1, 3, 2], pattern), false);
    assert.equal(isRoundComplete([], []), false);
});

test("nextPatternLength grows until the max round", () => {
    assert.equal(nextPatternLength(3, 6), 4);
    assert.equal(nextPatternLength(6, 6), 6);
});

test("clampIndex stays on the 2x2 pad", () => {
    assert.equal(clampIndex(-2, 4), 0);
    assert.equal(clampIndex(1, 4), 1);
    assert.equal(clampIndex(9, 4), 3);
    assert.equal(clampIndex(0, 0), 0);
});

test("nextTileIndex moves on the 2x2 pad and stops at edges", () => {
    assert.equal(nextTileIndex(0, "ArrowRight"), 1);
    assert.equal(nextTileIndex(1, "ArrowRight"), 1);
    assert.equal(nextTileIndex(1, "ArrowLeft"), 0);
    assert.equal(nextTileIndex(0, "ArrowLeft"), 0);
    assert.equal(nextTileIndex(0, "ArrowDown"), 2);
    assert.equal(nextTileIndex(2, "ArrowUp"), 0);
    assert.equal(nextTileIndex(0, "ArrowUp"), 0);
    assert.equal(nextTileIndex(3, "Enter"), 3);
});

test("isPatternPuzzleSolved is true only on the final matching round", () => {
    assert.equal(isPatternPuzzleSolved([0, 1, 2, 3, 0, 1], [0, 1, 2, 3, 0, 1], 6), true);
    assert.equal(isPatternPuzzleSolved([0, 1, 2], [0, 1, 2], 6), false);
    assert.equal(isPatternPuzzleSolved([0, 1, 2, 3, 0, 2], [0, 1, 2, 3, 0, 1], 6), false);
});
