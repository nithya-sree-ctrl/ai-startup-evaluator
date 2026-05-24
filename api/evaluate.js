const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const Idea = require('./Idea');

const verifyToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token');
  return jwt.verify(token, process.env.JWT_SECRET);
};

const evaluateIdea = (title, description, targetAudience, industry) => {
  const text = `${title} ${description} ${targetAudience} ${industry}`.toLowerCase();
  const wordCount = description.split(' ').length;
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

  const industryData = {
    SaaS: { competitors: [{ name: 'Salesforce', description: 'Leading CRM and SaaS platform' }, { name: 'HubSpot', description: 'All-in-one marketing and sales platform' }, { name: 'Zoho', description: 'Affordable SaaS suite for businesses' }], revenueStreams: ['Monthly subscriptions', 'Annual plans', 'Enterprise licensing', 'Add-on features'], keyPartners: ['Cloud providers (AWS/Azure)', 'Payment gateways', 'Integration partners', 'Resellers'] },
    FinTech: { competitors: [{ name: 'Stripe', description: 'Global payment processing platform' }, { name: 'Razorpay', description: 'Payment solutions for businesses' }, { name: 'PayPal', description: 'Digital payments platform' }], revenueStreams: ['Transaction fees', 'Subscription plans', 'Premium features', 'Interest on deposits'], keyPartners: ['Banks and NBFCs', 'Regulatory bodies', 'Payment networks', 'KYC providers'] },
    HealthTech: { competitors: [{ name: 'Practo', description: 'Online doctor consultation platform' }, { name: 'PharmEasy', description: 'Online pharmacy services' }, { name: '1mg', description: 'Medicine delivery platform' }], revenueStreams: ['Consultation fees', 'Medicine delivery', 'Health packages', 'Insurance tie-ups'], keyPartners: ['Hospitals and clinics', 'Pharma companies', 'Insurance providers', 'Diagnostic labs'] },
    EdTech: { competitors: [{ name: 'Coursera', description: 'Online learning platform' }, { name: 'Udemy', description: 'Marketplace for online courses' }, { name: "Byju's", description: 'Personalized learning app' }], revenueStreams: ['Course fees', 'Subscriptions', 'Certifications', 'Corporate training'], keyPartners: ['Educational institutions', 'Content creators', 'Employers', 'Government bodies'] },
    'E-Commerce': { competitors: [{ name: 'Amazon', description: 'Global e-commerce giant' }, { name: 'Flipkart', description: 'Leading Indian e-commerce marketplace' }, { name: 'Meesho', description: 'Social commerce platform' }], revenueStreams: ['Product sales', 'Seller commissions', 'Advertising', 'Logistics fees'], keyPartners: ['Suppliers', 'Logistics companies', 'Payment gateways', 'Warehousing'] },
    default: { competitors: [{ name: 'Market Leader', description: 'Dominant player with large market share' }, { name: 'Funded Startup', description: 'Well-funded competitor in same space' }, { name: 'Traditional Solution', description: 'Legacy solution customers currently use' }], revenueStreams: ['Product or service fees', 'Subscription model', 'Freemium upgrades', 'Partnership revenue'], keyPartners: ['Technology providers', 'Distribution partners', 'Marketing agencies', 'Investors'] },
  };

  const data = industryData[industry] || industryData.default;
  const baseUsers = Math.floor(score * 2.5);
  const growthRate = score >= 70 ? 'high' : score >= 50 ? 'medium' : 'low';

  return {
    score, investorScore,
    strengths: [`Clear focus on ${targetAudience || 'a specific target audience'} which helps in targeted marketing`, `Operating in the ${industry || 'growing'} industry which has strong demand`, `The idea addresses a real problem which increases chances of product-market fit`, `Low barrier to entry allows faster go-to-market strategy`],
    weaknesses: ['Market validation with real customers has not been done yet', `Strong existing competitors in the ${industry || 'target'} space`, 'Funding and initial capital requirements need to be planned', 'Building brand trust from scratch will take significant time'],
    suggestions: ['Talk to at least 20 potential customers before building', `Research top competitors in the ${industry || 'target'} market`, 'Start with a simple MVP and iterate based on real user feedback', 'Build a waitlist first to measure interest', 'Define your one key metric for success in first 3 months'],
    swot: { strengths: [`Targets ${targetAudience || 'a specific niche'} with focused value proposition`, `${industry || 'The'} market is growing with increasing digital adoption`], weaknesses: ['No existing customer base or brand recognition yet', 'Limited resources and team in early stage'], opportunities: [`Growing demand in the ${industry || 'target'} sector`, 'Digital transformation creating new customer needs'], threats: ['Well-funded competitors can copy your idea', 'Changing regulations can impact business model'] },
    pitch: { problem: `Many ${targetAudience || 'people'} struggle with inefficient solutions in the ${industry || 'target'} space.`, solution: `${title} provides a modern solution: ${description.slice(0, 120)}...`, marketOpportunity: `The ${industry || 'target'} market is growing at 15-25% annually with increasing demand for digital solutions.`, uniqueValueProposition: `Unlike existing solutions, ${title} focuses specifically on ${targetAudience || 'the target audience'} with a tailored experience.` },
    businessModel: { keyPartners: data.keyPartners, keyActivities: ['Product development and improvement', 'Customer acquisition and marketing', 'Customer support and retention', 'Partnerships and business development'], valueProposition: `${title} delivers measurable value to ${targetAudience || 'customers'} by solving their core problem better than alternatives.`, customerSegments: [targetAudience || 'Primary target customers', `Early adopters in the ${industry || 'target'} industry`, 'Small and medium businesses'], revenueStreams: data.revenueStreams },
    competitors: data.competitors,
    investorNotes: `${title} shows potential in the ${industry || 'target'} market. Needs stronger market validation and clear differentiation before seeking investment. Focus on getting 10 paying customers first.`,
    simulation: {
      growthRate,
      timeline: [
        { month: 'Month 1', users: baseUsers, revenue: `₹${(baseUsers * 50).toLocaleString()}`, status: '🚀 Launch Phase', detail: `Initial launch with ${baseUsers} early adopters. Focus on onboarding and feedback.` },
        { month: 'Month 3', users: Math.floor(baseUsers * (growthRate === 'high' ? 3.5 : 2.5)), revenue: `₹${(baseUsers * (growthRate === 'high' ? 3.5 : 2.5) * 50).toLocaleString()}`, status: growthRate === 'high' ? '📈 Strong Growth' : '⚠️ Slow Growth', detail: growthRate === 'high' ? 'Word of mouth kicking in. Consider scaling marketing.' : 'Growth slowing due to competition. Need stronger differentiation.' },
        { month: 'Month 6', users: Math.floor(baseUsers * (growthRate === 'high' ? 8 : 5)), revenue: `₹${(baseUsers * (growthRate === 'high' ? 8 : 5) * 50).toLocaleString()}`, status: growthRate === 'high' ? '💰 Revenue Growing' : '🔄 Needs Pivot', detail: growthRate === 'high' ? 'Revenue growing. Time to hire first team members.' : 'Needs marketing investment and possible product pivot.' },
        { month: 'Month 12', users: Math.floor(baseUsers * (growthRate === 'high' ? 20 : 12)), revenue: `₹${(baseUsers * (growthRate === 'high' ? 20 : 12) * 50).toLocaleString()}`, status: growthRate === 'high' ? '🏆 Market Leader' : '📊 Stable', detail: growthRate === 'high' ? 'Strong market position. Ready for Series A funding.' : 'Stable user base but needs fresh strategy to accelerate.' },
      ],
      risks: [score < 50 ? '🔴 High competition risk — market is crowded' : '🟡 Moderate competition — differentiation needed', score < 60 ? '🔴 Low market validation — needs customer interviews' : '🟢 Good market fit potential', growthRate === 'low' ? '🔴 Slow growth expected — marketing investment required' : '🟢 Healthy growth trajectory', `🟡 ${industry || 'Target'} industry has regulatory risks`, '🟡 Funding runway must be planned for at least 12 months'],
      recommendation: score >= 70 ? '✅ Strong idea — proceed to MVP development immediately' : score >= 50 ? '⚠️ Promising idea — validate with 20 customers before building' : '❌ Needs more work — redefine problem and target audience first',
    },
  };
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const user = verifyToken(req);
    await connectDB();
    const { title, description, targetAudience, industry } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'Title and description required' });

    const evaluation = evaluateIdea(title, description, targetAudience, industry);
    const idea = await Idea.create({ userId: user.id, title, description, targetAudience, industry, evaluation });
    res.json({ id: idea._id, evaluation });
  } catch (err) {
    if (err.message === 'No token') return res.status(401).json({ message: 'Please login again.' });
    res.status(500).json({ message: err.message });
  }
};
