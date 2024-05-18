const studentModel = require('../models/student.model');

async function getStudents (req, res){
    try {
        const students = await studentModel.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createStudent (req, res){
    const { id } = req.params;
    const { name, branch, cgpa } = req.body;
    const student = new studentModel({ _id : id, name, branch, cgpa });
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function updateStudent (req, res){
    const { id } = req.params;
    const { name, branch, cgpa } = req.body;
    try {
        const student = await studentModel.findByIdAndUpdate(_id = id, { name, branch, cgpa }, { new: true });
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function deleteStudent (req, res){
    const { id } = req.params;
    try {
        await
        studentModel.findByIdAndDelete(id);
        res.json({ message: 'Student deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getStudents, createStudent, updateStudent, deleteStudent };