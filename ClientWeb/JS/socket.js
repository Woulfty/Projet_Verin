//connexion du socket au serveur
const ws = new WebSocket("ws://192.168.65.44:40510");
//const ws = new WebSocket("ws://192.168.64.183:40510");

//récupération de la barre de navigation
navigation = document.getElementById('navigation');

//récupération du loarder
dloader = document.getElementById('dloader');

//boutton de la barre
var toggle = document.getElementById('toggle');

//affichage de la page de connexion
dconnexion = document.getElementById('dconnexion');

//affichage de l'affaire
daffaire = document.getElementById('daffaire');

dloader.style.display = "block"
toggle.style.display = "none"
dconnexion.style.display = "none"
navigation.style.display = "none"
daffaire.style.display = "none";

//erreur
ws.addEventListener('error', function(event) {
    console.log('Erreur WebSocket : ', event);
    dloader.style.display = "block"
    toggle.style.display = "none"
    dconnexion.style.display = "none"
    navigation.style.display = "none"
    daffaire.style.display = "none";
});

//reception d'un message
ws.addEventListener("message", async(event, isBinary) => {
    console.log(event.data)

    // Définition String Message
    message = String(event.data);
    //alert('poopy');
    //récéption de la connexion
    if (message.split(';')[0] == 'RepUserConnexion') {
        //découpage du message
        var registerRep = message.split(';')[1];
        //condition si l'utilisateur n'existe pas ou si le login et le mot de passe ne correspondes pas 
        if (registerRep == "false") {
            alert("Identifiants incorectes");
        }
        //condition si l'utilisateur exsite et qu'il a entrer le bon mot de passe et login
        if (registerRep == "true") {
            var Json = message.split(';')[2];
            //découpage du dossier json
            var data = JSON.parse(Json);

            var idUser = data[0].idUser;
            var username = data[0].Username;

            //on cache la div de connexion
            dconnexion = document.getElementById('dconnexion');
            dconnexion.style.display = "none";
            //on cache le bouton de connexion
            bconnexion = document.getElementById('bconnexion');
            bconnexion.style.display = "none";
            //apparition de la div de déconnexion
            var bdeco = document.getElementById('bdeco');
            bdeco.style.display = "block";
            //apparition du bouton de visualisation des Affaires
            var bpv = document.getElementById('bpv');
            bpv.style.display = "block";
            //apparition de la div de téléverement de fichier
            var bdoc = document.getElementById('bdoc');
            bdoc.style.display = "block";
            //apparition de la div de visualisation des affaire
            var dpv = document.getElementById('dpv');
            dpv.style.display = "block";
            //apparition de la div de visualisation des affaire
            daffaire = document.getElementById('daffaire');
            daffaire.style.display = "none";
            //création du cookie
            function setCookie(cvalue, exdays) {
                const d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                let expires = "expires=" + d.toUTCString();
                document.cookie = "username = " + cvalue + ";" + expires + ";path=/";
            }
            setCookie(idUser, "30");

            //demande des affaires au serveur
            ws.send('ListAffaire');
        }
    }
    //récéption des infos affaires
    if (message.split(';')[0] == 'RepListAffaire') {
        //taille du message
        var Datasize = message.split(';')[1];
        //données
        var Json = message.split(';')[2];
        //découpage du dossier json
        var data = JSON.parse(Json);
        //récupération du tableau
        var affaireTable = document.getElementById('affaire');
        //ajout des valeurs
        for (var i = 0; i < Datasize; ++i) {
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');

            tr.id = data[i].idAffaire;
            tr.classList.add("traffaire");
            td1.classList.add("traffaire");
            td2.classList.add("traffaire");
            td3.classList.add("traffaire");
            td1.id = data[i].idAffaire;
            td2.id = data[i].idAffaire;
            td3.id = data[i].idAffaire;
            td1.innerHTML = "Affaire n°" + data[i].idAffaire;
            td3.innerHTML = data[i].Date[11] + data[i].Date[12] + ":" + data[i].Date[14] + data[i].Date[15];
            td2.innerHTML = data[i].Date[8] + data[i].Date[9] + "/" + data[i].Date[5] + data[i].Date[6] + "/" + data[i].Date[0] + data[i].Date[1] + data[i].Date[2] + data[i].Date[3];

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            affaireTable.appendChild(tr);
        }
    }
    //récéption des information de l'affaire
    if (message.split(';')[0] == 'RepInfoAffaire') {
        //apparition de la div de visualisation des affaire
        dpv = document.getElementById('dpv');
        dpv.style.display = "none";
        toggle = document.getElementById('toggle');
        toggle.style.display = "none"
        navigation = document.getElementById('navigation');
        navigation.style.display = "none"

        //apparition de la div de visualisation des affaire
        daffaire = document.getElementById('daffaire');
        daffaire.style.display = "block";
        //id de l'affaire
        var ID = message.split(';')[1];
        //données
        var Json = message.split(';')[2];
        //récupération de la div ou j'affiche mes affaires
        var divaffaire = document.getElementById('infothisaffaire');
        //découpage du dossier json
        var dataJson = JSON.parse(Json);

        //création des éléments
        var h3title = document.getElementById('h3title');
        var divinfo = document.createElement('div');
        var canvas = document.getElementById('MyCanvas');
        //ajout des class
        divinfo.classList.add("affaire");
        //ajout des id
        divinfo.id = "infothisaffaire";
        //ajout des informations
        h3title.innerHTML = "Affaire numéro : " + ID;

    }
    //affichage de la courbes de pression
    if (message.split(';')[0] == 'RepListEssaiID') {

        var Datasize = message.split(';')[2];
        var Json = message.split(';')[3];
        var datacourbe = JSON.parse(Json);
        var arr = [];
        var array = [];
        for (let Startdata = 1; Startdata <= Datasize; Startdata++) {
            arr.push(Startdata);
        }
        for (var i = 0; i < Datasize; ++i) {
            array.push(datacourbe[i].Grandeur);
        }

        //courbe
        const NUMBER_CFG = array;
        const labels = arr;
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                //data: [0, 10, 5, 2, 20, 30, 45, 26, 35, 21, 12, 37, 4],
                data: NUMBER_CFG,
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {}
        };
        myCanvas = new Chart(
            document.getElementById('myCanvas'),
            config
        );

    }
    //récéption des Pv de l'affaire
    if (message.split(';')[0] == 'RepListPVID') {
        //taille du message
        var Datasize = message.split(';')[2];
        //données
        var Json = message.split(';')[3];
        //découpage du dossier json
        var data = JSON.parse(Json);
        //récupération du tableau
        var pvTable = document.getElementById('pv');
        //création des données
        for (var i = 0; i < Datasize; ++i) {

            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');

            var updatebutton = document.createElement('button');
            var deletebutton = document.createElement('button');
            updatebutton.classList.add('updatebutton');
            deletebutton.classList.add('deletebutton');
            updatebutton.type = "button";
            deletebutton.type = "button";
            updatebutton.value = "modifier";
            deletebutton.value = "supprimer";
            updatebutton.innerHTML = `<ion-icon id="create" name="create-outline"></ion-icon>`;
            deletebutton.innerHTML = `<ion-icon id="trash" name="trash-outline"></ion-icon>`;

            updatebutton.id = data[i].idPV;
            deletebutton.id = data[i].idPV;
            td1.id = data[i].idPV;
            var date = data[i].Date;
            date.split('T')[10];

            td1.innerHTML = data[i].Texte;
            td2.innerHTML = date[8] + date[9] + "/" + date[5] + date[6] + "/" + date[0] + date[1] + date[2] + date[3];
            td3.innerHTML = date[11] + date[12] + date[13] + date[14] + date[15];
            td4.appendChild(updatebutton)
            td4.appendChild(deletebutton)
                // Définition de l'enfant
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            pvTable.appendChild(tr);

        }
    }
    //récéption de la base
    if (message.split(';')[0] == 'RepExpBDD') {
        var BDD = message.slice(13);

        var blob = new Blob([BDD], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "dynamic.txt");

    }
    //récéption des information du Pv
    if (message.split(';')[0] == 'RepInfoPV') {

    }
    //récéption des essais de l'affaire
    if (message.split(';')[0] == 'RepListEssai') {

    }
    if (message.split(";")[0] == 'RepAddPV'){
        if(message.split(";")[1] == 'CONFIRM'){
            var texteadd = document.getElementById('textefornewpv');
            texteadd.value = '';
            alert('Le Pv a été ajouté');
        }
    }
})

