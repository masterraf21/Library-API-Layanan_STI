const mongoose = require('mongoose')

const borrowingSchema = mongoose.Schema({
  Book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  Borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  BorrowedDate: {
    type: Date,
    required: true
  },
  DueDate: {
    type: Date,
    required: true
  },
  ReturnDate: {
    type: Date
  },
  Late: {
    type: Boolean,
    required: true,
    default: false
  },
  Status: {
    type: String,
    enum: ['Borrowed', 'Returned'],
    required: true
  }
})

const Borrowing = mongoose.model('Borrowing', borrowingSchema, 'Borrowings')

module.exports = Borrowing
