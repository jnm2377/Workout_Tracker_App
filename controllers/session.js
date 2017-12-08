const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user.js');


//LOGIN PAGE
router.get('/login', (req, res) => {
  res.render('home/login.ejs', {
    message: req.session.message,
    registerMessage: req.session.registerMessage,
    successfulMessage: req.session.successfulMessage,
    logged: req.session.logged

  });
})


//LOGIN DATA
//this is posting the data for the login input, and seeing if it's already a registered user before rendering index page
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if(bcrypt.compareSync(req.body.password, user.password)){
          //saying: if my user tries to log in, lets try to find the user in the database, and if the passwords match, then we're gonna do all of this stuff.
      req.session.username = req.body.username;
      req.session.logged = true;
      console.log(req.session);
      res.redirect('/workout_tracker/workouts');
    } else {
      console.log('bad password');
      req.session.message = "Bro, what are you doing? Username or password are incorrect.";
      res.redirect('/user/login');
    }
  } catch (e) {
    console.log(e.message);
    req.session.message = "Bro, what are you doing? Username or password are incorrect.";
    res.redirect('/user/login');
  }
})

//REGISTER
//add req.session.username to main controller for the data we are passing through when we render ejs index page
//when creating register form, post data to /user/register
// name = password
// name = username
router.post('/register', async (req, res) => {
  const users = await User.find({username: req.body.username});
  if (users.length === 0) {
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const username = req.body.username;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const userDbEntry = {}; //creating user obj with user name/pass

    userDbEntry.username = username;
    userDbEntry.password = passwordHash;
    userDbEntry.name = name;
    userDbEntry.lastname = lastname;

    console.log(userDbEntry);

    try {
      const user = await User.create(userDbEntry); //adding user obj to database with User schema
      console.log(user);
      req.session.username = user.username; //creating req.session variables with user variable data for router controller (what we need for workout index pg)
      req.session.name = user.name;
      req.session.lastname = user.lastname;
      req.session.logged = true;
      req.session.successfulMessage = "Bro, you're registered!";
      res.redirect('/user/login'); //redirecting for them to login
    } catch (e) {
      console.log(e.message);
    }
  } else {
    console.log('USERNAME TAKEN!');
    req.session.registerMessage = "Bro, that username is already taken.";
    res.redirect('/user/login');

  }

})




//LOGOUT
router.get('/logout', (req, res) => {
  //when we want to logout, make link '/user/logout'
  req.session.destroy();
  res.redirect('/workout_tracker/home');
})

router.get('/update', (req, res) => {
  // req.session.anyProperty = "something";
  // console.log(req.session);
}); //CONFUSED ABOUT THIS...

module.exports = router;
