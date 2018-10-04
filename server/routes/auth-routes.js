//Routes modularized for authentication calls(prepend /auth)
const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user-model');

//save user details from the body of the request
router.post('/register', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let newUser = new User({
    name: name,
    email: email,
    password: password
  });
  User.createUser(newUser, (err, user) => {
    passport.authenticate('local')(req, res, function () {
                res.json(user);
            })
  });
});
//get user by objectid of mogodb
router.get('/user/:id', (req, res) => {
  User.getUserByMail(req.params.id, (err, user) => {
    res.json(user);
  })
})


//route to check if user is authenticated
router.get('/user', (req,res) => {
  res.json(req.user)
});
//handle login
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json(req.user);
    });
//handle logout
router.get('/logout',(req,res) => {
  req.logout();
  res.send("logged out")
}
    );


module.exports = router;
