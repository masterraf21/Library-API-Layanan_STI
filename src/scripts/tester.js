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

const exit = function () {
  mongoose.connection.close(function () {
    process.exit(0)
  })
}
const run = function () {
  createBorrowing(3, 3)
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
