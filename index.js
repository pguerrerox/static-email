// REQUIREMENTS
var express = require("express");
var multer = require("multer");
var logger = require("morgan");
var path = require('path');
var settings = require('./settings.js');
reCAPTCHA=require('recaptcha2');


// MAKE EXPRESS APP
var app = express();
var server = require('http').createServer(app);


//PORT
var port = process.env.PORT || 8081;


// LOGGER, only log error responses
app.use(logger("dev"));


// reCAPTCHA
recaptcha=new reCAPTCHA({
  siteKey:settings.siteKey,
  secretKey: settings.secretKey
});


// GETS
app.get("/", function(req,res){
	res.send("StaticMail is running...");
});


// MULTER multipart/form-data handler
var uploadFile = multer({
	// fileFilter config
	fileFilter: function (req, file, cb) {
		var filetypes = /pdf/;
		var mimetype = filetypes.test(file.mimetype);
		var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

		if (mimetype && extname) {
			return cb(null, true);
		}
		cb(null, false);
	},
	// sizeLimit config
	limits: {
		fieldNameSize: 100,
		fileSize: 2*1000*1000, // 2MB limit
		files: 1,
	},
});


// POST JEMAZAR.COM/CONTACTO
app.post("/jemazar-contacto", uploadFile.single(), function(req,res){
	var api_key = settings.api_key;
  var domain = settings.domain;
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
	var data = {
		from: settings.from, //replace with your SMTP Login ID
		to: settings.toTest, //recipients email
		subject: req.body.tema,
		html:    '<html>'+
    '<head>    <style>      .content{  width:600px;  margin:0 auto;  padding:15px;  background-color:#003399;  box-shadow: 0 0 15px #000 ;}    h1, h3{  text-align:center;  color:#ffffff;}    p{  text-align:center;  margin:30px 60px;  color: #ffffff;}    a{  background-color:#ffffff;  color:#003399;  font-weight:bold;  padding: 3px}    a:hover{   background-color:#000;}    .info{  width:70%;  margin:20px auto 20px auto;  padding:25px;  background-color:#eee;  }    span{  display:inline-block;  margin:0 auto;  font-weight: bold;  padding:5px 10px 5px 100px;  }  </style></head>'+
    '<body>      <div class="content">        <h1>Has recibido un mensaje!</h1>        <p>Este mensaje proviene desde <a href="http://jemazar.com/pages/contacto.html">jemazar.com/contacto</a>, contiene datos introducidos por un usuario en el <b>formulario de contacto</b></p>        <br />        <h3><b>Informacion del Formulario</b></h3>        <div class="info">'+
    '<span>Nombre: </span>'+req.body.name+'<br />'+
    '<span>Email: </span>'+req.body.email+'<br />'+
    '<span>Ciudad: </span>'+req.body.ciudad+'<br />'+
    '<span>Asunto: </span>'+req.body.asunto+'<br />'+
    '<span>Mensaje: </span>'+req.body.mensaje+'<br />'+
    '</div></div></body></html>'
  };
	recaptcha.validate(req.body["g-recaptcha-response"])
  .then(function(){
    // valid
    console.log("reCAPTCHA valid");
    mailgun.messages().send(data, function (error, body) {
      if(!error){
        console.log("e-mail sended");
        res.redirect('http://jemazar.com/pages/form-status-ok.html');
        res.end();
      }
    });
  })
  .catch(function(errorCodes){
    // invalid
    console.log("reCAPTCHA invalid");
    res.redirect('http://jemazar.com/pages/form-status-error.html');
    res.end();
  });
});


// POST JEMAZAR.COM/EMPLEO
app.post("/jemazar-empleo", uploadFile.single('afile'), function(req,res){
  var api_key = settings.api_key;
  var domain = settings.domain;
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  var upFile = req.file.buffer;
  var upFileName = req.file.originalname;
  var upFileSize = req.file.size;
  var upFileType = req.file.mimetype;
  var attch = new mailgun.Attachment({
    data: upFile,
    filename: upFileName,
    knownLength: upFileSize,
    contentType: upFileType
  });
  var data = {
		from: settings.from, //replace with your SMTP Login ID
		to: settings.toTest, //recipients email
    subject: 'Curriculum Vitae (CV) de '+req.body.name,
		attachment: attch,
		html:    '<html>'+
    '<head>    <style>      .content{  width:600px;  margin:0 auto;  padding:15px;  background-color:#003399;  box-shadow: 0 0 15px #000 ;}    h1, h3{  text-align:center;  color:#ffffff;}    p{  text-align:center;  margin:30px 60px;  color: #ffffff;}    a{  background-color:#ffffff;  color:#003399;  font-weight:bold;  padding: 3px}    a:hover{   background-color:#000;}    .info{  width:70%;  margin:20px auto 20px auto;  padding:25px;  background-color:#eee;  }    span{  display:inline-block;  margin:0 auto;  font-weight: bold;  padding:5px 10px 5px 100px;  }  </style></head>'+
    '<body>      <div class="content">        <h1>Has recibido un mensaje!</h1>        <p>Este mensaje proviene desde <a href="http://jemazar.com/pages/empleo.html">jemazar.com/contacto</a>, contiene datos introducidos por un usuario en el <b>formulario de contacto</b></p>        <br />        <h3><b>Informacion del Formulario</b></h3>        <div class="info">'+
    '<span>Nombre: </span>'+req.body.name+'<br />'+
    '<span>Email: </span>'+req.body.email+'<br />'+
    '</div></div></body></html>'
  };
  recaptcha.validate(req.body["g-recaptcha-response"])
  .then(function(){
    // valid
    console.log("reCAPTCHA valid");
    mailgun.messages().send(data, function (error, body) {
      if(!error){
        console.log("e-mail sended");
        res.redirect('http://jemazar.com/pages/form-status-ok.html');
        res.end();
      }
    });
  })
  .catch(function(errorCodes){
    // invalid
    console.log("reCAPTCHA invalid");
    res.redirect('http://jemazar.com/pages/form-status-error.html');
  });
});


// ERROR DISPLAY
app.use(function (err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    console.log('File is too big');
    res.redirect('http://jemazar.com/pages/form-status-error.html');
    res.end();
    return;
  }
  if(err){
    console.log('Solo PDF');
    res.redirect('http://jemazar.com/pages/form-status-error.html');
    res.end();
  }
  // Handle any other errors
});


// Listen for an application request on port 8081
server.listen(port, function () {
  console.log('StaticMail listening on port: '+port);
});
