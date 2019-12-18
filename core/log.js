'use strict'

// libraries
let fs = require('fs');

let activityLog = '../logs/cabeza.txt';

let toWrite = [
  {
    uid: "asdf123",
    number: "001",
    date: "",
    status: "ok",
    emailTo: "pguerrerox@gmail.com",
  },
];

// function to create file
const createLog = function(path, data){
  console.log(`Creating file... ${path}`);
  fs.writeFile(path, data, (err) => {
    if (err) throw err;
    console.log('File was created...');
  });
}

// function to update file
const updateLog = function(path, data){
  console.log(`Updating file... ${path}`);
  console.log(path);
  console.log(data);
  console.log('Verificando si el archivo existe..');
  let fileExistence = fs.existsSync(path);
  console.log(fileExistence);

  // fs.readFile(path, (err, data) => {
  //   // if err createLog
  //   if(err){
  //     console.log('File doest exist.. info below...');
  //     console.log(path);
  //     console.log(this.data);
  //   } else {
  //     console.log(`The file exist with data... ${data}`)
  //   }
  //   // else updatelog
  // });

}

// createLog(activityLog, "dimelo palomon");
updateLog(activityLog, 'klk');

// let x = fs.readFile(activityLog, 'utf8', function(err, data ){
//   if (!err){
//     console.log('File was updated...');
//   } else {
//     console.log('File was created... ')
//   }
// })
// x;

module.exports = function(){}