import TimedBoard from '../models/TimedBoard.js';
import Idea from '../models/Idea.js';
import helper from './helper.js';

export default {
  addTimedBoard: (req, res) => {
    const { title, timerLength, createdAt } = req.body;
    const boardId = req.params.board_id;
    const authorId = req.user.sub;
    const newTimedBoard = new TimedBoard({ title, createdAt, authorId, boardId, timerLength });

    newTimedBoard.save()
      .then((board) => {
        res.status(201).json({ board });
      })
      .error(helper.handleError(res));
  },

  getTimedBoard: (req, res) => {
    const id = req.params.timed_board_id;

    TimedBoard.get(id).getJoin({
      timedIdeas: {
        _apply: (sequence) => sequence.orderBy('createdAt'),
      },
    }).run()
      .then((board) => {
        res.status(200).json({ board });
      })
      .error(helper.handleError(res));
  },

  deleteTimedBoard: (req, res) => {
    const id = req.params.timed_board_id;
    const userId = req.user.sub;

    TimedBoard.get(id).getJoin({ timedIdeas: true }).run()
      .then((board) => {
        if (userId === board.authorId) {
          board.deleteAll({ timedIdeas: true })
            .then((board) => {
              res.status(201).json({ board });
            });
        } else {
          console.log('Permission denied.');
        }
      })
      .error(helper.handleError(res));
  },

  pushTimedBoard: (req, res) => {
    const id = req.params.timed_board_id;
    const authorId = req.user.sub;

    TimedBoard.get(id).getJoin({
      timedIdeas: {
        _apply: (sequence) => sequence.orderBy('createdAt'),
      },
    }).run()
      .then((timedBoard) => {
        if (authorId === timedBoard.authorId && !timedBoard.completed) {
          timedBoard.timedIdeas.forEach(idea => {
            if (idea.selected) {
              const { content } = idea;
              const newIdea = new Idea({ content, authorId, boardId: timedBoard.boardId });
              newIdea.save();
            }
          });
          timedBoard.merge({ completed: true }).save()
            .then((board) => {
              res.status(201).json({ board });
            });
        } else {
          console.log('Permission denied.');
        }
      })
      .error(helper.handleError(res));
  },
};
