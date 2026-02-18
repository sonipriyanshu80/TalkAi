# Components

Reusable UI components for the TalkAi dashboard interface.

## Component Categories

### Form Components
- `Input.jsx` - Text input with validation and styling
- `Button.jsx` - Styled button with variants and states
- `Select.jsx` - Dropdown selection component
- `FileUpload.jsx` - Drag-and-drop file upload interface

### Layout Components
- `Modal.jsx` - Overlay modal dialog with backdrop
- `Sidebar.jsx` - Navigation sidebar with menu items
- `Header.jsx` - Top navigation bar with user menu
- `Card.jsx` - Content container with glass morphism effect

### Data Display
- `Table.jsx` - Data table with sorting and pagination
- `Chart.jsx` - Wrapper for Recharts visualization components
- `StatCard.jsx` - Metric display card for dashboard
- `Badge.jsx` - Status indicators and labels

### Feedback Components
- `Toast.jsx` - Notification toast messages
- `Loading.jsx` - Loading spinners and skeleton screens
- `ErrorBoundary.jsx` - Error handling and fallback UI

## Design System

### Styling Approach
- **CSS Modules**: Scoped styling for components
- **Glass Morphism**: Translucent cards with backdrop blur
- **Dark Theme**: Consistent dark color scheme
- **Responsive**: Mobile-first responsive design

### Component Props
- **Consistent API**: Similar prop patterns across components
- **Accessibility**: ARIA labels and keyboard navigation
- **Customization**: Style overrides and variant props

## Usage Examples

```jsx
import { Button, Modal, Input } from '../components';

// Button with variants
<Button variant="primary" size="large" onClick={handleClick}>
  Save Changes
</Button>

// Modal with form
<Modal isOpen={showModal} onClose={closeModal} title="Add Item">
  <Input label="Title" value={title} onChange={setTitle} />
</Modal>
```