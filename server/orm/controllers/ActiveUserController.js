import ActiveUser from '../models/ActiveUser.js';
import helper from './helper.js';

export default {
  getActiveUsers: (req, res) => {
    const boardId = req.params.board_id;

    ActiveUser.getAll(boardId, { index: 'boardId' }).run()
      .then((user) => {
        res.status(200).json({ user });
      })
      .error(helper.handleError(res));
  },

  addActiveUser: (req, res) => {
    const { boardId, name } = req.body;
    const id = req.user.sub;
    const newActiveUser = new ActiveUser({ id, boardId, name });

    ActiveUser._get(id).execute()
      .then((user) => {
        if (!user) {
          newActiveUser.save()
          .then((user) => {
            res.status(201).json({ user });
          })
            .error(helper.handleError(res));
        } else {
          res.status(200).json({ user });
        }
      });
  },
  deleteActiveUser: (req, res) => {
    const id = req.user.sub;

    ActiveUser.get(id).run()
      .then((user) => {
        user.delete()
        .then(() => {
          res.sendStatus(204);
        });
      })
      .error(helper.handleError(res));
  },
};
