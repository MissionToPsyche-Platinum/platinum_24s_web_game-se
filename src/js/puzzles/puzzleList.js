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
    },
    {
        name: "Maze Puzzle",
        start: startMazePuzzle,
    },
    {
        name: "Sliding Puzzle",
        start: startSlidingPuzzle,
    },
    {
        name: "Tube Puzzle",
        start: startTubePuzzle,
    }
];