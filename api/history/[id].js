const jwt = require('jsonwebtoken');
const connectDB = require('../../db');
const Idea = require('../../Idea');

const verifyToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token');
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const user = verifyToken(req);
    await connectDB();
    const { id } = req.query;

    if (req.method === 'GET') {
      const idea = await Idea.findOne({ _id: id, userId: user.id });
      if (!idea) return res.status(404).json({ message: 'Not found' });
      return res.json(idea);
    }

    if (req.method === 'DELETE') {
      await Idea.findOneAndDelete({ _id: id, userId: user.id });
      return res.json({ message: 'Deleted' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Please login again.' });
  }
};
