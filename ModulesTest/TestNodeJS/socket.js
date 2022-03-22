var ws = new WebSocket("ws://192.168.65.44:40510");

ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected')
}

ws.onmessage = function (ev) {
    console.log(ev);
}

var form = document.getElementById('form');
var pseudo = document.getElementById('pseudo');
var mdp = document.getElementById('mdp');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (pseudo.value || mdp.value) {
        ws.send('UserConnexion', pseudo.value , mdp.value);
    }else{
    }
});