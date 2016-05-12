import path from 'path';
import BoardController from '../orm/controllers/BoardController.js';
import IdeaController from '../orm/controllers/IdeaController.js';
import CommentController from '../orm/controllers/CommentController.js';
import UserController from '../orm/controllers/UserController.js';
import MessageController from '../orm/controllers/MessageController.js';
import ActiveUserController from '../orm/controllers/ActiveUserController.js';

export default function routes(app, express) {

  app.route('/api/boards')
    .get(BoardController.getAllBoards)
    .post(BoardController.addBoard);

  app.route('/api/boards/:board_id')
    .get(BoardController.getBoard)
    .put(BoardController.updateBoard)
    .delete(BoardController.deleteBoard);

  app.route('/api/boards/:board_id/ideas')
    .post(IdeaController.addIdea);

  app.route('/api/boards/:board_id/ideas/:idea_id')
    .get(IdeaController.getIdea)
    .put(IdeaController.updateIdea)
    .delete(IdeaController.deleteIdea);

  app.route('/api/boards/:board_id/ideas/:idea_id/upvotes')
    .post(IdeaController.upvoteIdea)
    .put(IdeaController.unvoteIdea);

  app.route('/api/boards/:board_id/ideas/:idea_id/comments')
    .post(CommentController.addComment);

  app.route('/api/boards/:board_id/ideas/:idea_id/comments/:comment_id')
    .put(CommentController.updateComment)
    .delete(CommentController.deleteComment);

  app.route('/api/users')
    .post(UserController.addUser);

  app.route('/api/messages/:board_id')
    .get(MessageController.getMessages)
    .post(MessageController.addMessage);

  app.route('/api/activeusers/:board_id')
    .get(ActiveUserController.getActiveUsers)
    .post(ActiveUserController.addActiveUser)
    .delete(ActiveUserController.deleteActiveUser);

  app.route(/.*/)
    .get(function root(req, res) {
      res.sendFile(path.join(__dirname, '/../../client/index.html'));
    });
}
