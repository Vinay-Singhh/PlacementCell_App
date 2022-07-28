const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

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
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'npm',
    // TODO change the secret before deployment in the production mode
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.owyjx.mongodb.net/mernstack?retryWrites=true&w=majority`,
        autoRemove: 'disabled'
    },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, () => {
    console.log('app is running on port 3000');
})