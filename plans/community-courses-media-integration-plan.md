# Integration Plan: Community, Courses, and Media Library Modules

## Overview

This plan outlines the implementation of three backend modules (Community Links, Courses, Image Library) into the frontend admin dashboard and affiliate client-side.

---

## Architecture Summary

### Backend API Endpoints (Already Implemented)

#### Community Links Module

| Method | Endpoint                         | Description                      |
| ------ | -------------------------------- | -------------------------------- |
| GET    | `/api/admin/community-links`     | List all community links (admin) |
| POST   | `/api/admin/community-links`     | Create community link            |
| PATCH  | `/api/admin/community-links/:id` | Update community link            |
| DELETE | `/api/admin/community-links/:id` | Delete community link            |
| GET    | `/api/community-links`           | List active links (public)       |
| GET    | `/api/community-links/:id`       | Get single link (public)         |

**Categories**: youtube, facebook, telegram, website, discord, instagram, tiktok, twitter, linkedin, other

#### Courses Module

| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ---------------------------- |
| GET    | `/api/admin/courses`     | List all courses (admin)     |
| POST   | `/api/admin/courses`     | Create course                |
| PATCH  | `/api/admin/courses/:id` | Update course                |
| DELETE | `/api/admin/courses/:id` | Delete course                |
| GET    | `/api/courses`           | List active courses (public) |
| GET    | `/api/courses/:id`       | Get single course (public)   |

**Fields**: title, description, youtubeUrl, youtubeVideoId, thumbnailUrl, duration, category, isPremium, isActive, viewsCount

#### Image Library Module

| Method | Endpoint                       | Description                 |
| ------ | ------------------------------ | --------------------------- |
| GET    | `/api/admin/image-library`     | List all images (admin)     |
| POST   | `/api/admin/image-library`     | Create image                |
| PATCH  | `/api/admin/image-library/:id` | Update image                |
| DELETE | `/api/admin/image-library/:id` | Delete image                |
| GET    | `/api/image-library`           | List active images (public) |
| GET    | `/api/image-library/:id`       | Get single image (public)   |

**Categories**: banners, gallery, testimonials, partners

---

## Frontend Structure

### Current Pattern (to follow)

```
src/
├── infrastructure/api/           # API client layer
│   └── [module].api.ts          # Axios calls
├── features/admin/               # Admin feature modules
│   └── [module]/
│       ├── services/             # Service layer (maps API to types)
│       ├── hooks/                # React hooks for data fetching
│       ├── components/           # UI components
│       ├── schemas/              # Zod validation schemas
│       └── [Module]Page.tsx      # Main page component
├── features/affiliate/           # Affiliate client features
│   ├── community/
│   └── courses/
├── types/                        # TypeScript type definitions
```

---

## PHASE 1: Admin Community Module

### 1.1 Create TypeScript Types

**File**: `src/types/community.types.ts`

