'use strict'

// helpers
const prettyData = require('../core/prettyData');

module.exports = function(app){
  // middleware
  app.use(function (req, res, next) {
    res.locals.myData = prettyData.length();
    next()
  })

  app.get('*/:admin', function(req, res){
    // TODO: prepare the view for the ADMIN PART.......
    res.render('service',{
      activityNumber: res.locals.myData,
      param: req.params.admin 
    })
  })

  app.get('*', function(req, res){
    // TODO: prepare the view for the REGULAR part......
    res.render('service',{
      activityNumber: res.locals.myData 
    })
  })
}