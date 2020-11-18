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

const createBook = async (ISBN, Title, Author, Category, Publisher) => {
  try {
    const result = db.Book.create({
      ISBN: ISBN,
      Title: Title,
      Author: Author,
      Category: Category,
      Publisher: Publisher
    })
    return result
  } catch (err) {
    throw new Error(err)
  }
}

const createBookBulk = async (
  ISBN,
  Title,
  Author,
  Category,
  Publisher,
  count
) => {
  try {
    for (let i = 0; i < count; i++) {
      var result = db.Book.create({
        ISBN: ISBN,
        Title: Title,
        Author: Author,
        Category: Category,
        Publisher: Publisher
      })
    }
    return result
  } catch (err) {
    throw new Error(err)
  }
}
const getAllBooks = async () => {
  try {
    const books = await db.Book.find()
    return books
  } catch (err) {
    throw new Error(err)
  }
}

const getAllBookISBN = async ISBN => {
  try {
    const books = await db.Book.find({
      ISBN: ISBN
    })
    return books
  } catch (err) {
    throw new Error(err)
  }
}

const getAllBookAuthor = async author => {
  try {
    const books = await db.Book.find({
      Author: author
    })
    return books
  } catch (err) {
    throw new Error(err)
  }
}

const getALlBookTitle = async title => {
  try {
    const books = await db.Book.find({
      Title: title
    })
    return books
  } catch (err) {
    throw new Error(err)
  }
}

const getALlBookTitleISBN = async (title, ISBN) => {
  try {
    const books = await db.Book.find({
      Title: title,
      ISBN: ISBN
    })
    return books
  } catch (err) {
    throw new Error(err)
  }
}

const getAllBookTitleAuthor = async (title, author) => {
  try {
    const books = await db.Book.find({
      Title: title,
      Author: author
    })
    return books
  } catch (err) {
    throw new Error(err)
  }
}

const getAllBookISBNAuthor = async (ISBN, author) => {
  try {
    const books = await db.Book.find({
      ISBN: ISBN,
      Author: author
    })
    return books
  } catch (err) {
    throw new Error(err)
  }
}

const getAllBook3 = async (ISBN, author, title) => {
  try {
    const books = await db.Book.find({
      Title: title,
      ISBN: ISBN,
      Author: author
    })
    return books
  } catch (err) {
    throw new Error(err)
  }
}
const getBookId = async id => {
  try {
    const book = await db.Book.findOne({
      Book_id: id
    })
    return book
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  createBook,
  createBookBulk,
  getAllBooks,
  getAllBookISBN,
  getBookId,
  getAllBookAuthor,
  getALlBookTitle,
  getALlBookTitleISBN,
  getAllBookTitleAuthor,
  getAllBookISBNAuthor,
  getAllBook3
}
