const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const bookSchema = new mongoose.Schema({
  Book_id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  ISBN: {
    type: String,
    unique: true,
    required: true
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
  Borrowed: {
    type: Boolean,
    default: false
  },
  CurrentlyBorrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  BorrowingHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Borrowing'
    }
  ]
})

bookSchema.plugin(autoIncrement.plugin, {
  model: 'Book',
  field: 'Book_id'
})

// bookSchema.methods.

const Book = mongoose.model('Book', bookSchema, 'Books')

module.exports = Book
