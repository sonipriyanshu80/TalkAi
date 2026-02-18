# Pages

Dashboard page components and application screens.

## Page Structure

### Authentication Pages
- `Login.jsx` - User login form with JWT authentication
- `Signup.jsx` - Company registration and user creation

### Dashboard Pages (`/dashboard`)
- `Overview.jsx` - Main dashboard with key metrics and recent activity
- `CallLogs.jsx` - Call history with filtering, search, and pagination
- `Analytics.jsx` - Charts and performance metrics with date filtering
- `BalancePlans.jsx` - Subscription management, billing, and plan upgrades
- `KnowledgeBase.jsx` - Document upload, management, and PDF processing
- `Settings.jsx` - Company profile, voice settings, and configuration

## Page Features

### Data Management
- **Real-time Updates**: Live data refresh for call logs and metrics
- **Pagination**: Efficient loading for large datasets
- **Filtering**: Date ranges, search, and category filters
- **Sorting**: Sortable columns and custom ordering

### User Interface
- **Responsive Design**: Mobile and desktop layouts
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Navigation**: Breadcrumbs and page transitions

### Business Logic
- **Authentication**: Protected routes with JWT validation
- **Company Scoping**: Multi-tenant data isolation
- **Role-based Access**: Different permissions for admin vs users
- **Form Validation**: Client-side validation with error feedback

## Routing

```jsx
// Protected dashboard routes
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="calls" element={<CallLogs />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="billing" element={<BalancePlans />} />
  <Route path="knowledge" element={<KnowledgeBase />} />
  <Route path="settings" element={<Settings />} />
</Route>
```