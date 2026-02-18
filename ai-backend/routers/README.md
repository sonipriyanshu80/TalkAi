# Routers

FastAPI route handlers for AI processing endpoints.

## Files

- `voice_router.py` - Voice call processing endpoints
- `ai_router.py` - Text chat and AI interaction endpoints  
- `health_router.py` - Service health and status endpoints

## Endpoints

### Voice Processing (`/voice`)
- `POST /process` - Process voice calls with AI responses
- Handles speech-to-text, AI generation, and text-to-speech

### AI Chat (`/ai`)
- `POST /chat` - Text-based conversation processing
- `GET /stats` - API usage statistics and metrics

### Health Check (`/health`)
- `GET /` - Service health status
- `GET /detailed` - Detailed system information

## Features

- **Request Validation**: Automatic input validation using Pydantic
- **Error Handling**: Structured error responses with proper HTTP codes
- **Logging**: Request/response logging for debugging
- **CORS Support**: Cross-origin requests for frontend integration
- **Documentation**: Auto-generated OpenAPI/Swagger docs

## Router Configuration

```python
from fastapi import APIRouter
from routers import voice_router, ai_router, health_router

app.include_router(voice_router.router, prefix="/voice", tags=["voice"])
app.include_router(ai_router.router, prefix="/ai", tags=["ai"])
app.include_router(health_router.router, prefix="/health", tags=["health"])
```