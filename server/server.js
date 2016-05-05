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

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('subscribe', (board) => {
    socket.join(board);
  });
  socket.on('unsubscribe', (board) => {
    socket.leave(board);
  });
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});
