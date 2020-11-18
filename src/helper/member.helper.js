require('dotenv').config()
const dbUrl = process.env.MONGO_URL
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
var connection = mongoose.createConnection(dbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
autoIncrement.initialize(connection)
const db = require('../models')

const getAllMembers = async () => {
  try {
    const members = await db.Member.find()
    return members
  } catch (err) {
    throw new Error(err)
  }
}

const getMemberId = async id => {
  try {
    const member = await db.Member.findOne({
      Member_id: id
    })
    return member
  } catch (err) {
    throw new Error(err)
  }
}

const getMemberName = async name => {
  try {
    const member = await db.Member.findOne({
      Name: name
    })
    return member
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllMembers,
  getMemberId,
  getMemberName
}
