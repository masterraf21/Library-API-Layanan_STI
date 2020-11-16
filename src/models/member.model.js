const mongoose = require('mongoose')

const memberSchema = mongoose.Schema({
  _id: Number,
  Name: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  CurrentlyBorrowing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ],
  // Only added when book is returned
  BorrowingHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    }
  ]
})

const Member = mongoose.model('Member', memberSchema, 'Members')

module.exports = Member
