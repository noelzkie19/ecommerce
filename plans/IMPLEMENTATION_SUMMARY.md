# Affiliate Payment Proof & Approval - Implementation Summary

## Overview

This document summarizes the implementation status of the affiliate payment proof and approval workflow for the e-commerce platform. The system enables admins to review and approve affiliate registrations with supporting payment documentation.

## Architecture

The implementation follows a clean architecture pattern with clear separation between:

- **Domain Layer**: Business entities and rules
- **Application Layer**: Use cases orchestrating business logic
- **Infrastructure Layer**: Database and external service implementations
- **Presentation Layer**: API controllers and frontend UI

## Backend Implementation (ecommerce-api) ✅ COMPLETE

### Domain Entity

**File:** `src/domain/entities/Affiliate.ts`

The `Affiliate` entity contains all necessary payment proof fields:

```typescript
paymentProofUrl: string | null; // URL to uploaded proof image
paymentProofRef: string | null; // Reference/note about payment
paymentProofSubmittedAt: Date | null; // When proof was submitted
approvedBy: string | null; // Admin who approved
approvedAt: Date | null; // When approval occurred
rejectionReason: string | null; // Why rejected (if applicable)
```

### Repository Layer

**Interface:** `src/domain/interfaces/IAffiliateRepository.ts`

**Implementation:** `src/infrastructure/database/supabase/SupabaseAffiliateRepository.ts`

Key methods:

- `uploadPaymentProofImage(affiliateId, imageUrl, proofRef?)` - Updates affiliate with proof
- `submitPaymentProof(userId, proofUrl, proofRef?)` - URL-based submission
- `approveAffiliate(affiliateId, adminId)` - Approves and sets paid status
- `rejectAffiliate(affiliateId, reason?)` - Rejects with optional reason

### Use Cases

#### 1. UploadPaymentProofImageUseCase

**File:** `src/application/use-cases/affiliate/UploadPaymentProofImage.ts`

**Responsibilities:**

- Validates file type (JPEG, PNG, WEBP, GIF only)
- Uploads to Supabase Storage `payment_proof` bucket
- Updates affiliate record with proof URL
- Supports both user and admin uploads

**Input:**

```typescript
interface UploadPaymentProofImageInput {
  userId?: string; // For user uploads
  affiliateId?: string; // For admin uploads
  file: Express.Multer.File;
  proofRef?: string;
}
```

**Output:**

```typescript
interface UploadPaymentProofImageOutput {
  success: boolean;
  message: string;
  paymentProofUrl: string;
  paymentProofRef: string | null;
  paymentProofSubmittedAt: string;
}
```

#### 2. SubmitPaymentProofUseCase

URL-based submission for affiliates who already have hosted images.

#### 3. ApproveAffiliateUseCase

Checks `canBeActivated()` before approval:

- Payment status is "paid" OR
- Payment proof has been submitted

Updates:

- Status → "active"
- PaymentStatus → "paid"
- ApprovedBy → admin ID
- ApprovedAt → current timestamp

#### 4. RejectAffiliateUseCase

Updates:

- Status → "rejected"
- RejectionReason → provided reason

### API Layer

**Controller:** `src/modules/affiliates/affiliate.controller.ts`

**Routes:** `src/modules/affiliates/affiliate.routes.ts`

#### Available Endpoints

| Method | Endpoint                                  | Auth  | Description                        |
| ------ | ----------------------------------------- | ----- | ---------------------------------- |
| `POST` | `/api/affiliates/me/payment-proof-image`  | User  | Upload payment proof (multipart)   |
| `POST` | `/api/affiliates/:id/payment-proof-image` | Admin | Upload payment proof for affiliate |
| `POST` | `/api/affiliates/me/payment-proof`        | User  | Submit payment proof URL           |
| `POST` | `/api/affiliates/:id/approve`             | Admin | Approve affiliate                  |
| `POST` | `/api/affiliates/:id/reject`              | Admin | Reject affiliate                   |
| `GET`  | `/api/affiliates`                         | Admin | List all affiliates (paginated)    |
| `GET`  | `/api/affiliates/:id`                     | Admin | Get affiliate details              |

