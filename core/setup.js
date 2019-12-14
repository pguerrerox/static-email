'use strict'

module.exports = {
  "contacto": {
    "testing":{
      "emailto": process.env.TESTING_EMAIL,
      "template": "contacto-testing"
    },
    "rottis": {
      "emailto": "",
      "template": "contacto-rottis"
    },
    "duramente": {
      "emailto": "",
      "template": "contacto-duramente"
    }
  },
  "empleo": {
    "testing": {
      "emailto": process.env.TESTING_EMAIL,
      "template": ""
    },
    "rottis": {
      "emailto": "",
      "template": ""
    }
  }
}