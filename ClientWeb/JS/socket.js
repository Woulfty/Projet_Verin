//connexion du socket au serveur
//const ws = new WebSocket("ws://192.168.65.44:40510");
const ws = new WebSocket("ws://192.168.64.183:40510");
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
ws.addEventListener('error', function (event) {
    console.log('Erreur WebSocket : ', event);
    dloader.style.display = "block"
    toggle.style.display = "none"
    dconnexion.style.display = "none"
    navigation.style.display = "none"
    daffaire.style.display = "none";
});
//reception d'un message
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
        var data = JSON.parse(Json);

        //création des éléments
        var h3title = document.createElement('h3');
        var divinfo = document.createElement('div');
        var canvas = document.createElement('canvas');
        var listpv = document.createElement('ul');
        var listessais = document.createElement('ul');
        //ajout des class
        h3title.classList.add( "h3title" );
        divinfo.classList.add("affaire");
        canvas.classList.add("canvas");
        //ajout des id
        divinfo.id = "infothisaffaire";
        canvas.id = "myCanvas";
        h3title.id = "h3title";
        //ajout des informations
        h3title.innerHTML = "Affaire n°" + ID;
        //attribution des enfants          
        divaffaire.appendChild(h3title);
        divaffaire.appendChild(divinfo);
        divinfo.appendChild(canvas);
    }
    //affichage de la courbes de pression
    if(message.split(';')[0] == 'RepListEssaiID'){
        console.log('supérieur a 2');
        /*
        //nombre de relever (essais)
        var Datasize = message.split(';')[1];
        //données
        var Json = message.split(';')[2];
        //découpage du dossier json
        var datacourbe = JSON.parse(Json);

        var cv = document.getElementById("myCanvas")
        var ctx = cv.getContext("2d")

        function gradient(a, b) {
            return (b.y-a.y)/(b.x-a.x);
        }

        function bzCurve(points, f, t) {
            if (typeof(f) == 'undefined') f = 0.3;
            if (typeof(t) == 'undefined') t = 0.6;

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            var m = 0;
            var dx1 = 0;
            var dy1 = 0;

            var preP = points[0];
            for (var i = 1; i < points.length; i++) {
                var curP = points[i];
                nexP = points[i + 1];
                if (nexP) {
                    m = gradient(preP, nexP);
                    dx2 = (nexP.x - curP.x) * -f;
                    dy2 = dx2 * m * t;
                } else {
                    dx2 = 0;
                    dy2 = 0;
                }
                ctx.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, curP.y);
                dx1 = dx2;
                dy1 = dy2;
                preP = curP;
            }
            ctx.stroke();
        }
        var lines = [];
        var X = 10;
        var t = 40;
        for (var i = 0; i < Datasize; i++ ) {
            Y = datacourbe[ i ].Fréquence;
            //Y = datapoint;
            p = { x: X, y: Y };
            lines.push(p);
            X = X + t;
        }

        //courbe pointille
        ctx.beginPath();
        ctx.setLineDash([5]);
        ctx.lineWidth = 1;
        bzCurve(lines, 0, 1);

        //courbe pleine
        ctx.setLineDash([0]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "blue";
        bzCurve(lines, 0.3, 1);
        */

        var cv = document.getElementById("myCanvas");
        var ctx = cv.getContext("2d");

        function gradient(a, b) {
            return (b.y-a.y)/(b.x-a.x);
        }

        function bzCurve(points, f, t) {
            //f = 0, will be straight line
            //t suppose to be 1, but changing the value can control the smoothness too
            if (typeof(f) == 'undefined') f = 0.3;
            if (typeof(t) == 'undefined') t = 0.6;

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            var m = 0;
            var dx1 = 0;
            var dy1 = 0;

            var preP = points[0];
            for (var i = 1; i < points.length; i++) {
                var curP = points[i];
                nexP = points[i + 1];
                if (nexP) {
                    m = gradient(preP, nexP);
                    dx2 = (nexP.x - curP.x) * -f;
                    dy2 = dx2 * m * t;
                } else {
                    dx2 = 0;
                    dy2 = 0;
                }
                ctx.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, curP.y);
                dx1 = dx2;
                dy1 = dy2;
                preP = curP;
            }
            ctx.stroke();
        }

        // Generate random data
        var lines = [];
        var datalenth = 12;
        var X = 10;
        //var datapoint = [12, 45, 61, 20];
        var t = 40; //to control width of X
        for (var i = 0; i < datalenth; i++ ) {
            Y = Math.floor((Math.random() * 300) + 50);
            //Y = datapoint;
            p = { x: X, y: Y };
            lines.push(p);
            X = X + t;
        }

        //draw straight line
        ctx.beginPath();
        ctx.setLineDash([5]);
        ctx.lineWidth = 1;
        bzCurve(lines, 0, 1);

        //draw smooth line
        ctx.setLineDash([0]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "blue";
        bzCurve(lines, 0.3, 1);
    }
    //récéption des essais de l'affaire
    if(message.split(';')[0] == 'RepListEssai'){
        
    }
    //récéption des Pv de l'affaire
    if(message.split(';')[0] == 'RepListPV'){
        
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
            ws.send('InfoAffaire;'+ event.target.id);
            ws.send('ListEssaiID;'+ event.target.id);
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
        //suppression de la div de l'affaire
        
        if (event.target.classList.value == "littlebutton"){
            console.log("boutton");

            try{
                
                h3title = document.getElementById("h3title");
                divinfo = document.getElementById("infothisaffaire");
                canvas = document.getElementById("myCanvas");

                h3title.remove();
                divinfo.remove();
                canvas.remove();
                
            }catch (error) {
                console.log(error);
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
        //demande de la lite des affaires
        /*
        if(event.target.id == "bpv"){
            console.log('demande dinfo');
            ws.send('ListAffaire');
        }
        */
    });
}