require('dotenv').config()
const { borrowingHelper } = require('../helper')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const autoIncrement = require('mongoose-auto-increment')
const urlCloud = process.env.MONGO_URL
var connection = mongoose.createConnection(urlCloud, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
autoIncrement.initialize(connection)
const db = require('../models')

const exit = function () {
  mongoose.connection.close(function () {
    process.exit(0)
  })
}
const run = function () {
  borrowingHelper
    .createBorrowing(3, 4)
    .then(
      result => {
        console.log('Created Borrowing')
        console.log(result)
        exit()
      },
      err => {
        console.log('Failed created borrowing')
        console.error(err.message)
        exit()
      }
    )
    .catch(err => console.error(err.message))
}

const borrowTester = function () {
  borrowingHelper
    .returnBorrowing(2, 1)
    .then(
      borrowings => {
        console.log(borrowings)
        exit()
      },
      err => {
        console.error(err.message)
        exit()
      }
    )
    .catch(err => console.error(err.message))
}

const borrowHelper = async () => {
  try {
    const result = await borrowingHelper.createBorrowing(1, 1)
    console.log(result)
    exit()
  } catch (err) {
    console.error(err)
  }
}
const mongoClient = mongoose.connect(urlCloud, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
mongoClient
  .then(
    db => {
      console.log('Connected to db, executing tester script')
      borrowTester()
    },
    err => {
      console.log(err)
    }
  )
  .catch(err => {
    console.log(err.message)
  })
