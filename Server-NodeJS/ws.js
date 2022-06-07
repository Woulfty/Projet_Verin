//  Import
const WebSocketServer = require('ws').Server;
const mysql = require('mysql2/promise');
const mysqldump = require('mysqldump');
const fs = require('fs');
const Importer = require('mysql-import');
const nodemailer = require('nodemailer');

//  Déclaration BDD
const BDD_IP = "192.168.65.20";
const BDD_USER = "verain";
const BDD_PWD = "verain";
const BDD_BASE = "Verin";
const host = BDD_IP;
const user = BDD_USER;
const password = BDD_PWD;
const database = BDD_BASE;

//  Déclaration Mail
const MAIL_USER = "mailverinprovidence@gmail.com";
const MAIL_PASS = "49USHX3iWPnWxF4";
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: MAIL_USER,
        pass: MAIL_PASS
    },
});

//  WebSocket
(async() => {
    // Création WebSocketServer
    const wss = new WebSocketServer({port: 40510});
    console.log("Serveur Lancé.");
    // Connect BDD
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
        // Message Reçu Répo
        ws.on('message', async function(message){
            // Définition String Message
            message = String(message);
            // Regex Anti HTML
            const regex = new RegExp('<.*>');
            if(regex.test(message) === false){
                // Trie
                if((message.slice() == 'ListAffaire') || (message.split(';')[0] == 'ListPV') || (message.split(';')[0] == 'ListPVID') || (message.split(';')[0] == 'ListEssai') || ((message.split(';')[0] == 'ListEssaiID') && (message.split(';')[1] > 0)) || (message.slice() == 'ListUser') || (message.split(';')[0] == 'UserConnexion') || (message.split(';')[0] == 'InfoAffaire') || (message.split(';')[0] == 'InfoEssai') || (message.split(';')[0] == 'InfoUser') || (message.split(';')[0] == 'InfoPV') || (message.split(';')[0] == 'DelPV') || (message.split(';')[0] == 'AddPV') || (message.split(';')[0] == 'UpdPV') || (message.split(';')[0] == 'ExpBDD') || (message.split(';')[0] == 'ImpBDD') || (message.split(';')[0] == 'ResBDD')){
                    // ListAffaire
                    if(message.slice() == 'ListAffaire'){
                        console.log('ListAffaire : %s', message);
                        try{
                            const[rows, fields] = await con.execute('SELECT * FROM `Affaire` ORDER BY `idAffaire` DESC', []);
                            ws.send('RepListAffaire' + ';' + rows.length + ';' + JSON.stringify(rows));
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepListAffaire' + ';' + error);
                        }
                    }
                    // ListPV
                    if(message.split(';')[0] == 'ListPV'){
                        console.log('ListPV : %s', message);
                        try{
                            const[rows, fields] = await con.execute('SELECT * FROM `PV` ORDER BY `idPV` ASC', []);
                            ws.send('RepListPV' + ';' + rows.length + ';' + JSON.stringify(rows));
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepListPV' + ';' + error);
                        }
                    }
                    // ListPVID
                    if((message.split(';')[0] == 'ListPVID') && (message.split(';')[1] > 0)){
                        console.log('ListPVID : %s', message);
                        idAffaire  = message.split(';')[1];
                        try{
                            const[rows, fields] = await con.execute('SELECT PV.idPV, PV.idAffaire, PV.Texte, PV.Date, User.Username FROM PV, User WHERE User.idUser = PV.idUser AND PV.idAffaire = ? ORDER BY `Date` DESC', [idAffaire]);
                            ws.send('RepListPVID' + ';ID=' + idAffaire + ';' + rows.length + ';' + JSON.stringify(rows));
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepListPVID' + ';' + error);
                        }
                    }
                    // ListEssai
                    if(message.split(';')[0] == 'ListEssai'){
                        console.log('ListEssai : %s', message);
                        try{
                            const[rows, fields] = await con.execute('SELECT * FROM `Essaie` ORDER BY `NumEssaie` ASC', []);
                            ws.send('RepListEssai' + ';' + rows.length + ';' + JSON.stringify(rows));
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepListEssai' + ';' + error);
                        }
                    }
                    // ListEssaiID
                    if((message.split(';')[0] == 'ListEssaiID') && (message.split(';')[1] > 0)){
                        console.log('ListEssaiID : %s', message);
                        idAffaire  = message.split(';')[1];
                        try{
                            const[rows, fields] = await con.execute('SELECT * FROM `Essaie` WHERE `idAffaire` = ? ORDER BY `NumEssaie` ASC', [idAffaire]);
                            ws.send('RepListEssaiID' + ';ID=' + idAffaire + ';' + rows.length + ';' + JSON.stringify(rows));
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepListEssaiID' + ';' + error);
                        }
                    }
                    // ListUser
                    if(message.slice() == 'ListUser'){
                        console.log('ListUser : %s', message);
                        try{
                            const[rows, fields] = await con.execute('SELECT `idUser`, `Username`, `DateCreation` FROM `User` ORDER BY `idUser` ASC', []);
                            ws.send('RepListUser' + ';' + rows.length + ';' + JSON.stringify(rows));
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepListUser' + ';' + error);
                        }                }
                    // UserConnexion
                    if(message.split(';')[0] == 'UserConnexion'){
                        console.log('UserConnexion : %s', message);
                        Username    = message.split(';')[1];
                        MdpUser     = message.split(';')[2];
                        try{
                            const[rows, fields] = await con.execute('SELECT `Username`,`idUser` FROM `User` WHERE `Username` = ? AND `Mdp` = MD5(?)', [Username,MdpUser]);
                            if(rows.length > 0){
                                console.log('RepUserConnexion' + ';' + 'true' + ';' + JSON.stringify(rows));
                                ws.send('RepUserConnexion' + ';' + 'true' + ';' + JSON.stringify(rows));
                            }
                            else{
                                console.log('RepUserConnexion' + ';' + 'false' + ';' + Username);
                                ws.send('RepUserConnexion' + ';' + 'false' + ';' + Username);
                            }
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepUserConnexion' + ';' + error);
                        }
                    }
                    // InfoAffaire
                    if((message.split(';')[0] == 'InfoAffaire') && (message.split(';')[1] > 0)){
                        console.log('InfoAffaires : %s', message);
                        idAffaire   = message.split(';')[1];
                        try{
                            const[rows, fields] = await con.execute('SELECT * FROM `Affaire` WHERE `idAffaire` = ?', [idAffaire]);
                            ws.send('RepInfoAffaire' + ';' + idAffaire + ';' + JSON.stringify(rows));
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepInfoAffaire' + ';' + error);
                        }
                    }
                    // InfoEssai
                    if((message.split(';')[0] == 'InfoEssai') && (message.split(';')[1] > 0)){
                        console.log('InfoEssai : %s', message);
                        idEssai     = message.split(';')[1];
                        try{
                            const[rows, fields] = await con.execute('SELECT * FROM `Essaie` WHERE `idEssaie` = ?', [idEssai]);
                            ws.send('RepInfoEssai' + ';' + idEssai + ';' + JSON.stringify(rows));
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepInfoEssai' + ';' + error);
                        }
                    }
                    // InfoUser
                    if((message.split(';')[0] == 'InfoUser') && (message.split(';')[1] > 0)){
                        console.log('InfoUser : %s', message);
                        idUser      = message.split(';')[1];
                        try{
                            const[rows, fields] = await con.execute('SELECT * FROM `User` WHERE `idUser` = ?', [idUser]);
                            ws.send('RepInfoUser' + ';' + idUser + ';' + JSON.stringify(rows));
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepInfoUser' + ';' + error);
                        }
                    }
                    // InfoPV
                    if((message.split(';')[0] == 'InfoPV') && (message.split(';')[1] > 0)){
                        console.log('InfoPV : %s', message);
                        idPV        = message.split(';')[1];
                        try{
                            const[rows, fields] = await con.execute('SELECT * FROM `PV` WHERE `idPV` = ?', [idPV]);
                            ws.send('RepInfoPV' + ';' + idPV + ';' + JSON.stringify(rows));
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepInfoPV' + ';' + error);
                        }
                    }
                    // DelPV
                    if((message.split(';')[0] == 'DelPV') && (message.split(';')[1] > 0)){
                        console.log('DelPV : %s', message);
                        idPV = message.split(';')[1];
                        try{
                            con.execute('DELETE FROM `PV` WHERE `PV`.`idPV` = ?', [idPV]);
                            ws.send('RepDelPV' + ';' + idPV + ';' + 'CONFIRM');
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepDelPV' + ';' + error);
                        }
                    }
                    // AddPV
                    if((message.split(';')[0] == 'AddPV') && (message.split(';')[1] > 0)){
                        console.log('AddPV : %s', message);
                        idUser      = message.split(';')[1];
                        idAffaire   = message.split(';')[2];
                        Texte       = message.split(';')[3];
                        try{
                            con.execute('INSERT INTO `PV` (`idUser`, `idAffaire`, `Texte`) VALUES (?, ?, ?)', [idUser, idAffaire, Texte]);
                            ws.send('RepAddPV' + ';' + 'CONFIRM');
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepAddPV' + ';' + error);
                        }
                    }
                    // UpdPV
                    if((message.split(';')[0] == 'UpdPV') && (message.split(';')[1] > 0) && (message.split(';')[2] != "") && (message.split(';')[3] != "")){
                        console.log('UpdPV : %s', message);
                        idPV        = message.split(';')[1];
                        Mail        = message.split(';')[2];
                        Texte       = message.split(';')[3];
                        if((Mail.length > '10') && (Mail.indexOf(".") != '-1') && (Mail.indexOf("@") != '-1')){
                            try{
                                await con.execute('UPDATE `PV` SET `Texte` = ? WHERE `PV`.`idPV` = ?', [Texte, idPV]);
                                ws.send('RepUpdPV' + ';' + idPV + ';' + 'CONFIRM');
                                console.log('UpdPV : ACCEPT');
                                // Envoyer un mail
                                var mailOptions = {
                                    from: MAIL_USER, 
                                    to: Mail, 
                                    subject: "Update PV " + idPV, 
                                    text: "MESSAGE AUTOMATIQUE\n\nLe PV " + idPV + " a été modifié :\n" + Texte
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                    if(error){
                                        console.log(error);
                                    }
                                    else{
                                        console.log('Email envoyé : ' + info.response);
                                    }
                                })
                            }catch(error){
                                console.log("Erreur de connexion à la base de données", error);
                                ws.send('RepUpdPV' + ';' + error);
                            }
                        }
                        else{ // Autre
                            ws.send('RepUpdPV' + ';' + idPV + ';' + 'REFUS : Champ(s) incomplet(s).');
                            console.log('UpdPV : REFUS');
                        }
                    }
                    // ExpBDD
                    if(message.split(';')[0] == 'ExpBDD'){
                        console.log('ExpBDD : %s', message);
                        try{
                            // Récupération de la BDD
                            await mysqldump({
                                connection:{
                                    host:       BDD_IP,
                                    user:       BDD_USER,
                                    password:   BDD_PWD,
                                    database:   BDD_BASE
                                },
                                // Création du fichier
                                dumpToFile:'./BDD_files/BDD_Export.sql',
                            });
                            // Récupération du Fichier
                            const BDD_Files = fs.readFileSync('./BDD_files/BDD_Export.sql','utf8');
                            // Transformation et communication data
                            String(BDD_Files);
                            ws.send('RepExpBDD' + ';' + BDD_Files);
                            console.log('RepExpBDD' + ';' + 'CONFIRM');
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepExpBDD' + ';' + error);
                        }
                    }
                    // ImpBDD
                    if((message.split(';')[0] == 'ImpBDD')){
                        message = message.slice(7); // Retrait du "ImpBDD;"
                        if((message.indexOf("Affaire") != '-1') && (message.indexOf("Essaie") != '-1') && (message.indexOf("PV") != '-1') && (message.indexOf("User") != '-1')){
                            console.log('ImpBDD : %s', message);
                            // Définition BDD_Temps
                            fs.writeFile('./BDD_files/BDD_Temps.sql', message, err => {
                                if (err) {
                                    console.error(err)
                                    return
                                }
                            })
                            try{
                                // Importation BDD
                                const BDD_Import = new Importer({host, user, password, database});
                                // Suppresion ancienne BDD
                                await con.execute('DROP TABLE `Essaie`, `PV`, `Affaire`, `User`');
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
                            }catch(error){
                                console.log("Erreur de connexion à la base de données", error);
                                ws.send('RepImpBDD' + ';' + error);
                            }
                        }
                        else{
                            console.log('ImpBDD : MISSING');
                            ws.send('RepImpBDD' + ';' + `ERROR : Missing TABLE`);
                        }
                    }
                    // ResBDD
                    if(message.split(';')[0] == 'ResBDD'){
                        console.log('ResBDD : %s', message);
                        try{
                            // Importation BDD
                            const BDD_Import = new Importer({host, user, password, database});
                            // Suppresion ancienne BDD
                            await con.execute('DROP TABLE IF EXISTS `Essaie`, `PV`, `Affaire`, `User`');
                            // Importation BDD
                            BDD_Import.onProgress(progress=>{
                                var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
                                // Réponse
                                console.log(`${percent}% Completé`);
                                ws.send('RepResBDD' + ';' + `${percent}%`);
                            });
                            BDD_Import.import('./BDD_files/BDD_Default.sql').then(()=>{
                                var files_imported = BDD_Import.getImported();
                                console.log(`${files_imported.length} SQL file(s) imported.`);
                            }).catch(err=>{
                                // Réponse
                                ws.send('RepResBDD' + ';' + 'ERREUR' + ';' + err);
                                console.error(err);
                            });
                        }catch(error){
                            console.log("Erreur de connexion à la base de données", error);
                            ws.send('RepResBDD' + ';' + error);
                        }
                    }
                }
                // Autres
                else if(message.slice() != 'connected'){
                    console.log('Reçu inconnu : %s', message);
                }
            }
            else{
                console.log('Refus : Vérification Positive.');
            }
        })
    });
})();