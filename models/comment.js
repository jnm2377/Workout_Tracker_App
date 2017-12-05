const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  author: String,
  content: { type: String, require: true },
  workout: {type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}
});

module.exports = mongoose.model('Comment', commentSchema);
