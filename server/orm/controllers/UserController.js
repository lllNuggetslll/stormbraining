import User from '../models/User.js';
import helper from './helper.js';

export default {
  addUser: (req, res) => {
    const newUser = new User(req.body);

    // Used ._get() and .execute() to return null instead of
    // throwing error when user is not found
    User._get(req.body.id).execute()
      .then((user) => {
        if (!user) {
          newUser.save()
            .then((user) => {
              res.status(201).json({ user });
            })
            .error(helper.handleError(res));
        } else {
          console.log('User already exists.');
        }
      });
  },
};
