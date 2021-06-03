'use strict'

// SETUP.js
// exports an object with 2 main keys; "contacto" and "empleo"
// inside these are secundary objects that represents "url :params" valid to be process
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
    },
    "meadowlands": {
      "emailto": process.env.MEADOWLANDS_CONTACTO_EMAIL_TO,
      "template": "meadowlands/contacto-meadowlands"
    },
    "expi": {
      "emailto": process.env.EXPI_CONTACTO_EMAIL_TO,
      "template": "expi/contacto-expi"
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
    },
    "expi": {
      "emailto": process.env.EXPI_EMPLEO_EMAIL_TO,
      "template": "expi/empleo-expi"
    }
  }
}