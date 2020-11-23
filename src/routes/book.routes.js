const controller = require('../controller/book.controller')

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-type, Accept'
    )
    next()
  })

  app.get('/api/books', [], controller.get)
  app.post('/api/books', [], controller.create)
  app.post('/api/books/bulk', [], controller.createBulk)
  app.get('/api/books/:bookId', [], controller.getById)
  app.get('/api/books/query/p', [], controller.getQuery)
}
