const express = require('express');
const passport = require('passport');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log('router loaded');

// for any futher routes, access from here
// use passport as a middleware to authenticate
// router.get('/', passport.authenticate('local',
//     {failureRedirect: '/users/sign-in'}
//  ), homeController.home);
router.get('/', homeController.home);

router.use('/users', require('./users'));

router.use('/students',require('./students'));

module.exports = router;