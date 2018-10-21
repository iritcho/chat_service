const KEY_CODE_ENTER = 13;
const STRING_ENMPTY = "";

let ws = new WebSocket("ws://localhost:8888/ws");
ws.onmessage = function(evt) {
  let msg = document.createElement('p');
  msg.textContent = evt.data;
  document.getElementById('msgbox').appendChild(msg);
};

function sendMessage()  {
  if (document.getElementById('msg').value !== STRING_ENMPTY) {
    let m = document.getElementById('msg');
    ws.send(m.value);
    document.getElementById('msg').value = STRING_ENMPTY;
  }
}

function handleClick() {
  sendMessage();
}

function handleKeydown(e){
  let keyCode = e.keyCode;
  if (keyCode === KEY_CODE_ENTER) {
    sendMessage();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('send').addEventListener('click', handleClick);
  document.getElementById('msg').addEventListener('keydown', handleKeydown);
}, false);
