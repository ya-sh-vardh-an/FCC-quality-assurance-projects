const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    suite('Test POST Operation on /api/translate', function () {
        
        // Translation with text and locale fields: POST request to /api/translate
        test('Translation with text and locale fields', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    "text": "Paracetamol takes up to an hour to work.",
                    "locale": "british-to-american"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.translation, '<span class="highlight">Tylenol</span> takes up to an hour to work.');
                    done();
                })
        })
        // Translation with text and invalid locale field: POST request to /api/translate
        test('Translation with text and invalid locale field', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    "text": "Paracetamol takes up to an hour to work.",
                    "locale": "voookdoo-to-asss"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid value for locale field');
                    done();
                })
        })
        // Translation with missing text field: POST request to /api/translate
        test('Translation with missing text field', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    "locale": "british-to-american"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                })
        })
        // Translation with missing locale field: POST request to /api/translate
        test('Translation with missing locale field', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    "text": "Paracetamol takes up to an hour to work.",
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                })
        })
        // Translation with empty text: POST request to /api/translate
        test('Translation with empty text', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    "text": "",
                    "locale": "british-to-american"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'No text to translate');
                    done();
                })
        })
        // Translation with text that needs no translation: POST request to /api/translate
        test('Translation with text that needs no translation', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    "text": "Paracetamol takes up to an hour to work.",
                    "locale": "american-to-british"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.translation, 'Everything looks good to me!');
                    done();
                })
        })
    })

});
