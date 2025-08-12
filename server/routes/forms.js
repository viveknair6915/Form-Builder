const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single form
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new form
router.post('/', async (req, res) => {
  try {
    console.log('Received form data:', JSON.stringify(req.body, null, 2));
    
    // Validate required fields
    if (!req.body.title || !req.body.title.trim()) {
      return res.status(400).json({ message: 'Form title is required' });
    }
    
    // Clean and validate questions
    const cleanedQuestions = req.body.questions?.map(q => {
      const question = {
        type: q.type,
        title: q.title || 'Untitled Question'
      };
      
      if (q.image) question.image = q.image;
      
      // Handle different question types
      switch (q.type) {
        case 'categorize':
          if (q.categories) {
            question.categories = q.categories.map(cat => ({
              name: cat,
              items: []
            }));
          }
          if (q.items) question.items = q.items;
          break;
          
        case 'cloze':
          if (q.text) question.text = q.text;
          if (q.options) question.options = q.options;
          break;
          
        case 'comprehension':
          if (q.passage) question.passage = q.passage;
          if (q.question) question.question = q.question;
          if (q.options) question.options = q.options;
          break;
      }
      
      return question;
    }) || [];
    
    const formData = {
      title: req.body.title.trim(),
      description: req.body.description || '',
      headerImage: req.body.headerImage || '',
      questions: cleanedQuestions
    };
    
    console.log('Cleaned form data:', JSON.stringify(formData, null, 2));
    
    const form = new Form(formData);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(400).json({ message: error.message, details: error.errors });
  }
});

// Update a form
router.put('/:id', async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a form
router.delete('/:id', async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
