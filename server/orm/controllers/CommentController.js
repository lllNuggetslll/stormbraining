import Comment from '../models/Comment.js';
import helper from './helper.js';

export default {
  addComment: (req, res) => {
    const ideaId = req.params.idea_id;
    const boardId = req.params.board_id;
    const authorId = req.user.sub;
    const { content, userName } = req.body;
    const newComment = new Comment({ content, authorName: userName, ideaId, boardId, authorId });

    newComment.save()
      .then((comment) => {
        res.status(201).json({ comment });
      })
      .error(helper.handleError(res));
  },

  deleteComment: (req, res) => {
    const id = req.params.comment_id;
    const userId = req.user.sub;

    Comment.get(id).run()
      .then((comment) => {
        if (userId === comment.authorId) {
          comment.delete()
            .then((result) => {
              res.sendStatus(204);
            });
        } else {
          console.log('Permission denied.');
          throw new Error('Permission denied');
        }
      });
  },

  updateComment: (req, res) => {
    const id = req.params.idea_id;
    const update = req.body;
    const userId = req.user.sub;

    Comment.get(id).run()
      .then((comment) => {
        if (userId === comment.authorId) {
          comment.merge(update).save()
            .then((result) => {
              res.status(200).json({ result });
            });
        } else {
          console.log('Permission denied.');
          throw new Error('Permission denied');
        }
      })
      .error(helper.handleError(res));
  },
};
