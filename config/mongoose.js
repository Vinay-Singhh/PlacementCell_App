const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/placements_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/placements_db');
//   console.log('connected to db');
// }

module.exports = db