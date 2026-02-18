# Frontend - React Dashboard

React.js web application for TalkAi management dashboard with modern UI components.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Technology Stack

- **React 18** with Vite for fast development
- **React Router** for navigation
- **Context API** for state management
- **CSS Modules** with responsive design
- **FontAwesome** icons
- **Recharts** for analytics visualization
- **React DatePicker** for date selection

## Features

### Dashboard Pages
- **Overview** - Key metrics and recent activity
- **Call Logs** - Call history with filtering and search
- **Analytics** - Charts and performance metrics
- **Balance & Plans** - Subscription management and billing
- **Knowledge Base** - Document upload and management
- **Settings** - Company profile and voice configuration

### Components
- Responsive layout with mobile support
- Real-time data updates
- Interactive charts and graphs
- File upload with drag-and-drop
- Toast notifications
- Modal dialogs
- Form validation

### Authentication
- JWT token management
- Protected routes
- Auto-logout on token expiry
- Company-scoped data access

## Environment Variables

```
VITE_API_URL=http://localhost:5000
VITE_AI_API_URL=http://localhost:8000
```

## Deployment

- **Development**: `npm run dev`
- **Production**: Deployed on Vercel
- **Build Output**: Static files in `dist/`

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Dashboard page components
- `src/layouts/` - Layout wrappers
- `src/services/` - API integration
- `src/contexts/` - React context providers
- `src/styles/` - Global CSS and themes
