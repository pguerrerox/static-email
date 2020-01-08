'use strict'

function leadingZero(value, len){
  let valueStr = String(value);
  let lead = "0";
  while(valueStr.length < len){
    valueStr = lead.concat(valueStr);
  }
  return valueStr
};

function fecha(){
  const d = new Date();
  let ano, mes, dia, hora,minuto, segundos, milisegundos;
  
  ano = d.getFullYear();
  mes = leadingZero((d.getMonth()+1),2);
  dia = leadingZero(d.getDate(),2);
  hora = leadingZero(d.getHours(),2);
  minuto = leadingZero(d.getMinutes(),2);
  segundos = leadingZero(d.getSeconds(),2);
  milisegundos = d.getMilliseconds();
  
  const dateString = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundos}.${milisegundos}Z`;
  return dateString;
};

let enumerate = function(){
  let init = 0;
  return function(){
    init ++;
    return leadingZero(init, 4);
  }
}()

module.exports = {
  dataBuilder: function(website, type, status){
    return {
      "id" : enumerate(),
      "fecha" : fecha(),
      "type": type,
      "website" : website,
      "status" : status
    }
  }
}