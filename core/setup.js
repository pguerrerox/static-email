'use strict'

// SETUP.js
// exports an object with 2 main keys; "Contacto" and "Empleo"
// inside are secundary objects that represents "url :params" valid to be process
// by the app.

// structure of the secundary objects:
// "testing":{                               ----> param
//   "emailto": process.env.TESTING_EMAIL,   ----> email TO 
//   "template": "testing/contacto-testing"  ----> template to use
// },

module.exports = {
  "contacto": {
    "testing":{
      "emailto": process.env.TESTING_EMAIL,
      "template": "testing/contacto-testing"
    },
    "rottis": {
      "emailto": process.env.ROTTIS_CONTACTO_EMAIL_TO,
      "template": "rottis/contacto-rottis"
    },
    "duramente": {
      "emailto": process.env.DURAMENTE_CONTACTO_EMAIL_TO,
      "template": "duramente/contacto-duramente"
    }
  },
  "empleo": {
    "testing": {
      "emailto": process.env.TESTING_EMAIL,
      "template": "testing/empleo-testing"
    },
    "rottis": {
      "emailto": process.env.ROTTIS_EMPLEO_EMAIL_TO,
      "template": "rottis/empleo-rottis"
    }
  }
}