// Library: https://github.com/jianwu-github/mongoose-data-seeder
require('dotenv').config()
const mongoose = require('mongoose')
const MongooseDataSeeder = require('mongoose-data-seeder')
const autoIncrement = require('mongoose-auto-increment')
const data = require('./data.json')
const dbUrl = process.env.MONGO_URL

var connection = mongoose.createConnection(dbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
autoIncrement.initialize(connection)
require('../models')
const mongoClient = mongoose.connect(dbUrl, {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoClient
  .then(
    db => {
      try {
        mongoose.connection.db.dropDatabase(() => {
          console.log(`${connection.db.databaseName} database dropped.`)
        })
      } catch (err) {
        console.error(err)
        process.exit(0)
      }

      console.log(
        `Connected to MongoDB, Prepare to load seed data from ${data} ...`
      )
      const mongoSeeder = new MongooseDataSeeder({
        dropCollection: true
      })

      mongoSeeder
        .load(data)
        .then(dbData => {
          console.info('seedData is loaded')
          console.log(data)
          process.exit(0)
        })
        .catch(err => {
          console.info('Failed to load seedData into test database')
          console.info(err)

          process.exit(1)
        })
    },
    err => {
      console.error(err)
    }
  )
  .catch(err => {
    console.error(err.message)
  })
