# Models

Pydantic schemas for request/response validation and data serialization.

## Files

- `schemas.py` - API request and response models for voice processing

## Schema Classes

### Request Models
- `ChatRequest` - Text chat input validation
- `VoiceCallRequest` - Voice call processing input
- `VoiceRequestEnhanced` - Enhanced voice request with metadata

### Response Models
- `ChatResponse` - Text chat output format
- `VoiceCallResponse` - Voice call processing output
- `VoiceResponseEnhanced` - Comprehensive voice response with AI metadata

### System Models
- `APIStatsResponse` - API usage statistics
- `HealthCheckResponse` - Service health status

## Features

- **Input Validation**: Automatic request data validation
- **Type Safety**: Strong typing for all API interactions
- **Documentation**: Auto-generated API docs from schemas
- **Serialization**: JSON conversion with proper formatting
- **Error Handling**: Validation error messages

## Usage

```python
from models.schemas import VoiceRequestEnhanced, VoiceResponseEnhanced

# Request validation
request = VoiceRequestEnhanced(**request_data)

# Response formatting
response = VoiceResponseEnhanced(
    ai_response="Hello, how can I help?",
    detected_language="english",
    language_confidence=0.95,
    sentiment={"label": "neutral", "score": 0.7}
)
```