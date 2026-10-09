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
        helpText: "Arrange pieces to match the target shape. When in challenge mode, double click pieces" +
        " to rotate.",
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
        "submit button at the bottom of the puzzle. Incorrect answers will be highlighted in the darker color.",
    },
    {
        name: "Maze Puzzle",
        start: startMazePuzzle,
        helpText: "Navigate through the maze to reach the exit",
    },
    {
        name: "Sliding Puzzle",
        start: startSlidingPuzzle,
        helpText: "Slide pieces to form the correct picture. You can move pieces by clicking on" +
         " them or using the arrow keys. The empty space is represented by a blank tile.",
    },
    {
        name: "Tube Puzzle",
        start: startTubePuzzle,
        helpText: "Click pipes to rotate them until a path links the meteor to the spacecraft. Filled diamonds are joined; hollow circles are still open. Use the on-screen arrows or keyboard arrow keys to move between pipes. Color-blind mode is in Settings.",
    },
    {
       name: "Pattern Puzzle",
       start: startPatternPuzzle,
       helpText: "Watch the flashing tiles, then click them in the same order. Each round is longer. Replay Pattern shows the sequence again. Tiles: circle 1, square 2, triangle 3, star 4. Keyboard: 1–4 to press a tile, arrows to move, Enter or Space to press, R to replay.",
   }
];