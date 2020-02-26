'use strict'

// helpers
const prettyData = require('../core/prettyData');

module.exports = function(app){
  // middleware
  app.use(function (req, res, next) {
    res.locals.lengthData = prettyData.length();
    res.locals.successData = prettyData.success();
    res.locals.sites = prettyData.sites();
    next()
  })

  app.get(['/', '/admin'], function(req, res){
    res.render('service',{
      param: req.path,
      connectedSites: res.locals.sites,
      activityNumber: res.locals.lengthData,
      successNumber: res.locals.successData
    })
  })

  app.get('*', function(req, res){
    res.status(404).render('404',{
      param: req.params['0'],
      errorCode: '404'
    })
  })
}