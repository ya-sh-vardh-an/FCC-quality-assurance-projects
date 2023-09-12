/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = function (app) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  const BookSchema = new Schema({
    title: { type: String, required: true },
    comments: { type: Array, default: [] },
    commentcount: { type: Number, default: 0 },
  })

  const Book = mongoose.model('Book', BookSchema);
  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const books = await Book.find({}).exec()
      return res.json(books);
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if (!title) {
        return res.json('missing required field title');
      }
      const bookobj = new Book({ title: title });
      const newBook = await bookobj.save();
      if (newBook == bookobj) {
        return res.json({ _id: newBook._id, title: newBook.title });
      } else {
        return res.json('missing required field title');
      }
      //response will contain new book object including atleast _id and title
    })
    
    .delete(async function(req, res){
      const result = await Book.deleteMany({});
      if (result) {
        res.json("complete delete successful");
      }
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      const book = await Book.findById(bookid).exec();

      if (book) {
        return res.json(book);
      } else {
        return res.json("no book exists");
      }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!bookid) {
        return res.json("missing required field id");
      } else if (!comment) {
        return res.json("missing required field comment")
      }
      // const book = await Book.findById(bookid).exec();
      // if (!book) {
      //   return res.json()
      // }
      const result = await Book.findByIdAndUpdate(bookid, { 
        $push: { comments: comment },
        $inc: { commentcount: 1 },
      }, { new: true });
      // console.log(result);
      if (result) {
        return res.json(result);
      } else {
        return res.json("no book exists")
      }
      //json res format same as .get
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      if (!bookid) {
        return res.json("no book exists");
      } 
      const result = await Book.findByIdAndDelete(bookid).exec();
      if (result) {
        return res.json("delete successful");
      } else {
        return res.json("no book exists");
      }
      //if successful response will be 'delete successful'
    });
  
};
