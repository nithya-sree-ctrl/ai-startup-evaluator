const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI environment variable not set');

  // Add database name if not present
  const mongoUri = uri.includes('/startup-evaluator')
    ? uri
    : uri + '/startup-evaluator';

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
};

module.exports = connectDB;
