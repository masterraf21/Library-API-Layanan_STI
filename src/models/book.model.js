const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  _id: Number,
  ISBN: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  Title: {
    type: String,
    required: true
  },
  Author: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  Publisher: {
    type: String,
    required: true
  },
  CurrentStock: {
    type: Number,
    required: true
  },
  CurrentlyBorrowedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    }
  ],
  BorrowingHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    }
  ]
})

// bookSchema.methods.

const Book = mongoose.model('Book', bookSchema, 'Books')

module.exports = Book
