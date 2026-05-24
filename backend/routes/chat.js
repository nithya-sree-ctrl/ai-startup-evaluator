const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Smart keyword-based mentor responses
const getMentorReply = (message, ideaContext) => {
  const msg = message.toLowerCase();

  if (msg.includes('validate') || msg.includes('validation')) {
    return `Great question on validation! Here are the steps:\n\n1. Talk to 20+ potential customers before building anything\n2. Ask about their problems, NOT your solution\n3. Create a simple landing page and measure signups\n4. Run small paid ads to test interest\n5. Build an MVP only after validation\n\n${ideaContext ? `For your idea "${ideaContext}", start by finding 5 people who match your target audience and interview them this week.` : 'Start with customer interviews this week.'}`;
  }

  if (msg.includes('pitch') || msg.includes('investor') || msg.includes('funding')) {
    return `A winning investor pitch has these 5 elements:\n\n1. **Problem** — What painful problem are you solving?\n2. **Solution** — How does your product solve it?\n3. **Market Size** — How big is the opportunity?\n4. **Traction** — What proof do you have it works?\n5. **Team** — Why are YOU the right team?\n\nKeep it under 10 slides. Lead with traction if you have it. Investors bet on teams first, ideas second.`;
  }

  if (msg.includes('customer') || msg.includes('user') || msg.includes('audience')) {
    return `Finding your first customers:\n\n1. Start with your personal network — friends, family, colleagues\n2. Post in relevant Facebook groups and Reddit communities\n3. Use LinkedIn to reach professionals in your target industry\n4. Offer your product FREE in exchange for honest feedback\n5. Ask every customer to refer one more person\n\n${ideaContext ? `For "${ideaContext}", identify where your target customers spend time online and show up there consistently.` : 'Focus on one channel first and master it before expanding.'}`;
  }

  if (msg.includes('revenue') || msg.includes('money') || msg.includes('monetize') || msg.includes('pricing')) {
    return `Pricing and revenue strategy:\n\n1. Start HIGHER than you think — easier to lower than raise\n2. Charge from day one, even in beta\n3. Common models: Subscription, One-time fee, Freemium, Commission\n4. Price based on VALUE delivered, not your costs\n5. Talk to customers about pricing before deciding\n\nA good rule: if no one complains about your price, you are charging too little.`;
  }

  if (msg.includes('competitor') || msg.includes('competition')) {
    return `Handling competition:\n\n1. Competition validates your market — it is a good sign\n2. Study competitors deeply — their reviews, pricing, weaknesses\n3. Find the gap they are NOT serving and own that niche\n4. Do NOT try to beat them on everything — pick ONE thing to be best at\n5. Talk to their unhappy customers — they are your best leads\n\n${ideaContext ? `For "${ideaContext}", search Google, App Store, and Product Hunt for similar products and read their 1-star reviews to find gaps.` : 'Read competitor reviews on Google and App Store to find customer pain points.'}`;
  }

  if (msg.includes('mvp') || msg.includes('build') || msg.includes('product') || msg.includes('develop')) {
    return `Building your MVP:\n\n1. MVP = Minimum Viable Product — the simplest version that solves the core problem\n2. Remove every feature that is NOT essential for the core value\n3. Build in 4-6 weeks maximum for first version\n4. Launch ugly — perfection kills startups\n5. Get 10 users, collect feedback, improve, repeat\n\nRemember: Instagram launched with only photo filters. WhatsApp launched with only messaging. Start simple.`;
  }

  if (msg.includes('market') || msg.includes('size') || msg.includes('opportunity')) {
    return `Understanding your market:\n\n1. TAM (Total Addressable Market) — total market size globally\n2. SAM (Serviceable Addressable Market) — the part you can realistically reach\n3. SOM (Serviceable Obtainable Market) — what you can capture in year 1-3\n\nFor investors, focus on SAM and SOM with realistic numbers. A $1B TAM with a clear path to 1% capture is more convincing than vague large numbers.`;
  }

  if (msg.includes('team') || msg.includes('cofounder') || msg.includes('hire')) {
    return `Building your team:\n\n1. A great co-founder is more valuable than funding\n2. Look for complementary skills — if you are technical, find a business person\n3. Hire for attitude and learning speed, not just experience\n4. First 5 hires define your company culture forever\n5. Equity split should reflect contribution and commitment\n\nThe best co-founders are people you have already worked with and trust completely.`;
  }

  if (msg.includes('marketing') || msg.includes('growth') || msg.includes('promote')) {
    return `Marketing your startup:\n\n1. Pick ONE channel and master it before trying others\n2. Content marketing — write about problems your customers have\n3. SEO — create content that ranks for your customers search terms\n4. Social media — be where your customers are\n5. Referral program — make it easy for happy customers to refer others\n\n${ideaContext ? `For "${ideaContext}", the fastest growth channel is usually direct outreach to your first 100 target customers personally.` : 'The fastest early growth is always direct personal outreach.'}`;
  }

  if (msg.includes('fail') || msg.includes('mistake') || msg.includes('avoid')) {
    return `Top startup mistakes to avoid:\n\n1. Building before validating the problem\n2. Trying to serve everyone instead of a specific niche\n3. Hiring too fast before product-market fit\n4. Ignoring customer feedback and building in isolation\n5. Running out of cash — always know your runway\n6. Giving up too early — most success comes after multiple pivots\n\nThe #1 reason startups fail is building something nobody wants. Talk to customers first, always.`;
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('start')) {
    return `Hello! I am your AI Startup Mentor. I can help you with:\n\n• Validating your startup idea\n• Finding your first customers\n• Building your MVP\n• Investor pitch advice\n• Pricing and revenue strategy\n• Competitor analysis\n• Marketing and growth\n• Team building\n\n${ideaContext ? `I see you are working on: "${ideaContext}". What specific challenge can I help you with today?` : 'What startup challenge can I help you with today?'}`;
  }

  // Default smart response
  return `That is a great question about your startup journey!\n\nHere is my practical advice:\n\n1. Always start with the customer problem, not the solution\n2. Validate before you build — save time and money\n3. Launch fast, learn faster, improve continuously\n4. Focus on one thing at a time — avoid spreading too thin\n5. Track one key metric that shows real progress\n\n${ideaContext ? `For your idea "${ideaContext}", the most important next step is to talk to 5 potential customers this week and understand their exact pain points.` : 'The most important next step for any startup is talking to real potential customers today.'}\n\nFeel free to ask me about validation, funding, marketing, competitors, or any other startup topic!`;
};

// POST /api/chat
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message, ideaContext } = req.body;
    if (!message) return res.status(400).json({ message: 'Message required' });

    const reply = getMentorReply(message, ideaContext);
    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
