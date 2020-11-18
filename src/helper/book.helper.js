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

const getAllBooks = () => {}

const getAllBookISBN = ISBN => {}

const getAllBookAuthor = author => {}

const getALlBookTitle = title => {}

const getBookId = id => {}

module.exports = {
  getAllBooks,
  getAllBookISBN,
  getBookId,
  getAllBookAuthor,
  getALlBookTitle
}
