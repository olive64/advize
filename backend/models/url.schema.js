const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  originUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
})

module.exports = Url = mongoose.model('url', urlSchema)
