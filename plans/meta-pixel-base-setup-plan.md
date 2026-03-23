# Meta Pixel Base Setup Plan

## Problem

The Facebook Event Setup tool reports "A pixel wasn't detected on this website" because the current Meta Pixel implementation only initializes when visitors arrive via affiliate links with `ref`, `pixel`, or `store` query parameters.

## Solution

Add a base/default Meta Pixel that loads on all store pages, allowing Facebook to detect the pixel for the Event Setup tool.

## Technical Approach

### Option A: Add Default Pixel ID via Environment Variable (Simplest)

- Add a `NEXT_PUBLIC_META_PIXEL_ID` environment variable
- Initialize a default pixel in the store layout if no affiliate pixel is set
- Quick to implement, no UI needed

### Option B: Admin Configurable Pixel ID (More Flexible)

- Store a default pixel ID in the database/admin settings
- Add admin UI to configure the default pixel
- Allows changing pixel without redeploying

### Option C: Hybrid Approach (Recommended)

- Use environment variable for default pixel ID
- Allow affiliate pixel to override default when present
- Falls back to default when no affiliate tracking

## Implementation Steps

1. **Add environment variable** for default Meta Pixel ID
2. **Create a base Meta Pixel component** that initializes the default pixel
3. **Integrate into store layout** - load base pixel alongside affiliate tracking
4. **Test detection** - verify Facebook can now detect the pixel
5. **Use Event Setup tool** - configure events via Facebook's visual tool

## Files to Modify

- `src/app/(store)/layout.tsx` - Add base pixel initialization
- `src/lib/meta-pixel.ts` - Ensure default pixel initialization works
- `.env.local` - Add pixel ID (user needs to provide)

## Dependencies

- User must provide their Meta Pixel ID (from Facebook Business Manager)
