import thinky from '../thinkyConfig.js';
import { io } from '../../server.js';
// Object destructuring issue (https://github.com/neumino/thinky/issues/351)
const r = thinky.r;
const type = thinky.type;

const Message = thinky.createModel('Message', {
  id: type.string(),
  userName: type.string().required(),
  boardId: type.string().required(),
  message: type.string().required(),
  createdAt: type.date().default(r.now),
});

export default Message;

// Relationship defined after export following docs to handle circular reference,
// require used instead of import due to same issue (https://github.com/neumino/thinky/issues/399)
const Board = require('./Board').default;
Message.belongsTo(Board, 'board', 'boardId', 'id');
Message.ensureIndex('createdAt');

Message.changes().then((feed) => {
  feed.each((error, doc) => {
    if (error) {
      console.log(error);
      process.exit(1);
    } else {
      // A new document was inserted:
      io.sockets.in(doc.boardId).emit('message', doc);
    }
  });
}).error((error) => {
  console.log(error);
  process.exit(1);
});
