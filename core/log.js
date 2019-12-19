'use strict'

// libraries
let fs = require('fs');

module.exports = function(path, data){
  // data validation
  if (!(typeof(path) === "string" && typeof(data) === "object")){
    let err = Error('Attribute type error')
    return console.log(err);
  }

  console.log('verifying file\'s existence...')
  if(!fs.existsSync(path)){
    console.log('file doesnt exist, creating log file...');

    // initial values
    let data = {
      activityLog: []
    }
    
    let iniData = JSON.stringify(data);
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

// Attributes
// Path[string] = location of the log file
// Data[object] = information to add to the logging file scheme below
// --------------
// data scheme -- (key : type)
// {
//   "activityLog":[
//   {
//     "uid": uniqueID,
//     "number": number (ex. 0001),
//     "date": date,
//     "status": string,
//     "emailTo": string
//   }
// ]}