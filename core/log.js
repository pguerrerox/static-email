'use strict'

// libraries
let fs = require('fs');

// initial values
let activityLog = '../logs/cabeza.json';
let obj = {
  activityLog: []
}

// function to create the log file
// path: String
// iniData: Object
const createLog = function(path, iniData){
  console.log(`Creating/Updating file... ${path}`);
  let data = JSON.stringify(iniData);
  fs.writeFileSync(path, data, 'utf8', (err) => {
    if (err) throw err;
  });
  console.log('File was created/updated...');
}

// function to update the log file
// path: String
// newData: Object
const updateLog = function(path, newData){
  console.log('Verificando si el archivo existe..');

  // condition: if file doesnt exist --create a new file, otherwise update existing file.
  if(!fs.existsSync(path)){
    console.log('File doesnt exist');
    createLog(path, newData)
  }
  console.log('File exists... old info below')

  // update file's logic
  let currentData = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) throw err;
  });
  
  // proccessing current data and pushing new data
  let objData = JSON.parse(currentData);
  objData.activityLog.push(newData);
  let strData = JSON.stringify(objData);

  //creating file with updated data...
  createLog(path, strData);
}

// Data Scheme
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