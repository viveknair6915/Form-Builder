const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const formRoutes = require('./routes/forms');
const responseRoutes = require('./routes/responses');
const uploadRoutes = require('./routes/upload');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/formbuilder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/upload', uploadRoutes);

// API health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Form Builder API is running!',
    status: 'healthy',
    endpoints: [
      '/api/forms',
      '/api/responses', 
      '/api/upload'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
