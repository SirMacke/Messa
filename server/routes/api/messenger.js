const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const _ = require('lodash');
const validate = require('../../middleware/validate.js');
const { User } = require('../../models/user.js');
const { Thread, Message } = require('../../models/thread.js');
const mongoose = require('mongoose');
//const { io } = require('../../server');

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

module.exports = function() {
  const http = require('http').Server(express);
  const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
    }
  });
  
  io.of("/api/messenger").on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id);
    socket.emit('Welcome', "test2");
  
    socket.on("disconnect", () => {
      console.log("socket.io: User disconnected: ", socket.id);
    });
  });
  
  const connection = mongoose.connection;
  
  connection.once("open", () => {
    console.log("MongoDB database connected");
  
    console.log("Setting change streams");
    const threadChangeStream = connection.collection("threads").watch();
  
    threadChangeStream.on("change", (change) => {
      switch (change) {
        case "joinThread":
          console.log("change.fullDocument.text")
          /*const message = new Message({
            text: change.fullDocument.text
          });
  
          io.of("/api/messenger").emit("newMessage", message);*/
          break;
  
        case "delete":
          io.of("/api/messenger").emit("deletedThought", change.documentKey._id);
          break;
      }
    });
  });

  port = 3001
  http.listen(port, () => {
    console.log(`Listening at :${port}...`);
  });
}

//module.exports = router;