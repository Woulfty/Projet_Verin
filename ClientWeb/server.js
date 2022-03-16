const express = require('express');
const app = express();

const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(4321, () => {
    console.log('listening on *:3000');
  });
  

io.on('connection', (socket) => {
  console.log('Un utilisateur vient de se connecter');
  socket.on('disconnect', () => {
    console.log('Un utilisateur vient de se deconecter');
  });
});

io.on('connection', (socket) => {
  socket.on('UserConnexion', (pseudo, mdp) => {
    console.log('Pseudo: ' + pseudo);
    console.log('Mot de passe: ' + mdp);

    var result = "1";
    
    if(pseudo == "woulfty" || mdp == "123"){
      socket.emit("ConnectionTrue", result)
    }
  });
});