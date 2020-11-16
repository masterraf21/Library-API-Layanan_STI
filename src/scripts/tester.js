require('dotenv').config()
const { createBorrowing, returnBorrowing } = require('../helper')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const urlCloud = process.env.MONGO_URL
var connection = mongoose.createConnection(urlCloud, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
autoIncrement.initialize(connection)
const db = require('../models')

const run = async function () {
  try {
    const book = await db.Book.findOne({
      Book_id: 3
    })
    const member = await db.Member.findOne({
      Member_id: 3
    })
    console.log(book)
    console.log(member)
    const result = await createBorrowing(book, member)
    console.log(result)
    if (result) {
      console.log('Added borrowings!!')
    } else {
      console.log('Failed Add Borrowings')
    }

    mongoose.connection.close(function () {
      process.exit(0)
    })
  } catch (err) {
    console.log(err)
  }
}

const mongoClient = mongoose.connect(urlCloud, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoClient
  .then(
    db => {
      run()
    },
    err => {
      console.log(err)
    }
  )
  .catch(err => {
    console.log(err.message)
  })
