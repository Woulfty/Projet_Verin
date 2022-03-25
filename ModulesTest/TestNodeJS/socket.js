var ws = new WebSocket("ws://192.168.65.44:40510");

ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected')
}
ws.addEventListener("message", async (event, isBinary ) => {
    console.log( event.data )
})