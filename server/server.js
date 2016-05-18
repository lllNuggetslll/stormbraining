import http from 'http';
import express from 'express';
import routes from '../server/config/routes.js';
import middleware from '../server/config/middleware.js';

const app = express();
app.set('port', process.env.PORT || 3000);

middleware(app, express);
routes(app, express);

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});

// set up the socket.io connection with the server
export const io = require('socket.io')(server);

// set up persistent chat list
const userList = {};

function addUser(board) {
  let found = -1;
  if (!userList[board.board]) {
    userList[board.board] = [];
  }
  for (let i = 0; i < userList[board.board].length; i++) {
    if (userList[board.board][i][0] === board.email) {
      found = 1;
    }
  }
  if (found === -1) {
    userList[board.board].push([board.email, board.user]);
  }
}

function deleteUser(board) {
  if (userList[board.board]) {
    for (let i = 0; i < userList[board.board].length; i++) {
      if (userList[board.board][i][0] === board.email) {
        userList[board.board].splice(i, 1);
      }
    }
  }
}

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('subscribe', (board) => {
    socket.join(board);
    if (board.check === 1) {
      addUser(board);
    }
    if (userList[board.board]) {
      io.emit('user', userList);
    }
  });
  socket.on('unsubscribe', (board) => {
    socket.leave(board);
    if (board.check === 2) {
      deleteUser(board);
    }
    if (userList[board.board]) {
      io.emit('left', userList);
    }
  });
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});
