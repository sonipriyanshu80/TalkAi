# Frontend Source Code

React application source code structure and organization.

## Directory Structure

- `components/` - Reusable UI components and widgets
- `pages/` - Dashboard page components and routing
- `layouts/` - Layout wrappers and navigation structure
- `services/` - API integration and external service calls
- `contexts/` - React context providers for state management
- `hooks/` - Custom React hooks for shared logic
- `utils/` - Utility functions and helper methods
- `styles/` - Global CSS, themes, and styling
- `assets/` - Static assets (images, icons, fonts)

## Entry Points

- `main.jsx` - Application entry point and React DOM rendering
- `App.jsx` - Main app component with routing and providers

## Architecture Patterns

### Component Organization
- **Atomic Design**: Components organized by complexity level
- **Feature-based**: Related components grouped by functionality
- **Reusability**: Shared components for consistent UI

### State Management
- **Context API**: Global state for authentication and user data
- **Local State**: Component-level state with useState/useReducer
- **API State**: Server state management with custom hooks

### Routing Structure
- **Protected Routes**: Authentication-required pages
- **Public Routes**: Login and signup pages
- **Nested Routing**: Dashboard with sub-navigation

## Development Guidelines

- Use functional components with hooks
- Implement responsive design for mobile support
- Follow consistent naming conventions
- Add PropTypes or TypeScript for type safety
- Optimize performance with React.memo and useMemo