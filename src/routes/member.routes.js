const controller = require('../controller/member.controller')

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-type, Accept'
    )
    next()
  })

  app.get('/api/members', [], controller.get)
  app.post('/api/members', [], controller.create)
  app.get('/api/members/:memberId', [], controller.getById)
  app.get('/api/members/p', [], controller.getByQuery)
}
