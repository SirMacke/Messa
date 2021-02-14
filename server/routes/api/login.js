const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const validate = require('../../middleware/validate.js');
const { User, validateUser } = require('../../models/user.js');
const { Thread } = require('../../models/thread.js');

router.post('/', validate(validateUser), async(req, res) => {
  let user = await User.findOne({ username: req.body.usernameOrEmail });
  if (!user) user = await User.findOne({ email: req.body.usernameOrEmail });
  if (!user) return res.status(400).send('Invalid username, email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username, email or password.');

  const token = user.generateAuthToken();
  const threads = [];

  for (let i = 0; i < user.threads.length; i++) {
    let thread = await Thread.findById(user.threads[i]);
    threads.push(thread);
  }
  
  let response = {
    username: user.username,
    email: user.email,
    auth: token,
    threads: threads
  }

  res.status(200).json(response);
});

module.exports = router;