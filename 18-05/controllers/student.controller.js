const studentModel = require('../models/student.model');

async function getStudents(req, res) {
    try {
        const students = await studentModel.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getStudentDetails(req, res) {
    const { id } = req.params;
    try {
        const students = await studentModel.find({ _id: id });
        if (students.length === 0) {
            return res.status(404).json(null);
        } else {
            res.json(students);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createStudent(req, res) {
    const { id } = req.params;
    const { name, branch, cgpa } = req.body;
    try {
        const newStudent = await studentModel.create({ _id: id, name, branch, cgpa });
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function updateStudent(req, res) {
    const { id } = req.params;
    const { name, branch, cgpa } = req.body;
    try {
        const student = await studentModel.findByIdAndUpdate(_id = id, { name, branch, cgpa }, { new: true });
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function deleteStudent(req, res) {
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

module.exports = { getStudents, getStudentDetails, createStudent, updateStudent, deleteStudent };