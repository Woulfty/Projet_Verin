//connexion du socket au serveur
const ws = new WebSocket("ws://192.168.65.44:40510");
var $ = jQuery;
//message d'avertisement en console
console.log(
    "%cStop!" + "%cVous ne trouverez rien d'intéressant ici, qu'importe ce qu'il vous a été dit.", "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold", "color:black;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold",
);

//boutton de la barre
var toggle = document.getElementById('toggle');
//récupération de la barre de navigation
navigation = document.getElementById('navigation');
//récupération du loarder
dloader = document.getElementById('dloader');
//affichage de la page de connexion
dconnexion = document.getElementById('dconnexion');
//affichage de l'affaire
daffaire = document.getElementById('daffaire');

dloader.style.display = "block";
toggle.style.display = "none";
dconnexion.style.display = "none";
navigation.style.display = "none";
daffaire.style.display = "none";

ws.onclose = function(event){
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dloader.style.display = "block";
    dconnexion.style.display = "none";
    dpv.style.display = "none";
    ddeco.style.display = "none";
    ddoc.style.display = "none";
    dhelp.style.display = "none";
    daffaire.style.display = "none";
    dnewpv.style.display = "none";
    dupdpv.style.display = "none";
    navigation.style.display = "none"
    toggle.style.display = "none";
    console.log("connexion perdu");
}

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

    // Définition String Message
    message = String(event.data);

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
        //récupération du tableau
        var affaireTable = document.getElementById('affaire');
        
        if (Datasize == 0){
            //création des lignes du tableau
            var tr = document.createElement('tr');
            //création du champs
            var td1 = document.createElement('td');
            td1.colSpan = "3";
            td1.innerHTML = "Il n'y a aucune affaires pour le moment.";
            td1.classList.add("warning");
            // Définition de l'enfant
            tr.appendChild(td1);
            affaireTable.appendChild(tr);
            
        }else{
            //données
            var Json = message.split(';')[2];
            //découpage du dossier json
            var data = JSON.parse(Json);
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
                td3.innerHTML = data[i].Date[11]+data[i].Date[12]+":"+data[i].Date[14]+data[i].Date[15];
                td2.innerHTML = data[i].Date[8]+data[i].Date[9]+"/"+data[i].Date[5]+data[i].Date[6]+"/"+data[i].Date[0]+data[i].Date[1]+data[i].Date[2]+data[i].Date[3];

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);

                affaireTable.appendChild(tr);
            }
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

        var destroytable = document.getElementById('Affairetable');
        if (destroytable != '') {
            document.getElementById('affaire').innerHTML = "";
        }
    }
    //affichage de la courbes de pression
    if (message.split(';')[0] == 'RepListEssaiID') {

        var Datasize = message.split(';')[2];
        var essaistable = document.getElementById("essais");

        if (Datasize == 0){
            //création des lignes du tableau
            var tr = document.createElement('tr');
            //création du champs
            var td1 = document.createElement('td');
            td1.colSpan = "4";
            td1.innerHTML = "Il n'y a aucun essais pour le moment.";
            td1.classList.add("warning");
            // Définition de l'enfant
            tr.appendChild(td1);
            essaistable.appendChild(tr);
            
        }else{
            //découpage du message
            var Json = message.split(';')[3];
            var datacourbe = JSON.parse(Json);
            var arr = [];
            var array = [];
            for (let Startdata = 1; Startdata <= Datasize; Startdata++) {
                arr.push(Startdata + "s");
            }
            for (var i = 0; i < Datasize; ++i) {
                array.push(datacourbe[i].Value);
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
            
            //création du tableau des essais
            for (var i = 0; i < Datasize; ++i) {

                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');

                td1.innerHTML = "Test n°" + (i + 1);
                td2.innerHTML = datacourbe[i].Debit + " m3/s";
                td3.innerHTML = datacourbe[i].Value + " %";

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                essaistable.appendChild(tr);
            }
        }
    }
    //récéption des Pv de l'affaire
    if (message.split(';')[0] == 'RepListPVID') {
        //taille du message
        var Datasize = message.split(';')[2];
        //récupération du tableau
        var pvTable = document.getElementById('pv');

        if (Datasize == 0){
            //création des lignes du tableau
            var tr = document.createElement('tr');
            //création du champs
            var td1 = document.createElement('td');
            td1.colSpan = "4";
            td1.innerHTML = "Il n'y a aucun pv pour le moment, ajouté en un !";
            td1.classList.add("warning");
            // Définition de l'enfant
            tr.appendChild(td1);
            pvTable.appendChild(tr);
            
        }else{
            //données
            var Json = message.split(';')[3];
            //découpage du dossier json
            var data = JSON.parse(Json);
            //création des données
            for (var i = 0; i < Datasize; ++i) {
                //création des lignes du tableau
                var tr = document.createElement('tr');
                //création des champs
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
    }
    //récéption de la base
    if (message.split(';')[0] == 'RepExpBDD') {
        var BDD = message.slice(13);

        function download(filename, textInput) {

            var element = document.createElement('a');
            element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
            element.setAttribute('download', filename);
            document.body.appendChild(element);
            element.click();
        }

        var filename = "BDD.sql";
        download(filename, BDD);

    }
    //réponce du serveur lors de l'ajout de pv
    if (message.split(";")[0] == 'RepAddPV'){
        if(message.split(";")[1] == 'CONFIRM'){
            var texteadd = document.getElementById('textefornewpv');
            texteadd.value = '';
            alert('Le Pv a été ajouté');
        }
    }
    //réponce su serveur lors de la modification d'un pv
    if (message.split(";")[0] == 'RepUpdPV'){
        if(message.split(";")[2] == 'CONFIRM'){
            alert('le Pv a été modifié');
        }
    }
    //réponce du serveur a la réinitialisation
    if (message.split(";")[0] == 'RepResBDD'){
        let log = message.split(";")[1];
        alert("La base a été réinitialiser à " + log);
        //on vide le tableau des essais 
        Table = document.getElementById('affaire')
        if (Table != '') {
            document.getElementById('affaire').innerHTML = "";
        }
        //demande des affaires au serveur
        ws.send('ListAffaire');
    }
    //réponce du serveur a l'importation de la BDD
    if (message.split(";")[0] == 'RepImpBDD'){
        let log = message.split(";")[1];
        alert("La base a été importé à " + log);
        Table = document.getElementById('affaire')
        if (Table != '') {
            document.getElementById('affaire').innerHTML = "";
        }
        //demande des affaires au serveur
        ws.send('ListAffaire');
    }   
})

//Erreur du socket
ws.addEventListener('error', function(event) {
    navigation.style.display = "none";
    dloader.style.display = "block";
    console.log('WebSocket error: ', event); 
});

//Quand le Websocket c'est connecter
ws.onopen = function() {
    //vérification du cookie
    checkCookie();

    ws.send('connected');
    //loader
    dloader = document.getElementById('dloader');
    dloader.style.display = "none";
    //barre de navigation
    navigation.style.display = "block";
    //boutton de la barre
    toggle = document.getElementById('toggle');
    toggle.style.display = "block";
    //affichage de la page de connexion
    dconnexion = document.getElementById('dconnexion');

    //vérification du cookie
    function checkCookie() {
        let user = getCookie("username");
        if (user != "") {
            console.log("Bon retour");
            
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

            ws.send('ListAffaire');

        } else {
            dconnexion.style.display = "block";
        }
    }

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
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });

    //Quand un utilisateur clique
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
                ws.send("ResBDD;")
            }
        }
        //importation de la BDD (ajouté un fichier)
        if (event.target.classList.value == "import") {
        }
        //exportation de la BDD (recevoir le fichier)
        if (event.target.classList.value == "export") {
            ws.send("ExpBDD;");
        }
        //suppression de la div de l'affaire
        if (event.target.classList.value == "littlebutton") {

            h3title = document.getElementById('h3title');
            canvas = document.getElementById('myCanvas');
            pvTable = document.getElementById('pv');
            essaistable = document.getElementById('essaistable')

            if (h3title != '') {
                document.getElementById('h3title').innerHTML = "";
            }

            var context = canvas.getContext('2d');
            const divaffaire = document.getElementById("infothisaffaire");
            divaffaire.removeChild(canvas);

            const newCanvas = document.createElement("canvas");
            newCanvas.classList.add("canvas");
            newCanvas.id = "myCanvas";

            divaffaire.insertBefore( newCanvas, essaistable );

            if (pvTable != '') {
                document.getElementById('pv').innerHTML = "";
            }
            if (essaistable != '') {
                document.getElementById('essais').innerHTML = "";
            }

            daffaire = document.getElementById('daffaire');
            daffaire.style.display = "none";
            dpv = document.getElementById('dpv');
            dpv.style.display = "block";
            toggle = document.getElementById('toggle');
            toggle.style.display = "block"
            navigation = document.getElementById('navigation');
            navigation.style.display = "block"

            ws.send('ListAffaire');
        }
        //supression du pv
        if (event.target.classList.value == "deletebutton" || event.target.id == "trash") {

            const target = event.target.id == "trash" ? event.target.parentNode : event.target

            if (confirm("Tu est sur de vouloir supprimé ce pv ? Cette action est irréverssible !") == true) {

                idAffaire = document.getElementById("h3title").innerHTML.slice(17);
                ws.send("DelPV;" + target.id);

                pvTable = document.getElementById('pv');
                essaistable = document.getElementById('essais');

                if (pvTable != '') {
                    document.getElementById('pv').innerHTML = "";
                }

                ws.send('ListPVID;' + idAffaire);
            }
        }
        //modifiaction du pv
        if (event.target.classList.value == "updatebutton" || event.target.id == "create") {

            const target = event.target.id == "create" ? event.target.parentNode : event.target;

            targettext = document.getElementById(target.id).innerText;

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
                ws.send("AddPV;" + getCookie("username") + ";" + idAffaire + ";" + texteadd.value);
            }
        }
        //modifier en bdd
        if (event.target.classList.value == "buttonupdBDD") {
            idPv = document.getElementById("titleupdpv").innerHTML.slice(17);
            var texteupd = document.getElementById('texteforupdpv');
            var mail = document.getElementById('addmail');
            if(mail != "" || texteupd != ""){
                ws.send("UpdPV;" + idPv + ";" + mail.value + ";" + texteupd.value);
            }else{
                alert('veuillez remplir les champs !');
            }
        }
        //retour
        if (event.target.classList.value == "buttonlist") {
            idAffaire = document.getElementById("h3title").innerHTML.slice(17);
            pvTable = document.getElementById('pv');
            essaistable = document.getElementById('essaistable');
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
    //Compteur de caractére
    function update() {
        input = $("textarea").val();

        $("#rc").text((size - input.length));

        if(size - input.length <= 600 && size - input.length >= 301){
            document.getElementById("rc").style.color = 'black';
        }
        if(size - input.length <= 300 && size - input.length >= 101){
            document.getElementById("rc").style.color = 'orange';
        }
        if(size - input.length <= 100 && size - input.length >= 0){
            document.getElementById("rc").style.color = 'red';
        }
    };

    var size = "600";

    $("textarea").bind("input propertychange", function() {
        update();
    });
}

