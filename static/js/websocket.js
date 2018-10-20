let ws = new WebSocket("ws://localhost:8888/ws");
ws.onmessage = function(evt) {
  let msg = document.createElement('p');
  msg.textContent = evt.data;
  document.getElementById('msgbox').appendChild(msg);
};

function sendMessage()  {
  if (document.getElementById('msg').value != "") {
    let m = document.getElementById('msg');
    ws.send(m.value);
    document.getElementById('msg').value = "";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('send').addEventListener('click', sendMessage);
  document.getElementById('msg').addEventListener('keydown', handleKeydown);
}, false);

function handleKeydown(e){
  let keyCode = e.keyCode;
  if (keyCode == 13) {
    sendMessage();
  }
}
