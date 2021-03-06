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

const createBorrowing = async (bookId, memberId) => {
  try {
    const book = await db.Book.findOne({
      Book_id: bookId
    })
    if (book === null) {
      throw new Error('Book not exist')
    }
    if (book.Borrowed) {
      throw new Error('Book already borrowed')
    }
    const member = await db.Member.findOne({
      Member_id: memberId
    })
    if (book === null || member === null) {
      throw new Error('Book or Member not exist')
    } else {
      var newWaktu = Date.now()
      await db.Book.findByIdAndUpdate(book._id, {
        Borrowed: true,
        CurrentlyBorrowedBy: member._id
      })
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

const checkLate = (dueDate, nowDate) => {
  var due = new Date(dueDate)
  var now = new Date(nowDate)
  var differenceInTime = now.getTime() - due.getTime()
  var differenceInDays = differenceInTime / (1000 * 3600 * 24)
  return differenceInDays > 7
}

const countLate = (dueDate, nowDate) => {
  var due = new Date(dueDate)
  var now = new Date(nowDate)
  var differenceInTime = now.getTime() - due.getTime()
  var differenceInDays = differenceInTime / (1000 * 3600 * 24)
  return differenceInDays
}
const returnBorrowing = async (bookId, memberId) => {
  try {
    const book = await db.Book.findOne({
      Book_id: bookId
    })
    if (book === null) {
      throw new Error('Book not found')
    }
    if (!book.Borrowed) {
      throw new Error('Book is not borrowed')
    }
    const member = await db.Member.findOne({
      Member_id: memberId
    })
    if (member === null) {
      throw new Error('Member not found')
    }
    const borrowing = await db.Borrowing.findOne({
      Book: book._id,
      Borrower: member._id
    })
    if (borrowing === null) {
      throw new Error('Borrowing not found')
    }

    await db.Book.findByIdAndUpdate(book._id, {
      Borrowed: false,
      CurrentlyBorrowedBy: undefined,
      $push: {
        BorrowingHistory: borrowing._id
      }
    })
    await db.Member.findByIdAndUpdate(member._id, {
      $push: {
        BorrowingHistory: borrowing._id
      }
    })

    var lateCount = null
    if (borrowing.Late) {
      lateCount = countLate(borrowing.DueDate, Date.now())
    } else {
      if (checkLate(borrowing.DueDate, Date.now())) {
        borrowing.Late = true
        lateCount = countLate(borrowing.DueDate, Date.now())
      }
    }
    const result = await db.Borrowing.updateOne(
      {
        _id: borrowing._id
      },
      {
        Status: 'Returned',
        ReturnDate: Date.now()
      }
    )
    var ret = {
      result: result,
      late: borrowing.Late,
      lateDays: lateCount
    }
    return ret
  } catch (err) {
    throw Error(err)
  }
}

const extendBorrowing = async (bookId, memberId) => {
  try {
    const book = await db.Book.findOne({
      Book_id: bookId
    })
    if (book === null) {
      throw new Error('Book not found')
    }
    if (!book.Borrowed) {
      throw new Error('Book is not borrowed')
    }
    const member = await db.Member.findOne({
      Member_id: memberId
    })
    if (member === null) {
      throw new Error('Member not found')
    }
    const borrowing = await db.Borrowing.findOne({
      Book: book._id,
      Borrower: member._id
    })
    if (borrowing === null) {
      throw new Error('Borrowing not found')
    }

    var telat = checkLate(borrowing.DueDate, Date.now())
    if (telat) {
      borrowing.Late = true
    }
    if (borrowing.Late) {
      throw new Error('Book already late cannot Extend')
    }

    const result = await db.Borrowing.updateOne(
      {
        _id: borrowing._id
      },
      {
        DueDate: addDays(Date.now(), 7)
      }
    )
    return result
  } catch (err) {
    throw Error(err)
  }
}

const getAllCurrentlyBorrowing = async () => {
  try {
    const borrowings = await db.Borrowing.find({
      Status: 'Borrowed'
    }).populate('Book Borrower')

    return borrowings
  } catch (err) {
    throw Error(err)
  }
}

const getAllCurrentlyBorrowingNoPopulate = async () => {
  try {
    const borrowings = await db.Borrowing.find({
      Status: 'Borrowed'
    })

    return borrowings
  } catch (err) {
    throw Error(err)
  }
}

const getAllReturnedBorrowing = async () => {
  try {
    const borrowings = await db.Borrowing.find({
      Status: 'Returned'
    }).populate('Book Borrower')

    return borrowings
  } catch (err) {
    throw Error(err)
  }
}

const getAllReturnedBorrowingNoPopulate = async () => {
  try {
    const borrowings = await db.Borrowing.find({
      Status: 'Returned'
    })

    return borrowings
  } catch (err) {
    throw Error(err)
  }
}

const getAllBorrowing = async () => {
  try {
    const borrowings = await db.Borrowing.find().populate('Book Borrower')

    return borrowings
  } catch (err) {
    throw Error(err)
  }
}

const getAllBorrowingNoPopulate = async () => {
  try {
    const borrowings = await db.Borrowing.find()

    return borrowings
  } catch (err) {
    throw Error(err)
  }
}

module.exports = {
  createBorrowing,
  returnBorrowing,
  getAllBorrowing,
  getAllCurrentlyBorrowing,
  getAllCurrentlyBorrowingNoPopulate,
  getAllReturnedBorrowing,
  getAllReturnedBorrowingNoPopulate,
  getAllBorrowingNoPopulate,
  extendBorrowing,
  checkLate,
  countLate
}
