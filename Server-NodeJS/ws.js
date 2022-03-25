const WebSocketServer = require('ws').Server;
const mysql = require('mysql2/promise');

(async() => {
    // Création WebSocketServer
    const wss = new WebSocketServer({port: 40510});
    console.log("Serveur Lancé.");

    try{
        var con = await mysql.createConnection({
            host:"192.168.65.20",
            user:"root",
            password:"root",
            database : "verain"
        });
    }catch(error){
        console.log("Erreure de connexion à la base de données", error);
    }

    // Lancement WebSocketServer
    wss.on( 'connection', function (ws){
        // News Connexion
        console.log("Nouvelle connexion.");
        ws.send("Connexion établie.");
        // Lancement Date loop for 10 Secondes
        setInterval(() =>
            ws.send(`Temps : ${new Date()}`)
        ,30 * 1000)
        // Message Reçu Répo
        ws.on('message', async function(message){
            message = String( message );
            // ListeAffaires
            if(message.slice() == 'ListAffaires'){
                console.log('ListAffaires : %s', message);
                const[rows, fields] = await con.execute('SELECT `ID` FROM `Affaire`', []);
                ws.send('RepListAffaires : ' + JSON.stringify(rows))
            }
            // UserConnexion
            if(message.slice() == 'UserConnexion'){
                console.log('UserConnexion : %s', message);
                
            }
            // InfoAffaires
            if(message.slice() == 'InfoAffaires'){
                console.log('InfoAffaires : %s', message);
                
            }
            // Essais
            if(message.slice() == 'Essais'){
                console.log('Essais : %s', message);
                
            }
            // DelPv
            if(message.split(';')[0] == 'DelPv'){
                console.log('DelPv : %s', message);
                idPV = message.split(';')[1];
                con.execute('DELETE FROM `PV` WHERE `PV`.`idPV` = ?', [idPV]);
                ws.send('DelPv : idPV + ' + idPV + ' DELETE.');
            }
            // AddPv
            if(message.slice() == 'AddPv'){
                console.log('AddPv : %s', message);
                
            }
            // UpdPv
            if(message.slice() == 'UpdPv'){
                console.log('UpdPv : %s', message);
                
            }
            // ExpBDD
            if(message.slice() == 'ExpBDD'){
                console.log('ExpBDD : %s', message);
                
            }
            // ImpBDD
            if(message.slice() == 'ImpBDD'){
                console.log('ImpBDD : %s', message);
                
            }
            // ResBDD
            if(message.slice() == 'ResBDD'){
                console.log('ResBDD : %s', message);
                
            }
            // Autres
            else if(message.slice() != 'connected'){
                console.log('Reçu : %s', message);
            }
        })
    });
})();