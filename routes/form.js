'use strict'

// FORM.js
// processes all the HTTP-POST requests
// exports a function (app, setup, mailgun)

// libraries
let pug = require('pug');
let upload = require('../core/upload');
let logging = require('../core/log');

module.exports = function(app, setup, mailgun){
  app.post('/:type/:website', upload.single('attachFile'), function(req, res){
    // ex. rottisrd.com/contacto/rottis
    // ex. rottisrd.com/empleo/rottis
    let typePOST = req.params.type;
    let website = req.params.website;
    let setupObj = setup[typePOST];

    // validating first param
    if (!setup.hasOwnProperty(typePOST)){
      console.log(`request stopped, \/${typePOST} is not a valid url...`);
      // new error...
      // log fail attempt...
      // redirect back to source with error msg...
      return res.send(`request stopped, \/${typePOST} is not a valid url...`);
    }
    // validating second param
    else if (!setupObj.hasOwnProperty(website)){
      console.log(`request stopped, \/${website} is not a valid url...`)
      //new error...
      //log fail attempt...
      //respond to contact page with error message...
      return res.send(`request stopped, \/${website} is not a valid url...`);
    }

    console.log(`the request will be process...`);
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
        res.send('err')
        return console.log('Missing Attachent File... not email send...');
        // new error, missing attachment, stop execution
        // redirect and respond with error
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

    mailgun.messages().send(data, function(err, body){
      if (err){
        //log error...
        console.log(err);
      } else{
        //log email status...
        console.log(`correo enviado a ${website}`);
      }
    })

    //redirect and respond to source with email status
    console.log(data.from);
    res.send(`${template}`);
    res.end();
  })
}
