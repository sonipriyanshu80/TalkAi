# AI Backend - Python FastAPI

Python FastAPI service for AI-powered voice processing with LLM integration and conversation management.

## Setup

```bash
cd ai-backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

## Environment Variables

```bash
# Optional - System works without OpenAI using enhanced templates
OPENAI_API_KEY=your_openai_key
```

## Features

### Language Processing
- **Multi-language Detection**: English, Hindi, and Hinglish support
- **Confidence Scoring**: Reliability metrics for language detection
- **Context-aware Switching**: Dynamic language adaptation

### AI Response Generation
- **LLM Integration**: OpenAI GPT-3.5 for contextual responses
- **Fallback System**: Enhanced templates when LLM unavailable
- **Conversation Memory**: Context retention across call exchanges
- **Personality Engine**: Dynamic personality traits (Priyanshu, Ridhima)

### Voice Processing
- **Speech-to-Text**: Audio transcription
- **Text-to-Speech**: Voice synthesis with multiple voices
- **Sentiment Analysis**: Real-time emotion detection
- **Intent Classification**: Advanced understanding of user needs

## API Endpoints

### Voice Processing
- `POST /voice/process` - Process voice calls with AI responses
- `GET /voice/health` - Service health check

### AI Chat
- `POST /ai/chat` - Text-based AI conversation
- `GET /ai/stats` - API usage statistics

## Architecture

```
AI Engine
├── app.py                    # FastAPI application
├── routers/
│   ├── voice_router.py       # Voice call endpoints
│   ├── ai_router.py          # Chat endpoints
│   └── health_router.py      # Health checks
├── services/
│   ├── ai_engine.py          # Main AI orchestrator
│   ├── llm_service.py        # LLM integration
│   ├── stt_service.py        # Speech-to-text
│   └── tts_service.py        # Text-to-speech
└── models/
    └── schemas.py            # Pydantic request/response models
```

## Response Format

```json
{
  "ai_response": "How can I help you today?",
  "detected_language": "english",
  "language_confidence": 0.95,
  "sentiment": {
    "label": "neutral",
    "score": 0.7
  },
  "personality": "ridhima",
  "context_used": true,
  "intent": "greeting",
  "should_escalate": false
}
```

## Integration

- **Node.js Backend**: Seamless API integration
- **Twilio**: Voice call processing
- **MongoDB**: Conversation logging
- **Real-time Processing**: Sub-second response times

## Deployment

- **Development**: `uvicorn app:app --reload --port 8000`
- **Production**: Deployed on Render
- **Scaling**: Horizontal scaling support

## Overview
Phase 3 transforms the TalkAI Python backend from basic template responses to a truly dynamic and intelligent AI system powered by advanced language processing, LLM integration, and conversation memory.

## 🎯 Key Improvements

### 1. Advanced Language Detection
- **Before**: Basic keyword matching
- **After**: 
  - `langdetect` library for accurate detection
  - Hinglish (mixed Hindi-English) support
  - Confidence scoring
  - Context-aware language switching

### 2. Dynamic Response Generation
- **Before**: Fixed template responses
- **After**:
  - OpenAI GPT-3.5 integration
  - Contextual responses based on conversation history
  - Personality-driven response generation
  - Business domain knowledge integration

### 3. Enhanced Personality System
- **Before**: Static personality responses
- **After**:
  - Dynamic personality traits affecting language style
  - Emotional intelligence in responses
  - Cultural context awareness
  - Adaptive personality based on user interaction

### 4. Advanced Features
- **Conversation Memory**: Maintains context across call exchanges
- **Sentiment Analysis**: Real-time emotion detection using transformers
- **Intent Classification**: Advanced understanding of user needs
- **Cultural Awareness**: Appropriate responses for Indian business context

## 🏗️ Architecture

```
Phase 3 AI Engine
├── services/ai_engine.py          # Main AI orchestrator
├── routers/voice_router.py        # FastAPI endpoints
├── ConversationMemory             # Context management
├── AdvancedLanguageDetector       # Multi-library language detection
├── SentimentAnalyzer              # Emotion analysis
├── PersonalityEngine              # Dynamic personality traits
└── DynamicResponseGenerator       # LLM-powered responses
```

## 🔧 Setup Instructions

### Quick Setup
```bash
cd ai-backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

