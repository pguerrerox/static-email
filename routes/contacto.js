'use strict'

let pug = require('pug');

module.exports = function(app, setup, mailgun){
  app.post('/contacto/:website', function(req, res){
    let website = req.params.website;
    let setupObj = setup.contacto;

    if (!setupObj.hasOwnProperty(website)){
      console.log(`Request has been stopped...`)
      
      //log activity
      return res.send(`${website} no puede ser procesado...`);
    }

    console.log(`Request will be process...`);
    let templatePath = setupObj[website].template
    let template = pug.renderFile(`./templates/${templatePath}.pug`, {
      nombre: req.body.nombre,
      email: req.body.email,
      ciudad: req.body.ciudad,
      asunto: req.body.asunto,
      tema: req.body.tema,
      mensaje: req.body.mensaje,
    });

    // let template = fs.readFileSync(`./templates/${templatePath}.pug`).toString();
    // send email with REQ_DATA and PROPER_TEMPLATE
    // sendmail(req.body, template)
    // log activity... timestamp.. status.. to.. 

    let data = {
      from: `Formulario de Contacto <${website}@${process.env.EMAIL_DOMAIN}>`,
      to: setupObj[website].emailto,
      subject: req.body.asunto,
      html: template,
    }

    mailgun.messages().send(data, function(err, body){
      if (err){
        console.log(err);
      } else{
        console.log(`correo enviado a ${website}`);
      }
    })

    console.log(data.from);
    res.send(`${template}`);
    res.end();
  })
}
