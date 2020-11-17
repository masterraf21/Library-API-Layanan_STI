require('dotenv').config()
const dbUrl = process.env.MONGO_URL
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
var connection = mongoose.createConnection(dbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
autoIncrement.initialize(connection)
const db = require('../models')

function addDays (date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

exports.createBorrowing = async (bookId, memberId) => {
  try {
    const book = await db.Book.findOne({
      Book_id: bookId
    })
    const member = await db.Member.findOne({
      Member_id: memberId
    })
    if (book === null || member === null) {
      throw new Error('Book or Member not exist')
    } else {
      var newWaktu = Date.now()
      const borrowing = await db.Borrowing.create({
        Book: book._id,
        Borrower: member._id,
        BorrowedDate: newWaktu,
        DueDate: addDays(newWaktu, 7),
        Status: 'Borrowed'
      })
      return borrowing
    }
  } catch (err) {
    throw Error(err)
  }
}

exports.returnBorrowing = async borrowing => {
  try {
    const result = await db.Borrowing.updateOne(
      {
        _id: borrowing._id
      },
      {
        ReturnDate: Date.now(),
        Status: 'Returned'
      }
    )

    return result
  } catch (err) {
    console.log(err)
  }
}
