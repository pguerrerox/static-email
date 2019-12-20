'use strict'

// libraries
let multer = require('multer');
let path = require('path');

// multer instance
module.exports = multer({
  fileFilter: function(req, file, cb){
    let filetype = /pdf/;
    let mimetype = filetype.test(file.mimetype);
    let extname = filetype.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(null, false);
  },
  limits: {
    fieldNameSize: 50,
    fileSize: 2*1000*1000, //2MB size limit
    files: 1,
  }
})