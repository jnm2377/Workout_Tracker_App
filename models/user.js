const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, require: true},
  lastname: String
})

module.exports = mongoose.model('UsersSchema', UsersSchema);
