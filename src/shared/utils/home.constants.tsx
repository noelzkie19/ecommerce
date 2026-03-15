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
  { href: "/shop", label: "Shop" },
  { href: "/testimonials", label: "Testimonials" },
];

export const HOME_STATS: HomeStat[] = [
  { value: "20+", label: "Products", icon: <Sparkles size={20} /> },
  { value: "5+", label: "Years in Wellness", icon: <TrendingUp size={20} /> },
];

export const HOME_BENEFITS: HomeBenefit[] = [
  {
    icon: <Shield size={24} />,
    title: "Immune Support",
    description:
      "Strengthen your body's natural defenses with powerful antiviral compounds found in local Filipino herbs.",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    icon: <Zap size={24} />,
    title: "Natural Energy",
    description:
      "Boost vitality without caffeine crashes using nutrient-dense superfoods harvested from Philippine soil.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    icon: <Leaf size={24} />,
    title: "100% Natural",
    description:
      "Pure ingredients sourced from certified organic local Philippine farms with zero synthetic additives.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    icon: <Heart size={24} />,
    title: "Heart Health",
    description:
      "Support cardiovascular wellness with essential nutrients, omega acids, and powerful antioxidants.",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Cellular Repair",
    description:
      "Promote cellular regeneration and deep nourishment at the molecular level for lasting vitality.",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    icon: <FlaskConical size={24} />,
    title: "Lab Tested",
    description:
      "Every single batch is rigorously third-party tested for purity, safety, and verified potency.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
];

export const HOME_PRODUCTS: HomeProduct[] = [
  {
    id: "1",
    name: "SPIRULINA FILIPINA 200 Tablets",
    description:
      "Premium Filipino spirulina packed with nutrients for complete daily nutrition.",
    price: 1218,
    rating: 4.9,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=500&fit=crop",
  },
  {
    id: "2",
    name: "VIRAMED",
    description:
      "Essential oils fuel cellular repair with antiviral properties from natural herbs.",
    price: 975,
    rating: 4.9,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1612363148791-6e3e5e993d8a?w=600&h=500&fit=crop",
  },
  {
    id: "3",
    name: "ULTIMA 17",
    description:
      "Premium wellness supplement with 17 powerful natural ingredients for total body support.",
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
    product: "KAFÉ LATTE",
    message:
      "The Kafé Latte is my morning ritual now. It tastes great and I love knowing I'm starting my day with health benefits instead of just caffeine.",
    rating: 5,
  },
  {
    id: "2",
    name: "Jose Reyes",
    location: "Cebu",
    product: "SPIRULINA FILIPINA",
    message:
      "I've been taking Spirulina Filipina for 3 months and I feel so much more energized throughout the day. Highly recommend to anyone looking for a natural energy boost!",
    rating: 5,
  },
  {
    id: "3",
    name: "Ana Dela Cruz",
    location: "Davao",
    product: "ULTIMA 17",
    message:
      "Ultima 17 is absolutely worth every peso. My doctor even noticed the improvement in my bloodwork. This product genuinely delivers on its promises.",
    rating: 5,
  },
];

export const HERO_PERKS = [
  "FDA certified natural ingredients",
  "Locally sourced from Philippine farms",
  "Free shipping on orders over ₱1,500",
] as const;

export const HERO_AVATARS: HomeAvatar[] = [
  { color: "bg-purple-400", label: "R" },
  { color: "bg-violet-400", label: "J" },
  { color: "bg-indigo-400", label: "A" },
];

export const FOOTER_QUICK_LINKS = ["Home", "Shop", "Testimonials"] as const;
export const FOOTER_CATEGORIES = [
  "Supplements",
  "Superfoods",
  "Beverages",
  "Wellness",
] as const;

export const FOOTER_CONTACT_ITEMS: HomeContactItem[] = [
  { icon: <Mail size={15} />, text: "info@triadmarket.com" },
  { icon: <Phone size={15} />, text: "+63 912 345 6789" },
  { icon: <MapPin size={15} />, text: "Manila, Philippines" },
];
