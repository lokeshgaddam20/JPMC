const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/stds', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
  name: String,
  branch: String,
  cgpa: Number
});

const Student = mongoose.model('Student', studentSchema);

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'
  }));
  

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/students', async (req, res) => {
  const { name, branch, cgpa } = req.body;
  const student = new Student({ name, branch, cgpa });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, branch, cgpa } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(id, { name, branch, cgpa }, { new: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndDelete(id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
