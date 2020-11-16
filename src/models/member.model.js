const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const memberSchema = mongoose.Schema({
  Member_id: {
    type: Number,
    required: true
  },
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

memberSchema.plugin(autoIncrement.plugin, {
  model: 'Member',
  field: 'Member_id'
})

const Member = mongoose.model('Member', memberSchema, 'Members')

module.exports = Member
