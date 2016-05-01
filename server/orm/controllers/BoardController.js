import Board from '../models/Board.js';
import helper from './helper.js';

export default {
  addBoard: (req, res) => {
    const newBoard = new Board(req.body);

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
    }).run()
      .then((board) => {
        res.status(200).json({ board });
      })
      .error(helper.handleError(res));
  },

  deleteBoard: (req, res) => {
    const id = req.params.board_id;

    Board.get(id).getJoin({
      ideas: true,
    }).run()
      .then((board) => {
        board.deleteAll({ ideas: true })
          .then((result) => {
            res.sendStatus(204);
          });
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
};
