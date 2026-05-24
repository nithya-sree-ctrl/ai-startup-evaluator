const express = require('express');
const authMiddleware = require('../middleware/auth');
const Idea = require('../models/Idea');

const router = express.Router();

// Smart rule-based evaluation engine
const evaluateIdea = (title, description, targetAudience, industry) => {
  const text = `${title} ${description} ${targetAudience} ${industry}`.toLowerCase();
  const wordCount = description.split(' ').length;

  // Score based on description quality
  let score = 40;
  if (wordCount > 20) score += 10;
  if (wordCount > 50) score += 10;
  if (targetAudience) score += 10;
  if (industry) score += 5;
  if (text.includes('problem') || text.includes('solve') || text.includes('solution')) score += 10;
  if (text.includes('market') || text.includes('customer') || text.includes('user')) score += 5;
  if (text.includes('revenue') || text.includes('profit') || text.includes('monetize')) score += 5;
  if (text.includes('unique') || text.includes('innovative') || text.includes('new')) score += 5;
  score = Math.min(score, 95);

  const investorScore = Math.max(30, score - 10 + Math.floor(Math.random() * 15));

  // Industry-specific data
  const industryData = {
    SaaS: {
      competitors: [
        { name: 'Salesforce', description: 'Leading CRM and SaaS platform with enterprise solutions' },
        { name: 'HubSpot', description: 'All-in-one marketing, sales and service SaaS platform' },
        { name: 'Zoho', description: 'Affordable SaaS suite for small and medium businesses' },
      ],
      revenueStreams: ['Monthly subscriptions', 'Annual plans', 'Enterprise licensing', 'Add-on features'],
      keyPartners: ['Cloud providers (AWS/Azure)', 'Payment gateways', 'Integration partners', 'Resellers'],
    },
    FinTech: {
      competitors: [
        { name: 'Stripe', description: 'Global payment processing and financial infrastructure' },
        { name: 'Razorpay', description: 'Payment solutions for businesses in emerging markets' },
        { name: 'PayPal', description: 'Digital payments and money transfer platform' },
      ],
      revenueStreams: ['Transaction fees', 'Subscription plans', 'Premium features', 'Interest on deposits'],
      keyPartners: ['Banks and NBFCs', 'Regulatory bodies', 'Payment networks', 'KYC providers'],
    },
    HealthTech: {
      competitors: [
        { name: 'Practo', description: 'Online doctor consultation and health records platform' },
        { name: 'PharmEasy', description: 'Online pharmacy and healthcare services' },
        { name: '1mg', description: 'Medicine delivery and health information platform' },
      ],
      revenueStreams: ['Consultation fees', 'Medicine delivery', 'Health packages', 'Insurance tie-ups'],
      keyPartners: ['Hospitals and clinics', 'Pharma companies', 'Insurance providers', 'Diagnostic labs'],
    },
    EdTech: {
      competitors: [
        { name: 'Coursera', description: 'Online learning platform with university partnerships' },
        { name: 'Udemy', description: 'Marketplace for online courses across all topics' },
        { name: 'Byju\'s', description: 'Personalized learning app for K-12 students' },
      ],
      revenueStreams: ['Course fees', 'Subscriptions', 'Certifications', 'Corporate training'],
      keyPartners: ['Educational institutions', 'Content creators', 'Employers', 'Government bodies'],
    },
    'E-Commerce': {
      competitors: [
        { name: 'Amazon', description: 'Global e-commerce and cloud computing giant' },
        { name: 'Flipkart', description: 'Leading Indian e-commerce marketplace' },
        { name: 'Meesho', description: 'Social commerce platform for small businesses' },
      ],
      revenueStreams: ['Product sales', 'Seller commissions', 'Advertising', 'Logistics fees'],
      keyPartners: ['Suppliers and manufacturers', 'Logistics companies', 'Payment gateways', 'Warehousing'],
    },
    default: {
      competitors: [
        { name: 'Existing Market Leader', description: 'Dominant player with large market share and brand recognition' },
        { name: 'Funded Startup', description: 'Well-funded competitor targeting the same customer segment' },
        { name: 'Traditional Solution', description: 'Offline or legacy solution that customers currently use' },
      ],
      revenueStreams: ['Product or service fees', 'Subscription model', 'Freemium upgrades', 'Partnership revenue'],
      keyPartners: ['Technology providers', 'Distribution partners', 'Marketing agencies', 'Investors'],
    },
  };

  const data = industryData[industry] || industryData.default;

  const strengths = [
    `Clear focus on ${targetAudience || 'a specific target audience'} which helps in targeted marketing`,
    `Operating in the ${industry || 'growing'} industry which has strong demand and growth potential`,
    `The idea addresses a real problem which increases chances of product-market fit`,
    `Low barrier to entry in the initial phase allows faster go-to-market strategy`,
  ];

  const weaknesses = [
    'Market validation with real customers has not been done yet',
    `Strong existing competitors in the ${industry || 'target'} space may make customer acquisition difficult`,
    'Funding and initial capital requirements need to be clearly planned',
    'Building brand trust and awareness from scratch will take significant time and effort',
  ];

  const suggestions = [
    'Talk to at least 20 potential customers before building the product to validate the problem',
    `Research top competitors in the ${industry || 'target'} market and identify your unique differentiation`,
    'Start with a simple MVP (Minimum Viable Product) and iterate based on real user feedback',
    'Build a waitlist or landing page first to measure interest before full development',
    'Define your one key metric for success in the first 3 months and focus only on that',
  ];

  const swot = {
    strengths: [
      `Targets ${targetAudience || 'a specific niche'} with a focused value proposition`,
      `${industry || 'The'} market is growing with increasing digital adoption`,
    ],
    weaknesses: [
      'No existing customer base or brand recognition yet',
      'Limited resources and team in early stage',
    ],
    opportunities: [
      `Growing demand in the ${industry || 'target'} sector post-pandemic`,
      'Digital transformation creating new customer needs and gaps in the market',
    ],
    threats: [
      'Well-funded competitors can copy and outspend your marketing efforts',
      'Changing regulations and market conditions can impact business model',
    ],
  };

  const pitch = {
    problem: `Many ${targetAudience || 'people'} struggle with inefficient and outdated solutions in the ${industry || 'target'} space, leading to wasted time, money, and poor outcomes.`,
    solution: `${title} provides a modern, streamlined solution that directly addresses this problem by offering ${description.slice(0, 120)}...`,
    marketOpportunity: `The ${industry || 'target'} market is valued at billions of dollars globally and is growing at 15-25% annually, with increasing demand for digital-first solutions.`,
    uniqueValueProposition: `Unlike existing solutions, ${title} focuses specifically on ${targetAudience || 'the target audience'} with a tailored experience that solves the core problem faster and more affordably.`,
  };

  const businessModel = {
    keyPartners: data.keyPartners,
    keyActivities: [
      'Product development and continuous improvement',
      'Customer acquisition and marketing',
      'Customer support and retention',
      'Partnerships and business development',
    ],
    valueProposition: `${title} delivers measurable value to ${targetAudience || 'customers'} by solving their core problem in the ${industry || 'target'} space better than any existing alternative.`,
    customerSegments: [
      targetAudience || 'Primary target customers',
      `Early adopters in the ${industry || 'target'} industry`,
      'Small and medium businesses looking for better solutions',
    ],
    revenueStreams: data.revenueStreams,
  };

  const investorNotes = `${title} shows potential in the ${industry || 'target'} market with a clear target audience of ${targetAudience || 'identified customers'}. The idea needs stronger market validation and a clear differentiation strategy before seeking investment. Focus on getting 10 paying customers first — that will be your strongest pitch to any investor.`;

  // Growth Simulation Engine
  const baseUsers = Math.floor(score * 2.5);
  const growthRate = score >= 70 ? 'high' : score >= 50 ? 'medium' : 'low';

  const simulation = {
    growthRate,
    timeline: [
      {
        month: 'Month 1',
        users: baseUsers,
        revenue: `₹${(baseUsers * 50).toLocaleString()}`,
        status: '🚀 Launch Phase',
        detail: `Initial launch with ${baseUsers} early adopters. Focus on onboarding and feedback collection.`,
      },
      {
        month: 'Month 3',
        users: Math.floor(baseUsers * (growthRate === 'high' ? 3.5 : growthRate === 'medium' ? 2.5 : 1.8)),
        revenue: `₹${(baseUsers * (growthRate === 'high' ? 3.5 : 2.5) * 50).toLocaleString()}`,
        status: growthRate === 'high' ? '📈 Strong Growth' : '⚠️ Slow Growth',
        detail: growthRate === 'high'
          ? 'Word of mouth kicking in. Strong retention. Consider scaling marketing.'
          : 'Growth slowing due to competition. Need stronger differentiation and marketing push.',
      },
      {
        month: 'Month 6',
        users: Math.floor(baseUsers * (growthRate === 'high' ? 8 : growthRate === 'medium' ? 5 : 3)),
        revenue: `₹${(baseUsers * (growthRate === 'high' ? 8 : 5) * 50).toLocaleString()}`,
        status: growthRate === 'high' ? '💰 Revenue Growing' : '🔄 Needs Pivot',
        detail: growthRate === 'high'
          ? 'Revenue growing steadily. Time to hire first team members and expand features.'
          : 'Needs marketing investment and possible product pivot based on user feedback.',
      },
      {
        month: 'Month 12',
        users: Math.floor(baseUsers * (growthRate === 'high' ? 20 : growthRate === 'medium' ? 12 : 6)),
        revenue: `₹${(baseUsers * (growthRate === 'high' ? 20 : 12) * 50).toLocaleString()}`,
        status: growthRate === 'high' ? '🏆 Market Leader' : '📊 Stable',
        detail: growthRate === 'high'
          ? 'Strong market position. Ready for Series A funding. Expand to new markets.'
          : 'Stable user base but needs fresh strategy to accelerate growth.',
      },
    ],
    risks: [
      score < 50 ? '🔴 High competition risk — market is crowded' : '🟡 Moderate competition — differentiation needed',
      score < 60 ? '🔴 Low market validation — needs customer interviews' : '🟢 Good market fit potential',
      growthRate === 'low' ? '🔴 Slow growth expected — marketing investment required' : '🟢 Healthy growth trajectory',
      `🟡 ${industry || 'Target'} industry has regulatory and compliance risks`,
      '🟡 Funding runway must be planned for at least 12 months',
    ],
    recommendation: score >= 70
      ? '✅ Strong idea — proceed to MVP development immediately'
      : score >= 50
      ? '⚠️ Promising idea — validate with 20 customers before building'
      : '❌ Needs more work — redefine problem and target audience first',
  };

  return { score, strengths, weaknesses, suggestions, swot, pitch, businessModel, competitors: data.competitors, investorScore, investorNotes, simulation };
};

// POST /api/evaluate
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, targetAudience, industry } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'Title and description required' });

    const evaluation = evaluateIdea(title, description, targetAudience, industry);

    const idea = await Idea.create({
      userId: req.user.id,
      title, description, targetAudience, industry,
      evaluation,
    });

    res.json({ id: idea._id, evaluation });
  } catch (err) {
    console.error('Evaluate error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
