const mongoose = require('mongoose');
const messageSchema = require('./messageSchema');



const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  messages: [messageSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

