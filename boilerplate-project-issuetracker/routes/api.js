'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = function (app) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  const IssueSchema = new Schema({
    assigned_to: String,
    status_text: String,
    open: { type: Boolean, default: true },
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_on: { type: Date, required: true },
    updated_on: { type: Date, required: true },
    created_by: { type: String, required: true },
    project: String,
  })
  const Issue = mongoose.model('Issue', IssueSchema);
  app.route('/api/issues/:project')
  
    .get(async function (req, res){
      let project = req.params.project;
      const filterObj = Object.assign(req.query);
      filterObj['project'] = project
      const issues = await Issue.find(filterObj).exec();
      return res.json(issues);
    })
    
    .post(async function (req, res){
      let project = req.params.project;
      // const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body
      if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
        return res.json({ error: 'required field(s) missing' })
      }
      // console.log(issue_title, issue_text, created_by, assigned_to, status_text);
      const issueobj = new Issue({
        assigned_to: req.body.assigned_to || '', 
        status_text: req.body.status_text || '',
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        open: true,
        created_on: new Date().toUTCString(),
        updated_on: new Date().toUTCString(),
        project
      })
      try {
        const issue = await issueobj.save()
        return res.json(issue);
      } catch (err) {
        console.error(err);
        return res.json({ error: 'required field(s) missing' });
      }
    })
    
    .put(async function (req, res){
      let project = req.params.project;
      const { _id } = req.body;
      // console.log(_id)
      
      if (_id == undefined) {
        return res.json({ error: 'missing _id' })
      }
      const objectId = new mongoose.Types.ObjectId(_id);

      let updateObj = {}
      Object.keys(req.body).forEach((k) => {
        if (req.body[k] !== '' && k !== '_id') {
          updateObj[k] = req.body[k];
        }
      });

      // console.log(updateObj)
      if (Object.keys(updateObj).length < 1) {
        return res.json({ error: 'no update field(s) sent', '_id': _id })
      }

      updateObj['updated_on'] = new Date();
      const newIssue = await Issue.findByIdAndUpdate(_id, updateObj, { new: true });
      // console.log(newIssue);
      if (!newIssue) {
        return res.json({ error: 'could not update', '_id': _id })
      } else {
        // console.log("new Object", newIssue);
        // console.log("updates", updateObj);
        return res.json({ result: 'successfully updated', '_id': newIssue._id })
      }
    })
    
    .delete(async function (req, res){
      let project = req.params.project;
      const { _id } = req.body;
      if ( _id == undefined) {
        return res.json({ error: 'missing _id' })
      }
      const result = await Issue.findByIdAndDelete(_id).exec();
      if (result) {       
        return res.json({ result: 'successfully deleted', '_id': _id })
      } else {
        return res.json({ error: 'could not delete', '_id': _id })
      }
      
    });
    
};
