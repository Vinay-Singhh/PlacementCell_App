const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentsController = require('../controllers/students_controller');

router.post('/create', passport.checkAuthentication, studentsController.createStudent);

router.get('/placement', passport.checkAuthentication, studentsController.placementPage);

router.post('/create-interview', studentsController.createInterview);

router.get('/download',studentsController.download);

module.exports = router;