const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { getStudents, createStudent, updateStudent, deleteStudent} = require('../controllers/student.controller');

router.get('/', getStudents);
router.post('/:id', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;