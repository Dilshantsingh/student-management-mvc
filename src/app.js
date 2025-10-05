require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use('/api/students', require('./routes/students'));

// Health
app.get('/', (req, res) => res.send('Student Management API is running'));

// Global error handler (simple)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
