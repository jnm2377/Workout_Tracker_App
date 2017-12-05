const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();

// require models
const User = require('../models/user.js');
const Workout = require('../models/workout.js');
const Comment = require('../models/comment.js');
const Pr = require('../models/pr.js');

//MIDDLEWARE
router.use(express.static('public'));
router.use(methodOverride('_method'));

//HOME route
router.get('/home', (req, res) => {
  res.render('home/home.ejs')
});


//COMMUNITY index
router.get('/community', async (req, res) => {
  const allWorkouts = await Workout.find();
  // console.log(allWorkouts);
  res.render('community/index.ejs', {allWorkouts})
})

//COMMUNITY show
router.get('/community/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  const comments = await Comment.find({workout: workout._id});
  console.log(workout);
  console.log(comments);
  res.render('community/show.ejs', {workout, comments})
})

router.post('/community/:id', async (req, res) => {
  const newComment = await Comment.create(req.body);
  res.redirect('back');
})

//WORKOUTS INDEX route
router.get('/workouts', async (req, res) => {
  if(req.session.logged) {
    const user = await User.find({username: req.session.username});
    const userWorkouts = await Workout.find({user: user[0]._id});
    console.log("================");
    console.log(user);
    console.log("================");
    console.log(userWorkouts);
    res.render('workouts/index.ejs', {
      user,
      userWorkouts
    });
  } else {
    res.redirect('/user/login');
  }
});


//SHOW workout
router.get('/workouts/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  const comments = await Comment.find({workout: req.params.id});
  // console.log(workout);
  res.render('workouts/show.ejs', {workout, comments});
})



//CREATE workout
router.get('/new', async (req, res) => {
  const user = await User.find({username: req.session.username});
  console.log(user);
  res.render('workouts/new.ejs', {user});
})

