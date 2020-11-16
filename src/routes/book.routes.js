const controller = require('../controller/book.controller')

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-type, Accept'
    )
    next()
  })
}
