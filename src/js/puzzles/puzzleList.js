import { startTangramPuzzle } from "./tangramPuzzle.js";
import { startMatchingPuzzle } from "./matchingPuzzle.js";
import { startNumberLogicPuzzle } from "./numberLogicPuzzle.js";
import { startMazePuzzle } from "./mazePuzzle.js";
import { startSlidingPuzzle } from "./slidingPuzzle.js";
import { startTubePuzzle } from "./tubePuzzle.js";
import { startPatternPuzzle } from "./patternPuzzle.js";

export const puzzles = [
    {
        name: "Tangram Puzzle",
        start: startTangramPuzzle,
        helpText: "Arrange pieces to match the target shape. Double click pieces to rotate.",
    },
    {
        name: "Matching Puzzle",
        start: startMatchingPuzzle,
        helpText: "Find and match pairs of similar items",
    },
    {
        name: "Number Logic Puzzle",
        start: startNumberLogicPuzzle,
        helpText: "Use logic to solve the sudoku puzzle with numbers. Each column, row, and grid can " +
        "have exactly 1 of each number 1 through 9. When you think you have the answer, press the " +
        "submit button at the bottom of the puzzle. Incorrect answers will be highlighted in red.",
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
    },
    {
       name: "Pattern Puzzle",
       start: startPatternPuzzle,
       helpText: "Watch the color sequence and repeat it from memory.",
   }
];