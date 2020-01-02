'use strict'

// libraries
let reCAPTCHA = require('recaptcha2');

module.exports = new reCAPTCHA({
  siteKey: process.env.RECAPTCHA_SITEKEY,
  secretKey: process.env.RECAPTCHA_SECRETKEY ,
})