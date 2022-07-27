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
    // Student.find({}).populate('user').exec(function(err, kittens){
    //     return res.render('home', {
    //         title: "Placement Cell",
    //         kittens: kittens
    //     });
    // });
    // populate the user of each post
    // Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home', {
    //         title: "Placement Cell",
    //         posts: posts
    //     });
    // });
}