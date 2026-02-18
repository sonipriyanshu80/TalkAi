# TalkAi

AI-powered voice assistant platform for businesses with intelligent call handling and customer support automation.

## Features

- **Voice Calls**: AI assistant handles incoming calls with natural conversation
- **Multi-language**: Supports English, Hindi, and Hinglish
- **Knowledge Base**: Upload documents and PDFs for AI training
- **Analytics**: Call metrics, duration tracking, and performance insights
- **Billing System**: Subscription plans with usage tracking
- **Dashboard**: Web interface for management and monitoring

## Architecture

- **Frontend**: React.js dashboard
- **Backend**: Node.js API server
- **AI Engine**: Python FastAPI with LLM integration
- **Database**: MongoDB
- **Voice**: Twilio integration

## Quick Start

1. **Backend Setup**
   ```bash
   cd backend-node
   npm install
   npm start
   ```

2. **AI Engine Setup**
   ```bash
   cd ai-backend
   pip install -r requirements.txt
   uvicorn app:app --reload --port 8000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Setup

Copy `.env.example` to `.env` in each folder and configure:
- MongoDB connection
- JWT secrets
- Twilio credentials
- OpenAI API key (optional)

## Documentation

- [Backend API](./backend-node/README.md)
- [AI Engine](./ai-backend/PHASE3_README.md)
- [Frontend](./frontend/README.md)
- [API Documentation](./docs/README.md)