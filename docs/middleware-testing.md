# Middleware Testing Guide

## How to Test Middleware Route Protection

### 1. Clear Authentication State
Before testing, clear all authentication data:
```javascript
// Open browser console and run:
localStorage.clear()
document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
```

### 2. Test Protected Routes
Try accessing these protected routes without authentication:
- `/wallet` - Should redirect to `/`
- `/settings` - Should redirect to `/`
- `/test-auth` - Should redirect to `/`
- `/alliance` - Should redirect to `/`
- `/vip-club` - Should redirect to `/`

### 3. Check Browser Console
Look for middleware debug logs:
```
🔒 Middleware checking: /wallet
🛡️ Protected route detected: /wallet
🔍 Middleware Debug: { pathname: '/wallet', isProtected: true, hasToken: false }
🔑 Token Debug: { hasToken: false, tokenLength: 0, tokenStart: 'none', isJWT: false }
🍪 Cookie Debug: { allCookies: '', authCookie: 'not found', hasAuthToken: false }
❌ No valid token, redirecting to landing page
```

### 4. Test After Login
1. Login to the application
2. Check that cookies are set: `document.cookie`
3. Try accessing protected routes - they should work
4. Check console for successful middleware logs:
```
🔒 Middleware checking: /wallet
🛡️ Protected route detected: /wallet
🔍 Middleware Debug: { pathname: '/wallet', isProtected: true, hasToken: true }
🔑 Token Debug: { hasToken: true, tokenLength: 150, tokenStart: 'eyJhbGciOi', isJWT: true }
✅ Valid token present, allowing access
```

### 5. Test Public Routes
These should always work without authentication:
- `/` - Landing page
- `/auth` - Auth pages
- `/auth/google/callback` - OAuth callback

### 6. Debug Common Issues

#### Issue: Middleware not running
- Check if `middleware.ts` is in the root directory
- Verify the matcher configuration
- Check browser console for middleware logs

#### Issue: Token not found
- Verify `setAuthCookie()` is being called on login
- Check if cookies are being set: `document.cookie`
- Ensure token is not empty or invalid

#### Issue: Redirect not working
- Check if redirect URL is correct
- Verify middleware is returning `NextResponse.redirect()`
- Check browser network tab for redirect responses

### 7. Manual Cookie Testing
Test cookie setting manually:
```javascript
// Set a test cookie
document.cookie = 'auth_token=test-token-123; path=/; SameSite=Lax'

// Check if middleware detects it
// Try accessing /test-auth
```

### 8. Expected Behavior
- **Without Auth**: All protected routes redirect to `/`
- **With Auth**: All protected routes work normally
- **Public Routes**: Always accessible
- **Console Logs**: Detailed debugging information
- **Network Tab**: Shows redirects (302 status) for unauthenticated users
