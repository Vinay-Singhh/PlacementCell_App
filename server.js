const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use express ejs layouts
const expressLayouts = require('express-ejs-layouts')
app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layo ut extractScripts', true);

const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

// set up the view engine
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'npm',
    // TODO change the secret before deployment in the production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017/placements_db',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

// app.post('/enter-details', function(req, res){
//     console.log(req.body);
//     Kitten.create({
//         batch: req.body.batch,
//         college: req.body.college,
//         dsa_score: req.body.dsa_score,
//         webD_score: req.body.webD_score,
//         react_score : req.body.react_score,
//         company_name: req.body.company_name
//     }, function(err, newDetails){
//         if(err){
//             console.log('error in entering details..');
//             return;
//         }
//         console.log('********', newDetails);
//         return res.redirect('back');
//     });
// });

app.listen(3000, () => {
    console.log('app is running on port 3000');
})