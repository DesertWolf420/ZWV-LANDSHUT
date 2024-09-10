const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Ein Nutzer hat sich verbunden');

  socket.on('markAsDone', (data) => {
    io.emit('updateRow', data); // Broadcastet die Änderung an alle Clients
  });

  socket.on('disconnect', () => {
    console.log('Ein Nutzer hat sich getrennt');
  });
});

server.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});
