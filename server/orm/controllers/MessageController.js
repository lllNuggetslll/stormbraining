import Message from '../models/Message.js';
import helper from './helper.js';

export default {
  getMessages: (req, res) => {
    const boardId = req.params.board_id;

    Message.getAll(boardId, { index: 'boardId' })
      .orderBy('createdAt').run()
      .then((messages) => {
        res.status(200).json({ messages });
      })
      .error(helper.handleError(res));
  },

  addMessage: (req, res) => {
    const boardId = req.params.board_id;
    const { userName, message } = req.body;
    const newMessage = new Message({ userName, message, boardId });

    newMessage.save()
      .then((message) => {
        res.status(201).json({ message });
      })
      .error(helper.handleError(res));
  },
};
