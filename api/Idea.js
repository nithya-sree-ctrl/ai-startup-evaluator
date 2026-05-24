const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  targetAudience: String,
  industry: String,
  evaluation: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.models.Idea || mongoose.model('Idea', ideaSchema);
