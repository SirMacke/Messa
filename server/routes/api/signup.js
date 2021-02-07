const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const validate = require('../../middleware/validate.js');
const { User, validateUser } = require('../../models/user.js');

router.post('/', validate(validateUser), async(req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['username', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  let response = {
    username: user.username,
    email: user.email,
    auth: token,
    tasks: user.tasks
  }

  res.status(200).json(response);
});

module.exports = router;