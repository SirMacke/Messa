const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    text: {
      type: String,
      required: true,
      minlength: 1
    },
    by: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
})

const threadSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: {
    type: [messageSchema],
    required: true,
    default: []
  }
});

const Message = mongoose.model('Message', messageSchema);
const Thread = mongoose.model('Thread', threadSchema);

function validateThread(thread) {
  const schema = Joi.object({
    users: Joi.objectId(),
    messages: Joi.array()
  });

  return schema.validate(thread);
}

exports.threadSchema = threadSchema;
exports.Thread = Thread;
exports.validateThread = validateThread;
exports.Message = Message;