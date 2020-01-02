'use strict'

module.exports = function(app){
  app.get('*', function(req, res){
    res.send('StaticMail is running.... this is HOME')
  })
}