'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const solver = new SudokuSolver();

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      if (!puzzle) {
        return res.json({ "error": "Required field(s) missing" })
      }
      const check = solver.validate(puzzle);
      if (check != null) {
        return res.json(check);
      } else if (!coordinate || !value) {
        return  res.json({ "error": "Required field(s) missing" })
      }
      const cordRegex = /^[A-I][1-9]$/i
      const valueRegex = /^[1-9]$/
      // console.log(cordRegex.test(coordinate))
      if (!cordRegex.test(coordinate)) {
        return res.json({ "error": "Invalid coordinate" })
      } else if (!valueRegex.test(value)) {
        return res.json({ "error": "Invalid value" })
      }

      const result = { "valid": false, "conflict": [] }
      const [ letter, num ] = coordinate.split("")
      const codeOfA = "a".charCodeAt(0)
      const row = letter.toLowerCase().charCodeAt(0) - codeOfA;
      const column = num - 1;

      // console.log(row, column);
      const conflict = [];
      if (!solver.checkRowPlacement(puzzle, row, column, value)) {
        conflict.push("row")
      }
      if (!solver.checkColPlacement(puzzle, row, column, value)) {
        conflict.push("column");
      }
      if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
        conflict.push("region");
      }
      // console.log(conflict)
      if (conflict.length === 0) {
        // console.log("hellow")
        return res.json({ "valid": true });
      } else {
        return res.json({ "valid": false, conflict })
      }
      // console.log(req.body)
      // { "valid": false, "conflict": [ "row", "column", "region" ] }
      // { "error": "Required field(s) missing" }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      // console.log(req.body);
      const puzzleString = req.body.puzzle;
      if (!puzzleString) {
        return res.json({ "error": "Required field missing" })
      }
      const result = solver.solve(puzzleString);
      // console.log(result, puzzleString.length);
      return res.json(result);
    });
};
