# Affiliate Home Page Design Plan

## Overview

Create an affiliate landing/informational page at `/affiliate` that describes the program benefits before directing visitors to sign up. The page will use the existing store layout with Navbar and Footer, featuring the logo from `public/images/logo.png`.

## Current State Analysis

- **Existing affiliate pages**: `/affiliate/onboarding` (custom dark purple gradient design, no Navbar/Footer), `/affiliate/registration` (redirects to onboarding)
- **Existing layout**: Store layout at `src/app/(store)/layout.tsx` includes Navbar and Footer
- **Logo location**: `public/images/logo.png` (exists)
- **Navbar**: Currently uses text "Triad365" instead of image logo
- **Footer**: Currently uses text "Triad365" instead of image logo

## Requirements Summary

1. Landing/informational page at `/affiliate` describing program benefits
2. Use Navbar and Footer with logo.png on all public affiliate pages
3. Full consistency between landing page and onboarding page

---

## Task Breakdown

### Task 1: Update Navbar Component

**File**: `src/shared/components/layout/Navbar.tsx`

**Current**: Uses text `<span className="text-xl font-extrabold text-blue-600">Triad365</span>`

**Changes**:

- Replace text with `<Image src="/images/logo.png" alt="Triad365" width={120} height={40} />` or similar
- Keep the link wrapper `<Link href="/">`
- Ensure proper sizing and responsiveness

### Task 2: Update Footer Component

**File**: `src/features/store/home/components/Footer.tsx`

**Current**: Uses text `<span className="text-lg font-extrabold text-gray-900">Triad365</span>`

**Changes**:

- Replace text with `<Image src="/images/logo.png" alt="Triad365" width={100} height={30} />` or similar
- Keep the link wrapper `<Link href="/">`
- Ensure proper sizing

### Task 3: Create Affiliate Public Layout

**New File**: `src/app/affiliate/layout.tsx`

**Purpose**: Wrapper for all public affiliate pages (landing, onboarding, registration) to include Navbar and Footer

```tsx
import { Footer } from "@/features/store/home/components/Footer";
import { Navbar } from "@/shared/components/layout/Navbar";

export default function AffiliatePublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full flex flex-col items-center pt-14">
        <div className="w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

**Note**: The `pt-14` accounts for the fixed Navbar height.

### Task 4: Create Affiliate Landing Page

**New File**: `src/app/affiliate/page.tsx`

**Purpose**: Informational page describing affiliate program benefits

**Content Sections**:

1. **Hero Section**:
   - Headline: "Join the Triad365 Affiliate Program"
   - Subheadline: "Earn commissions by promoting quality products"
   - CTA Button: "Join Now" → links to `/affiliate/onboarding`

2. **Benefits Section**:
   - Unique referral link for each affiliate
   - Earn commissions on every sale
   - Access to training courses
   - Easy Maya cashout
   - Real-time tracking dashboard

3. **How It Works Section** (optional):
   - Step 1: Sign up and pay ₱999 activation fee
   - Step 2: Get your unique referral link
   - Step 3: Share and earn commissions

4. **Testimonials/Social Proof** (optional):
   - Show existing affiliate success stories

### Task 5: Update Onboarding Page Layout

**File**: `src/app/affiliate/onboarding/page.tsx`

**Current**: Custom full-screen design without Navbar/Footer

**Changes**:

- The page component stays largely the same (it has its own gradient background)
- Wrap with the new affiliate layout by adding Navbar/Footer
- May need to adjust padding/margins to account for fixed Navbar

### Task 6: Update Registration Pages Layout

**Files to review**:

- `src/app/affiliate/registration/page.tsx` (redirects to onboarding)
- `src/app/affiliate/registration/callback/page.tsx`
- `src/app/affiliate/payment/callback/page.tsx`

**Action**: Ensure these pages also use the new affiliate layout if they need Navbar/Footer

---

## Implementation Notes

### Image Import

```tsx
import Image from "next/image";
```

### Responsive Logo Sizing

- Navbar: ~120px width, maintain aspect ratio
- Footer: ~100px width, maintain aspect ratio

### Color Scheme Considerations

- The existing onboarding page uses dark purple gradient (`from-[#1a0533] via-[#2d0a5e] to-[#1a0533]`)
- The landing page should complement this aesthetic or use the store's blue theme
- Consider using consistent accent colors across both pages

### User Flow

1. User visits `/affiliate` → sees landing page with program info
2. User clicks "Join Now" → navigates to `/affiliate/onboarding`
3. User completes payment → redirected to affiliate dashboard

---

## File Changes Summary

| Action | File Path                                          |
| ------ | -------------------------------------------------- |
| Modify | `src/shared/components/layout/Navbar.tsx`          |
| Modify | `src/features/store/home/components/Footer.tsx`    |
| Create | `src/app/affiliate/layout.tsx`                     |
| Create | `src/app/affiliate/page.tsx`                       |
| Modify | `src/app/affiliate/onboarding/page.tsx`            |
| Review | `src/app/affiliate/registration/callback/page.tsx` |
| Review | `src/app/affiliate/payment/callback/page.tsx`      |

---

## Mermaid Diagram: Page Flow

```mermaid
graph TD
    A[Visitor] --> B[/affiliate - Landing Page]
    B --> C[Navbar + Footer with logo]
    B --> D[Program Benefits]
    B --> E[CTA: Join Now]

    E --> F[/affiliate/onboarding]
    F --> G[Payment: ₱999 via Maya]
    G --> H[Success - Pending Approval]

    H --> I[Approved]
    I --> J[/affiliate/dashboard]

    style B fill:#e1f5fe
    style F fill:#f3e5f5
    style J fill:#e8f5e8
```

---

## Next Steps

1. Switch to Code mode to implement the plan
2. Start with updating Navbar and Footer components to use logo.png
3. Create the affiliate public layout
4. Build the landing page content
5. Update onboarding page layout
6. Test the flow from landing → onboarding → dashboard
