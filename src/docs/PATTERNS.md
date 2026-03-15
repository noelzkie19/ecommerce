# Project Architecture & Patterns Guide

## Overview

This document outlines the established patterns and conventions for developing features in this Next.js e-commerce project.

## Feature Structure

Each feature follows a consistent folder structure:

```
src/features/[feature-name]/
├── index.ts                    # Public exports
├── [feature-name]Page.tsx      # Main page component
├── components/                 # Feature-specific components
├── hooks/                      # Custom React hooks
├── services/                   # API service functions
├── schemas/                   # Zod validation schemas
└── types/                      # TypeScript type definitions
```

## Page Patterns

### 1. Auth Pages (`app/(auth)/`)

- Uses centered card layout with `min-h-screen bg-gray-100`
- Leverages reusable `Input` and `Button` components from `@/shared/components/ui`
- Uses hooks pattern for logic (`useLogin`, `useRegister`)
- Color theme: Green (`bg-green-600`) and Gray (`bg-gray-900`)

### 2. Admin Pages (`app/(admin)/`)

- Uses `AdminSidebar` and `AdminTopBar` from `@/shared/components/layout`
- Uses tables with consistent styling
- Color theme: Green (`bg-green-600`) and Gray (`bg-gray-900`)

### 3. Affiliate Dashboard Pages (`app/(affiliate)/affiliate/*`)

- Uses `AffiliateTopBar` for page headers
- Uses `AffiliateSidebar` for navigation
- Uses `AffiliateStatCard` for statistics display
- Uses `AffiliateSalesChart` for data visualization
- Color theme: Purple (`bg-purple-600`)

### 4. Store Pages (`app/(store)/`)

- Uses `Navbar` and `Footer` from shared components
- Uses consistent product cards and layouts
- Color theme: Purple (`bg-purple-600`)

### 5. Public Payment Pages (e.g., Affiliate Onboarding)

- Standalone full-page design outside of feature layouts
- Uses shared UI components (`Card`, `Button`, `IconContainer`, `Spinner`)
- Uses brand-specific gradient backgrounds

## Shared UI Components

All reusable UI components are located in `@/shared/components/ui/`:

| Component        | Usage                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `Button`         | Primary action buttons with variants: `primary`, `secondary`, `ghost`, `danger`, `purple`         |
| `Input`          | Form inputs with optional `leftIcon`, `rightIcon`, `label`, and `error` props                     |
| `Badge`          | Status badges with colors: `green`, `yellow`, `red`, `gray`, `blue`, `purple`, `emerald`, `amber` |
| `StatusBadge`    | Pre-configured status badges: `Active`, `Pending`, `Suspended`, `Approved`, `Rejected`            |
| `Card`           | Content containers with variants: `default`, `outline`, `purple`                                  |
| `CardHeader`     | Card section headers                                                                              |
| `CardContent`    | Card body content                                                                                 |
| `IconContainer`  | Icon wrappers with color variants                                                                 |
| `Skeleton`       | Loading placeholder components                                                                    |
| `Spinner`        | Loading spinner with size variants                                                                |
| `LoadingOverlay` | Full loading state display                                                                        |

## Component Patterns

### Using the Button Component

```tsx
import { Button } from "@/shared/components/ui/Button";

// Primary action (green)
<Button variant="primary">Save</Button>

// Secondary action (gray)
<Button variant="secondary">Cancel</Button>

// Ghost/outline button
<Button variant="ghost">Edit</Button>

// Danger action
<Button variant="danger">Delete</Button>

// Purple theme (affiliate)
<Button variant="purple">Continue</Button>

// Loading state
<Button loading>Processing...</Button>

// Small size
<Button size="sm">Small</Button>
```

### Using the Card Component

```tsx
import { Card, CardHeader, CardContent } from "@/shared/components/ui/Card";

// Default white card
<Card>
  <CardContent>Content here</CardContent>
</Card>

// Card with header
<Card>
  <CardHeader title="Section Title" />
  <CardContent>Content here</CardContent>
</Card>

// Purple variant
<Card variant="purple">
  <CardContent>Purple background</CardContent>
</Card>
```

### Using the Badge Component

```tsx
import { Badge, StatusBadge } from "@/shared/components/ui/Badge";

// Basic badge
<Badge label="New" color="blue" />

// With dot indicator
<Badge label="Active" color="emerald" showDot />

// Pre-configured status badges
<StatusBadge.Active />
<StatusBadge.Pending />
<StatusBadge.Approved />
```

## Hooks Pattern

Custom hooks encapsulate business logic and return state and handlers:

```tsx
// hooks/useExample.ts
export function useExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
```

## Service Pattern

API services are singleton objects that encapsulate API calls:

```tsx
// services/example.service.ts
import { apiClient } from "@/infrastructure/api/client";

export const exampleService = {
  async getAll(params?: Record<string, unknown>) {
    const response = await apiClient.get("/endpoint", { params });
    return response.data;
  },

  async create(payload: unknown) {
    const response = await apiClient.post("/endpoint", payload);
    return response.data;
  },
};
```

## Styling Conventions

### Color Theme by Feature

| Feature   | Primary Color         | Secondary Colors     |
| --------- | --------------------- | -------------------- |
| Auth      | Green (`green-600`)   | Gray (`gray-900`)    |
| Admin     | Green (`green-600`)   | Gray (`gray-900`)    |
| Affiliate | Purple (`purple-600`) | Purple (`purple-50`) |
| Store     | Purple (`purple-600`) | Various              |

### Common Class Patterns

- **Cards**: `bg-white rounded-2xl border border-gray-100 shadow-sm`
- **Page Headers**: Use `AffiliateTopBar` or `AdminTopBar`
- **Stats**: Use `AffiliateStatCard`
- **Loading**: Use `Skeleton` or `Spinner`

## Export Patterns

Each feature should export its public API from `index.ts`:

```tsx
// features/example/index.ts
export { ExamplePage } from "./ExamplePage";
export { useExample } from "./hooks/useExample";
export { exampleService } from "./services/example.service";
```

## Next Steps for New Features

1. Create feature folder under `src/features/[feature-name]/`
2. Add exports to `index.ts`
3. Use appropriate shared components from `@/shared/components/ui`
4. Follow the hook and service patterns
5. Use consistent color theme for the feature
