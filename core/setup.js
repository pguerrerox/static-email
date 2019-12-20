'use strict'

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