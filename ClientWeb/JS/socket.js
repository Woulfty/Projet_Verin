//connexion du socket au serveur
const ws = new WebSocket("ws://192.168.65.44:40510");

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

ws.addEventListener("message", async (event, isBinary ) => {
    console.log( event.data )
    
    // Définition String Message
    message = String( event.data );
    //alert('poopy');
    //récéption de la connexion
    if(message.split(';')[0] == 'RepUserConnexion'){
        //découpage du message
        var idUser = message.split(';')[1];
        var registerRep = message.split(';')[2];
        //condition si l'utilisateur n'existe pas ou si le login et le mot de passe ne correspondes pas 
        if(registerRep == "false"){
            alert("Identifiants incorectes");
        }
        //condition si l'utilisateur exsite et qu'il a entrer le bon mot de passe et login
        if(registerRep == "true"){
            //création du cookie
            //document.cookie = idUser;'path=/; expires=' + date;
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

            //demande des affaires au serveur
            ws.send('ListAffaire');
        }
    }
    //récéption des infos affaires
    if(message.split(';')[0] == 'RepListAffaire'){
        //taille du message
        var Datasize = message.split(';')[1];
        //données
        var Json = message.split(';')[2];
        //découpage du dossier json
        var data = JSON.parse(Json);

        //récupération de la div ou je crée ma liste
        var listDiv = document.getElementById('ListAffaire');
        //création de la liste
        var ul = document.createElement('ul');
        ul.classList.add( "datalist" );
        //création des données selon la taille du message
        for (var i = 0; i < Datasize; ++i) {
            var li = document.createElement('li');
            li.innerHTML = "Affaire n°" + data[ i ].idAffaire;
            li.classList.add( "aff" );
            li.id = data[ i ].idAffaire;
            ul.appendChild(li);                        
        }
        //définission de l'enfant
        listDiv.appendChild(ul);
    }
    //récéption des information de l'affaire
    if(message.split(';')[0] == 'RepInfoAffaire'){
        //apparition de la div de visualisation des affaire
        dpv = document.getElementById('dpv');
        dpv.style.display = "none";
        //apparition de la div de visualisation des affaire
        daffaire = document.getElementById('daffaire');
        daffaire.style.display = "block";
        
        var Datasize = message.split(';')[1];
        //données
        var Json = message.split(';')[2];
        //récupération de la div ou j'affiche mes affaires
        var divaffaire = document.getElementById('affaire');
        //découpage du dossier json
        var data = JSON.parse(Json);

        var h3 = document.createElement('h3');

        for (var i = 0; i < 1; ++i) {
            h3.innerHTML = "Affaire n°" + data[ i ].idAffaire;                       
        }
        divaffaire.appendChild(h3);
    }
    //récéption des Pv de l'affaire
    if(message.split(';')[0] == 'RepListPV'){
        
    }
    //récéption des essais de l'affaire
    if(message.split(';')[0] == 'RepListEssai'){
        
    }
    //récéption des information de l'essais
    if(message.split(';')[0] == 'RepInfoEssai'){
        
    }
    //récéption des information du Pv
    if(message.split(';')[0] == 'RepInfoPV'){
        
    }

})

//Erreur du socket
ws.addEventListener('error', function (event) {
    navigation.style.display = "none";
    dloader.style.display = "block";
    console.log('WebSocket error: ', event);
});
//Quand le socket c'est connecter
ws.onopen = function () {

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
            ws.send('UserConnexion' + ';'+ pseudo.value +';'+ mdp.value);
            pseudo.value = '';
            mdp.value = '';
        }else{
            alert("veuillez remplir les champs");
        }       
    });
    //déconnexion
    var formdeco = document.getElementById('formdeco');
    formdeco.addEventListener('submit', function(e){
        e.preventDefault();
        location.reload();
    });

    //Quand un utilisateur clique sur une affaire
    document.addEventListener("click", ( event ) => {

        if (event.target.classList.value == "aff" ) {
            //event.target.id
            ws.send('InfoAffaire;'+ event.target.id)
        }
        //réinitialisation de la BDD
        if (event.target.classList.value == "reset") {
            //confirmation de l'action
            if (confirm("Veuillez confirmer la réinitialisation") == true) {
                console.log("réinitialisation de la bdd");
                ws.send("ResBDD;")
            } else {
                console.log("annulation de la réinitialisation")
            }
        }
        //importation de la BDD (ajouté un fichier)
        if (event.target.classList.value == "import") {
            alert('import');
            console.log("importation de la bdd")
        }
        //exportation de la BDD (recevoir le fichier)
        if (event.target.classList.value == "export") {
            alert('export');
            console.log("exportation de la bdd")
        }
    });
}

