# Affiliate Login Flow - Implementation Plan

## Overview

Create a separate "Login as Affiliate" button/flow on the login page that goes directly to the affiliate dashboard for existing active affiliates, bypassing the regular customer login flow.

## Current System Analysis

### Existing Authentication Flow

1. **Login Page** (`src/app/(auth)/login/page.tsx`):
   - Google login button
   - Email/password login form
   - Register form
   - Forgot password option

2. **Google Callback** (`src/app/auth/callback/google/page.tsx`):
   - Handles authentication after Google login
   - Checks affiliate status via `authService.googleLogin()`
   - Redirects based on user role:
     - Admin → `/admin/dashboard`
     - Active affiliate → `/affiliate/dashboard`
     - Paid but pending → `/affiliate/onboarding?status=paid`
     - Pending affiliate → `/affiliate/onboarding`
     - Non-affiliate with referral → `/affiliate/onboarding?ref=...`
     - Regular user → `/`

3. **Auth Service** (`src/features/auth/services/auth.service.ts`):
   - `login()` - Email/password login
   - `googleLogin()` - Google OAuth login
   - `register()` - User registration
   - All methods enrich user with affiliate status

### Guest Shopping (Already Implemented)

- Cart uses `guest_id` in localStorage
- API calls include `x-guest-id` header
- Guests can shop, add to cart, and checkout

---

## Implementation Plan

### Step 1: Add Affiliate Google Login Button to Login Page

**File:** `src/app/(auth)/login/page.tsx`

Add a new "Login as Affiliate" button that uses Google OAuth with an affiliate-specific flag. This button should be visually distinct from the regular "Continue with Google" button.

**Changes:**

- Add an affiliate-specific Google button with purple theme
- Set a sessionStorage flag `affiliate_login=true` before triggering Google auth
- This flag will be used by the callback to determine affiliate-specific redirect logic

### Step 2: Modify Google Auth Callback

**File:** `src/app/auth/callback/google/page.tsx`

Update the callback to check for the affiliate login flag and apply different redirect logic:

**New Logic:**

- If `affiliate_login=true` in sessionStorage:
  - If NOT an active affiliate → redirect to `/affiliate/onboarding` (force onboarding)
  - If active affiliate → redirect to `/affiliate/dashboard`
  - Clear the flag after use
- If no flag (regular login):
  - Use existing redirect logic

### Step 3: Update Auth Service (Optional)

**File:** `src/features/auth/services/auth.service.ts`

Ensure the affiliate status check happens consistently. The current implementation already calls `affiliatesApi.getMyStatus()` to get affiliate details.

---

## Visual Design

### Login Page Layout

```
┌─────────────────────────────────────┐
│         Welcome to Triad365         │
│       Sign in to continue           │
├─────────────────────────────────────┤
│  [Google Button - Regular]          │
├─────────────────────────────────────┤
│              OR                     │
├─────────────────────────────────────┤
│  [Email/Password Form]              │
├─────────────────────────────────────┤
│  [Forgot Password] [Sign Up]       │
├─────────────────────────────────────┤
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [Login as Affiliate - Purple]      │
│  Already an affiliate? Sign in here │
└─────────────────────────────────────┘
```

### Button Styling

- Regular Google button: Standard Google colors
- Affiliate login button: Purple gradient (`from-purple-500 to-purple-600`)

---

## User Flows

### Flow 1: Existing Active Affiliate

1. User clicks "Login as Affiliate"
2. Google OAuth popup appears
3. User authenticates with Google
4. Callback detects affiliate status = "active"
5. Redirects to `/affiliate/dashboard`

### Flow 2: Existing Affiliate (Pending/Not Paid)

1. User clicks "Login as Affiliate"
2. Google OAuth popup appears
3. User authenticates with Google
4. Callback detects affiliate status = "pending" or no payment
5. Redirects to `/affiliate/onboarding` to complete payment

### Flow 3: Not an Affiliate

1. User clicks "Login as Affiliate"
2. Google OAuth popup appears
3. User authenticates with Google
4. Callback detects user is not an affiliate
5. Redirects to `/affiliate/onboarding` to sign up as affiliate

---

## Technical Details

### sessionStorage Flag

```typescript
// Before triggering Google login for affiliate
sessionStorage.setItem("affiliate_login", "true");

// In callback, check for flag
const isAffiliateLogin = sessionStorage.getItem("affiliate_login") === "true";
if (isAffiliateLogin) {
  sessionStorage.removeItem("affiliate_login");
  // Apply affiliate-specific redirect logic
}
```

### Affiliate Status Check

The callback already has access to `user.isAffiliate` and `user.affiliateStatus` from the auth service response.

---

## Files to Modify

| File                                    | Change                             |
| --------------------------------------- | ---------------------------------- |
| `src/app/(auth)/login/page.tsx`         | Add "Login as Affiliate" button    |
| `src/app/auth/callback/google/page.tsx` | Add affiliate login flag handling  |
| `src/features/auth/index.ts`            | Export any new utilities if needed |

---

## Testing Checklist

- [ ] Regular Google login still works for customers
- [ ] "Login as Affiliate" button is visible and styled correctly
- [ ] Active affiliate redirected to dashboard after affiliate login
- [ ] Pending affiliate redirected to onboarding after affiliate login
- [ ] Non-affiliate user redirected to onboarding after affiliate login
- [ ] Flag is cleared after use (prevents stale redirects)
- [ ] Email/password affiliate login works correctly
