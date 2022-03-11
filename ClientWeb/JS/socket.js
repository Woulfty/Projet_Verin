//connexion du socket au serveur
const socket = new WebSocket("ws://192.168.65.44:3000");
var socket = io();



//affichage des div
var divpv = document.getElementById('dpv');
    divpv.remove();
var divdoc = document.getElementById('ddoc');
    divdoc.remove();
var divdeco = document.getElementById('ddeco');
    divdeco.remove();

//affichage des boutton
var bouttonpv = document.getElementById('bpv');
    bouttonpv.remove();
var bouttondoc = document.getElementById('bdoc');
    bouttondoc.remove();
var bouttondeco = document.getElementById('bdeco');
    bouttondeco.remove();

//connexion
//récupération de des informations du formulaire
var Logform = document.getElementById('Logform');
var pseudo = document.getElementById('pseudo');
var mdp = document.getElementById('mdp');
//formulaire de connexion
Logform.addEventListener('submit', function(e) {
    e.preventDefault();
    if (pseudo.value) {
        //envoie des données au serveur
        socket.emit('UserConnexion', pseudo.value, mdp.value);
        pseudo.value = '';
        mdp.value = '';
    }
});
//réception de la réponse du serveur
socket.on("ConnectionTrue", (id) => {
    if (id.length > 0){
        console.log(id);
        writeCookie(id);
    }
})
//création du cookie
function writeCookie(id,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = id + "=" + value + expires + "; path=/";
}