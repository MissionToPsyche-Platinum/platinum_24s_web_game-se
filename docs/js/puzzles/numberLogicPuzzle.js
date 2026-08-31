import { solvePuzzle } from "../gameController.js";
import { puzzleNotSolvedMessage } from "../gameController.js";
import { puzzleSolvedMessage } from "../gameController.js";
//9 x 9 sudoku puzzle implementation
export function startNumberLogicPuzzle({ containerID }) {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillSudokuPuzzle(board);
    let checkBoard = board.map(row => [...row]);
    const settings = typeof window !== "undefined" ? window.getPyscheSettings?.() : undefined;
    const isChallenge = settings?.difficulty === "challenge";
    //Added difficulty functionality for futher implementation
    const difficulty = {
        EASY: 10,
        CHALLENGING: 20,
    }
    containerID.innerHTML = `
        <div class = "number-logic-container" id = "numberLogicContainer">
            <header>
                <h3 id = "number-logic-header">Number Logic Puzzle</h3>
            </header>
            <div class = "logic-grid" id = "logicGrid">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
                <input type = "number" min = "1" max = "9">
            </div>
            <button id = "submit">Submit</button>
        </div>
    `;
    if(isChallenge) {
        removeCells(board, difficulty.CHALLENGING);
    } else {
        removeCells(board, difficulty.EASY);
    }
    renderSudokuUI(board);
    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function() {
        let checked = checkWin(checkBoard);
        if(checked === true) {
            solvePuzzle();
        } else {
            highlightIncorrectCells(checkBoard);
            incorrectSolvePuzzle();
        }
    });

    //Fills the sudoku puzzle with random numbers (Checked by isValid)
    function fillSudokuPuzzle(board) {
        for(let row = 0; row < 9; row++) {
            for(let col = 0; col < 9; col++) {
                if(board[row][col] === 0) {
                    const numbers = shuffle([1,2,3,4,5,6,7,8,9]);
                    for(let num of numbers) {
                        if(isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if(fillSudokuPuzzle(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    //Renders the numbers to the screen
    function renderSudokuUI(board) {
        const inputs = document.querySelectorAll(".logic-grid input");
        inputs.forEach((input, i) => {
            const row = Math.floor(i / 9);
            const column = i % 9;
            const value = board[row][column];
            if (value !== 0) {
                input.value = value;
                input.disabled = true;
            } else {
                input.value = "";
            }
        });
    }

    //Determines if the board is valid (Numbers are generated correctly)
    function isValid(board, row, col, num) {
        //Rows
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
        }
        //Columns
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }

        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }
        return true;
    }

    //Shuffles the numbers for each run
    function shuffle(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }

    //Removes numbers for player input
    function removeCells(board, difficulty) {
        let count = difficulty;
        while (count > 0) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            if (board[row][col] !== 0) {
                board[row][col] = 0;
                count--;
            }
        }
    }

    //Gets current board state in order to detect win
    function getCurrentBoard() {
        const inputs = document.querySelectorAll(".logic-grid input");
        let current = [];
        for (let i = 0; i < 9; i++) {
            current[i] = [];
            for (let j = 0; j < 9; j++) {
                const val = inputs[i * 9 + j].value;
                current[i][j] = val ? parseInt(val) : 0;
            }
        }
        return current;
    }

    function checkWin(checkBoard) {
        const current = getCurrentBoard();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (current[i][j] !== checkBoard[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    //Highlights incorrect answers for user
    function highlightIncorrectCells(checkBoard) {
        const userInputs = document.querySelectorAll(".logic-grid input");
        userInputs.forEach((input, i) => {
            if (input.disabled) {
                return;
            }
            const row = Math.floor(i / 9);
            const col = i % 9;
            const userAnswer = parseInt(input.value);;
            const correctAnswer = checkBoard[row][col];
            input.classList.remove("incorrect");
            if (userAnswer !== correctAnswer) {
                input.classList.add("incorrect");
            }
        });
    }

    function incorrectSolvePuzzle() {
        puzzleNotSolvedMessage.style.display = 'block';
        puzzleSolvedMessage.style.display = 'none';
    }
}