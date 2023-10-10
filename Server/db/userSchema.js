const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  // Otros campos que desees almacenar
});

const User = mongoose.model('User', userSchema);

module.exports = User;
