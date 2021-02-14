const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const validate = require('../../middleware/validate.js');
const { User } = require('../../models/user.js');
const { Thread, Message, threadSchema } = require('../../models/thread.js');
const mongoose = require('mongoose');
//const { io } = require('../../server');

router.post('/newThread', auth, async(req, res) => {
  if (!otherUser) otherUser = await User.findOne({ email: req.body.usernameOrEmail });
  if (!otherUser) return res.status(400).send('Invalid username or email');

  

  
  let user = await User.findOne({ _id: req.user._id });

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

    socket.on("joinThreads", async (data) => {
      for (let i = 0; i < data.data.length; i++) {
        socket.join(data.data[i]._id);
      }
    });

    socket.on("newThread", async (args) => {
      const decoded = jwt.verify(args.auth, config.get('jwtPrivateKey'));

      let user = await User.findById(decoded);
      let otherUser = await User.findOne({ username: args.newContact });
      if (!otherUser) return res.status(400).send('Invalid username');

      thread = new Thread({
        users: [{_id: user._id, username: user.username}, {_id: otherUser._id, username: otherUser.username}]
      });
      await thread.save();

      user.threads.push(thread._id);
      await user.save();

      otherUser.threads.push(thread._id);
      await otherUser.save();

      io.of("/api/messenger").in(thread._id).emit('newThread', thread);
    });

    socket.on("newMessage", async (args) => {
      let thread = await Thread.findById(args.thread);
      if (!thread) return res.status(400).send('Invalid thread');

      console.log(args.msg);

      message = new Message({
        text: args.msg,
        by: args.by
      });

      console.log(message);
      thread.messages.push(message);
      await thread.save();
      
      io.of("/api/messenger").to(thread._id.toString()).emit('newMessage', { msg: thread.messages[thread.messages.length - 1], threadId: thread._id });
    });
  
    socket.on("disconnect", () => {
      console.log("socket.io: User disconnected: ", socket.id);
    });
  });
  










  /*const connection = mongoose.connection;
  
  connection.once("open", () => {
    console.log("MongoDB database connected");
  
    console.log("Setting change streams");
    const threadChangeStream = connection.collection("threads").watch();
  
    threadChangeStream.on("change", (change) => {
      switch (change) {
        case "joinThread":
          console.log("change.fullDocument.text")
          const message = new Message({
            text: change.fullDocument.text
          });
  
          io.of("/api/messenger").emit("newMessage", message);
          break;
  
        case "delete":
          io.of("/api/messenger").emit("deletedThought", change.documentKey._id);
          break;
      }
    });
  });*/

  port = 3001
  http.listen(port, () => {
    console.log(`Listening at :${port}...`);
  });
}

//module.exports = router;