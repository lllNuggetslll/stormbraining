import thinky from '../thinkyConfig.js';
// Object destructuring issue (https://github.com/neumino/thinky/issues/351)
const r = thinky.r;
const type = thinky.type;

const User = thinky.createModel( 'User', {
  id: type.string(),
  name: type.string().required(),
  email: type.string().required(),
});

export default User;

// Relationship defined after export following docs to handle circular reference,
// require used instead of import due to same issue (https://github.com/neumino/thinky/issues/399)
const Board = require('./Board').default;
const Idea = require('./Idea').default;
User.hasMany(Board, 'board', 'boardId', 'id');
User.hasMany(Idea, 'ideas', 'id', 'boardId');

