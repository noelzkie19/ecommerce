import {
  Heart,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Leaf,
  FlaskConical,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type {
  HomeStat,
  HomeBenefit,
  HomeProduct,
  HomeTestimonial,
  HomeNavLink,
  HomeContactItem,
  HomeAvatar,
} from "../../types/home.types";

export const HOME_NAV_LINKS: HomeNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
];

export const HOME_STATS: HomeStat[] = [
  { value: "100+", label: "Products", icon: <Sparkles size={20} /> },
  { value: "5+", label: "Years Experience", icon: <TrendingUp size={20} /> },
];

export const HOME_BENEFITS: HomeBenefit[] = [
  {
    icon: <Shield size={24} />,
    title: "Quality Products",
    description:
      "Carefully selected products that meet our high standards for quality and value.",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: <Zap size={24} />,
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping to get your products to you as soon as possible.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    icon: <Leaf size={24} />,
    title: "Great Value",
    description:
      "Competitive pricing on quality products to give you the best value for your money.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    icon: <Heart size={24} />,
    title: "Customer Support",
    description:
      "Dedicated support team ready to help you with any questions or concerns.",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Secure Shopping",
    description:
      "Safe and secure payment options including Maya, COD, and bank transfers.",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    icon: <FlaskConical size={24} />,
    title: "Easy Returns",
    description:
      "Hassle-free returns within 30 days if you're not completely satisfied.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
];

export const HOME_PRODUCTS: HomeProduct[] = [
  {
    id: "1",
    name: "Premium Product 1",
    description:
      "High-quality product with excellent features and great value.",
    price: 1218,
    rating: 4.9,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=500&fit=crop",
  },
  {
    id: "2",
    name: "Popular Item",
    description: "Customer favorite product with outstanding reviews.",
    price: 975,
    rating: 4.9,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1612363148791-6e3e5e993d8a?w=600&h=500&fit=crop",
  },
  {
    id: "3",
    name: "Top Rated Product",
    description:
      "Premium item with exceptional quality and customer satisfaction.",
    price: 3750,
    rating: 4.9,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=500&fit=crop",
  },
];

export const HOME_TESTIMONIALS: HomeTestimonial[] = [
  {
    id: "1",
    name: "Roberto Bautista",
    location: "Quezon City",
    product: "Product A",
    message:
      "Great shopping experience! The product exceeded my expectations and arrived quickly. Highly recommend!",
    rating: 5,
  },
  {
    id: "2",
    name: "Jose Reyes",
    location: "Cebu",
    product: "Product B",
    message:
      "I'm very satisfied with my purchase. The quality is excellent and the customer service was outstanding!",
    rating: 5,
  },
  {
    id: "3",
    name: "Ana Dela Cruz",
    location: "Davao",
    product: "Product C",
    message:
      "This is my go-to store now. Great products, fast delivery, and excellent value for money. Very happy!",
    rating: 5,
  },
];

export const HERO_PERKS = [
  "Quality guaranteed",
  "Fast delivery nationwide",
  "Secure payment options",
] as const;

export const HERO_AVATARS: HomeAvatar[] = [
  { color: "bg-orange-400", label: "R" },
  { color: "bg-amber-400", label: "J" },
  { color: "bg-orange-500", label: "A" },
];

export const FOOTER_QUICK_LINKS = [
  "Home",
  "Shop",
  "Orders",
  "Testimonials",
] as const;
export const FOOTER_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
] as const;

export const FOOTER_CONTACT_ITEMS: HomeContactItem[] = [
  { icon: <Mail size={15} />, text: "support@triad365.com" },
  { icon: <Phone size={15} />, text: "0920 329 5363" },
  { icon: <MapPin size={15} />, text: "Manila, Philippines" },
];
