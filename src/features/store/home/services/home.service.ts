import {
  HOME_PRODUCTS,
  HOME_TESTIMONIALS,
  HOME_STATS,
  HOME_BENEFITS,
} from "@/shared/utils/home.constants";
import type {
  HomeProduct,
  HomeTestimonial,
  HomeStat,
  HomeBenefit,
} from "@/types/home.types";

// Returns static data for now.
// When the API is ready, swap each method body with the
// matching homeApi call — return shapes stay the same.

export const homeService = {
  getProducts(): HomeProduct[] {
    return HOME_PRODUCTS;
  },

  getTestimonials(): HomeTestimonial[] {
    return HOME_TESTIMONIALS;
  },

  getStats(): HomeStat[] {
    return HOME_STATS;
  },

  getBenefits(): HomeBenefit[] {
    return HOME_BENEFITS;
  },
};
