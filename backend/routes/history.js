const express = require('express');
const authMiddleware = require('../middleware/auth');
const Idea = require('../models/Idea');

const router = express.Router();

// GET /api/history
router.get('/', authMiddleware, async (req, res) => {
  try {
    const ideas = await Idea.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select('title industry evaluation.score evaluation.investorScore createdAt');
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/history/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id, userId: req.user.id });
    if (!idea) return res.status(404).json({ message: 'Not found' });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/history/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Idea.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
