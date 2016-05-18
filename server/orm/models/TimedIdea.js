import thinky from '../thinkyConfig.js';
// Object destructuring issue (https://github.com/neumino/thinky/issues/351)
const r = thinky.r;
const type = thinky.type;

const TimedIdea = thinky.createModel('TimedIdea', {
  id: type.string(),
  authorId: type.string().required(),
  content: type.string().required(),
  selected: type.boolean().default(false),
  timedBoardId: type.string().required(),
  createdAt: type.date().default(r.now),
});

export default TimedIdea;

// Relationship defined after export following docs to handle circular reference,
// require used instead of import due to same issue (https://github.com/neumino/thinky/issues/399)
const TimedBoard = require('./TimedBoard').default;
const User = require('./User').default;
TimedIdea.belongsTo(User, 'author', 'authorId', 'id');
TimedIdea.belongsTo(TimedBoard, 'timedBoard', 'timedBoardId', 'id');
TimedIdea.ensureIndex('createdAt');
