// Création WebSocketServer
var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 40510});

// Lancement WebSocketServer
wss.on('connection', function (ws){
    // News Connexion
        console.log("Nouvelle connexion");
        ws.send("Connexion établie.");
    // Lancement Date loop for 10 Secondes
        setInterval(() =>
            ws.send(`${new Date()}`)
        ,10 * 1000)
    // Message Reçu
        ws.on('message', function (message) {
            console.log('received: %s', message)
        })
    // Request UserConnexion
        ws.on('UserConnexion', (pseudo, mdp) => {
            console.log('Pseudo: ' + pseudo);
            console.log('Mot de passe: ' + mdp);
            var result = "1";
            if(pseudo == "woulfty" || mdp == "123"){
                ws.send("ConnexionTrue", result)
            }
        });
})