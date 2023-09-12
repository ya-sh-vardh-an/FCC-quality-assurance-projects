const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
let id1 = '';
let id2 = '';

chai.use(chaiHttp);
const Browser = require('zombie');
Browser.site = '0.0.0.0:3000';
const browser = new Browser();

suite('Functional Tests', function() {
  this.timeout(5000);
  // suiteSetup((done) => {
  //   browser.visit('/', done());
  // })

  // suite('Headless browser', function () {
  //   test('should have a working "site" property', function() {
  //     assert.isNotNull(browser.site);
  //   });
  // });
  suite('Tests for POST Operations', function() {
    // Create an issue with every field: POST request to /api/issues/{project}
    test('Issue with every field', function (done) {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          assigned_to: 'Chai and Mocha', 
          status_text: 'In QA',
          issue_title: 'Functional Test',
          issue_text: 'Check with all fields filled up',
          created_by: 'Server',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          // console.log(res.body)
          assert.equal(res.body.issue_title, 'Functional Test');
          assert.equal(res.body.issue_text, 'Check with all fields filled up');
          assert.equal(res.body.assigned_to, 'Chai and Mocha');
          assert.equal(res.body.status_text, 'In QA');
          assert.equal(res.body.created_by, 'Server');
          assert.equal(res.body.project, 'test')
          id1 = res.body._id;
          // console.log(res.body.id)
          console.log('id 1 has beend set to ' + id1);
          done();
        })
    })
    // Create an issue with only required fields: POST request to /api/issues/{project}
    test('Issue with only required fields', function (done) {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Functional Test2',
          issue_text: 'With only required fields',
          created_by: 'Server',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Functional Test2');
          assert.equal(res.body.issue_text, 'With only required fields');
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text, '');
          assert.equal(res.body.created_by, 'Server');
          assert.equal(res.body.project, 'test')
          id2 = res.body._id;
          console.log('id 2 has beend set to ' + id2);
          done();
        })
    })
    // Create an issue with missing required fields: POST request to /api/issues/{project}
    test('Issue with missing required fields', function (done) {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Functional Test3',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          // console.log(res.body.error);
          assert.equal(res.body.error, 'required field(s) missing' );
          
          done();
        })
    })
  }) 
  suite('Test for GET Operation', function() {
    // View issues on a project: GET request to /api/issues/{project}
    test('View issues on a project', function (done) {
      chai
        .request(server)
        .get('/api/issues/test')
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        })
    })
    // View issues on a project with one filter: GET request to /api/issues/{project}
    test('View issues on a project with one filter', function (done) {
      chai
        .request(server)
        .get(`/api/issues/test?_id=${id1}`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(Object.keys(res.body).length, 1);
          done();
        })
    })
    // View issues on a project with multiple filters: GET request to /api/issues/{project}
    test('View issues on a project with multiple filters', function (done) {
      chai
        .request(server)
        .get(`/api/issues/test?created_by=Server&issue_title=Functional Test`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isAbove(Object.keys(res.body).length, 1);
          done();
        })
    })
  })


  suite('Tests for PUT Operation', function() {
    // Update one field on an issue: PUT request to /api/issues/{project}
    test('Update one field on an issue', function (done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id1,
          issue_text: 'Modified String',
          assigned_to: 'Wiena',
        })
        .end(function (err, res) {
          assert.equal(res.body.result, 'successfully updated');
          assert.equal(res.body._id, id1);
          done();
        })
    })
    // Update multiple fields on an issue: PUT request to /api/issues/{project}
    test('Update multiple fields on an issue', function (done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id2,
          issue_text: 'Modified Text',
          assigned_to: 'Roma',
          status_text: 'Done',
          open: false,
        })
        .end(function (err, res) {
          assert.equal(res.body.result, 'successfully updated');
          assert.equal(res.body._id, id2);
          done();
        })
    })
    // Update an issue with missing _id: PUT request to /api/issues/{project}
    test('Update an issue with missing _id', function (done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
        })
        .end(function (err, res) {
          assert.equal(res.body.error, 'missing _id')
          done();
        })
    })
    // Update an issue with no fields to update: PUT request to /api/issues/{project}
    test('Update an issue with no fields to update', function (done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id1
        })
        .end(function (err, res) {
          assert.equal(res.body.error, 'no update field(s) sent')
          done();
        })
    })
    // Update an issue with an invalid _id: PUT request to /api/issues/{project}
    test('Update an issue with an invalid _id', function (done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '64e8cf2307303d08ff224748',
          issue_text: 'new message',
        })
        .end(function (err, res) {
          assert.equal(res.body.error, 'could not update')
          assert.equal(res.body._id, '64e8cf2307303d08ff224748')
          done();
        })
    })
  })

  suite('Tests for DELETE Operation', function() {
    // Delete an issue: DELETE request to /api/issues/{project}
    test('Delete an issue', function (done) {
      chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: id1,
        })
        .end(function (err, res) {
          // console.log(res.body);
          assert.equal(res.body.result, 'successfully deleted');
          assert.equal(res.body._id, id1)
          done();
        })
    })
    // Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
    test('Delete an issue with an invalid _id', function (done) {
      chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: '64e8cf2307303d08ff224748',
        })
        .end(function (err, res) {
          assert.equal(res.body.error, 'could not delete')
          assert.equal(res.body._id, '64e8cf2307303d08ff224748')
          done();
        })
    })
    // Delete an issue with missing _id: DELETE request to /api/issues/{project}
    test('Delete an issue with missing _id', function (done) {
      chai.request(server)
        .delete('/api/issues/test')
        .send({
        })
        .end(function (err, res) {
          assert.equal(res.body.error, 'missing _id')
          done();
        })
    })
  })
});
