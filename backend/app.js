const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const validurlMiddleware = require('./middlewares/validurl.middleware')
require('dotenv').config()
const cors = require('cors')

const app = express()

var allowlist = [
  'http://locahost:3000',
  'https://api-lite.warren-trader.com',
  'https://test.api.warren-trader.com',
  'https://release.api.warren-trader.com',
  'https://workflow.quantsunited.com',
]
var corsOptionsDelegate = function (req, callback) {
  var corsOptions
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors())

app.disable('x-powered-by')

app.use(
  bodyParser.json({
    limit: '1mb',
  }),
)

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

// Connect to MongoDB
mongoose
  .connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

const Url = require('./models/url.schema')

app.all('*', [validurlMiddleware])

require('./routes/url.route')(app)

app.listen(5000, () => {
  console.log(`Service started`)
})
