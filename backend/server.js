require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/evaluate', require('./routes/evaluate'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/history', require('./routes/history'));

app.get('/', (req, res) => res.json({ message: 'API running', mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

process.on('uncaughtException', (err) => console.error('Uncaught Exception:', err.message));
process.on('unhandledRejection', (err) => console.error('Unhandled Rejection:', err.message));

const PORT = process.env.PORT || 5000;

// Start server immediately
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// Connect MongoDB with retry
const connectMongo = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/startup-evaluator';
  let retries = 5;
  while (retries > 0) {
    try {
      await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
      console.log('✅ MongoDB connected');
      return;
    } catch (err) {
      retries--;
      console.error(`❌ MongoDB failed (${retries} retries left): ${err.message}`);
      if (retries === 0) {
        console.error('❌ Could not connect to MongoDB. Make sure MongoDB service is running.');
        console.error('   Run this in Admin CMD: net start MongoDB');
      } else {
        await new Promise(r => setTimeout(r, 3000));
      }
    }
  }
};

connectMongo();
