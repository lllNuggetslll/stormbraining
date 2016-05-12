import Board from '../models/Board.js';
import User from '../models/User.js';
import helper from './helper.js';

export default {
  addBoard: (req, res) => {
    const { title } = req.body;
    const authorId = req.user.sub;
    const newBoard = new Board({ title, authorId });

    newBoard.save()
      .then((board) => {
        res.status(201).json({ board });
      })
      .error(helper.handleError(res));
  },

  getAllBoards: (req, res) => {
    Board.orderBy({ index: 'createdAt' }).run()
      .then((boards) => {
        res.status(200).json({ boards });
      })
      .error(helper.handleError(res));
  },

  getBoard: (req, res) => {
    const id = req.params.board_id;

    Board.get(id).getJoin({
      ideas: {
        _apply: (sequence) => sequence.orderBy('createdAt'),
      },
      comments: {
        _apply: (sequence) => sequence.orderBy('createdAt'),
      },
      messages: {
        _apply: (sequence) => sequence.orderBy('createdAt'),
      },
      activeUser: true,
      members: true,
    }).run()
      .then((board) => {
        board.ideas.forEach(idea => {
          idea.comments = [];
          board.comments.forEach(comment => {
            if (comment.ideaId === idea.id) {
              idea.comments.push(comment);
            }
          });
        });
        delete board.comments;
        res.status(200).json({ board });
      })
      .error(helper.handleError(res));
  },

  deleteBoard: (req, res) => {
    const id = req.params.board_id;
    const userId = req.user.sub;

    Board.get(id).getJoin({
      ideas: true,
      comments: true,
      messages: true,
      activeUser: true,
    }).run()
      .then((board) => {
        if (userId === board.authorId) {
          board.deleteAll({ ideas: true, comments: true, messages: true })
            .then((board) => {
              res.status(201).json({ board });
            });
        } else {
          console.log('Permission denied.');
        }
      })
      .error(helper.handleError(res));
  },

  updateBoard: (req, res) => {
    const id = req.params.board_id;
    const update = req.body;

    Board.get(id).run()
      .then((board) => {
        board.merge(update).save()
          .then((result) => {
            res.status(200).json({ result });
          });
      })
      .error(helper.handleError(res));
  },

  joinUserToBoard: (req, res) => {
    const id = req.params.board_id;
    const userId = req.user.sub;

    Board.get(id).getJoin({ members: true }).run()
      .then((board) => {
        User.get(userId).run()
          .then((user) => {
            const existingIndex = board.members.map((member) => member.id).indexOf(user.id);
            if (existingIndex < 0 && user.id !== board.authorId) {
              board.members = [...board.members, user];
              board.saveAll({ members: true })
                .then((updatedBoard) => {
                  res.status(201).json({ board: updatedBoard });
                });
            } else {
              res.sendStatus(422);
            }
          });
      })
      .error(helper.handleError(res));
  },

  removeUserFromBoard: (req, res) => {
    const id = req.params.board_id;
    const userId = req.user.sub;

    Board.get(id).getJoin({ members: true }).run()
      .then((board) => {
        User.get(userId).run()
          .then((user) => {
            const existingIndex = board.members.map((member) => member.id).indexOf(user.id);
            if (existingIndex > -1) {
              board.members.splice(existingIndex, 1);
              board.saveAll({ members: true })
                .then((updatedBoard) => {
                  res.status(201).json({ board: updatedBoard });
                });
            } else {
              res.sendStatus(404);
            }
          });
      })
      .error(helper.handleError(res));
  },
};
