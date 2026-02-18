# Services

Core AI processing services and external integrations.

## Files

- `ai_engine.py` - Main AI orchestrator and conversation management
- `llm_service.py` - Large Language Model integration (OpenAI)
- `stt_service.py` - Speech-to-Text processing
- `tts_service.py` - Text-to-Speech synthesis

## Service Responsibilities

### AI Engine (`ai_engine.py`)
- **Conversation Memory**: Context retention across call exchanges
- **Language Detection**: Multi-language support (English, Hindi, Hinglish)
- **Sentiment Analysis**: Real-time emotion detection
- **Response Generation**: Contextual AI responses with personality
- **Intent Classification**: Understanding user needs and requests

### LLM Service (`llm_service.py`)
- **OpenAI Integration**: GPT model communication
- **Prompt Engineering**: Context-aware prompt construction
- **Fallback Handling**: Template responses when LLM unavailable
- **Response Processing**: Output formatting and validation

### STT Service (`stt_service.py`)
- **Audio Processing**: Voice input transcription
- **Language Detection**: Automatic language identification
- **Confidence Scoring**: Transcription accuracy metrics
- **Error Handling**: Audio processing failure management

### TTS Service (`tts_service.py`)
- **Voice Synthesis**: Text to speech conversion
- **Voice Selection**: Multiple voice personalities (Ridhima, Priyanshu)
- **Audio Format**: Output format optimization
- **Quality Control**: Audio generation validation

## Integration Flow

```python
from services.ai_engine import AIEngine
from services.llm_service import LLMService

# Initialize AI engine
ai_engine = AIEngine()

# Process voice call
response = await ai_engine.process_voice_call(
    user_message="What services do you offer?",
    call_data=call_context,
    voice_settings=voice_config
)
```