### Environment Configuration
```bash
# Copy example environment file
cp .env.example .env

# Edit .env and add your OpenAI API key (optional)
# System works without OpenAI using enhanced templates
```

## 🎮 Usage Examples

### API Request
```json
{
  "user_message": "What cloud services do you provide?",
  "call_data": {
    "companyName": "TechCorp",
    "information": "Cloud migration services"
  },
  "voice_settings": {
    "personality": "priyanshu",
    "language": "auto"
  },
  "call_sid": "CA123456789"
}
```

### API Response
```json
{
  "ai_response": "Great question! We provide comprehensive cloud infrastructure including secure hosting, automated backups, and 24/7 monitoring. Our solutions typically save businesses 20-40% on cloud expenses. Would you like me to connect you with our technical specialist?",
  "detected_language": "english",
  "language_confidence": 0.95,
  "sentiment": {
    "label": "neutral",
    "score": 0.7
  },
  "personality": "priyanshu",
  "context_used": true
}
```

## 🧠 AI Features in Detail

### Language Detection
- **Primary**: `langdetect` library
- **Secondary**: Custom keyword analysis
- **Hinglish**: Mixed language detection
- **Confidence**: Scoring system for reliability

### Sentiment Analysis
- **Model**: TextBlob (lightweight fallback)
- **Advanced**: Transformers model (when available)
- **Output**: Label (positive/negative/neutral) + confidence score

### Conversation Memory
- **Storage**: In-memory per call session
- **Limit**: Last 5 exchanges per call
- **Context**: Used for generating relevant responses

### Personality Traits
```python
'priyanshu': {
    'traits': ['professional', 'helpful', 'confident'],
    'style': 'formal_friendly',
    'emotional_intelligence': 0.8,
    'cultural_awareness': 0.9
}
```

## 🔄 Integration with Node.js

The Node.js voice controller automatically integrates with Phase 3:

```javascript
// Enhanced call data with conversation memory
const enhancedCallData = {
  ...callData,
  callSid: CallSid  // For conversation memory
};

const aiResponse = await generateContextualResponse(userResponse, enhancedCallData);
```

## 📊 Performance Improvements

| Feature | Before | After |
|---------|--------|-------|
| Language Detection | Basic keywords | Advanced ML + confidence |
| Response Quality | Template-based | LLM-generated contextual |
| Conversation Flow | Stateless | Memory-enabled |
| Personality Depth | Static responses | Dynamic traits |
| Cultural Awareness | Limited | Enhanced Indian context |
| Sentiment Understanding | None | Real-time analysis |

## 🚀 Benefits

1. **More Natural Conversations**: LLM-powered responses feel human-like
2. **Better Language Support**: Accurate detection including Hinglish
3. **Contextual Awareness**: Remembers conversation history
4. **Emotional Intelligence**: Responds appropriately to user sentiment
5. **Cultural Sensitivity**: Understands Indian business context
6. **Scalable Architecture**: Easy to add new features and personalities

## 🔮 Future Enhancements

- Voice tone analysis integration
- Real-time translation capabilities
- Advanced business domain knowledge
- Multi-turn conversation planning
- Integration with CRM systems
- Analytics and conversation insights

## 🛠️ Troubleshooting

### Common Issues

1. **OpenAI API Key Missing**
   ```
   Error: OpenAI API key not configured
   Solution: Add OPENAI_API_KEY to .env file
   ```

2. **Model Download Timeout**
   ```
   Error: Transformers model download failed
   Solution: Models download on first use, ensure internet connection
   ```

3. **Memory Usage High**
   ```
   Issue: Large language models use significant RAM
   Solution: Consider using smaller models or cloud deployment
   ```

## 📈 Monitoring

The system logs detailed information:
- Language detection confidence
- Sentiment analysis results
- Conversation context usage
- Response generation time
- Fallback usage

Monitor these logs to optimize performance and user experience.