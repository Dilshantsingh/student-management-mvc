const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  age: { type: Number, required: [true, 'Age is required'], min: [0, 'Age must be >= 0'] },
  course: { type: String, required: [true, 'Course is required'], trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
