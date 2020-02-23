'use strict'

// libraries
require('localenv'); // for local development: duplicate .env file, rename to .localenv, setup variables, DONE.
let express = require('express');
let mailgun = require('mailgun-js');
let fs = require('fs');

// setup variables
let setup = require('./core/setup');

// routes
let forms = require('./routes/form');
let service = require('./routes/service');
let dashboard = require('./routes/dashboard');

// express app start
let app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('views', 'views');
app.set('view engine', 'pug');

let port = process.env.PORT || 8081;
app.listen(port, function(){
  console.log(`App is listening on port: ${port}`);
})

//mailgun
let emailApi = process.env.EMAIL_API_KEY;
let emailDomain = process.env.EMAIL_DOMAIN;
let mailgunCaller = mailgun({apiKey: emailApi, domain: emailDomain});

app.use(function (req, res, next) {
  // res.locals.myData = 'Hola'
  let myData = fs.readFileSync('./logs/log.json','utf8', (err, data)=>{
    if (err) throw err;
  })
  let objData = JSON.parse(myData);
  res.locals.myData = objData.activityLog.length
  next()
})

// routes
forms(app, setup, mailgunCaller);
service(app);
// dashboard(app);