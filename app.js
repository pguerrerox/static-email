'use strict'

// libraries
require('localenv'); // for local development: duplicate .env file, rename to .localenv, setup variables, DONE.
const express = require('express');
const mailgun = require('mailgun-js');
const fs = require('fs');

// helpers
const setup = require('./core/setup');
const prettyData = require('./core/prettyData');

// routes
const forms = require('./routes/form');
const service = require('./routes/service');

// express app start
const app = express();

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('views', 'views');
app.set('view engine', 'pug');

// server
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8081;
server.listen(port, function(){
  console.log(`App is listening on port: ${port}`);
})

//mailgun
const emailApi = process.env.EMAIL_API_KEY;
const emailDomain = process.env.EMAIL_DOMAIN;
const mailgunCaller = mailgun({apiKey: emailApi, domain: emailDomain});

// sockets-io
io.on('connect', (socket) => {})
fs.watch('./logs/log.json','utf8', (event, filename) => {
  if(event === 'change'){
    console.log(`${filename} was change...`);
    io.emit('news', {
      activityNumber: prettyData.length(),
      successNumber: prettyData.success(),
      sites: prettyData.sites()
    })
  }
})
// TODO: separar sites from length y success.....

// routes
forms(app, setup, mailgunCaller);
service(app);
