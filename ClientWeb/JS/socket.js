//connexion du socket au serveur
const ws = new WebSocket("ws://192.168.65.44:40510");
//récupération de la barre de navigation
var navigation = document.getElementById('navigation');
    navigation.style.display = "none";
//récupération du loarder
var dloader = document.getElementById('dloader');
    dloader.style.display = "block";
//Erreur du socket
ws.addEventListener('error', function (event) {
    navigation.style.display = "none";
    dloader.style.display = "block";
    console.log('WebSocket error: ', event);
});
//Quand le socket c'est connecter
ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected')
    //loader
    dloader = document.getElementById('dloader');
    dloader.style.display = "none";
    //barre de navigation
    navigation = document.getElementById('navigation');
    navigation.style.display = "block";
}
//récupération des valeurs dans les champs
var form = document.getElementById('form');
var pseudo = document.getElementById('pseudo');
var mdp = document.getElementById('mdp');
//envoie des données au serveurs
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (pseudo.value && mdp.value) {
        ws.send('UserConnexion', pseudo.value , mdp.value);
        pseudo.value = '';
        mdp.value = '';
    }else{
        window.alert("veuillez remplir les champs");
    }
});
//récéption de la demande de connexion
ws.on("ConnectionTrue", (arg) => {
    if (arg.length > 0){
        console.log(arg[0].idUser);
        //création du cookie
        document.cookie = arg[0].idUser;'path=/; expires=' + date;
        //on cache la div de connexion
        var dconnexion = document.getElementById('dconnexion');
        dconnexion.style.display = "none";
        //apparition de la div de déconnexion
        var bdeco = document.getElementById('bdeco');
        bdeco.style.display = "block";
        //apparition de la div de visualisation des Affaires
        var bpv = document.getElementById('bpv');
        bpv.style.display = "block";    
        //apparition de la div de téléverement de fichier
        var ddoc = document.getElementById('ddoc');
        ddoc.style.display = "block";

        //demande des affaires au serveur
        ws.send('ListAffaires');
    }else{
        window.alert("Identifiants incorectes");
    }
});

ws.on("ListAffaires", (arg) => {
    if (arg.length > 0){
        
    }else{
        window.alert("Une erreur est survenue lors de la récupération des informations... Veuillez réessayer plus tard.");
    }
})