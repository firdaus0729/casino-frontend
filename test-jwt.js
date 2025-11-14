// Test script to validate JWT tokens
import { validateJWT, validateStoredToken, getTokenExpirationInfo } from './lib/jwt.js'

console.log('JWT Token Validation Test')
console.log('==========================')

// Test with a sample expired token (this is just for format testing)
const sampleExpiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

console.log('Testing with sample expired token:')
const sampleValidation = validateJWT(sampleExpiredToken)
console.log('Sample token validation:', sampleValidation)

console.log('\nTesting with stored token:')
const storedValidation = validateStoredToken()
console.log('Stored token validation:', storedValidation)

console.log('\nToken expiration info:')
console.log(getTokenExpirationInfo())

console.log('\nInstructions for browser testing:')
console.log('1. Open browser dev tools (F12)')
console.log('2. Go to Console tab')
console.log('3. Run: localStorage.getItem("auth_token")')
console.log('4. If token exists, run:')
console.log('   const { validateJWT } = await import("./lib/jwt.js")')
console.log('   validateJWT(localStorage.getItem("auth_token"))')