router.post('/workouts', async (req, res) => {
  console.log(req.body);
  const workoutObj = {};
  workoutObj.workout = req.body.workout;
  workoutObj.date = req.body.date;
  workoutObj.notes = req.body.notes;
  workoutObj.user = req.body.user;
  workoutObj.exercise1 = {};
  workoutObj.exercise1.name = req.body.exercise1;
  //EXERCISE 1
  workoutObj.exercise1.weight = [];
  workoutObj.exercise1.weight.push(req.body.ex1wt1);
  workoutObj.exercise1.weight.push(req.body.ex1wt2);
  workoutObj.exercise1.weight.push(req.body.ex1wt3);
  workoutObj.exercise1.weight.push(req.body.ex1wt4);
  workoutObj.exercise1.weight.push(req.body.ex1wt5);
  workoutObj.exercise1.weight.push(req.body.ex1wt6);
  workoutObj.exercise1.reps = [];
  workoutObj.exercise1.reps.push(req.body.ex1rp1);
  workoutObj.exercise1.reps.push(req.body.ex1rp2);
  workoutObj.exercise1.reps.push(req.body.ex1rp3);
  workoutObj.exercise1.reps.push(req.body.ex1rp4);
  workoutObj.exercise1.reps.push(req.body.ex1rp5);
  workoutObj.exercise1.reps.push(req.body.ex1rp6);
  //EXERCISE 2
  workoutObj.exercise2 = {};
  workoutObj.exercise2.name = req.body.exercise2;
  workoutObj.exercise2.weight = [];
  workoutObj.exercise2.weight.push(req.body.ex2wt1);
  workoutObj.exercise2.weight.push(req.body.ex2wt2);
  workoutObj.exercise2.weight.push(req.body.ex2wt3);
  workoutObj.exercise2.weight.push(req.body.ex2wt4);
  workoutObj.exercise2.weight.push(req.body.ex2wt5);
  workoutObj.exercise2.weight.push(req.body.ex2wt6);
  workoutObj.exercise2.reps = [];
  workoutObj.exercise2.reps.push(req.body.ex2rp1);
  workoutObj.exercise2.reps.push(req.body.ex2rp2);
  workoutObj.exercise2.reps.push(req.body.ex2rp3);
  workoutObj.exercise2.reps.push(req.body.ex2rp4);
  workoutObj.exercise2.reps.push(req.body.ex2rp5);
  workoutObj.exercise2.reps.push(req.body.ex2rp6);
  //EXERCISE 3
  workoutObj.exercise3 = {};
  workoutObj.exercise3.name = req.body.exercise3;
  workoutObj.exercise3.weight = [];
  workoutObj.exercise3.weight.push(req.body.ex3wt1);
  workoutObj.exercise3.weight.push(req.body.ex3wt2);
  workoutObj.exercise3.weight.push(req.body.ex3wt3);
  workoutObj.exercise3.weight.push(req.body.ex3wt4);
  workoutObj.exercise3.weight.push(req.body.ex3wt5);
  workoutObj.exercise3.weight.push(req.body.ex3wt6);
  workoutObj.exercise3.reps = [];
  workoutObj.exercise3.reps.push(req.body.ex3rp1);
  workoutObj.exercise3.reps.push(req.body.ex3rp2);
  workoutObj.exercise3.reps.push(req.body.ex3rp3);
  workoutObj.exercise3.reps.push(req.body.ex3rp4);
  workoutObj.exercise3.reps.push(req.body.ex3rp5);
  workoutObj.exercise3.reps.push(req.body.ex3rp6);
  //EXERCISE 4
  workoutObj.exercise4 = {};
  workoutObj.exercise4.name = req.body.exercise4;
  workoutObj.exercise4.weight = [];
  workoutObj.exercise4.weight.push(req.body.ex4wt1);
  workoutObj.exercise4.weight.push(req.body.ex4wt2);
  workoutObj.exercise4.weight.push(req.body.ex4wt3);
  workoutObj.exercise4.weight.push(req.body.ex4wt4);
  workoutObj.exercise4.weight.push(req.body.ex4wt5);
  workoutObj.exercise4.weight.push(req.body.ex4wt6);
  workoutObj.exercise4.reps = [];
  workoutObj.exercise4.reps.push(req.body.ex4rp1);
  workoutObj.exercise4.reps.push(req.body.ex4rp2);
  workoutObj.exercise4.reps.push(req.body.ex4rp3);
  workoutObj.exercise4.reps.push(req.body.ex4rp4);
  workoutObj.exercise4.reps.push(req.body.ex4rp5);
  workoutObj.exercise4.reps.push(req.body.ex4rp6);
  //EXERCISE 5
  workoutObj.exercise5 = {};
  workoutObj.exercise5.name = req.body.exercise5;
  workoutObj.exercise5.weight = [];
  workoutObj.exercise5.weight.push(req.body.ex5wt1);
  workoutObj.exercise5.weight.push(req.body.ex5wt2);
  workoutObj.exercise5.weight.push(req.body.ex5wt3);
  workoutObj.exercise5.weight.push(req.body.ex5wt4);
  workoutObj.exercise5.weight.push(req.body.ex5wt5);
  workoutObj.exercise5.weight.push(req.body.ex5wt6);
  workoutObj.exercise5.reps = [];
  workoutObj.exercise5.reps.push(req.body.ex5rp1);
  workoutObj.exercise5.reps.push(req.body.ex5rp2);
  workoutObj.exercise5.reps.push(req.body.ex5rp3);
  workoutObj.exercise5.reps.push(req.body.ex5rp4);
  workoutObj.exercise5.reps.push(req.body.ex5rp5);
  workoutObj.exercise5.reps.push(req.body.ex5rp6);
  //EXERCISE 6
  workoutObj.exercise6 = {};
  workoutObj.exercise6.name = req.body.exercise6;
  workoutObj.exercise6.weight = [];
  workoutObj.exercise6.weight.push(req.body.ex6wt1);
  workoutObj.exercise6.weight.push(req.body.ex6wt2);
  workoutObj.exercise6.weight.push(req.body.ex6wt3);
  workoutObj.exercise6.weight.push(req.body.ex6wt4);
  workoutObj.exercise6.weight.push(req.body.ex6wt5);
  workoutObj.exercise6.weight.push(req.body.ex6wt6);
  workoutObj.exercise6.reps = [];
  workoutObj.exercise6.reps.push(req.body.ex6rp1);
  workoutObj.exercise6.reps.push(req.body.ex6rp2);
  workoutObj.exercise6.reps.push(req.body.ex6rp3);
  workoutObj.exercise6.reps.push(req.body.ex6rp4);
  workoutObj.exercise6.reps.push(req.body.ex6rp5);
  workoutObj.exercise6.reps.push(req.body.ex6rp6);
  //EXERCISE 7
  workoutObj.exercise7 = {};
  workoutObj.exercise7.name = req.body.exercise7;
  workoutObj.exercise7.weight = [];
  workoutObj.exercise7.weight.push(req.body.ex7wt1);
  workoutObj.exercise7.weight.push(req.body.ex7wt2);
  workoutObj.exercise7.weight.push(req.body.ex7wt3);
  workoutObj.exercise7.weight.push(req.body.ex7wt4);
  workoutObj.exercise7.weight.push(req.body.ex7wt5);
  workoutObj.exercise7.weight.push(req.body.ex7wt6);
  workoutObj.exercise7.reps = [];
  workoutObj.exercise7.reps.push(req.body.ex7rp1);
  workoutObj.exercise7.reps.push(req.body.ex7rp2);
  workoutObj.exercise7.reps.push(req.body.ex7rp3);
  workoutObj.exercise7.reps.push(req.body.ex7rp4);
  workoutObj.exercise7.reps.push(req.body.ex7rp5);
  workoutObj.exercise7.reps.push(req.body.ex7rp6);
  //EXERCISE 8
  workoutObj.exercise8 = {};
  workoutObj.exercise8.name = req.body.exercise8;
  workoutObj.exercise8.weight = [];
  workoutObj.exercise8.weight.push(req.body.ex8wt1);
  workoutObj.exercise8.weight.push(req.body.ex8wt2);
  workoutObj.exercise8.weight.push(req.body.ex8wt3);
  workoutObj.exercise8.weight.push(req.body.ex8wt4);
  workoutObj.exercise8.weight.push(req.body.ex8wt5);
  workoutObj.exercise8.weight.push(req.body.ex8wt6);
  workoutObj.exercise8.reps = [];
  workoutObj.exercise8.reps.push(req.body.ex8rp1);
  workoutObj.exercise8.reps.push(req.body.ex8rp2);
  workoutObj.exercise8.reps.push(req.body.ex8rp3);
  workoutObj.exercise8.reps.push(req.body.ex8rp4);
  workoutObj.exercise8.reps.push(req.body.ex8rp5);
  workoutObj.exercise8.reps.push(req.body.ex8rp6);

  console.log("=========================");
  console.log(workoutObj);
  console.log("=========================");
  try {
    const newWorkout = await Workout.create(workoutObj);
    res.redirect('/workout_tracker/workouts');
  } catch (e) {
    console.log(e.message);
  }

})

