class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return { "error": "Expected puzzle to be 81 characters long" }
    }
    const regX = /[^1-9.]/
    if (puzzleString.match(regX)) {
      return { "error": "Invalid characters in puzzle" }
    }

    return null;
  }

  checkRowPlacement(puzzleString, row, column, value) {

    for (let curCol=0; curCol<9; curCol++) {
      if (curCol !== column) {
        const idx = (row*9)+curCol; 
        if (puzzleString[idx] == value) {
          return false;
        }
      }
    }
    return true;
  }
  
  checkColPlacement(puzzleString, row, column, value) {
    
    for (let curRow=0; curRow<9; curRow++) {
      if (curRow !== row) {
        const idx = (curRow*9)+column;
        if (puzzleString[idx] == value) {
          return false;
        }
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    // console.log(startRow, startCol);
    for (let curRow=startRow; curRow < startRow+3; curRow++) {
      for (let curCol=startCol; curCol < startCol+3; curCol++) {
        if (curRow !== row || curCol !== column) {
          const idx = (curRow*9)+curCol;
          if (puzzleString[idx] == value) {
            return false;
          }
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    // it will add the digits in sudoku based on if they are valid or not 
    const check = this.validate(puzzleString)
    if (check != null) {
      return check;
    }
    function changeCharAt(str, idx, newchar) {
      if (idx < 0 || idx >= str.length) {
        return str;
      }
      return str.substring(0, idx) + newchar + str.substring(idx + 1);
    }
    const backtrack = (puzzle) => {
      for (let idx=0; idx<puzzle.length; idx++) {
        if (puzzle[idx] == '.') {
          const row = Math.floor(idx / 9);
          const column = idx % 9;
          for (let num=1; num<=9; num++) {
            if (this.checkColPlacement(puzzle, row, column, num) && this.checkRowPlacement(puzzle, row, column, num) && this.checkRegionPlacement(puzzle, row, column, num)) {
              const newpuzzle = changeCharAt(puzzle, idx, String(num));
              const solvedPuzzle = backtrack(newpuzzle)
              if (solvedPuzzle) {
                return solvedPuzzle;
              }
    
            }
          }
          return null;
        }
      }
      return puzzle;
    }
    const solvedPuzzle = backtrack(puzzleString)
    if (solvedPuzzle) {
      return { "solution": solvedPuzzle};
    } else {
      return { "error": "Puzzle cannot be solved"};
    }
  }
}

module.exports = SudokuSolver;

