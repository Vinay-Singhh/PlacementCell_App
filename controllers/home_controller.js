const Student = require('../models/student');

module.exports.home = function(req, res){
    Student.find({}, function(err, students){
        if(err){
            console.log(err);
            return;
        }
        return res.render('home', {
            title: "Placement Cell",
            students: students
        });
    });
}