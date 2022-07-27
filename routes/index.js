const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log('router loaded');

// for any futher routes, access from here
router.get('/', homeController.home);

router.use('/users', require('./users'));

router.use('/students',require('./students'));

module.exports = router;