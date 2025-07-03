// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('ユーザーが接続しました');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('ユーザーが切断しました');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`サーバーが http://localhost:${PORT} で起動しました`);
});
