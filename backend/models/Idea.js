const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  targetAudience: String,
  industry: String,
  evaluation: {
    score: Number,
    strengths: [String],
    weaknesses: [String],
    suggestions: [String],
    swot: {
      strengths: [String],
      weaknesses: [String],
      opportunities: [String],
      threats: [String],
    },
    pitch: {
      problem: String,
      solution: String,
      marketOpportunity: String,
      uniqueValueProposition: String,
    },
    businessModel: {
      keyPartners: [String],
      keyActivities: [String],
      valueProposition: String,
      customerSegments: [String],
      revenueStreams: [String],
    },
    competitors: [{ name: String, description: String }],
    investorScore: Number,
    investorNotes: String,
    simulation: {
      growthRate: String,
      timeline: [{
        month: String,
        users: Number,
        revenue: String,
        status: String,
        detail: String,
      }],
      risks: [String],
      recommendation: String,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Idea', ideaSchema);
