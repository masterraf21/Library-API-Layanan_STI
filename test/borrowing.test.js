/* eslint-env jest */
const app = require('../src/app')
const supertest = require('supertest')
const request = supertest(app)

describe('Testing suite for Borrowings API', () => {
  it('Should not return all borrowings because empty', async done => {
    try {
      const res = await request.get('/api/borrowings')
      expect(res.statusCode).toEqual(404)
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should create a borrowing', async done => {
    try {
      const payload = {
        book_id: 1,
        member_id: 1
      }
      const res = await request.post('/api/borrowings').send(payload)
      expect(res.statusCode).toEqual(201)
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should create another borrowing for testing sake', async done => {
    try {
      const payload = {
        book_id: 2,
        member_id: 1
      }
      const res = await request.post('/api/borrowings').send(payload)
      expect(res.statusCode).toEqual(201)
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should not create a borrowing', async done => {
    const payload = {
      book_id: 1,
      member_id: 1
    }
    const res = await request.post('/api/borrowings').send(payload)
    expect(res.statusCode).toEqual(500)
    done()
    try {
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should create a borrowing return', async done => {
    try {
      const payload = {
        book_id: 1,
        member_id: 1
      }
      const res = await request.post('/api/borrowings/return').send(payload)
      expect(res.statusCode).toEqual(200)
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should return all returned borrowings', async done => {
    try {
      const res = await request.get('/api/borrowings/returned')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeDefined()
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should return all returned borrowings no populate', async done => {
    try {
      const res = await request.get('/api/borrowings/returned/?populate=no')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeDefined()
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should return all current borrowings', async done => {
    try {
      const res = await request.get('/api/borrowings/current')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeDefined()
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should return all current borrowings no populate', async done => {
    try {
      const res = await request.get('/api/borrowings/current/?populate=no')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeDefined()
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })
})
