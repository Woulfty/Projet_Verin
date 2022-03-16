var socket = io("ws://localhost:4321");

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

var form = document.getElementById('form');
var pseudo = document.getElementById('pseudo');
var mdp = document.getElementById('mdp');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (pseudo.value) {
    socket.emit('UserConnexion', pseudo.value, mdp.value);
    pseudo.value = '';
    mdp.value = '';
    }
});
socket.on("ConnectionTrue", (arg) => {
    if (arg.length > 0){
        console.log(arg[0].idUser);
    }
});