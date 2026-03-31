import { startTangramPuzzle } from "./tangramPuzzle.js";
import { startMatchingPuzzle } from "./matchingPuzzle.js";
import { startNumberLogicPuzzle } from "./numberLogicPuzzle.js";

export const puzzles = [
    {
        name: "Tangram Puzzle",
        start: startTangramPuzzle,
    },
    {
        name: "Matching Puzzle",
        start: startMatchingPuzzle,
    },
    {
        name: "Number Logic Puzzle",
        start: startNumberLogicPuzzle,
    }
];