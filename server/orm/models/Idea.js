import thinky from '../thinkyConfig.js';
import { io } from '../../server.js';
// Object destructuring issue (https://github.com/neumino/thinky/issues/351)
const r = thinky.r;
const type = thinky.type;

const Idea = thinky.createModel('Idea', {
  id: type.string(),
  authorId: type.string().required(),
  content: type.string().required(),
  upvotes: type.array().default(() => []),
  boardId: type.string().required(),
  createdAt: type.date().default(r.now),
});

export default Idea;

// Relationship defined after export following docs to handle circular reference,
// require used instead of import due to same issue (https://github.com/neumino/thinky/issues/399)
const Board = require('./Board').default;
const User = require('./User').default;
Idea.belongsTo(User, 'author', 'authorId', 'id');
Idea.belongsTo(Board, 'board', 'boardId', 'id');
Idea.ensureIndex('createdAt');

// Initialize change feed on Idea
Idea.changes().then((feed) => {
  feed.each((error, doc) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    if (doc.isSaved() === false) {
      // The following document was deleted:
      const docToDelete = Object.assign({ toBeDeleted: true }, doc);
      io.sockets.in(doc.boardId).emit('idea', docToDelete);
    } else if (!doc.getOldValue()) {
      // A new document was inserted:
      console.log(doc.boardId);
      io.sockets.in(doc.boardId).emit('idea', doc);
    } else {
      // A document was updated.
      io.sockets.in(doc.boardId).emit('idea', doc);
    }
  });
}).error((error) => {
  console.log(error);
  process.exit(1);
});
