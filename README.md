# 🚀 AI Startup Idea Evaluator

A full-stack web application that uses AI to evaluate startup ideas with SWOT analysis, pitch generation, business model canvas, competitor analysis, and an AI mentor chatbot.

---

## 📁 Folder Structure

```
freshathon ai/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Idea.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── evaluate.js
│   │   ├── chat.js
│   │   └── history.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── ScoreCircle.js
    │   │   └── EvaluationResult.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Signup.js
    │   │   ├── Evaluate.js
    │   │   ├── History.js
    │   │   └── Chat.js
    │   ├── utils/
    │   │   ├── api.js
    │   │   └── exportPDF.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

---

## ⚙️ Prerequisites

- Node.js v18+ → https://nodejs.org
- MongoDB Community Server → https://www.mongodb.com/try/download/community
- OpenAI API Key → https://platform.openai.com/api-keys

---

## 🚀 Setup & Run Instructions

### Step 1 — Configure Environment Variables

Open `backend/.env` and fill in your values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/startup-evaluator
JWT_SECRET=any_random_secret_string_here
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Step 2 — Start MongoDB

Make sure MongoDB is running locally:
- Windows: Start "MongoDB" from Services, or run `mongod` in terminal

### Step 3 — Install & Run Backend

Open a terminal and run:

```bash
cd backend
npm install
npm run dev
```

Backend will start at: http://localhost:5000

### Step 4 — Install & Run Frontend

Open a NEW terminal and run:

```bash
cd frontend
npm install
npm start
```

Frontend will open at: http://localhost:3000

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/signup | Register new user | No |
| POST | /api/auth/login | Login user | No |
| POST | /api/evaluate | Evaluate startup idea | Yes |
| POST | /api/chat | AI mentor chat | Yes |
| GET | /api/history | Get user's idea history | Yes |
| GET | /api/history/:id | Get specific idea | Yes |
| DELETE | /api/history/:id | Delete idea | Yes |

---

## ✨ Features

- ✅ User Authentication (JWT)
- ✅ AI Idea Evaluation (Score 0-100)
- ✅ SWOT Analysis
- ✅ Investor Pitch Generator
- ✅ Business Model Canvas
- ✅ Competitor Analysis
- ✅ Investor Readiness Score
- ✅ Idea History Dashboard
- ✅ PDF Export
- ✅ AI Mentor Chatbot
- ✅ Dark Mode UI
