const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    company_name :{
        type : String,
        required : true
    },
    student_name :{
        type : String,
        required : true
    },
    status :{
        type : String,
        required : true
    },
    date :{
        type : String,
        required : true
    }
});
const Interview = mongoose.model('interviews', InterviewSchema);

module.exports = Interview;