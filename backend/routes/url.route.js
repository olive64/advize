module.exports = (app) => {
  const urlCtrl = require('../controllers/url.controller.js')

  var router = require('express').Router()
  router.post('/url', urlCtrl.generateShortUrl)
  router.get('/:shorturl', urlCtrl.redirectFromShortUrl)

  app.use('/', router)
}
