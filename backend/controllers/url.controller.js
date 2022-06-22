const Url = require('../libs/url.lib')
require('dotenv').config()

/**
 * @description get a short url from an url
 *
 * @author Olivier Romeyer <oromeyer@gmail.com>
 * @since 0.1.0
 *
 * @param {object} req
 * @param {object} res
 * @returns {object}
 */
exports.generateShortUrl = async (req, res) => {
  try {
    const originUrl = req.body.originUrl
    const shortUrl = await Url.generateShortUrl(originUrl)
    await Url.save(originUrl, shortUrl)
    res.status(200).json({
      status: 'OK',
      short_url: `http://localhost:${process.env.BACKEND_PORT}/${shortUrl}`,
    })
  } catch (err) {
    res.status(400).json({
      status: 'KO',
      error: err,
    })
  }
}

/**
 * @description Redirect to url from short url
 *
 * @author Olivier Romeyer <oromeyer@gmail.com>
 * @since 0.1.0
 *
 * @param {object} req
 * @param {object} res
 * @returns {object}
 */
exports.redirectFromShortUrl = async (req, res) => {
  try {
    const shortUrl = req.params.shorturl
    const doc = await Url.findByShortUrl(shortUrl)
    console.log(doc)
    if (doc) {
      res.redirect(doc.originUrl)
    } else {
      res.status(400).json({
        status: 'KO',
        error: 'ShortUrl not found',
      })
    }
  } catch (err) {
    res.status(400).json({
      status: 'KO',
      error: err,
    })
  }
}
