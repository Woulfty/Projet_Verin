const { create } = require("domain");

//var socket = io("ws://192.168.65.44:3000");
const ws = new WebSocket("ws://192.168.64.183:40510");

ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected')
}

//affichage des div
//PV
var divpv = document.getElementById('dpv');
    divpv.remove();
//téléversement ddocument
var divdoc = document.getElementById('ddoc');
    divdoc.remove();
//déconnexion
var divdeco = document.getElementById('ddeco');
    divdeco.remove();

//affichage des boutton
//PV
var bouttonpv = document.getElementById('bpv');
    bouttonpv.remove();
//Téléversement document
var bouttondoc = document.getElementById('bdoc');
    bouttondoc.remove();
//déconnexion
var bouttondeco = document.getElementById('bdeco');
    bouttondeco.remove();

var form = document.getElementById('form');
var pseudo = document.getElementById('pseudo');
var mdp = document.getElementById('mdp');

form.addEventListener('submit', function(e) {

    e.preventDefault();
    if (pseudo.value || mdp.value) {
        ws.send('UserConnexion', pseudo.value , mdp.value);
        pseudo.value = '';
        mdp.value = '';
    }else{

    }
});

ws.on("ConnectionTrue", (arg) => {
    if (arg.length > 0){
        console.log(arg[0].idUser);
        //création du cookie
        document.cookie = arg[0].idUser;

        //Page de connexion
        var dconnexion = document.getElementById('ddoc');
        dconnexion.remove();
    }
});