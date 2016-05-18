import Board from '../models/Board.js';
import User from '../models/User.js';
import helper from './helper.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Uncomment the following line for local development!
// dotenv.load();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const mailOptions = {
  from: 'stormbrainingapp@gmail.com',
};

export default {
  email: (req, res) => {
    const toEmail = req.body.email.replace(/ /g, '').split(',');
    mailOptions.subject = req.body.name + ' has invited you to join a board on Stormbraining!';
    mailOptions.to = toEmail;
    mailOptions.html = '<h2><b>Topic: ' + req.body.title + '!</b></h2>' +
                        '<h3>Join here:</h3>' +
                        req.body.link +
                        '<p>Make it brain!</p>';
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent:' + info.response);
      }
    });
  },

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
        board.ideas = board.ideas.map((idea) => {
          const comments = board.comments.filter((comment) => comment.ideaId === idea.id);
          return { ...idea, comments };
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
      timedBoards: true,
    }).run()
      .then((board) => {
        if (userId === board.authorId) {
          board.deleteAll({ ideas: true, comments: true, messages: true, timedBoards: true })
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