//UPDATE workout
router.get('/workouts/:id/edit', async (req, res) => {
  const user = await User.find({user: req.session.user});
  const workout = await Workout.findById(req.params.id);
  res.render('workouts/edit.ejs', {user, workout});
})

router.put('/workouts/:id', async (req, res) => {
  //redirect to 'workouts/:id'
  // console.log(req.body);
  const workoutObj = {};
  workoutObj.workout = req.body.workout;
  workoutObj.date = req.body.date;
  workoutObj.notes = req.body.notes;
  workoutObj.user = req.body.user;
  workoutObj.exercise1 = {};
  workoutObj.exercise1.name = req.body.exercise1;
  //EXERCISE 1
  workoutObj.exercise1.weight = [];
  workoutObj.exercise1.weight.push(req.body.ex1wt1);
  workoutObj.exercise1.weight.push(req.body.ex1wt2);
  workoutObj.exercise1.weight.push(req.body.ex1wt3);
  workoutObj.exercise1.weight.push(req.body.ex1wt4);
  workoutObj.exercise1.weight.push(req.body.ex1wt5);
  workoutObj.exercise1.weight.push(req.body.ex1wt6);
  workoutObj.exercise1.reps = [];
  workoutObj.exercise1.reps.push(req.body.ex1rp1);
  workoutObj.exercise1.reps.push(req.body.ex1rp2);
  workoutObj.exercise1.reps.push(req.body.ex1rp3);
  workoutObj.exercise1.reps.push(req.body.ex1rp4);
  workoutObj.exercise1.reps.push(req.body.ex1rp5);
  workoutObj.exercise1.reps.push(req.body.ex1rp6);
  //EXERCISE 2
  workoutObj.exercise2 = {};
  workoutObj.exercise2.name = req.body.exercise2;
  workoutObj.exercise2.weight = [];
  workoutObj.exercise2.weight.push(req.body.ex2wt1);
  workoutObj.exercise2.weight.push(req.body.ex2wt2);
  workoutObj.exercise2.weight.push(req.body.ex2wt3);
  workoutObj.exercise2.weight.push(req.body.ex2wt4);
  workoutObj.exercise2.weight.push(req.body.ex2wt5);
  workoutObj.exercise2.weight.push(req.body.ex2wt6);
  workoutObj.exercise2.reps = [];
  workoutObj.exercise2.reps.push(req.body.ex2rp1);
  workoutObj.exercise2.reps.push(req.body.ex2rp2);
  workoutObj.exercise2.reps.push(req.body.ex2rp3);
  workoutObj.exercise2.reps.push(req.body.ex2rp4);
  workoutObj.exercise2.reps.push(req.body.ex2rp5);
  workoutObj.exercise2.reps.push(req.body.ex2rp6);
  //EXERCISE 3
  workoutObj.exercise3 = {};
  workoutObj.exercise3.name = req.body.exercise3;
  workoutObj.exercise3.weight = [];
  workoutObj.exercise3.weight.push(req.body.ex3wt1);
  workoutObj.exercise3.weight.push(req.body.ex3wt2);
  workoutObj.exercise3.weight.push(req.body.ex3wt3);
  workoutObj.exercise3.weight.push(req.body.ex3wt4);
  workoutObj.exercise3.weight.push(req.body.ex3wt5);
  workoutObj.exercise3.weight.push(req.body.ex3wt6);
  workoutObj.exercise3.reps = [];
  workoutObj.exercise3.reps.push(req.body.ex3rp1);
  workoutObj.exercise3.reps.push(req.body.ex3rp2);
  workoutObj.exercise3.reps.push(req.body.ex3rp3);
  workoutObj.exercise3.reps.push(req.body.ex3rp4);
  workoutObj.exercise3.reps.push(req.body.ex3rp5);
  workoutObj.exercise3.reps.push(req.body.ex3rp6);
  //EXERCISE 4
  workoutObj.exercise4 = {};
  workoutObj.exercise4.name = req.body.exercise4;
  workoutObj.exercise4.weight = [];
  workoutObj.exercise4.weight.push(req.body.ex4wt1);
  workoutObj.exercise4.weight.push(req.body.ex4wt2);
  workoutObj.exercise4.weight.push(req.body.ex4wt3);
  workoutObj.exercise4.weight.push(req.body.ex4wt4);
  workoutObj.exercise4.weight.push(req.body.ex4wt5);
  workoutObj.exercise4.weight.push(req.body.ex4wt6);
  workoutObj.exercise4.reps = [];
  workoutObj.exercise4.reps.push(req.body.ex4rp1);
  workoutObj.exercise4.reps.push(req.body.ex4rp2);
  workoutObj.exercise4.reps.push(req.body.ex4rp3);
  workoutObj.exercise4.reps.push(req.body.ex4rp4);
  workoutObj.exercise4.reps.push(req.body.ex4rp5);
  workoutObj.exercise4.reps.push(req.body.ex4rp6);
  //EXERCISE 5
  workoutObj.exercise5 = {};
  workoutObj.exercise5.name = req.body.exercise5;
  workoutObj.exercise5.weight = [];
  workoutObj.exercise5.weight.push(req.body.ex5wt1);
  workoutObj.exercise5.weight.push(req.body.ex5wt2);
  workoutObj.exercise5.weight.push(req.body.ex5wt3);
  workoutObj.exercise5.weight.push(req.body.ex5wt4);
  workoutObj.exercise5.weight.push(req.body.ex5wt5);
  workoutObj.exercise5.weight.push(req.body.ex5wt6);
  workoutObj.exercise5.reps = [];
  workoutObj.exercise5.reps.push(req.body.ex5rp1);
  workoutObj.exercise5.reps.push(req.body.ex5rp2);
  workoutObj.exercise5.reps.push(req.body.ex5rp3);
  workoutObj.exercise5.reps.push(req.body.ex5rp4);
  workoutObj.exercise5.reps.push(req.body.ex5rp5);
  workoutObj.exercise5.reps.push(req.body.ex5rp6);
  //EXERCISE 6
  workoutObj.exercise6 = {};
  workoutObj.exercise6.name = req.body.exercise6;
  workoutObj.exercise6.weight = [];
  workoutObj.exercise6.weight.push(req.body.ex6wt1);
  workoutObj.exercise6.weight.push(req.body.ex6wt2);
  workoutObj.exercise6.weight.push(req.body.ex6wt3);
  workoutObj.exercise6.weight.push(req.body.ex6wt4);
  workoutObj.exercise6.weight.push(req.body.ex6wt5);
  workoutObj.exercise6.weight.push(req.body.ex6wt6);
  workoutObj.exercise6.reps = [];
  workoutObj.exercise6.reps.push(req.body.ex6rp1);
  workoutObj.exercise6.reps.push(req.body.ex6rp2);
  workoutObj.exercise6.reps.push(req.body.ex6rp3);
  workoutObj.exercise6.reps.push(req.body.ex6rp4);
  workoutObj.exercise6.reps.push(req.body.ex6rp5);
  workoutObj.exercise6.reps.push(req.body.ex6rp6);
  //EXERCISE 7
  workoutObj.exercise7 = {};
  workoutObj.exercise7.name = req.body.exercise7;
  workoutObj.exercise7.weight = [];
  workoutObj.exercise7.weight.push(req.body.ex7wt1);
  workoutObj.exercise7.weight.push(req.body.ex7wt2);
  workoutObj.exercise7.weight.push(req.body.ex7wt3);
  workoutObj.exercise7.weight.push(req.body.ex7wt4);
  workoutObj.exercise7.weight.push(req.body.ex7wt5);
  workoutObj.exercise7.weight.push(req.body.ex7wt6);
  workoutObj.exercise7.reps = [];
  workoutObj.exercise7.reps.push(req.body.ex7rp1);
  workoutObj.exercise7.reps.push(req.body.ex7rp2);
  workoutObj.exercise7.reps.push(req.body.ex7rp3);
  workoutObj.exercise7.reps.push(req.body.ex7rp4);
  workoutObj.exercise7.reps.push(req.body.ex7rp5);
  workoutObj.exercise7.reps.push(req.body.ex7rp6);
  //EXERCISE 8
  workoutObj.exercise8 = {};
  workoutObj.exercise8.name = req.body.exercise8;
  workoutObj.exercise8.weight = [];
  workoutObj.exercise8.weight.push(req.body.ex8wt1);
  workoutObj.exercise8.weight.push(req.body.ex8wt2);
  workoutObj.exercise8.weight.push(req.body.ex8wt3);
  workoutObj.exercise8.weight.push(req.body.ex8wt4);
  workoutObj.exercise8.weight.push(req.body.ex8wt5);
  workoutObj.exercise8.weight.push(req.body.ex8wt6);
  workoutObj.exercise8.reps = [];
  workoutObj.exercise8.reps.push(req.body.ex8rp1);
  workoutObj.exercise8.reps.push(req.body.ex8rp2);
  workoutObj.exercise8.reps.push(req.body.ex8rp3);
  workoutObj.exercise8.reps.push(req.body.ex8rp4);
  workoutObj.exercise8.reps.push(req.body.ex8rp5);
  workoutObj.exercise8.reps.push(req.body.ex8rp6);

  // console.log("=========================");
  // console.log(workoutObj);
  // console.log("=========================");
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, workoutObj);
    console.log(req.body);
    res.redirect('/workout_tracker/workouts/'+ req.params.id);
  } catch (e) {

  }
})

//DELETE workout
router.delete('/workouts/:id', async (req, res) => {
  try {
    // console.log('=================');
    const deleteWorkout = await Workout.findByIdAndRemove(req.params.id);
    await Comment.remove({workout: deleteWorkout._id});
    res.redirect('/workout_tracker/workouts');
  } catch (e) {
    console.log(e.message);
  }
})

// / delete route EXAMPLE
// cascading delete
// router.delete('/:id', async (req, res) => {
//    const customer = await Customer.findByIdAndRemove(req.params.id);
//    await Order.remove({ customer: customer._id });
//    res.redirect('/customers');
// });

module.exports = router;
