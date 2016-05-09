import Idea from '../models/Idea.js';
import helper from './helper.js';

export default {
  addIdea: (req, res) => {
    const boardId = req.params.board_id;
    const { content, authorId } = req.body;
    const newIdea = new Idea({ content, boardId, authorId });

    newIdea.save()
      .then((idea) => {
        res.status(201).json({ idea });
      })
      .error(helper.handleError(res));
  },

  getIdea: (req, res) => {
    const id = req.params.idea_id;

    Idea.get(id).run()
      .then((idea) => {
        res.status(200).json({ idea });
      })
      .error(helper.handleError(res));
  },

  upvoteIdea: (req, res) => {
    const id = req.params.idea_id;
    const userId = req.body.userId;

    Idea.get(id).run()
      .then((idea) => {
        idea.upvotes.push(userId);
        idea.save()
          .then((idea) => {
            res.status(201).json({ idea });
          })
          .error(helper.handleError(res));
      })
      .error(helper.handleError(res));
  },

  unvoteIdea: (req, res) => {
    const id = req.params.idea_id;
    const userId = req.body.user_id;

    Idea.get(id).run()
      .then((idea) => {
        const voteIndex = idea.upvotes.indexOf(userId);
        idea.upvotes.splice(voteIndex, 1);
        idea.save()
          .then((idea) => {
            res.status(201).json({ idea });
          })
          .error(helper.handleError(res));
      })
      .error(helper.handleError(res));
  },

  deleteIdea: (req, res) => {
    const id = req.params.idea_id;
    const userId = req.body.user_id;

    Idea.get(id).run()
      .then((idea) => {
        if (userId === idea.authorId) {
          idea.delete()
            .then((result) => {
              res.sendStatus(204);
            });
        } else {
          console.log('Permission denied.');
        }
      });
  },

  updateIdea: (req, res) => {
    const id = req.params.idea_id;
    const update = req.body;
    const userId = req.body.user_id;

    Idea.get(id).run()
      .then((idea) => {
        if (userId === idea.authorId) {
          idea.merge(update).save()
            .then((result) => {
              res.status(200).json({ result });
            });
        } else {
          console.log('Permission denied.');
        }
      })
      .error(helper.handleError(res));
  },
};
