# Route Protection with Middleware

## Overview
This application now uses Next.js middleware to protect routes and prevent unauthorized access to pages that require authentication.

## How it Works

### 1. Middleware (`middleware.ts`)
- **Location**: Root of the project
- **Purpose**: Intercepts all requests before they reach the page components
- **Behavior**: 
  - Checks if the requested route is protected
  - Verifies authentication token from cookies
  - Redirects unauthenticated users to the landing page (`/`)

### 2. Protected Routes
The following routes require authentication:
- `/wallet` - Wallet management
- `/settings` - User settings
- `/alliance` - Alliance/affiliate features
- `/vip-club` - VIP club
- `/help-center` - Help and support
- `/favorites` - User favorites
- `/recent` - Recent games
- `/hash-games` - Hash games
- `/table-games` - Table games
- `/slots` - Slot games
- `/live-casino` - Live casino
- `/sports` - Sports betting
- `/futures` - Futures trading
- `/crypto-games` - Crypto games
- `/casino` - Casino games
- `/promotions` - Promotions
- `/game-provider` - Game providers
- `/hashgames` - Hash games (alternative path)
- `/beginner-tutorial` - Tutorial
- `/install-app` - App installation
- `/test` - Test pages

### 3. Public Routes
These routes are always accessible:
- `/` - Landing page
- `/auth` - Authentication pages
- `/auth/google/callback` - Google OAuth callback

### 4. Authentication Flow
1. **Login/Signup**: User authenticates and receives a token
2. **Token Storage**: Token is stored in both localStorage and cookies
3. **Route Access**: Middleware checks for token before allowing access to protected routes
4. **Redirect**: Unauthenticated users are redirected to landing page
5. **Fallback**: `useAuthGuard` hook provides additional client-side protection

### 5. Cookie Management
- **File**: `lib/auth-cookies.ts`
- **Purpose**: Manages authentication cookies for middleware access
- **Functions**:
  - `setAuthCookie(token)` - Sets authentication cookie
  - `clearAuthCookie()` - Removes authentication cookie
  - `getAuthCookie()` - Retrieves authentication cookie

### 6. Updated Auth Guard
- **File**: `hooks/useAuthGuard.ts`
- **Changes**: Now works as a fallback to middleware
- **Behavior**: Redirects to home page if no authentication token exists

## Benefits
1. **Server-side Protection**: Routes are protected at the server level
2. **No Flash of Content**: Users don't see protected content before being redirected
3. **Better UX**: Immediate redirect instead of showing auth modal
4. **Security**: Prevents unauthorized access to protected routes
5. **Performance**: Reduces unnecessary page loads for unauthenticated users
6. **Clean Implementation**: No console logs cluttering the output

## Testing
To test the middleware:
1. Clear your browser cookies and localStorage
2. Try to navigate to any protected route (e.g., `/wallet`, `/vip-club`, `/promotions`)
3. You should be automatically redirected to the landing page (`/`)
4. After logging in, you should be able to access protected routes normally
5. Check browser network tab to see redirect responses (302 status)
