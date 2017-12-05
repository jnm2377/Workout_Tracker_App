const mongoose = require('mongoose');

const prSchema = mongoose.Schema({
  exercise: String,
  weight: String,
  reps: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Pr', prSchema);
