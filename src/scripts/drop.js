require('dotenv').config()
const mongoose = require('mongoose')
// mongoose.set('useFindAndModify', false)
const dbUrl = process.env.MONGO_URL
var connection = mongoose.createConnection(dbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const exit = function () {
  mongoose.connection.close(function () {
    process.exit(0)
  })
}
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
          exit()
        })
      } catch (err) {
        console.log(`Faield dropping ${connection.db.databaseName} database.`)
        console.error('err')
        exit()
      }
    },
    err => {
      console.log(err)
    }
  )
  .catch(err => {
    console.log(err.message)
  })