```typescript
export type CommunityLinkCategory =
  | "youtube"
  | "facebook"
  | "telegram"
  | "website"
  | "discord"
  | "instagram"
  | "tiktok"
  | "twitter"
  | "linkedin"
  | "other";

export interface CommunityLink {
  id: string;
  title: string;
  url: string;
  description: string | null;
  category: CommunityLinkCategory;
  icon: string | null;
  imageUrl: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityLinksResponse {
  data: CommunityLink[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

### 1.2 Create API Client

**File**: `src/infrastructure/api/community.api.ts`

- GET `/api/admin/community-links` with query params (page, limit, category, search, isActive)
- POST `/api/admin/community-links`
- PATCH `/api/admin/community-links/:id`
- DELETE `/api/admin/community-links/:id`

### 1.3 Create Service Layer

**File**: `src/features/admin/community/services/community.service.ts`

- `getAll(params)` - List with pagination and filters
- `getById(id)` - Get single
- `create(data)` - Create new
- `update(id, data)` - Update existing
- `delete(id)` - Delete

### 1.4 Create Hooks

**Files**:

- `src/features/admin/community/hooks/useCommunityLinks.ts` - Data fetching hook
- `src/features/admin/community/hooks/useCommunityMutations.ts` - CRUD mutation hooks

### 1.5 Create Validation Schema

**File**: `src/features/admin/community/schemas/community.schema.ts`

```typescript
export const communityLinkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL"),
  description: z.string().optional(),
  category: z.enum(["youtube", "facebook", ...]),
  icon: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  orderIndex: z.number().default(0),
  isActive: z.boolean().default(true),
});
```

### 1.6 Create UI Components

**Files**:

- `src/features/admin/community/components/CommunityTable.tsx` - Data table with columns (title, category, url, order, status, actions)
- `src/features/admin/community/components/CommunityFormModal.tsx` - Create/Edit modal form
- `src/features/admin/community/components/CommunityPagination.tsx` - Pagination controls

### 1.7 Create Main Page

**File**: `src/features/admin/community/CommunityPage.tsx`

- Header with title and "Add New" button
- Filter bar (category dropdown, search, status toggle)
- Table component
- Pagination component

### 1.8 Create Route

**File**: `src/app/(admin)/admin/community/page.tsx`

```typescript
import { CommunityPage } from "@/features/admin/community";
export default CommunityPage;
```

### 1.9 Add Navigation

**File**: Update admin sidebar/navigation to include Community Links menu item

---

## PHASE 2: Admin Courses Module

### 2.1 Create TypeScript Types

**File**: `src/types/course.types.ts`

```typescript
export interface Course {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  youtubeVideoId: string;
  thumbnailUrl: string | null;
  duration: number | null;
  formattedDuration: string | null;
  category: string | null;
  isPremium: boolean;
  displayOrder: number;
  isActive: boolean;
  viewsCount: number;
  embedUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoursesResponse {
  data: Course[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
```

### 2.2 Create API Client

**File**: `src/infrastructure/api/courses.api.ts`

- GET `/api/admin/courses` with filters (page, limit, category, search, isPremium, isActive)
- POST `/api/admin/courses`
- PATCH `/api/admin/courses/:id`
- DELETE `/api/admin/courses/:id`

### 2.3 Create Service Layer

**File**: `src/features/admin/courses/services/courses.service.ts`

### 2.4 Create Hooks

**Files**:

- `src/features/admin/courses/hooks/useCourses.ts`
- `src/features/admin/courses/hooks/useCourseMutations.ts`

### 2.5 Create Validation Schema

**File**: `src/features/admin/courses/schemas/course.schema.ts`

```typescript
export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  youtubeUrl: z.string().url("Invalid YouTube URL"),
  duration: z.number().optional(),
  category: z.string().optional(),
  isPremium: z.boolean().default(false),
  displayOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});
```

### 2.6 Create UI Components

**Files**:

- `src/features/admin/courses/components/CoursesTable.tsx` - Table with thumbnail, title, category, duration, premium badge
- `src/features/admin/courses/components/CourseFormModal.tsx` - Form with YouTube URL parser
- `src/features/admin/courses/components/CoursesPagination.tsx`

### 2.7 Create Main Page

**File**: `src/features/admin/courses/CoursesPage.tsx`

### 2.8 Create Route

**File**: `src/app/(admin)/admin/courses/page.tsx`

### 2.9 Add Navigation

Add Courses to admin sidebar

---

## PHASE 3: Admin Image Library Module

### 3.1 Create TypeScript Types

**File**: `src/types/image-library.types.ts`

```typescript
export type ImageLibraryCategory =
  | "banners"
  | "gallery"
  | "testimonials"
  | "partners";

export interface ImageLibrary {
  id: string;
  title: string;
  category: ImageLibraryCategory;
  thumbnailUrl: string | null;
  imageUrl: string;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ImageLibraryResponse {
  data: ImageLibrary[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
```

### 3.2 Create API Client

**File**: `src/infrastructure/api/image-library.api.ts`

### 3.3 Create Service Layer

**File**: `src/features/admin/image-library/services/image-library.service.ts`

### 3.4 Create Hooks

**Files**:

- `src/features/admin/image-library/hooks/useImageLibrary.ts`
- `src/features/admin/image-library/hooks/useImageLibraryMutations.ts`

### 3.5 Create Validation Schema

**File**: `src/features/admin/image-library/schemas/image-library.schema.ts`

### 3.6 Create UI Components

**Files**:

- `src/features/admin/image-library/components/ImageLibraryTable.tsx` - Grid/table view with thumbnails
- `src/features/admin/image-library/components/ImageLibraryFormModal.tsx` - Upload and form
- `src/features/admin/image-library/components/ImageLibraryPagination.tsx`

### 3.7 Create Main Page

**File**: `src/features/admin/image-library/ImageLibraryPage.tsx`

### 3.8 Create Route

**File**: `src/app/(admin)/admin/media-library/page.tsx`

### 3.9 Add Navigation

Add Media Library to admin sidebar

---

## PHASE 4: Affiliate Client Community Integration

### Current State

The file `src/features/affiliate/community/AffiliateCommunityPage.tsx` already exists with basic structure.

### 4.1 Check Existing Structure

Review `src/features/affiliate/community/AffiliateCommunityPage.tsx`

### 4.2 Create Client Service

**File**: `src/features/affiliate/community/services/community.service.ts`

- Uses public API endpoints (not admin)
- `getAll(params)` - List active links
- `getById(id)` - Get single

### 4.3 Integrate Data

- Add hook to fetch community links
- Display links in card/grid layout by category
- Link to external URLs

---

## PHASE 5: Affiliate Client Courses Integration

### Current State

The file `src/features/affiliate/courses/AffiliateCoursesPage.tsx` already exists.

### 5.1 Check Existing Structure

Review `src/features/affiliate/courses/AffiliateCoursesPage.tsx`

### 5.2 Create Client Service

**File**: `src/features/affiliate/courses/services/courses.service.ts`

- Uses public API endpoints
- `getAll(params)` - List active courses
- `getById(id)` - Get single with embed URL

### 5.3 Integrate Data with YouTube Player

- Display courses as video cards with thumbnails
- Include YouTube embed player modal or inline playback
- Show video duration, title, description
- Track view counts

---

## PHASE 6: Integration & Testing

### 6.1 Verify API Connectivity

- Test all admin endpoints with Postman/curl
- Verify authentication headers

### 6.2 Test Admin CRUD

- Create, read, update, delete operations
- Pagination and filtering
- Error handling

### 6.3 Test Client Display

- Affiliate community page displays links
- Affiliate courses page plays videos
- Verify responsive design

---

## File Summary

### New Files to Create

#### Types

- `src/types/community.types.ts`
- `src/types/course.types.ts`
- `src/types/image-library.types.ts`

#### API Clients

- `src/infrastructure/api/community.api.ts`
- `src/infrastructure/api/courses.api.ts`
- `src/infrastructure/api/image-library.api.ts`

#### Admin Services

- `src/features/admin/community/services/community.service.ts`
- `src/features/admin/courses/services/courses.service.ts`
- `src/features/admin/image-library/services/image-library.service.ts`

#### Admin Hooks

- `src/features/admin/community/hooks/useCommunityLinks.ts`
- `src/features/admin/community/hooks/useCommunityMutations.ts`
- `src/features/admin/courses/hooks/useCourses.ts`
- `src/features/admin/courses/hooks/useCourseMutations.ts`
- `src/features/admin/image-library/hooks/useImageLibrary.ts`
- `src/features/admin/image-library/hooks/useImageLibraryMutations.ts`

#### Schemas

- `src/features/admin/community/schemas/community.schema.ts`
- `src/features/admin/courses/schemas/course.schema.ts`
- `src/features/admin/image-library/schemas/image-library.schema.ts`

#### Admin Components

- `src/features/admin/community/components/CommunityTable.tsx`
- `src/features/admin/community/components/CommunityFormModal.tsx`
- `src/features/admin/community/components/CommunityPagination.tsx`
- `src/features/admin/courses/components/CoursesTable.tsx`
- `src/features/admin/courses/components/CourseFormModal.tsx`
- `src/features/admin/courses/components/CoursesPagination.tsx`
- `src/features/admin/image-library/components/ImageLibraryTable.tsx`
- `src/features/admin/image-library/components/ImageLibraryFormModal.tsx`
- `src/features/admin/image-library/components/ImageLibraryPagination.tsx`

#### Pages

- `src/features/admin/community/CommunityPage.tsx`
- `src/features/admin/courses/CoursesPage.tsx`
- `src/features/admin/image-library/ImageLibraryPage.tsx`

#### Routes

- `src/app/(admin)/admin/community/page.tsx`
- `src/app/(admin)/admin/courses/page.tsx`
- `src/app/(admin)/admin/media-library/page.tsx`

#### Affiliate Services

- `src/features/affiliate/community/services/community.service.ts`
- `src/features/affiliate/courses/services/courses.service.ts`

### Files to Modify

- Admin index exports (`src/features/admin/index.ts`)
- Affiliate index exports (`src/features/affiliate/index.ts`)
- Admin sidebar/navigation

---

## Implementation Order

1. **Community Module** (Admin first)
   - Types → API → Service → Hooks → Schema → Components → Page → Route → Navigation

2. **Courses Module** (Admin first)
   - Same pattern

3. **Image Library Module** (Admin first)
   - Same pattern

4. **Affiliate Client Integration**
   - Community page data integration
   - Courses page with YouTube integration

---

## Notes

- Follow existing patterns from Products, Testimonials modules
- Use Zod for form validation (same as Products)
- Implement proper error handling and loading states
- Use existing UI components (Lucide icons, Tailwind classes)
- Maintain consistent file organization structure
