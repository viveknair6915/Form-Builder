const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  questionType: {
    type: String,
    required: true,
    enum: ['categorize', 'cloze', 'comprehension']
  },
  // For Categorize answers
  categorizations: [{
    category: String,
    items: [String]
  }],
  // For Cloze answers
  blankAnswers: [{
    blankId: String,
    answer: String
  }],
  // For Comprehension answers
  mcqAnswers: [{
    questionIndex: Number,
    selectedOption: Number
  }]
});

const responseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  answers: [answerSchema],
  submittedAt: {
    type: Date,
    default: Date.now
  },
  userInfo: {
    email: String,
    name: String
  }
});

module.exports = mongoose.model('Response', responseSchema);
