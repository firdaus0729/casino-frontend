// Browser Console Script for JWT Token Validation
// Copy and paste this into your browser's developer console

(function() {
  console.log('🔐 JWT Token Validation Tool');
  console.log('============================');
  
  // Get token from localStorage
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
    console.log('❌ No auth token found in localStorage');
    console.log('💡 User is not logged in or token was cleared');
    return;
  }
  
  console.log('✅ Token found in localStorage');
  console.log('📏 Token length:', token.length);
  console.log('🔤 Token preview:', token.substring(0, 50) + '...');
  
  try {
    // Split token into parts
    const parts = token.split('.');
    
    if (parts.length !== 3) {
      console.log('❌ Invalid JWT format - must have 3 parts separated by dots');
      console.log('📊 Found', parts.length, 'parts');
      return;
    }
    
    console.log('✅ Token has correct JWT format (3 parts)');
    
    // Decode header
    const header = JSON.parse(atob(parts[0]));
    console.log('📋 Header:', header);
    
    // Decode payload
    const payload = JSON.parse(atob(parts[1]));
    console.log('📦 Payload:', payload);
    
    // Check expiration
    if (!payload.exp) {
      console.log('❌ Token missing expiration (exp) field');
      return;
    }
    
    const now = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp < now;
    const expiresAt = new Date(payload.exp * 1000);
    
    console.log('⏰ Token expires at:', expiresAt.toLocaleString());
    console.log('🕐 Current time:', new Date().toLocaleString());
    
    if (isExpired) {
      console.log('❌ TOKEN IS EXPIRED!');
      console.log('💡 This explains why the /api/v1/wallets/info request is failing');
      console.log('🔧 Solution: User needs to log in again or implement token refresh');
    } else {
      console.log('✅ Token is valid and not expired');
      const minutesLeft = Math.floor((payload.exp - now) / 60);
      console.log('⏳ Minutes until expiration:', minutesLeft);
    }
    
    // Check for user info
    if (payload.sub || payload.userId || payload.id) {
      console.log('👤 User ID:', payload.sub || payload.userId || payload.id);
    }
    
    if (payload.email) {
      console.log('📧 Email:', payload.email);
    }
    
  } catch (error) {
    console.log('❌ Error decoding token:', error.message);
    console.log('💡 Token may be corrupted or malformed');
  }
  
  console.log('\n🛠️  Next Steps:');
  console.log('1. If token is expired: User needs to log in again');
  console.log('2. If token is invalid: Clear localStorage and log in again');
  console.log('3. Implement automatic token refresh for better UX');
  
})();

