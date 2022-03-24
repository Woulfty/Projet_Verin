// Création WebSocketServer
    var WebSocketServer = require('ws').Server;
    wss = new WebSocketServer({port: 40510});
    console.log("Serveur Lancé.");

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
                console.log('received: %s', message);
            })
        // Request
            // Request UserConnexion
                ws.on('UserConnexion', function (message){
                    console.log('received: %s', message);
                });
            // Request Calculs Rendements
                ws.on('ListeAffaire', function (message){
                    console.log('received: %s', message);
                })
            // Request Enregistrement Essai
                ws.on('CalcRends', function (message){
                    console.log('received: %s', message);
                })
            // Request BDD Exportation
                ws.on('CalcRends', function (message){
                    console.log('received: %s', message);
                })
            // Request BDD Importation
                ws.on('CalcRends', function (message){
                    console.log('received: %s', message);
                })
            // Request BDD Initialisation
                ws.on('CalcRends', function (message){
                    console.log('received: %s', message);
                })
    })