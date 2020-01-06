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
//     "err": string
//   }
// ]}

// libraries
let fs = require('fs');

module.exports = function(name, data){
  let path = `../logs/${name}.json`;

  // data validation
  if (!(typeof(path) === "string" && typeof(data) === "object")){
    let err = Error('Attribute type error');
    return console.log(err);
  }

  console.log('verifying file\'s existence...');
  if(!fs.existsSync(path)){
    console.log('file doesnt exist, creating log file...');

    // initial values
    let dataBase = {
      activityLog: []
    }
    dataBase.activityLog.push(data);
    let iniData = JSON.stringify(dataBase);
    fs.writeFileSync(path, iniData, 'utf8', (err) => {
      if (err) throw err;
    });

    console.log('the log was created...');
  } else {
    console.log('file exist, updating log file...');

    // reading current data in file
    let currentData = fs.readFileSync(path, 'utf8', (err, data) => {
      if (err) throw err;
    });

    let obj = JSON.parse(currentData);
    obj.activityLog.push(data);
    let newData = JSON.stringify(obj);

    // updating file with new data...
    fs.writeFileSync(path, newData, 'utf8', (err) => {
      if (err) throw err;
    });
    console.log('the log was updated...')
  }
}