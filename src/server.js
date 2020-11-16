const app = require('./app')
require('dotenv').config()

// Server
app.listen(process.env.API_PORT, function () {
  console.log(
    `Server started on port ${process.env.API_PORT}! Visit http://localhost:${process.env.API_PORT}/`
  )
})
