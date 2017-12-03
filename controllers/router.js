const express = require('express');
const router = express.Router();

// require models
const User = require('../models/user.js');
const Workout = require('../models/workout.js');

//HOME route
router.get('/home', (req, res) => {
  res.render('home/home.ejs')
});

//WORKOUTS INDEX route
router.get('/workouts', async (req, res) => {
  if(req.session.logged) {
    // const userWorkouts = await Workout.find({username: req.session.username});
    res.render('workouts/index.ejs', {
      // workouts: userWorkouts, //will be array that we have to iterate
      username: req.session.username,
      name: req.session.name,
      lastname: req.session.lastname
    });
  } else {
    res.redirect('/user/login');
  }
});


//SHOW workout
router.get('/workouts/:id', () => {

})

//CREATE workout
router.get('/workouts/new', () => {

})

router.post('/workouts',)

//UPDATE workout
router.get('/workouts/:id/edit', () => {

})

router.post('/workouts/:id', () => {
  //redirect to 'workouts/:id'
})

//DELETE workout
router.delete('/workouts/:id', () => {

})

module.exports = router;
