'use strict';

const Translator = require('../components/translator.js');
const translator = new Translator();
module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // console.log(req.body, req.body.text, req.body.locale)
      if (req.body.text == undefined || req.body.locale == undefined) {
        return res.json({ error: 'Required field(s) missing' })
      }
      const newString = translator.translate(req.body.text, req.body.locale);
      return res.json(newString);
    });
};
