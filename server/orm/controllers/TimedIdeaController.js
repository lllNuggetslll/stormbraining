import TimedIdea from '../models/TimedIdea.js';
import helper from './helper.js';

export default {
  addTimedIdea: (req, res) => {
    const timedBoardId = req.params.timed_board_id;
    const authorId = req.user.sub;
    const { content } = req.body;
    const newTimedIdea = new TimedIdea({ content, timedBoardId, authorId });

    newTimedIdea.save()
      .then((idea) => {
        res.status(201).json({ idea });
      })
      .error(helper.handleError(res));
  },

  toggleTimedIdea: (req, res) => {
    const id = req.params.timed_idea_id;

    TimedIdea.get(id).run()
      .then((idea) => {
        idea.selected = !idea.selected;
        idea.save()
          .then((idea) => {
            res.status(201).json({ idea });
          })
          .error(helper.handleError(res));
      })
      .error(helper.handleError(res));
  },

  deleteTimedIdea: (req, res) => {
    const id = req.params.timed_idea_id;
    const userId = req.user.sub;

    TimedIdea.get(id).run()
      .then((idea) => {
        if (userId === idea.authorId) {
          idea.delete()
            .then((idea) => {
              res.status(201).json({ idea });
            });
        } else {
          console.log('Permission denied.');
        }
      })
      .error(helper.handleError(res));
  },

  updateTimedIdea: (req, res) => {
    const id = req.params.timed_idea_id;
    const update = req.body;
    const userId = req.user.sub;

    TimedIdea.get(id).run()
      .then((idea) => {
        if (userId === idea.authorId) {
          idea.merge(update).save()
            .then((idea) => {
              res.status(200).json({ idea });
            });
        } else {
          console.log('Permission denied.');
        }
      })
      .error(helper.handleError(res));
  },
};
