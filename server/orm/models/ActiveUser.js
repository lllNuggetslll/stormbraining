import thinky from '../thinkyConfig.js';
import { io } from '../../server.js';

const r = thinky.r;
const type = thinky.type;

const ActiveUser = thinky.createModel('ActiveUser', {
  id: type.string().required(),
  boardId: type.string().required(),
  name: type.string().required(),
});

export default ActiveUser;

const Board = require('./Board').default;
ActiveUser.belongsTo(Board, 'boardUser', 'boardId', 'id');


ActiveUser.changes().then((feed) => {
  feed.each((error, doc) => {
    if (error) {
      console.log(error);
      process.exit(1);
    } else {
      io.sockets.in(doc.boardId).emit('user', doc);
    }
  });
}).error((error) => {
  console.log(error);
  process.exit(1);
});
