const Url = require('../libs/url.lib')
require('dotenv').config()

module.exports = async (req, res, next) => {
  if (req.path.indexOf('/v1/url') !== -1 && req.method === 'GET') return next()
  const originUrl = req.body.originUrl
  /** check if url is valid RFC  */
  const isValid = await Url.isValid(originUrl)
  /** check if url is store in db */
  const dataDb = await Url.findByOriginUrl(originUrl)
  if (isValid && !dataDb) return next()
  if (dataDb) {
    res.status(200).json({
      status: 'OK',
      short_url: `http://localhost:${process.env.BACKEND_PORT}/${dataDb.shortUrl}`,
    })
  } else {
    res.status(400).json({
      status: 'KO',
      error: 'url not valid',
    })
  }
}
