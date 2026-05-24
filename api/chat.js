const jwt = require('jsonwebtoken');

const verifyToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token');
  return jwt.verify(token, process.env.JWT_SECRET);
};

const getMentorReply = (message, ideaContext) => {
  const msg = message.toLowerCase();
  if (msg.includes('validate') || msg.includes('validation')) return `To validate your startup idea:\n\n1. Talk to 20+ potential customers before building\n2. Ask about their problems, NOT your solution\n3. Create a simple landing page and measure signups\n4. Run small paid ads to test interest\n5. Build an MVP only after validation\n\n${ideaContext ? `For "${ideaContext}", find 5 people matching your target audience and interview them this week.` : 'Start with customer interviews this week.'}`;
  if (msg.includes('pitch') || msg.includes('investor') || msg.includes('funding')) return `A winning investor pitch has 5 elements:\n\n1. Problem — What painful problem are you solving?\n2. Solution — How does your product solve it?\n3. Market Size — How big is the opportunity?\n4. Traction — What proof do you have it works?\n5. Team — Why are YOU the right team?\n\nKeep it under 10 slides. Investors bet on teams first, ideas second.`;
  if (msg.includes('customer') || msg.includes('user') || msg.includes('audience')) return `Finding your first customers:\n\n1. Start with your personal network\n2. Post in Facebook groups and Reddit communities\n3. Use LinkedIn to reach professionals\n4. Offer your product FREE for honest feedback\n5. Ask every customer to refer one more person`;
  if (msg.includes('revenue') || msg.includes('money') || msg.includes('pricing')) return `Pricing strategy:\n\n1. Start HIGHER than you think\n2. Charge from day one, even in beta\n3. Common models: Subscription, One-time fee, Freemium\n4. Price based on VALUE delivered, not your costs\n\nIf no one complains about your price, you are charging too little.`;
  if (msg.includes('competitor') || msg.includes('competition')) return `Handling competition:\n\n1. Competition validates your market — good sign\n2. Study competitors deeply — reviews, pricing, weaknesses\n3. Find the gap they are NOT serving\n4. Pick ONE thing to be best at\n5. Talk to their unhappy customers`;
  if (msg.includes('mvp') || msg.includes('build') || msg.includes('product')) return `Building your MVP:\n\n1. MVP = simplest version that solves the core problem\n2. Remove every non-essential feature\n3. Build in 4-6 weeks maximum\n4. Launch ugly — perfection kills startups\n5. Get 10 users, collect feedback, improve, repeat`;
  if (msg.includes('marketing') || msg.includes('growth')) return `Marketing your startup:\n\n1. Pick ONE channel and master it first\n2. Content marketing — write about customer problems\n3. SEO — rank for customer search terms\n4. Social media — be where your customers are\n5. Referral program — make sharing easy`;
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) return `Hello! I am your AI Startup Mentor. I can help with:\n\n• Validating your idea\n• Finding first customers\n• Building your MVP\n• Investor pitch advice\n• Pricing strategy\n• Competitor analysis\n• Marketing and growth\n\n${ideaContext ? `You are working on: "${ideaContext}". What challenge can I help with?` : 'What startup challenge can I help you with today?'}`;
  return `Here is my practical startup advice:\n\n1. Always start with the customer problem, not the solution\n2. Validate before you build\n3. Launch fast, learn faster, improve continuously\n4. Focus on one thing at a time\n5. Track one key metric that shows real progress\n\n${ideaContext ? `For "${ideaContext}", talk to 5 potential customers this week.` : 'Talk to real potential customers today.'}\n\nAsk me about validation, funding, marketing, competitors, or any startup topic!`;
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    verifyToken(req);
    const { message, ideaContext } = req.body;
    if (!message) return res.status(400).json({ message: 'Message required' });
    res.json({ reply: getMentorReply(message, ideaContext) });
  } catch (err) {
    res.status(401).json({ message: 'Please login again.' });
  }
};
