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
function dataSuccess() {
  let data = fs.readFileSync('./logs/log.json', 'utf8', (err, data) => {
    if (err) throw err;
  })
  let objData = JSON.parse(data);
  let arrayData = objData.activityLog;
  return arrayData.filter(success => success.status === "message sended successfully!").length
}
function dataSites() {
  let data = require('./setup');
  let count = 0;
  for (let x in data.contacto){
    count ++
  }
  return count
}

dataSites();
// exports
module.exports = {
  length: dataLength,
  success: dataSuccess,
  sites: dataSites
}