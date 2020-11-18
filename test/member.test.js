/* eslint-env jest */
const app = require('../src/app')
const supertest = require('supertest')
const request = supertest(app)

describe('Testing suite for Members API', () => {
  it('Should return all members data', async done => {
    try {
      const res = await request.get('/api/members')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeDefined()
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should create a member', async done => {
    try {
      const payload = {
        name: 'Vito Corleone',
        address: 'Long Beach, New York',
        phone: '081237652'
      }
      const res = await request.post('/api/members').send(payload)
      expect(res.statusCode).toEqual(201)
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should not create a member', async done => {
    try {
      const payload = {
        name: 'Vito Corleone',
        address: 'Long Beach, New York'
      }
      const res = await request.post('/api/members').send(payload)
      expect(res.statusCode).toEqual(400)
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should return a specific member data', async done => {
    try {
      const res = await request.get('/api/members/1')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeDefined()
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should return a spesific members data by query', async done => {
    try {
      const res = await request.get('/api/members_query/?name=Vito Corleone')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeDefined()
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })

  it('Should not return a spesific members data by query', async done => {
    try {
      const res = await request.get('/api/members_query')
      expect(res.statusCode).toEqual(400)
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })
})
