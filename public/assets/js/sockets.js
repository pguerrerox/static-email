var socket = io.connect('http://localhost');
socket.on('news', function (data) {
  // console.log(data);
  document.getElementById('activity').innerHTML = data.activityNumber;
  document.getElementById('success').innerHTML = data.successNumber;
  document.getElementById('sites').innerHTML = data.sites;
  console.log('updated');
})