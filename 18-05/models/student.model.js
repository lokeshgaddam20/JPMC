const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    branch: String,
    cgpa: Number
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;