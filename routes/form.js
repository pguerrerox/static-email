'use strict'

// FORM.js
// processes all the HTTP-POST requests
// exports a function (app, setup, mailgun)

// libraries
let pug = require('pug');
let upload = require('../core/upload');
let recaptcha = require('../core/recaptcha');
let aux = require('../core/aux');
let logging = require('../core/log');

module.exports = function(app, setup, mailgun){
  app.post('/:type/:website', upload.single('attachFile'), function(req, res){

    recaptcha.validate(req.body["g-recaptcha-response"])
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
        myErr = new Error(`invalid \'${typePOST}\' params`);
        logging('log', aux.dataBuilder(website, typePOST, myErr));
        return res.send(`something is not right!!`);
      }
      // validating second param
      else if (!setupObj.hasOwnProperty(website)){
        myErr = new Error(`invalid \'${website}\' params`)
        logging('log', aux.dataBuilder(website, typePOST, myErr));
        return res.send(`something is not right!!`);
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

          myErr = new Error('missing attachment');
          logging('log',aux.dataBuilder(website, typePOST, myErr))
          return res.send({error: myErr})
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
          return  res.send({})  //object with err info
        } else{
          myErr = new Error('send successfully!');
          logging('log', aux.dataBuilder(website, typePOST, myErr));
          // respond with success msg....
          return res.send() ///
        }
      })
    })
    .catch(function(err){
      logging('log', aux.dataBuilder(website, typePOST, err));
      return res.send() ///
    });
  })
}