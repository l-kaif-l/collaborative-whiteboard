const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = new Set();

io.on('connection', (socket) => {
  const userId = socket.id;
  users.add({ id: userId, name: `User ${userId.substr(0, 4)}` });

  io.emit('updateUsers', Array.from(users));

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  socket.on('disconnect', () => {
    users.delete(userId);
    io.emit('updateUsers', Array.from(users));
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));