//  Import
const WebSocketServer = require('ws').Server;
const mysql = require('mysql2/promise');
const mysqldump = require('mysqldump');
const fs = require('fs');
const Importer = require('mysql-import');

//  Déclaration BDD
const BDD_IP = "192.168.65.20";
const BDD_USER = "verain";
const BDD_PWD = "verain";
const BDD_BASE = "verain";
const host = BDD_IP;
const user = BDD_USER;
const password = BDD_PWD;
const database = BDD_BASE;

//  WebSocket
(async() => {
    // Création WebSocketServer
    const wss = new WebSocketServer({port: 40510});
    console.log("Serveur Lancé.");

    try{
        var con = await mysql.createConnection({
            host:       BDD_IP,
            user:       BDD_USER,
            password:   BDD_PWD,
            database:   BDD_BASE
        });
    }catch(error){
        console.log("Erreur de connexion à la base de données", error);
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
            // Définition String Message
            message = String( message );
            // ListAffaire
            if(message.slice() == 'ListAffaire'){
                console.log('ListAffaire : %s', message);
                const[rows, fields] = await con.execute('SELECT `idAffaire` FROM `Affaire` ORDER BY `idAffaire` ASC', []);
                ws.send('RepListAffaire' + ';' + rows.length + ';' + JSON.stringify(rows));
            }
            // ListPV
            if(message.slice() == 'ListPV'){
                console.log('ListPV : %s', message);
                const[rows, fields] = await con.execute('SELECT * FROM `PV` ORDER BY `idPV` ASC', []);
                ws.send('RepListPV' + ';' + rows.length + ';' + JSON.stringify(rows));
            }
            // ListEssai
            if(message.slice() == 'ListEssai'){
                console.log('ListEssai : %s', message);
                const[rows, fields] = await con.execute('SELECT * FROM `Essai` ORDER BY `idEssai` ASC', []);
                ws.send('RepListEssai' + ';' + rows.length + ';' + JSON.stringify(rows));
            }
            // ListEssaiID
            if(message.split(';')[0] == 'ListEssaiID'){
                console.log('ListEssaiID : %s', message);
                EssaiID  = message.split(';')[1];
                const[rows, fields] = await con.execute('SELECT * FROM `Essai` WHERE `idEssai` = ? ORDER BY `idEssai` ASC', [EssaiID]);
                ws.send('RepListEssaiID' + ';ID=' + EssaiID + ';' + rows.length + ';' + JSON.stringify(rows));
            }
            // ListUser
            if(message.slice() == 'ListUser'){
                console.log('ListUser : %s', message);
                const[rows, fields] = await con.execute('SELECT `idUser`, `Username`, `DateCreation` FROM `User` ORDER BY `idUser` ASC', []);
                ws.send('RepListUser' + ';' + rows.length + ';' + JSON.stringify(rows));
            }
            // UserConnexion
            if(message.split(';')[0] == 'UserConnexion'){
                console.log('UserConnexion : %s', message);
                Username    = message.split(';')[1];
                MdpUser     = message.split(';')[2];
                const[rows, fields] = await con.execute('SELECT `Username` FROM `User` WHERE `Username` = ? AND `Mdp` = ?', [Username,MdpUser]);
                console.log(rows)
                if(rows.length > 0){
                    console.log('RepUserConnexion' + ';' + Username + ';' + 'true');
                    ws.send('RepUserConnexion' + ';' + Username + ';' + 'true');
                }
                else{
                    console.log('RepUserConnexion' + ';' + Username + ';' + 'false');
                    ws.send('RepUserConnexion' + ';' + Username + ';' + 'false');
                }
            }
            // InfoAffaire
            if(message.split(';')[0] == 'InfoAffaire'){
                console.log('InfoAffaires : %s', message);
                idAffaire   = message.split(';')[1];
                const[rows, fields] = await con.execute('SELECT * FROM `Affaire` WHERE `idAffaire` = ?', [idAffaire]);
                ws.send('RepInfoAffaire' + ';' + idAffaire + ';' + JSON.stringify(rows));
            }
            // InfoEssai
            if(message.split(';')[0] == 'InfoEssai'){
                console.log('InfoEssai : %s', message);
                idEssai     = message.split(';')[1];
                const[rows, fields] = await con.execute('SELECT * FROM `Essai` WHERE `idEssai` = ?', [idEssai]);
                ws.send('RepInfoEssai' + ';' + idEssai + ';' + JSON.stringify(rows));
            }
            // InfoUser
            if(message.split(';')[0] == 'InfoUser'){
                console.log('InfoUser : %s', message);
                idUser      = message.split(';')[1];
                const[rows, fields] = await con.execute('SELECT * FROM `User` WHERE `idUser` = ?', [idUser]);
                ws.send('RepInfoUser' + ';' + idUser + ';' + JSON.stringify(rows));
            }
            // InfoPV
            if(message.split(';')[0] == 'InfoPV'){
                console.log('InfoPV : %s', message);
                idPV        = message.split(';')[1];
                const[rows, fields] = await con.execute('SELECT * FROM `PV` WHERE `idPV` = ?', [idPV]);
                ws.send('RepInfoPV' + ';' + idPV + ';' + JSON.stringify(rows));
            }
            // DelPV
            if(message.split(';')[0] == 'DelPV'){
                console.log('DelPV : %s', message);
                idPV = message.split(';')[1];
                con.execute('DELETE FROM `PV` WHERE `PV`.`idPV` = ?', [idPV]);
                ws.send('RepDelPV' + ';' + idPV + ';' + 'CONFIRM');
            }
            // AddPV
            if(message.split(';')[0] == 'AddPV'){
                console.log('AddPV : %s', message);
                idUser      = message.split(';')[1];
                idAffaire   = message.split(';')[2];
                Texte       = message.split(';')[3];
                con.execute('INSERT INTO `PV` (`idUser`, `idAffaire`, `Texte`) VALUES (?, ?, ?)', [idUser, idAffaire, Texte]);
                ws.send('RepAddPV' + ';' + 'CONFIRM');
            }
            // UpdPV
            if(message.split(';')[0] == 'UpdPV'){
                console.log('UpdPV : %s', message);
                idPV        = message.split(';')[1];
                Texte       = message.split(';')[2];
                con.execute('UPDATE `PV` SET `Texte` = ? WHERE `PV`.`idPV` = ?', [Texte, idPV]);
                ws.send('RepUpdPV' + ';' + idPV + ';' + 'CONFIRM');
            }
            // ExpBDD
            if(message.split(';')[0] == 'ExpBDD'){
                console.log('ExpBDD : %s', message);
                // Récupération de la BDD
                await mysqldump({
                    connection:{
                        host:       BDD_IP,
                        user:       BDD_USER,
                        password:   BDD_PWD,
                        database:   BDD_BASE
                    },
                    // Création du fichier
                    dumpToFile:'./BDD_files/dump.sql',
                });
                // Récupération du Fichier
                const BDD_Files = fs.readFileSync('./BDD_files/dump.sql','utf8');
                // Transformation et communication data
                String(BDD_Files);
                ws.send('RepExpBDD' + ';' + BDD_Files);
                console.log('RepExpBDD' + ';' + 'CONFIRM');
            }
            // ImpBDD
            if(message.split(';')[0] == 'ImpBDD'){
                console.log('ImpBDD : %s', message);
                // Définition BDD_Temps
                const content = message.slice(8);
                fs.writeFile('./BDD_files/BDD_Temps.sql', content, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
                // Suppresion ancienne BDD
                con.execute('TRUNCATE `verain`.`Affaire`');
                con.execute('TRUNCATE `verain`.`Essai`');
                con.execute('TRUNCATE `verain`.`PV`');
                con.execute('TRUNCATE `verain`.`User`');
                // Importation BDD
                const BDD_Import = new Importer({host, user, password, database});
                BDD_Import.onProgress(progress=>{
                    var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
                    // Réponse
                    console.log(`${percent}% Completé`);
                    ws.send('RepImpBDD' + ';' + `${percent}%`);
                });
                BDD_Import.import('./BDD_files/BDD_Temps.sql').then(()=>{
                    var files_imported = BDD_Import.getImported();
                    console.log(`${files_imported.length} SQL file(s) imported.`);
                }).catch(err=>{
                    // Réponse
                    ws.send('RepImpBDD' + ';' + 'ERREUR' + ';' + err);
                    console.error(err);
                });
            }
            // ResBDD
            if(message.split(';')[0] == 'ResBDD'){
                console.log('ResBDD : %s', message);
                // Suppresion ancienne BDD
                con.execute('TRUNCATE `verain`.`Affaire`');
                con.execute('TRUNCATE `verain`.`Essai`');
                con.execute('TRUNCATE `verain`.`PV`');
                con.execute('TRUNCATE `verain`.`User`');
                // Importation BDD
                const BDD_Import = new Importer({host, user, password, database});
                BDD_Import.onProgress(progress=>{
                    var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
                    // Réponse
                    console.log(`${percent}% Completé`);
                    ws.send('RepResBDD' + ';' + `${percent}%`);
                });
                BDD_Import.import('./BDD_files/dump.sql').then(()=>{
                    var files_imported = BDD_Import.getImported();
                    console.log(`${files_imported.length} SQL file(s) imported.`);
                }).catch(err=>{
                    // Réponse
                    ws.send('RepResBDD' + ';' + 'ERREUR' + ';' + err);
                    console.error(err);
                });
            }
            // Autres
            else if(message.slice() != 'connected'){
                console.log('Reçu : %s', message);
            }
        })
    });
})();