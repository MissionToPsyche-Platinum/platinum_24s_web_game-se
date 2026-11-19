//Fills the sudoku puzzle with random numbers (Checked by isValid)
export function fillSudokuPuzzle(board) {
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

//Shuffles the numbers for each run
export function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

//Determines if the board is valid (Numbers are generated correctly)
export function isValid(board, row, col, num) {
    //Rows
    for(let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
    }
    //Columns
    for(let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if (board[boxRow + i][boxCol + j] === num) return false;
        }
    }
    return true;
}