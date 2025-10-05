const Student = require('../models/Student');

const formatValidation = (err) => {
  return Object.values(err.errors || {}).map(e => e.message);
};

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).json(student);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: formatValidation(err) });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const s = await Student.findById(req.params.id);
    if (!s) return res.status(404).json({ error: 'Student not found' });
    res.json(s);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') return res.status(400).json({ error: 'Invalid ID' });
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const s = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!s) return res.status(404).json({ error: 'Student not found' });
    res.json(s);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: formatValidation(err) });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const s = await Student.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted', student: s });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
