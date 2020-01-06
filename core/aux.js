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
  hora = d.getHours();
  minuto = d.getMinutes();
  segundos = d.getSeconds();
  milisegundos = d.getMilliseconds();
  
  const dateString = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundos}.${milisegundos}Z`;
  return new Date(dateString);
};

function enumerate(){
  const init = 0;
  function plusOne(init){
    return init = (init + 1)
  }
  return leadingZero((plusOne(init)), 4);
};

module.exports = {
  dataBuilder: function(website, type, status){
    return {
      "id" : enumerate(),
      "fecha" : fecha(),
      "website" : website,
      "type": type,
      "status" : status
    }
  }
}