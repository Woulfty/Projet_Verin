var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510})

wss.on('connection', function (ws) {
  console.log("Nouvelle conexion");
  ws.send("Connecxion établie.");

  ws.on('message', function (message) {
    console.log('received: %s', message)
  })

  setInterval(
      () => ws.send(`${new Date()}`),
    1000
  )

  ws.on('UserConnexion', (pseudo, mdp) => {
    console.log('Pseudo: ' + pseudo);
    console.log('Mot de passe: ' + mdp);

    var result = "1";

    if(pseudo == "woulfty" || mdp == "123"){
      ws.send("ConnectionTrue", result)
    }
  });
})
