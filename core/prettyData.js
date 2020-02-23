'use strict'

// libraries
const fs = require('fs');

// functions
function dataLength() {
  try{
    let data = fs.readFileSync('./logs/log.json', 'utf8', (err, data) => {
      if (err) throw err;
    })
    let objData = JSON.parse(data);
    return objData.activityLog.length
  }
  catch(err){
    console.log(err);
  }
}
function dataArray() {}

// exports
module.exports = {
  length: dataLength,
  array: dataArray
}