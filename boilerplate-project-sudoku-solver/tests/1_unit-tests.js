const chai = require('chai');
const assert = chai.assert;
import { puzzlesAndSolutions } from '../controllers/puzzle-strings.js';
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();


suite('Unit Tests', () => {
  suite('Test for the Sudoku logic with valid String', function () {
    // Logic handles a valid puzzle string of 81 characters
    test('Logic test 1', function () {
      const result = solver.solve(puzzlesAndSolutions[0][0]);
      // console.log(result);
      assert.equal(puzzlesAndSolutions[0][1], result.solution);
    });
    test('Logic test 2', function () {
      const result = solver.solve(puzzlesAndSolutions[1][0]);
      // console.log(result);
      assert.equal(puzzlesAndSolutions[1][1], result.solution);
    });
    test('Logic test 3', function () {
      const result = solver.solve(puzzlesAndSolutions[2][0]);
      // console.log(result);
      assert.equal(puzzlesAndSolutions[2][1], result.solution);
    });
    // Solver returns the expected solution for an incomplete puzzle
    test('Logic test 4', function () {
      const result = solver.solve(puzzlesAndSolutions[3][0]);
      // console.log(result);
      assert.equal(puzzlesAndSolutions[3][1], result.solution);
    });
  });
  suite('Logic Handle Test', function () {
    
    // Logic handles a puzzle string with invalid characters (not 1-9 or .)
    test('Logic test with invalid characters', function () {
      const puzzleString = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492.0.1';
      const result = solver.solve(puzzleString);
      // console.log(result);
      assert.equal(result.error, 'Invalid characters in puzzle');
    });
    // Logic handles a puzzle string that is not 81 characters in length
    test('Logic test with not 81 characters', function () {
      const puzzleString = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1.';
      const result = solver.solve(puzzleString);
      // console.log(result);
      assert.equal(result.error, 'Expected puzzle to be 81 characters long');
    });
    // Logic handles a valid row placement
    test('Logic test with valid row placement', function () {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const result = solver.checkRowPlacement(puzzleString, 8, 5, 1);
      // console.log(result);
      assert.isTrue(result, 'The result should be true for the row placement');
    });
    // Logic handles an invalid row placement
    test('Logic test with invalid row placement', function () {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const result = solver.checkRowPlacement(puzzleString, 8, 5, 6);
      // console.log(result);
      assert.isNotTrue(result, 'The result should not be true for the row placement');
    });
    // Logic handles a valid column placement
    test('Logic test with valid column placement', function () {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const result = solver.checkColPlacement(puzzleString, 4, 2, 7);
      // console.log(result);
      assert.isTrue(result, 'The result should be true for the column placement');
    });
    // Logic handles an invalid column placement
    test('Logic test with invalid column placement', function () {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const result = solver.checkColPlacement(puzzleString, 4, 2, 9);
      // console.log(result);
      assert.isNotTrue(result, 'The result should not be true for the column placement');
    });
    // Logic handles a valid region (3x3 grid) placement
    test('Logic test with valid region (3x3 grid) placement', function () {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const result = solver.checkRegionPlacement(puzzleString, 4, 2, 3);
      // console.log(result);
      assert.isTrue(result, 'The result should be true for the region (3x3) placement');
    });
    // Logic handles an invalid region (3x3 grid) placement
    test('Logic test with invalid region (3x3 grid) placement', function () {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const result = solver.checkRegionPlacement(puzzleString, 4, 2, 1);
      // console.log(result);
      assert.isNotTrue(result, 'The result should not be true for the region (3x3) placement');
    });
    // Valid puzzle strings pass the solver
    test('Valid puzzle strings pass the solver', function () {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const result = solver.validate(puzzleString);
      // console.log(result);
      assert.isNull(result, 'The result should be null');
    });
    // Invalid puzzle strings fail the solver
    test('Invalid puzzle strings fail the solver', function () {
      const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6';
      const result = solver.validate(puzzleString);
      // console.log(result);
      assert.isNotNull(result, 'The result should not be null');
    });
  });
});
