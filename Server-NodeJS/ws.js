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
            // ListAffaire
            if(message.slice() == 'ListAffaire'){
                console.log('ListAffaire : %s', message);
                const[rows, fields] = await con.execute('SELECT * FROM `Affaire`', []);
                ws.send('RepListAffaire : ' + JSON.stringify(rows))
            }
            // ListPV
            if(message.slice() == 'ListPV'){
                console.log('ListPV : %s', message);
                const[rows, fields] = await con.execute('SELECT * FROM `PV`', []);
                ws.send('RepListPV : ' + JSON.stringify(rows))
            }
            // ListEssai
            if(message.slice() == 'ListEssai'){
                console.log('ListEssai : %s', message);
                const[rows, fields] = await con.execute('SELECT * FROM `Essai`', []);
                ws.send('RepListEssai : ' + JSON.stringify(rows))
            }
            // ListUser
            if(message.slice() == 'ListUser'){
                console.log('ListUser : %s', message);
                const[rows, fields] = await con.execute('SELECT `id`, `Username`, `DateCreation` FROM `User`', []);
                ws.send('RepListUser : ' + JSON.stringify(rows))
            }
            // UserConnexion
            if(message.slice() == 'UserConnexion'){
                console.log('UserConnexion : %s', message);
                
            }
            // InfoAffaires
            if(message.slice() == 'InfoAffaires'){
                console.log('InfoAffaires : %s', message);
                
            }
            // DelPV
            if(message.split(';')[0] == 'DelPV'){
                console.log('DelPV : %s', message);
                idPV = message.split(';')[1];
                con.execute('DELETE FROM `PV` WHERE `PV`.`idPV` = ?', [idPV]);
                ws.send('DelPV : idPV ' + idPV + ' DELETE.');
            }
            // AddPV
            if(message.split(';')[0] == 'AddPV'){
                console.log('AddPV : %s', message);
                idPV = message.split(';')[1];
                con.execute('DELETE FROM `PV` WHERE `PV`.`idPV` = ?', [idPV]);
                ws.send('DelPV : idPV ' + idPV + ' DELETE.');
            }
            // UpdPV
            if(message.split(';')[0] == 'UpdPV'){
                console.log('UpdPV : %s', message);
                idPV = message.split(';')[1];
                con.execute('DELETE FROM `PV` WHERE `PV`.`idPV` = ?', [idPV]);
                ws.send('DelPV : idPV ' + idPV + ' DELETE.');
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