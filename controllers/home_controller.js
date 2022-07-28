const Student = require('../models/student');

// module.exports.home = function(req, res){
//     Student.find({}, function(err, students){
//         if(err){
//             console.log(err);
//             return;
//         }
//         return res.render('home', {
//             title: "Placement Cell",
//             students: students
//         });
//     });
// }

module.exports.home = function (req, res) {
    if (req.isAuthenticated()) {
        Student.find({}, function (err, students) {
            if (err) {
                console.log(err);
                return;
            }
            return res.render('home', {
                title: "Placement Cell",
                students: students
            });
        });
    } else {
        return res.render('user_sign_in', {
            title: "Sign In"
        })
    }
}