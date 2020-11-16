const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./routes/postman.json')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
require('dotenv').config()

// Mongo
const mongoClient = mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoClient
  .then(
    db => {
      console.log('Connected to db server')
      console.log('Connection state: ' + mongoose.connection.readyState)
    },
    err => {
      console.error(err)
    }
  )
  .catch(err => {
    console.error(err.message)
  })

// Import Routes

// App
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(cookieParser())

// Swagger docs
app.use('/api', swaggerUi.serve)
app.get('/api', swaggerUi.setup(swaggerDocument))

module.exports = app
