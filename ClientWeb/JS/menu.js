let menuToggle = document.getElementById('toggle');
let navigation = document.getElementById('navigation');
menuToggle.addEventListener('click', function(){
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
});

//activation du fond blanc pour la page séléctionner
let list = document.querySelectorAll('.list');
for (let i = 0; i<list.length; i++){
    list[i].onclick = function(){
        let j = 0;
        while(j < list.length){
            list[j++].className = 'list';
        }
        list[i].className = 'list active';
    }
}
//boutton
let bconnexion = document.getElementById("bconnexion");
let bdeco = document.getElementById("bdeco");
let bpv = document.getElementById("bpv");
let bdoc = document.getElementById("bdoc");
let bhelp = document.getElementById("bhelp");
//div
let dconnexion = document.getElementById("dconnexion");
let dpv = document.getElementById("dpv");
let ddeco = document.getElementById("ddeco");
let ddoc = document.getElementById("ddoc");
let dhelp = document.getElementById("dhelp");
let dloader = document.getElementById("dloader");
//connexion
bconnexion.addEventListener("click", () => {
    dloader.style.display = "none";
    dconnexion.style.display = "block";
    dpv.style.display = "none";
    ddeco.style.display = "none";
    ddoc.style.display = "none";
    dhelp.style.display = "none";
})
//pv
bpv.addEventListener("click", () => {
    dloader.style.display = "none";
    dconnexion.style.display = "none";
    dpv.style.display = "block";
    ddeco.style.display = "none";
    ddoc.style.display = "none";
    dhelp.style.display = "none";
})
//deco
bdeco.addEventListener("click", () => {
    dloader.style.display = "none";
    dconnexion.style.display = "none";
    dpv.style.display = "none";
    ddeco.style.display = "block";
    ddoc.style.display = "none";
    dhelp.style.display = "none";
})
//doc
bdoc.addEventListener("click", () => {
    dloader.style.display = "none";
    dconnexion.style.display = "none";
    dpv.style.display = "none";
    ddeco.style.display = "none";
    ddoc.style.display = "block";
    dhelp.style.display = "none";
})
//aide
bhelp.addEventListener("click", () => {
    dloader.style.display = "none";
    dconnexion.style.display = "none";
    dpv.style.display = "none";
    ddeco.style.display = "none";
    ddoc.style.display = "none";
    dhelp.style.display = "block";
})