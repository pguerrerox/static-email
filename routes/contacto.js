'use strict'
let fs = require('fs');
let consoli = require('consolidate');
let pug = require('pug');



module.exports = function(app, setup, mailgun, fs){
  app.post('/contacto/:website', function(req, res){
    let website = req.params.website;
    let contactoObj = setup.contacto;

    if (!contactoObj.hasOwnProperty(website)){
      console.log(`Request has been stopped...`)
      //log activity
      return res.send(`${website} no puede ser procesado...`);
    }

    console.log(`Request will be process...`);
    let template = pug.renderFile('./templates/contacto-rottis.pug', {
      name: req.body.name,
      email: req.body.email
    });
    console.log(template);

    // console.log(website);
    // console.log(req.body);

    // let templatePath = contactoObj[website].template;
    // let template = fs.readFileSync(`./templates/${templatePath}.html`).toString();

    // // console.log(template);
    // // console.log(req.body);

    // // send email with REQ_DATA and PROPER_TEMPLATE
    // // sendmail(req.body, template)
    // // log activity... timestamp.. status.. to.. 
    
    // // let data = {
    // //   from: '',
    // //   to: '',
    // //   subject: '',
    // //   html: "",

    // // }

    // console.log(`Request can be process`)
    res.send(`${website} sera procesado... ${template}.....`);
    res.end();
  })
}
