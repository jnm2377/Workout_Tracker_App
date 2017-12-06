const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  workout: {type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}
});

module.exports = mongoose.model('Comment', commentSchema);
