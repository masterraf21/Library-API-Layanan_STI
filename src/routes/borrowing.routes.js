const controller = require('../controller/borrowing.controller')

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-type, Accept'
    )
    next()
  })

  app.get('/api/borrowings', [], controller.get)
  app.post('/api/borrowings', [], controller.create)
  app.post('/api/borrowings/return', [], controller.return)
  app.get('/api/borrowings/returned', [], controller.getReturned)
  app.get('/api/borrowings/current', [], controller.getCurrent)
}
