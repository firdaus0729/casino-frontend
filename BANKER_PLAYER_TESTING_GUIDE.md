# Banker/Player Game Testing Guide

## 🎯 Overview
The Banker/Player game is a hash-based betting game where players bet on three outcomes:
- **BANKER** (Red) - Odds: 1:1.95
- **TIE** (Green) - Odds: 1:8
- **PLAYER** (Yellow) - Odds: 1:1.95

## 📍 Access the Game
1. Navigate to: `http://localhost:3000/hashgames/bankerplayer/page-betting`
2. Or go to: Hash Games → Banker/Player → Page Betting tab

## ✅ Pre-Testing Checklist

### 1. **Backend Setup**
- ✅ Backend server running on `http://localhost:4000`
- ✅ Database connected and migrations applied
- ✅ User is logged in (authentication required)

### 2. **User Account Setup**
- ✅ User has a balance in their wallet (USD currency)
- ✅ To add balance, use the Wallet section or admin tools

## 🧪 Testing Steps

### **Test 1: View Game Interface**
1. Open the Banker/Player betting page
2. **Expected Results:**
   - See three betting columns: BANKER, TIE, PLAYER
   - Each column shows:
     - Progress circle with percentage
     - Total bet amount ($7592 in mock data)
     - Number of players (11 in mock data)
     - Your bet amount ($0 initially)
     - Odds ratio
   - Betting chips at bottom (1, 5, 10, 50, 100)
   - Confirm button

### **Test 2: Place a Bet (BANKER)**
1. Click on the BANKER column
2. Select a chip value (e.g., $1)
3. Click "Confirm"
4. **Expected Results:**
   - Bet is placed successfully
   - Your bet amount in BANKER column updates
   - Balance decreases by bet amount
   - Success message appears

### **Test 3: Place a Bet (TIE)**
1. Click on the TIE column
2. Select a chip value (e.g., $5)
3. Click "Confirm"
4. **Expected Results:**
   - Bet is placed successfully
   - Your bet amount in TIE column updates
   - Balance decreases by bet amount

### **Test 4: Place a Bet (PLAYER)**
1. Click on the PLAYER column
2. Select a chip value (e.g., $10)
3. Click "Confirm"
4. **Expected Results:**
   - Bet is placed successfully
   - Your bet amount in PLAYER column updates
   - Balance decreases by bet amount

### **Test 5: Test Insufficient Balance**
1. Try to place a bet larger than your balance
2. **Expected Results:**
   - Error message: "Insufficient balance"
   - Bet is not placed
   - Balance remains unchanged

### **Test 6: Test Without Authentication**
1. Log out
2. Try to place a bet
3. **Expected Results:**
   - Error message: "Please log in to place a bet"
   - Redirected to login page

### **Test 7: Test Bet Results**
1. Place a bet
2. Wait for the round to settle (based on Tron block hash)
3. **Expected Results:**
   - If you win: Balance increases with payout
   - If you lose: Balance decreases (already deducted)
   - Result is displayed

## 🔧 API Testing (Using Browser Console or Postman)

### **Place a Bet**
```javascript
// In browser console (after logging in)
fetch('http://localhost:4000/api/v1/games/bet', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'YOUR_JWT_TOKEN_HERE'
  },
  body: JSON.stringify({
    game: 4,  // 4 = Banker/Player
    amount: 10,
    currency: 'USD'
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

### **Check Your Bets**
```javascript
fetch('http://localhost:4000/api/v1/wallets/bets', {
  headers: {
    'Authorization': 'YOUR_JWT_TOKEN_HERE'
  }
})
.then(res => res.json())
.then(data => console.log(data))
```

## 🐛 Common Issues & Solutions

### **Issue: "Insufficient balance"**
- **Solution:** Add balance to your account via Wallet section

### **Issue: "User not authenticated"**
- **Solution:** Log in first, then try betting

### **Issue: Bet not appearing**
- **Solution:** Check browser console for errors, verify backend is running

### **Issue: Mock data not updating**
- **Solution:** The page currently uses mock data. Connect to real API endpoints.

## 📝 Notes

1. **Current Status:** The page uses mock data. To connect to real API:
   - Update `app/hashgames/bankerplayer/page-betting/page.tsx`
   - Connect to `/api/v1/games/bet` endpoint
   - Handle bet placement and result updates

2. **Game Logic:**
   - Results are determined by Tron block hash
   - Banker/Player comparison based on hash values
   - TIE has special payout rules (8x or 50% refund)

3. **Bet Types:**
   - Type 1: BANKER
   - Type 2: PLAYER  
   - Type 3: TIE

## 🎮 Quick Test Script

```bash
# 1. Start backend
cd ok777-backend-main
npm run dev

# 2. Start frontend (in another terminal)
cd ok777-frontend-main
npm run dev

# 3. Open browser
# Navigate to: http://localhost:3000/hashgames/bankerplayer/page-betting

# 4. Login with test account
# Email: admin@gmail.com (or your test user)
# Password: (your password)

# 5. Ensure you have balance
# Check Wallet section

# 6. Place test bets on each option
```

## ✅ Success Criteria

- [ ] Page loads without errors
- [ ] All three betting options are visible
- [ ] Betting chips are selectable
- [ ] Can place bets on BANKER
- [ ] Can place bets on TIE
- [ ] Can place bets on PLAYER
- [ ] Balance updates correctly
- [ ] Error handling works (insufficient balance, not logged in)
- [ ] Bet results are displayed after settlement

