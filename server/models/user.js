const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024
  },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }]
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    usernameOrEmail: Joi.string().min(5).max(255),
    username: Joi.string().min(5).max(50),
    email: Joi.string().min(5).max(255).email(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(user);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;