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

exports.createBorrowing = async (book, member) => {
  try {
    var newWaktu = Date.now()
    const borrowing = await db.Borrowing.create({
      BorrowedDate: newWaktu,
      DueDate: addDays(newWaktu, 7),
      Status: 'Borrowed'
    })

    const result = await db.Borrowing.updateOne(
      {
        _id: borrowing._id
      },
      {
        Book: book._id,
        Borrower: member._id
      }
    )
    return result
  } catch (err) {
    console.log(err)
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
