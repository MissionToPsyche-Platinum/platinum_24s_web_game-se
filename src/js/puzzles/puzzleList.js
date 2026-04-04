import { startTangramPuzzle } from "./tangramPuzzle.js";
import { startMatchingPuzzle } from "./matchingPuzzle.js";
import { startNumberLogicPuzzle } from "./numberLogicPuzzle.js";
import { startMazePuzzle } from "./mazePuzzle.js";
import { startSlidingPuzzle } from "./slidingPuzzle.js";
import { startTubePuzzle } from "./tubePuzzle.js";

export const puzzles = [
    {
        name: "Tangram Puzzle",
        start: startTangramPuzzle,
        helpText: "Arrange pieces to match the target shape",
    },
    {
        name: "Matching Puzzle",
        start: startMatchingPuzzle,
        helpText: "Find and match pairs of similar items",
    },
    {
        name: "Number Logic Puzzle",
        start: startNumberLogicPuzzle,
        helpText: "Use logic to solve the puzzle with numbers",
    },
    {
        name: "Maze Puzzle",
        start: startMazePuzzle,
        helpText: "Navigate through the maze to reach the exit",
    },
    {
        name: "Sliding Puzzle",
        start: startSlidingPuzzle,
        helpText: "Slide pieces to form the correct picture",
    },
    {
        name: "Tube Puzzle",
        start: startTubePuzzle,
        helpText: "Turn the tubes to make the water flow!",
    }
];