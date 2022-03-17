var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510})

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })

  ws.on('UserConnexion', (pseudo, mdp) => {
    console.log('Pseudo: ' + pseudo);
    console.log('Mot de passe: ' + mdp);

    var result = "1";
    
    if(pseudo == "woulfty" || mdp == "123"){
      ws.send("ConnectionTrue", result)
    }
  });
  

  setInterval(
    () => ws.send(`${new Date()}`),
    2000
  )
})
