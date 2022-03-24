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
                    ws.send("Connexion établie.");
                });
            // Request ListAffaires 
                ws.on('ListAffaires', function (message){
                    console.log('received: %s', message);
                    ws.send("ListAffaires Reponse.");
                })
            // Request Calculs Rendements
                ws.on('CalcRends', function (message){
                    console.log('received: %s', message);
                    ws.send("Connexion établie.");
                })
            // Request Enregistrement Essai
                ws.on('CalcRends', function (message){
                    console.log('received: %s', message);
                    ws.send("Connexion établie.");
                })
            // Request BDD Exportation
                ws.on('CalcRends', function (message){
                    console.log('received: %s', message);
                    ws.send("Connexion établie.");
                })
            // Request BDD Importation
                ws.on('CalcRends', function (message){
                    console.log('received: %s', message);
                    ws.send("Connexion établie.");
                })
            // Request BDD Initialisation
                ws.on('CalcRends', function (message){
                    console.log('received: %s', message);
                    ws.send("Connexion établie.");
                })
    })

// Création MySQL
    const mysql = require('mysql');
    const db = mysql.createConnection({
        host:"192.168.65.20",
        user:"root",
        password:"root"
    });
// Connexion BDD
    db.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
    });