const jwt = require('jsonwebtoken');
const connectDB = require('../db');
const Idea = require('../Idea');

const verifyToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token');
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const user = verifyToken(req);
    await connectDB();
    const ideas = await Idea.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .select('title industry evaluation.score evaluation.investorScore createdAt');
    res.json(ideas);
  } catch (err) {
    res.status(401).json({ message: 'Please login again.' });
  }
};
