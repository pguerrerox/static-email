'use strict'

// FORM.js
// processes all the HTTP-POST requests
// exports a function (app, setup, mailgun)

// libraries
const recaptcha = require('../core/recaptcha');
const logging = require('../core/log');
const upload = require('../core/upload');
const aux = require('../core/aux');
const pug = require('pug');

const testingProm = new Promise((res, rej) => {
  res("ok");
})

module.exports = function(app, setup, mailgun){
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // IMPORTANT **************************************
  // the form field input of type='file' must have an attribute name="attachFile"
  // *************************************************

  app.post('/:type/:website', upload.single('attachFile'), function(req, res){
    (() => { return !req.body.testing ? recaptcha.validate(req.body["g-recaptcha-response"]) : testingProm})()
    .then(function(){
      // ex. rottisrd.com/contacto/rottis
      // ex. rottisrd.com/empleo/rottis
      let typePOST = req.params.type;
      let website = req.params.website;
      let setupObj = setup[typePOST];
      let myErr;
      let referrer = req.body.referrer; //redirect location send from form...

      // validating first param
      if (!setup.hasOwnProperty(typePOST)){
        myErr = Error(`invalid param: \'${typePOST}\'`);
        logging('log', aux.dataBuilder(website, typePOST, myErr.message));
        return res.render('status', {
          statusPic: '/red.png',
          statusMsg: myErr,
          redirect: referrer
        });
      }
      // validating second param
      else if (!setupObj.hasOwnProperty(website)){
        myErr = Error(`invalid param: \'${website}\'`)
        logging('log', aux.dataBuilder(website, typePOST, myErr.message));
        return res.render('status' ,{
          statusPic: '/red.png',
          statusMsg: myErr,
          redirect: referrer
        });
      }

      // processing request
      let templatePath = setupObj[website].template;
      let template = null;
      let data = {};
      // template and data for /contacto
      if(typePOST === "contacto"){
        template = pug.renderFile(`./templates/${templatePath}.pug`, {
          nombre: req.body.nombre,
          email: req.body.email,
          ciudad: req.body.ciudad,
          asunto: req.body.asunto,
          tema: req.body.tema,
          mensaje: req.body.mensaje,
        });
        data = {
          from: `Formulario de Contacto <${website}@${process.env.EMAIL_DOMAIN}>`,
          to: setupObj[website].emailto,
          subject: req.body.asunto,
          html: template,
        };
      }
      // template and data for /empleo
      else if (typePOST === "empleo"){
        template = pug.renderFile(`./templates/${templatePath}.pug`, {
          nombre: req.body.nombre,
          email: req.body.email,
        });
        let attch = null;
        if (req.file === undefined ){
          attch = null;
          myErr = Error('missing attachment');
          logging('log',aux.dataBuilder(website, typePOST, myErr.message))
          return res.render('status' ,{
            statusPic: '/red.png',
            statusMsg: myErr,
            redirect: referrer
          });
        }
        else {
          attch = new mailgun.Attachment({
            data: req.file.buffer,
            filename: req.file.originalname,
            knownLength: req.file.size,
            contentType: req.file.mimetype
          });
        }
        data = {
          from: `Formulario de Empleo <${website}@${process.env.EMAIL_DOMAIN}>`,
          to: setupObj[website].emailto,
          subject: req.body.asunto,
          html: template,
          attachment: attch,
        }
      }
      // processing email
      mailgun.messages().send(data, function(err, body){
        if (err){
          logging('log', aux.dataBuilder(website, typePOST, err));
          return res.render('status' ,{
            statusPic: '/red.png',
            statusMsg: err,
            redirect: referrer
          });
        } else{
          myErr = {message: 'message sended successfully!'};
          logging('log', aux.dataBuilder(website, typePOST, myErr.message));
          return res.render('status' ,{
            statusPic: '/green.png',
            statusMsg: myErr.message,
            redirect: referrer
          });
        }
      })
    })
    .catch(function(err){
      logging('log', aux.dataBuilder(req.params.website, req.params.type, err));
      return res.status(404).render('status' ,{
        statusPic: '/red.png',
        statusMsg: err,
        redirect: req.body.referrer
      });
    });
  })

  app.post('*', function(req, res){
    res.status(404).render('404',{
      param: req.params['0'],
      errorCode: '404'
    })
  })
}