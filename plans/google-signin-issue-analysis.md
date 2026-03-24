# Google Sign-In Always Uses Previous Account - Analysis & Fix

## Issue Description

Google sign-in always signs in the previous account even when the user is logged out and doesn't get the account selection screen.

## Root Cause

The issue is in [`GoogleButton.tsx`](src/features/auth/components/GoogleButton.tsx:20) at lines 20-25:

```typescript
await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${globalThis.location.origin}/auth/callback/google`,
  },
});
```

**Missing `prompt` parameter**: The Supabase OAuth configuration is missing the `prompt: "select_account"` option. Without this, Google will re-use the existing session if one exists, bypassing the account selection screen.

## How OAuth Works with Google

When a user authenticates via OAuth:

1. **First time**: User sees Google account selection → authenticates → returns to app
2. **Subsequent visits WITHOUT `prompt: "select_account"`**: Google checks if there's an existing session/cookie → if found, auto-authenticates with that account without showing the selection screen
3. **With `prompt: "select_account"`**: Forces Google to show the account selection screen every time

## Affected Files

The fix needs to be applied to all Google OAuth implementations:

1. [`src/features/auth/components/GoogleButton.tsx`](src/features/auth/components/GoogleButton.tsx:20) - Main login page
2. There may be other GoogleButton usages in the codebase

## Solution

Add `prompt: "select_account"` to the OAuth options in all Google sign-in flows:

```typescript
await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${globalThis.location.origin}/auth/callback/google`,
    prompt: "select_account", // <-- ADD THIS
  },
});
```

## Additional Notes

- This is a common OAuth issue, not specific to Supabase
- The `prompt` parameter values:
  - `"select_account"` - Always show account picker
  - `"consent"` - Force consent screen (if you need to re-request permissions)
  - `"none"` - Use silent auth if possible (default behavior)

- The user's logout (in your app) only clears your app's session, but Google's session cookie in the browser remains
- Adding `prompt: "select_account"` will force Google to always show the account selection screen regardless of existing sessions