//Erreur du socket
ws.addEventListener('error', function(event) {
    navigation.style.display = "none";
    dloader.style.display = "block";
    console.log('WebSocket error: ', event);
});

//Quand le socket c'est connecter
ws.onopen = function() {
    //vérification du cookie
    //checkCookie();
    console.log('websocket is connected ...');

    ws.send('connected');
    //loader
    dloader = document.getElementById('dloader');
    dloader.style.display = "none";
    //barre de navigation
    //navigation = document.getElementById('navigation');
    navigation.style.display = "block";
    //boutton de la barre
    toggle = document.getElementById('toggle');
    toggle.style.display = "block";
    //affichage de la page de connexion
    dconnexion = document.getElementById('dconnexion');
    dconnexion.style.display = "block";

    //récupération des valeurs dans les champs de connexion
    var form = document.getElementById('form');
    var pseudo = document.getElementById('pseudo');
    var mdp = document.getElementById('mdp');
    //envoie des données au serveurs
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (pseudo.value && mdp.value) {
            ws.send('UserConnexion' + ';' + pseudo.value + ';' + mdp.value);
            pseudo.value = '';
            mdp.value = '';
        } else {
            alert("veuillez remplir les champs");
        }
    });
    //déconnexion
    var formdeco = document.getElementById('formdeco');
    formdeco.addEventListener('submit', function(e) {
        e.preventDefault();
        location.reload();
    });

    //Quand un utilisateur clique sur une affaire
    document.addEventListener("click", (event) => {
        if (event.target.classList.value == "traffaire") {
            //event.target.id
            ws.send('InfoAffaire;' + event.target.id);
            ws.send('ListEssaiID;' + event.target.id);
            ws.send('ListPVID;' + event.target.id);
        }
        //réinitialisation de la BDD
        if (event.target.classList.value == "reset") {
            //confirmation de l'action
            if (confirm("Veuillez confirmer la réinitialisation") == true) {
                console.log("réinitialisation de la bdd");
                ws.send("ResBDD;")
            } else {
                console.log("annulation de la réinitialisation");
            }
        }
        //importation de la BDD (ajouté un fichier)
        if (event.target.classList.value == "import") {
            console.log("importation de la bdd");
        }
        //exportation de la BDD (recevoir le fichier)
        if (event.target.classList.value == "export") {
            alert('export');
            console.log("exportation de la bdd");
            ws.send("ExpBDD;");
        }
        //suppression de la div de l'affaire

        if (event.target.classList.value == "littlebutton") {

            h3title = document.getElementById('h3title');
            canvas = document.getElementById('myCanvas');
            pvTable = document.getElementById('pv');

            if (h3title != '') {
                document.getElementById('h3title').innerHTML = "";
            }

            var context = canvas.getContext('2d');
            const divaffaire = document.getElementById("infothisaffaire");
            divaffaire.removeChild(canvas);

            const newCanvas = document.createElement("canvas");
            newCanvas.classList.add("canvas");
            newCanvas.id = "myCanvas";

            divaffaire.insertBefore(newCanvas, document.getElementById("pvtable"));

            if (pvTable != '') {
                document.getElementById('pv').innerHTML = "";
            }

            daffaire = document.getElementById('daffaire');
            daffaire.style.display = "none";
            dpv = document.getElementById('dpv');
            dpv.style.display = "block";
            toggle = document.getElementById('toggle');
            toggle.style.display = "block"
            navigation = document.getElementById('navigation');
            navigation.style.display = "block"
        }
        //supression du pv
        if (event.target.classList.value == "deletebutton" || event.target.id == "trash") {

            const target = event.target.id == "trash" ? event.target.parentNode : event.target

            if (confirm("Tu est sur de vouloir supprimé ce pv ? Cette action est irréverssible !") == true) {
                console.log("suppression du pv");

                idAffaire = document.getElementById("h3title").innerHTML.slice(17);
                ws.send("DelPV;" + target.id);

                console.log(target.id);
                pvTable = document.getElementById('pv');

                if (pvTable != '') {
                    document.getElementById('pv').innerHTML = "";
                }
                ws.send('ListPVID;' + idAffaire);
                console.log('Confirme que : ' + idAffaire)
            } else {
                console.log("annulation de la suppression");
            }
        }
        //modifiaction du pv
        if (event.target.classList.value == "updatebutton" || event.target.id == "create") {

            const target = event.target.id == "create" ? event.target.parentNode : event.target
            //const targettext = event.target.id == "create" ? event.target.parentNode.parentNode : event.target;
            console.log("zuip");
            targettext = document.getElementById(target.id).innerHTML;
            console.log(targettext);

            dloader.style.display = "none";
            dconnexion.style.display = "none";
            dpv.style.display = "none";
            ddeco.style.display = "none";
            ddoc.style.display = "none";
            dhelp.style.display = "none";
            daffaire.style.display = "none";
            dnewpv.style.display = "none";
            dupdpv.style.display = "block";

            idAffaire = document.getElementById("h3title").innerHTML.slice(17);
            title = document.getElementById('titleupdpv');
            
            title.innerHTML = "Modifier le pv n°" + target.id;

            var texteadd = document.getElementById('texteforupdpv').value = targettext;
        }
        //ajout d'un pv
        if (event.target.classList.value == "addbutton" || event.target.id == "newpv") {

            const target = event.target.id == "newpv" ? event.target.parentNode : event.target;

            dloader.style.display = "none";
            dconnexion.style.display = "none";
            dpv.style.display = "none";
            ddeco.style.display = "none";
            ddoc.style.display = "none";
            dhelp.style.display = "none";
            daffaire.style.display = "none";
            dnewpv.style.display = "block";
            dupdpv.style.display = "none";

            idAffaire = document.getElementById("h3title").innerHTML.slice(17);
            title = document.getElementById('titleaddpv');
            title.innerHTML = "Ajouter un pv pour l'affaire n°" + idAffaire;
        }
        //ajouté en bdd
        if (event.target.classList.value == "buttonaddBDD") {
            idAffaire = document.getElementById("h3title").innerHTML.slice(17);
            var texteadd = document.getElementById('textefornewpv');

            if (texteadd.value) {
                console.log(texteadd.value + idAffaire + getCookie("username"));
                ws.send("AddPV;" + getCookie("username") + ";" + idAffaire + ";" + texteadd.value);
            }
        }
        //modifier en bdd
        if (event.target.classList.value == "buttonupdBDD") {
            idPv = document.getElementById("h3title").innerHTML.slice(17);
            var texteupd = document.getElementById('texteforupdpv');
            var mail = document.getElementById('addmail');
            if(mail != "" || texteupd != ""){
                console.log(ws.send("UpdPV;" + idPv + ";" + mail.value + ";" + texteupd.value));
            }else{
                alert('veuillez remplir les champs !');
            }
        }
        //retour
        if (event.target.classList.value == "buttonlist") {
            idAffaire = document.getElementById("h3title").innerHTML.slice(17);
            pvTable = document.getElementById('pv');

            if (pvTable != '') {
                document.getElementById('pv').innerHTML = "";
            }

            ws.send('InfoAffaire;' + idAffaire);
            ws.send('ListEssaiID;' + idAffaire);
            ws.send('ListPVID;' + idAffaire);

            dloader.style.display = "none";
            dconnexion.style.display = "none";
            dpv.style.display = "none";
            ddeco.style.display = "none";
            ddoc.style.display = "none";
            dhelp.style.display = "none";
            daffaire.style.display = "block";
            dnewpv.style.display = "none";
            dupdpv.style.display = "none";

            console.log('présent');
        }
    });
    //récupération du cookie
    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    //vérification du cookie
    /*
    function checkCookie() {
        let user = getCookie("username");
        if (user != "") {
            alert("Bon retour");
            //redirection sur la page d'acceuil
            dconnexion = document.getElementById('dconnexion');
            dconnexion.style.display = "none";
            //on cache le bouton de connexion
            bconnexion = document.getElementById('bconnexion');
            bconnexion.style.display = "none";
            //apparition de la div de déconnexion
            var bdeco = document.getElementById('bdeco');
            bdeco.style.display = "block";
            //apparition du bouton de visualisation des Affaires
            var bpv = document.getElementById('bpv');
            bpv.style.display = "block"; 
            //apparition de la div de téléverement de fichier
            var bdoc = document.getElementById('bdoc');
            bdoc.style.display = "block";
            //apparition de la div de visualisation des affaire
            var dpv = document.getElementById('dpv');
            dpv.style.display = "block";
            //apparition de la div de visualisation des affaire
            daffaire = document.getElementById('daffaire');
            daffaire.style.display = "none";
        } else {
            //redirection sur la page d'acceuil
        }
    }
    */
}