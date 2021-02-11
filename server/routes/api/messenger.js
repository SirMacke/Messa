const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const _ = require('lodash');
const validate = require('../../middleware/validate.js');
const { User } = require('../../models/user.js');
const { Thread } = require('../../models/thread.js');

router.post('/newThread', auth, async(req, res) => {
  let otherUser = await User.findOne({ username: req.body.usernameOrEmail });
  if (!otherUser) otherUser = await User.findOne({ email: req.body.usernameOrEmail });
  if (!otherUser) return res.status(400).send('Invalid username or email');

  thread = new Thread({
    users: [req.user._id, otherUser._id]
  });
  await thread.save();

  otherUser.threads.push(thread._id);
  await otherUser.save();
  
  let user = await User.findOne({ _id: req.user._id });
  user.threads.push(thread._id);
  await user.save();

  res.status(200).json(thread);
});

module.exports = router;