const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  
  suite("Test for api/solve", function () {
    // Solve a puzzle with valid puzzle string: POST request to /api/solve
    test("Solve a puzzle with valid string", function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
          done();
        });
    });
    // Solve a puzzle with missing puzzle string: POST request to /api/solve
    test("Solve a puzzle with missing string", function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: ""
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.error, "Required field missing");
          done();
        });
    });
    // Solve a puzzle with invalid characters: POST request to /api/solve
    test("Solve a puzzle with invalid characters string", function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.370",
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });
    // Solve a puzzle with incorrect length: POST request to /api/solve
    test("Solve a puzzle with incorrect length", function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37....",
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
          done();
        });
    });
    // Solve a puzzle that cannot be solved: POST request to /api/solve
    test("Solve a puzzle that cannot be solved", function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: "..9..5.1.85.4....2432.1....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          // console.log(res.body)
          assert.equal(res.body.error, "Puzzle cannot be solved");
          done();
        });
    });

  })

  suite("Test for api/check", function () {
    // Check a puzzle placement with all fields: POST request to /api/check
    test("Check a puzzle placement with all fields", function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "i9",
          value: 4
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          // console.log(res.body)
          assert.isFalse(res.body.valid, "The insertion should be false");
          assert.isArray(res.body.conflict, "The conflict should be an array");
          assert.equal(res.body.conflict.length, 3);
          done();
        });
    });
    // Check a puzzle placement with single placement conflict: POST request to /api/check
    test("Check a puzzle placement with single placement conflict", function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "i9",
          value: 2
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          // console.log(res.body)
          assert.isFalse(res.body.valid, "The insertion should be false");
          assert.isArray(res.body.conflict, "The conflict should be an array");
          assert.equal(res.body.conflict.length, 1);
          assert.equal(res.body.conflict[0], "column");
          done();
        });
    });
    // Check a puzzle placement with multiple placement conflicts: POST request to /api/check
    test("Check a puzzle placement with multiple placement conflict", function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "i6",
          value: 3
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          // console.log(res.body)
          assert.isFalse(res.body.valid, "The insertion should be false");
          assert.isArray(res.body.conflict, "The conflict should be an array");
          assert.equal(res.body.conflict.length, 2);
          done();
        });
    });
    // Check a puzzle placement with all placement conflicts: POST request to /api/check
    test("Check a puzzle placement with all placement conflicts", function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "i9",
          value: 3
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          // console.log(res.body)
          assert.isFalse(res.body.valid, "The insertion should be false");
          assert.isArray(res.body.conflict, "The conflict should be an array");
          assert.equal(res.body.conflict.length, 3);
          done();
        });
    });
    // Check a puzzle placement with missing required fields: POST request to /api/check
    test("Check a puzzle placement with missing required fields", function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "",
          value: 3
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          // console.log(res.body)
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });
    // Check a puzzle placement with invalid characters: POST request to /api/check
    test("Check a puzzle placement with invalid characters", function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..60.",
          coordinate: "i4",
          value: 3
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          // console.log(res.body)
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });
    // Check a puzzle placement with incorrect length: POST request to /api/check
    test("Check a puzzle placement with incorrect length", function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...",
          coordinate: "i6",
          value: 3
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          // console.log(res.body)
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
          done();
        });
    });
    // Check a puzzle placement with invalid placement coordinate: POST request to /api/check
    test("Check a puzzle placement with invalid placement coordinate", function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "90",
          value: 3
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          // console.log(res.body)
          assert.equal(res.body.error, "Invalid coordinate");
          done();
        });
    });
    // Check a puzzle placement with invalid placement value: POST request to /api/check
    test("Check a puzzle placement with invalid placement value", function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "i6",
          value: "a"
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          // console.log(res.body)
          assert.equal(res.body.error, "Invalid value");
          done();
        });
    });

  })

});

