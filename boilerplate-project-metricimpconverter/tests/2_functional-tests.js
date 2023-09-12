const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  // Convert a valid input such as 10L: GET request to /api/convert.
  suite('Integration tests with chai-http', function() {
    test('convert a valid input', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=10L')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual({"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}, res.body)
          done();
        })
    })
    // Convert an invalid input such as 32g: GET request to /api/convert.
    test('convert an invalid input', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=32g')
        .end((err, res) => {
          assert.equal(res.status, 200);
          // console.log(res)
          assert.strictEqual("invalid unit", res.text)
          done();
        })
    })
    // Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
    test('convert an invalid number', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kg')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.strictEqual("invalid number", res.text)
          done()
        })
    })
    // Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
    test('convert an invalid number and unit', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.strictEqual("invalid number and unit", res.text)
          done()
        })
    })
    // Convert with no number such as kg: GET request to /api/convert.
    test('convert with no number', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=kg')
        .end((err, res) => {
          assert.equal(res.status, 200);
          // console.log(res.text)
          assert.deepEqual({"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}, res.body)
          done();
        })
    })
  })
});
