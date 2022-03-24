var ws = new WebSocket("ws://192.168.65.44:40510");
ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected')
}
ws.onmessage = function (ev) {
    console.log(ev);
}


form.addEventListener('submit', function(e) {

});