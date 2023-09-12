/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let id1 = '';
let id2 = '';

suite('Functional Tests', function() {
  this.timeout(5000);
  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        // console.log(res.body)
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title1', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: 'Test Title1',
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, 'Test Title1');
            id1 = res.body._id;
            console.log('The id of 1 document is ' + id1)
            done();
          })
      });
      test('Test POST /api/books with title2', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: 'Test Title2',
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, 'Test Title2');
            id2 = res.body._id;
            console.log('The id of 2 document is ' + id2)
            done();
          })
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            // console.log(res.body)
            assert.equal(res.body, 'missing required field title');
            done();
          })
      });
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body, "The response should be an array of the all the books present")
            done();
          })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get('/api/books/64e988326cb8e3091a13cc25')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "no book exists");
            done();
          })
        //done();
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get(`/api/books/${id1}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body._id, id1);
            assert.equal(res.body.title, "Test Title1");
            done();
          })
        //done();
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post(`/api/books/${id1}`)
          .send({
            comment: "This is a comment"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body._id, id1);
            assert.isArray(res.body.comments, "This property should be an array.");
            done();
          })
        //done();
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post(`/api/books/${id1}`)
          .send({
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "missing required field comment");
            done();
          })
        //done();
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
          .post('/api/books/64e988326cb8e3091a13cc25')
          .send({
            comment: "This is a comment"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "no book exists");
            done();
          })
        //done();
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .delete(`/api/books/${id1}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "delete successful");
            done();
          })
        //done();
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
          .delete('/api/books/64e988326cb8e3091a13cc25')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "no book exists");
            done();
          })
        //done();
      });
    });
  });
});
