# Generic E-Commerce Update Plan

## Objective

Update all health supplement-specific references (text, labels, descriptions) to generic e-commerce terms to make the platform suitable for all product types.

## Files to Update

### 1. Store Pages

| File                                                                              | Current Text                                                          | Suggested Generic Text             |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------- |
| [`src/features/store/shop/ShopPage.tsx`](src/features/store/shop/ShopPage.tsx:80) | "Premium health supplements crafted from nature's finest ingredients" | "Premium products at great prices" |

### 2. Home Page Sections

| File                                                                                                               | Section      | Update Required                                        |
| ------------------------------------------------------------------------------------------------------------------ | ------------ | ------------------------------------------------------ |
| [`src/features/store/home/components/HeroSection.tsx`](src/features/store/home/components/HeroSection.tsx)         | Hero text    | Replace "Nanuhealthshop" brand with generic store name |
| [`src/features/store/home/components/FeaturesSection.tsx`](src/features/store/home/components/FeaturesSection.tsx) | Benefits     | Change "Stronger Immunity" to generic benefit          |
| [`src/features/store/home/components/BenefitsSection.tsx`](src/features/store/home/components/BenefitsSection.tsx) | Tagline      | Change "healthier, more vibrant life" to generic       |
| [`src/features/store/home/components/TrustSection.tsx`](src/features/store/home/components/TrustSection.tsx:77)    | Trust badges | Change "Clinically Studied" to generic                 |
| [`src/features/store/home/components/UgSection.tsx`](src/features/store/home/components/UgSection.tsx:58)          | Testimonials | Change "health transformations" to "experiences"       |

### 3. Shop Page Components

| File                                                                                                                       | Update Required                   |
| -------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| [`src/features/store/shop/components/FaqSection.tsx`](src/features/store/shop/components/FaqSection.tsx)                   | Update FAQ to be product-agnostic |
| [`src/features/store/shop/components/YoutubeTestimonials.tsx`](src/features/store/shop/components/YoutubeTestimonials.tsx) | Update testimonials text          |

### 4. Constants

| File                                                                         | Update Required                                  |
| ---------------------------------------------------------------------------- | ------------------------------------------------ |
| [`src/shared/utils/home.constants.tsx`](src/shared/utils/home.constants.tsx) | Update product descriptions, testimonials, perks |

## Implementation Approach

1. **Phase 1:** Update main store text (Hero, Shop page header)
2. **Phase 2:** Update Features/Benefits sections
3. **Phase 3:** Update FAQ and Testimonials
4. **Phase 4:** Update product constants

## Generic Alternatives

| Original              | Generic Alternative       |
| --------------------- | ------------------------- |
| "health supplements"  | "products"                |
| "natural ingredients" | "quality items"           |
| "healthier life"      | "better value"            |
| "immune system"       | "satisfaction"            |
| "wellness"            | "shopping"                |
| "Nanuhealthshop"      | "[Store Name]" or dynamic |
| "Filipino"            | "customers"               |
| "doctor-formulated"   | "quality assured"         |
| "FDA-approved"        | "trusted"                 |

## Notes

- Some sections like BenefitsSection and TrustSection may need complete redesign for true generic use
- Consider making brand name configurable via environment variables
- Testimonials section may need to remain as user-generated content (editable by admin)
