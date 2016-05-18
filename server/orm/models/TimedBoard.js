import thinky from '../thinkyConfig.js';
// Object destructuring issue (https://github.com/neumino/thinky/issues/351)
const r = thinky.r;
const type = thinky.type;

// Timer set in milliseconds
const TimedBoard = thinky.createModel('TimedBoard', {
  id: type.string(),
  authorId: type.string().required(),
  boardId: type.string().required(),
  title: type.string().required(),
  completed: type.boolean().default(false),
  timerLength: type.number().default(600000),
  createdAt: type.number().required(),
});

export default TimedBoard;

// Relationship defined after export following docs to handle circular reference,
// require used instead of import due to same issue (https://github.com/neumino/thinky/issues/399)
const TimedIdea = require('./TimedIdea').default;
const User = require('./User').default;
const Board = require('./Board').default;
TimedBoard.belongsTo(User, 'author', 'authorId', 'id');
TimedBoard.belongsTo(Board, 'board', 'boardId', 'id');
TimedBoard.hasMany(TimedIdea, 'timedIdeas', 'id', 'timedBoardId');
TimedBoard.ensureIndex('createdAt');
