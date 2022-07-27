const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email:{
      type: String,
      required:true
    },
    batch: {
      type: String,
      required:true
    },
    college: {
      type: String,
      required: true
    },
    placement_status:{
      type: String,
      required: true
    },
    dsa_score: {
      type: Number,
    },
    webD_score: {
      type: Number,
    },
    react_score: {
      type: Number,
    },
    // company_name: String,
    // user: {
    //   type:  mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // }
  });

const Student = mongoose.model('students', studentSchema);

module.exports = Student;