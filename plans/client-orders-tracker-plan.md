# Client Orders Tracker Plan

## Overview

Implement a client-facing orders tracker page where logged-in users can view their order history with status tracking. The page will show orders with their current status (pending, confirmed, processing, shipped, delivered, cancelled) along with a visual timeline.

## Current State Analysis

### Existing Components

1. **Navbar** - Already has "My Orders" link at `/orders` (line 123 of Navbar.tsx)
2. **Order Types** - `OrderStatus` enum: `pending | confirmed | processing | shipped | delivered | cancelled`
3. **Order Service** - Has `getOrders()` and `getOrder(id)` methods in store order service
4. **Admin Orders Page** - Existing `/admin/orders` with table and status management
5. **Checkout Callback** - Already references `/orders` as redirect destination

### Missing Components

- Client-facing `/orders` page for users to view their order history
- Order status timeline/tracking component
- Client-side hook for fetching user orders (needs to reuse existing service)

---

## Implementation Plan

### Step 1: Create Client Orders Hook

**Location:** `src/features/store/orders/hooks/useClientOrders.ts`

Create a new hook that fetches orders for the current logged-in user:

- Use existing `orderService.getOrders()` method
- Handle loading, error, and data states
- Support pagination if needed

```typescript
// Expected interface
interface UseClientOrdersResult {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}
```

### Step 2: Create Order Status Timeline Component

**Location:** `src/features/store/orders/components/OrderStatusTimeline.tsx`

Visual component showing order progress:

- Display all possible statuses as steps
- Highlight current status and completed statuses
- Use different colors for each status
- Show timestamps for each status update

**Status Flow:**

```
pending → confirmed → processing → shipped → delivered
                    ↘ cancelled
```

### Step 3: Create Order Card Component

**Location:** `src/features/store/orders/components/OrderCard.tsx`

Card component for each order displaying:

- Order ID
- Order date
- Order total
- Payment method
- Payment status
- Order status with visual indicator
- List of items (collapsed by default)
- "View Details" button

### Step 4: Create Order Detail Modal

**Location:** `src/features/store/orders/components/OrderDetailModal.tsx`

Modal showing full order details:

- Complete shipping information
- All order items with images
- Price breakdown (subtotal, discounts, total)
- Payment details
- Status timeline

### Step 5: Create Orders Page

**Location:** `src/app/(store)/orders/page.tsx`

Main page component:

- Page title "My Orders"
- List of orders (using OrderCard components)
- Empty state if no orders
- Loading state
- Error handling
- Order detail modal integration

### Step 6: Ensure API Endpoint Exists

Verify that the backend API endpoint for getting user orders is properly configured:

- Endpoint: `GET /api/orders`
- Should return orders for authenticated user
- Should support guest orders via guest ID header

---

## File Structure

```
src/
├── app/
│   └── (store)/
│       └── orders/
│           └── page.tsx          # Main orders page
├── features/
│   └── store/
│       └── orders/
│           ├── index.ts          # Barrel export
│           ├── components/
│           │   ├── OrderCard.tsx
│           │   ├── OrderDetailModal.tsx
│           │   └── OrderStatusTimeline.tsx
│           └── hooks/
│               └── useClientOrders.ts
```

---

## UI/UX Design

### Order Card Design

```
┌─────────────────────────────────────────────────┐
│ Order #ORD-12345              📅 Jan 15, 2024  │
│─────────────────────────────────────────────────│
│ 🛍️ 3 items                      💰 ₱1,500.00 │
│                                                 │
│ Status: ● Shipped                               │
│ ─────────────────────────────────────────────── │
│ [View Details]                                  │
└─────────────────────────────────────────────────┘
```

### Status Timeline Design

```
Pending ──→ Confirmed ──→ Processing ──→ Shipped ──→ Delivered
   ●           ○             ○            ○           ○
  ✓✓✓✓        ✓✓✓✓          ✓✓✓           ○           ○
```

### Color Coding

- **Pending:** Yellow/Orange
- **Confirmed:** Blue
- **Processing:** Purple
- **Shipped:** Cyan/Teal
- **Delivered:** Green
- **Cancelled:** Red

---

## Integration Points

1. **Navbar** - Already has link to `/orders` - no changes needed
2. **Order Service** - Uses existing `orderService.getOrders()`
3. **Auth** - Uses existing authentication (requires login to view orders)
4. **Checkout** - Already redirects to `/orders` after successful checkout

---

## Acceptance Criteria

1. ✅ Logged-in users can view their order history
2. ✅ Orders display with correct status indicators
3. ✅ Status timeline shows progress for each order
4. ✅ Users can view detailed order information
5. ✅ Empty state shown when user has no orders
6. ✅ Loading and error states handled gracefully
7. ✅ Mobile-responsive design
8. ✅ Page accessible via Navbar "My Orders" link
