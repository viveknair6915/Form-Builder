const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['categorize', 'cloze', 'comprehension']
  },
  title: {
    type: String,
    default: 'Untitled Question'
  },
  image: String,
  
  // For Categorize questions
  categories: [String],
  items: [String],
  
  // For Cloze questions
  text: String,
  options: [String],
  
  // For Comprehension questions
  passage: String,
  question: String,
  
  // Allow any additional fields
}, { strict: false });

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  headerImage: String,
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

formSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Form', formSchema);