#### Multer Configuration

- Storage: Memory storage
- File size limit: 5MB
- File type validation: In use case (JPEG, PNG, WEBP, GIF)

### Storage

**Bucket:** `payment_proof` (already exists in Supabase)

**Path structure:** `payment_proof/{affiliate_id}/{timestamp}-{random}.{ext}`

**Access:** Public read (for viewing proofs in admin panel)

### Email Notifications

Automatically sent via `SendTemplateEmail` use case:

- `affiliate_payment_proof_submitted` → Admin notification
- `affiliate_approved` → Affiliate notification
- `affiliate_rejected` → Affiliate notification

## Frontend Implementation (ecommerce) ⚠️ PARTIAL

### Current State

#### Admin Interface

**Working Components:**

- ✅ `AffiliatesTable` - Shows payment proof status check
- ✅ `ApproveConfirmModal` - Mentions payment proof verification
- ✅ `RejectConfirmModal` - Fully functional

**Missing Components:**

- ❌ Payment proof upload API client method
- ❌ Payment proof upload service method
- ❌ Payment proof upload mutation hook
- ❌ Payment proof status column in table
- ❌ View payment proof modal
- ❌ Payment proof preview in approve modal
- ❌ Upload button in table

#### Affiliate Interface

- Not required (admin-only upload)

### Files to Implement

#### 1. API Client

**File:** `src/infrastructure/api/affiliate.api.ts`

Add method:

```typescript
uploadPaymentProofImage: (id: string, formData: FormData) =>
  apiClient.post<{ paymentProofUrl: string; paymentProofRef: string }>(
    `/api/affiliates/${id}/payment-proof-image`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        /* handle progress */
      },
    },
  );
```

#### 2. Service Layer

**File:** `src/features/admin/affiliates/services/affiliate.service.ts`

Add method:

```typescript
uploadPaymentProofImage: async (
  id: string,
  file: File,
): Promise<{
  paymentProofUrl: string;
  paymentProofRef: string;
}> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await affiliatesApi.uploadPaymentProofImage(id, formData);
  return getData<{ paymentProofUrl: string; paymentProofRef: string }>(
    response,
  );
};
```

#### 3. Mutation Hook

**File:** `src/features/admin/affiliates/hooks/useAffiliateMutations.ts`

Add hook:

```typescript
const uploadPaymentProofImage = (id: string) =>
  handleAsync(() =>
    affiliatesService.uploadPaymentProofImage(id, file).then(() => {}),
  );
```

#### 4. ViewPaymentProofModal (NEW)

**File:** `src/features/admin/affiliates/modals/ViewPaymentProofModal.tsx`

Features:

- Display uploaded payment proof image
- Show payment reference number
- Show submission timestamp
- Close/Download buttons

#### 5. Update ApproveConfirmModal

**File:** `src/features/admin/affiliates/modals/ApproveConfirmModal.tsx`

Add:

- Payment proof image preview thumbnail
- Payment reference display
- Submission timestamp

#### 6. Update AffiliatesTable

**File:** `src/features/admin/affiliates/components/AffiliatesTable.tsx`

Add:

- "Payment Proof" column with status badge
- "View Proof" button (when proof exists)
- "Upload Proof" button (for admin)

## Data Flow

### Admin Uploads Payment Proof

```
1. Admin clicks "Upload Proof" in AffiliatesTable
2. File picker opens → admin selects image
3. uploadPaymentProofImage mutation triggered
4. FormData sent to POST /api/affiliates/:id/payment-proof-image
5. Backend validates file type
6. File uploaded to Supabase Storage
7. Affiliate record updated with proof URL
8. Success response returned
9. Table refreshes, shows proof status
```

### Admin Approves Affiliate

