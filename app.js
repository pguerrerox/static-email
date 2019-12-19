'use strict'

// libraries
require('localenv');
let express = require('express');
let mailgun = require('mailgun-js');

// setup variables
let setup = require('./core/setup');
let logging = require('./core/log');

// routes
let gui = require('./routes/gui');
let contacto = require('./routes/contacto');
let empleo = require('./routes/empleo');

// express app start
let app = express();
app.use(express.urlencoded({extended: true}));
let port = process.env.PORT || 8081;
app.listen(port, function(){
  console.log(`App is listening on port: ${port}`);
})

//mailgun
let emailApi = process.env.EMAIL_API_KEY;
let emailDomain = process.env.EMAIL_DOMAIN;
let mailgunCaller = mailgun({apiKey: emailApi, domain: emailDomain});

// routes
contacto(app, setup, mailgunCaller);
// empleo();
gui(app);