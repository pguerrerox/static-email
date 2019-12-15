'use strict'

module.exports = {
  "contacto": {
    "testing":{
      "emailto": process.env.TESTING_EMAIL,
      "template": "contacto-testing"
    },
    "rottis": {
      "emailto": process.env.ROTTIS_CONTACTO_EMAIL_TO,
      "template": "contacto-rottis"
    },
    "duramente": {
      "emailto": process.env.DURAMENTE_CONTACTO_EMAIL_TO,
      "template": "contacto-duramente"
    }
  },
  "empleo": {
    "testing": {
      "emailto": process.env.TESTING_EMAIL,
      "template": "empleo-testing"
    },
    "rottis": {
      "emailto": process.env.ROTTIS_EMPLEO_EMAIL_TO,
      "template": "empleo-rottis"
    }
  }
}