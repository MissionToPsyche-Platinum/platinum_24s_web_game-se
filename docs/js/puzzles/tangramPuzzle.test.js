import test from "node:test";
import assert from "node:assert/strict";

import {checkPosition , calculateCetner} from "./tangramPuzzleModel.js";

test("calculateCenter", () => {
    const center = calculateCetner(
        "400,300 400,400 500,400 500,300"
    );

    assert.equal(center.cx, 450);
    assert.equal(center.cy, 350);
});

test("calculate triangle center", () => {
     const center = calculateCetner("0,0 6,0 3,6");

    assert.equal(center.cx, 3);
    assert.equal(center.cy, 2);
});

test("checkPosition", () => {
    const piece = {
        id: "piece1",
        type: "triangle",
        x: 100,
        y: 100,
        rotation: 0,
        points: "0,0 2,0 1,1"
    };

    const solution = [
        {
            type: "triangle",
            occupied: false,
            possiblePlacements: {
                piece1: { x: 100, y: 100, rotation: 0 }
            }
        }
    ];

    const isPositionValid = checkPosition(piece, solution);
    assert.equal(isPositionValid, true);
});

test("checkPosition returns false for invalid position", () => {
    const piece = {
        id: "piece2",
        type: "triangle",
        x: 100,
        y: 100,
        rotation: 0
    };

    const solution = [
        {
            type: "triangle",
            occupied: false,
            possiblePlacements: {
                piece1: { x: 100, y: 100, rotation: 0 }
            }
        }
    ];

    assert.equal(checkPosition(piece, solution), false);
});