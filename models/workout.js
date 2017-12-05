const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  workout: String,
  date: Date,
  notes: String,
  exercise1: {
    name: String,
    weight: [],
    reps: [],
  },
  exercise2: {
    name: String,
    weight: [],
    reps: [],
  },
  exercise3: {
    name: String,
    weight: [],
    reps: [],
  },
  exercise4: {
    name: String,
    weight: [],
    reps: [],
  },
  exercise5: {
    name: String,
    weight: [],
    reps: [],
  },
  exercise6: {
    name: String,
    weight: [],
    reps: [],
  },
  exercise7: {
    name: String,
    weight: [],
    reps: [],
  },
  exercise8: {
    name: String,
    weight: [],
    reps: [],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('WorkoutSchema', WorkoutSchema)
