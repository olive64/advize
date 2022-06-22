require('dotenv').config()
const crypto = require('crypto')
const Url = require('../models/url.schema')

/**
 * @description generate a short url
 *
 * @author Olivier Romeyer <oromeyer@gmail.com>
 * @since 0.1.0
 *
 * @returns {string} #return a short url
 */
exports.generateShortUrl = () => {
  try {
    return Promise.resolve(crypto.randomBytes(3).toString('hex'))
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * @description check if url is valid
 *
 * @author Olivier Romeyer <oromeyer@gmail.com>
 * @since 0.1.0
 *
 * @param {string} url #url to check
 * @returns {boolean} #return true if is a valid url
 */
exports.isValid = (url) => {
  try {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ) // fragment locator
    return Promise.resolve(pattern.test(url))
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * @description save data to db
 *
 * @author Olivier Romeyer <oromeyer@gmail.com>
 * @since 0.1.0
 *
 * @param {string} originUrl #url to save
 * @param {string} shortUrl #url to save
 * @returns {object} #return data
 */
exports.save = async (originUrl, shortUrl) => {
  try {
    const url = new Url({
      originUrl,
      shortUrl,
      date: new Date(),
    })

    await url.save()
    return Promise.resolve(url)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * @description FInd by originUrl in DB
 *
 * @author Olivier Romeyer <oromeyer@gmail.com>
 * @since 0.1.0
 *
 * @param {string} originUrl #url to search
 * @returns {object} #return data
 */
exports.findByOriginUrl = async (originUrl) => {
  try {
    const doc = await Url.findOne({ originUrl: originUrl }).exec()
    return Promise.resolve(doc)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * @description FInd by shortUrl in DB
 *
 * @author Olivier Romeyer <oromeyer@gmail.com>
 * @since 0.1.0
 *
 * @param {string} shortUrl #url to search
 * @returns {object} #return data
 */
exports.findByShortUrl = async (shortUrl) => {
  try {
    const doc = await Url.findOne({ shortUrl: shortUrl }).exec()
    return Promise.resolve(doc)
  } catch (err) {
    return Promise.reject(err)
  }
}