```
1. Admin clicks "Approve" in AffiliatesTable
2. ApproveConfirmModal opens with proof preview
3. Admin confirms approval
4. approveAffiliate mutation triggered
5. POST /api/affiliates/:id/approve
6. Backend checks canBeActivated()
7. Affiliate status → "active", paymentStatus → "paid"
8. Email notification sent to affiliate
9. Table refreshes, status updated
```

### Admin Rejects Affiliate

```
1. Admin clicks "Reject" in AffiliatesTable
2. RejectConfirmModal opens with reason textarea
3. Admin enters reason, confirms
4. rejectAffiliate mutation triggered
5. POST /api/affiliates/:id/reject
6. Affiliate status → "rejected"
7. Email notification sent to affiliate
8. Table refreshes, status updated
```

## Testing

### Backend Tests

**Manual Testing with curl:**

```bash
# Upload payment proof
curl -X POST http://localhost:3000/api/affiliates/123/payment-proof-image \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "image=@receipt.jpg" \
  -F "proofRef=TRX-789012"

# Expected response:
{
  "success": true,
  "message": "Payment proof uploaded",
  "data": {
    "paymentProofUrl": "https://...",
    "paymentProofRef": "TRX-789012",
    "paymentProofSubmittedAt": "2026-04-26T14:00:00.000Z"
  }
}

# Approve affiliate
curl -X POST http://localhost:3000/api/affiliates/123/approve \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Reject affiliate
curl -X POST http://localhost:3000/api/affiliates/123/reject \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"reason":"Invalid proof"}'
```

### Frontend Tests

**To be implemented:**

- Upload with valid image → success
- Upload with invalid file type → error
- Upload exceeding 5MB → error
- Approve with proof → success
- Approve without proof → blocked
- Reject with reason → success
- Network error → retry option

## Security Considerations

1. **Authentication:** All endpoints require valid JWT token
2. **Authorization:** Admin endpoints require `role === "admin"`
3. **File Validation:** MIME type checking on upload
4. **File Size:** 5MB limit enforced by multer
5. **Storage:** Public read access only (no write/delete from client)
6. **SQL Injection:** Parameterized queries via Supabase client
7. **XSS:** Sanitized file names, no user HTML input

## Performance Considerations

1. **Image Optimization:** Consider adding thumbnail generation
2. **CDN:** Supabase Storage serves via CDN
3. **Caching:** Public bucket enables browser caching
4. **Pagination:** Admin list paginated (20 per page)
5. **Lazy Loading:** Images loaded on-demand in modals

## Future Enhancements

1. **Image Processing:** Generate thumbnails for faster loading
2. **Multiple Files:** Support multiple proof documents
3. **File Types:** Add PDF support for bank statements
4. **OCR:** Extract reference numbers from images
5. **Audit Log:** Track all admin actions
6. **Bulk Operations:** Approve/reject multiple affiliates
7. **Auto-rejection:** Timeout for unsubmitted proofs
8. **Proof Expiry:** Require updated proofs periodically

## Deployment Checklist

- [x] Backend code deployed
- [x] Database bucket exists (`payment_proof`)
- [ ] Frontend API client updated
- [ ] Frontend service layer updated
- [ ] Frontend mutation hooks added
- [ ] ViewPaymentProofModal created
- [ ] ApproveConfirmModal updated
- [ ] AffiliatesTable updated
- [ ] Integration testing completed
- [ ] End-to-end testing completed
- [ ] Production deployment

## Conclusion

The backend infrastructure for affiliate payment proof and approval is **complete and ready to use**. The frontend needs UI components to expose this functionality to administrators. Once implemented, admins will be able to:

1. View all pending affiliates with payment proof status
2. Upload payment proof on behalf of affiliates
3. View uploaded proof before approval
4. Approve or reject affiliates with proper audit trail
5. Send automated notifications to affiliates

The system is secure, scalable, and follows best practices for file upload and approval workflows.
