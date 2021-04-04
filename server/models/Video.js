const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: {
    type: String
  },
  size: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { User }