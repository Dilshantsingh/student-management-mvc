const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/studentController');

router.get('/', ctrl.getStudents);          // GET /api/students
router.post('/', ctrl.createStudent);       // POST /api/students
router.get('/:id', ctrl.getStudentById);    // GET /api/students/:id
router.put('/:id', ctrl.updateStudent);     // PUT /api/students/:id
router.delete('/:id', ctrl.deleteStudent);  // DELETE /api/students/:id

module.exports = router;
