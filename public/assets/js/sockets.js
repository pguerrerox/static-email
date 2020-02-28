var socket = io.connect(window.location.hostname+':'+window.location.port);
socket.on('news', function (data) {
  // console.log(data);
  document.getElementById('activity').innerHTML = data.activityNumber;
  document.getElementById('success').innerHTML = data.successNumber;
  document.getElementById('sites').innerHTML = data.sites;
  // document.getElementById('logs').innerHTML = renderLog(data.logArray);
  renderLog(data.logArray);
  console.log('updated');

  function renderLog(data){
    let completeLog = [];
    data.forEach(x => {
      let row = `
        <pre class="logging">
          <span class="log1">${x.fecha}</span>
          <span class="log2">-[${x.id}]-</span>
          <span class="log3">[type: ${x.type}]</span>
          <span>[website: ${x.website}]</span>
          <span>[status: ${x.status}]</span>
        </pre>
      `
      completeLog += row;
    });
    return document.getElementById('logs').innerHTML = completeLog 
  }
})