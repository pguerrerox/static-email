'use strict'

// LOG.js
// exports a function (data)
// Name[string] = name of the file to be created or updated
// Data[object] = information to add to the logging file scheme below
// data scheme -- (key : type)
// {
//   "activityLog":[
//   {
//     "id": number (ex. 0001),
//     "date": date,
//     "website": string,
//     "err": string / object
//   }
// ]}

// libraries
let fs = require('fs');
let path = require('path');

module.exports = function(name, data){
  // console.log(data);
  // let filepath = `./logs/${name}.json`;
  let filepath = path.join(__dirname,'../',`logs/${name}.json`);
  // console.log(filepath);

  // data validation
  if (!(typeof(filepath) === "string" && typeof(data) === "object")){
    let err = Error('Attribute type error');
    return console.log(err); //throw err???
  }
  // console.log('verifying file\'s existence...');
  if(!fs.existsSync(filepath)){
    // initial values
    // console.log('file doesnt exist, creating log file...');
    let dataBase = {
      activityLog: []
    }
    dataBase.activityLog.push(data);
    let iniData = JSON.stringify(dataBase);
    fs.writeFileSync(filepath, iniData, 'utf8', (err) => {
      if (err) throw err;
    });
    // console.log('the log was created...');
  } else {
    // reading current data in file
    // console.log('file exist, updating log file...');
    let currentData = fs.readFileSync(filepath, 'utf8', (err, data) => {
      if (err) throw err;
    });
    let obj = JSON.parse(currentData);
    obj.activityLog.push(data);
    let newData = JSON.stringify(obj);
    // updating file with new data...
    fs.writeFileSync(filepath, newData, 'utf8', (err) => {
      if (err) throw err;
    });
    // console.log('the log was updated...')
  }
  return console.log(`The log was updated...`)
}