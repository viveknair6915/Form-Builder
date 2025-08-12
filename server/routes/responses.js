const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

// Get all responses for a form
router.get('/form/:formId', async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId })
      .sort({ submittedAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a response
router.post('/', async (req, res) => {
  try {
    const response = new Response(req.body);
    const savedResponse = await response.save();
    res.status(201).json(savedResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single response
router.get('/:id', async (req, res) => {
  try {
    const response = await Response.findById(req.params.id).populate('formId');
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
