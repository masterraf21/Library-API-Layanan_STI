/* eslint-env jest */
const app = require('../src/app')
const supertest = require('supertest')
const request = supertest(app)

describe('Testing suite for Books API', () => {
  it('Should return all books data', async done => {
    try {
      const res = await request.get('/api/books')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeDefined()
      done()
    } catch (err) {
      console.error(err.message)
      done(err)
    }
  })

  it('Should return specific book data', async done => {
    try {
      const res = await request.get('/api/books/1')
      expect(res.statusCode).toEqual(200)
      expect(res.body.Book_id).toEqual(1)
      done()
    } catch (err) {
      console.error(err.message)
      done(err)
    }
  })

  it('Should create a new book data', async done => {
    try {
      const payload = {
        ISBN: '882713ABCA',
        title: 'How not to be a fool',
        author: 'Charles Kinbote, M.D.',
        category: 'Motivational',
        publisher: 'Shade Printing'
      }
      const res = await request.post('/api/books').send(payload)
      expect(res.statusCode).toEqual(201)
      done()
    } catch (err) {
      console.error(err.message)
      done(err)
    }
  })

  it('Should refuse to create a new book data', async done => {
    try {
      const payload = {
        ISBN: '882713ABCA',
        title: 'How not to be a fool',
        author: 'Charles Kinbote, M.D.',
        category: 'Motivational'
      }
      const res = await request.post('/api/books').send(payload)
      expect(res.statusCode).toEqual(400)
      done()
    } catch (err) {
      console.error(err.message)
      done(err)
    }
  })

  it('Should get a book with spesific query param', async done => {
    try {
      const res = await request.get('/api/books_query?title=Pale Fire')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeDefined()
      done()
    } catch (err) {
      console.error(err.message)
      done(err)
    }
  })
})
