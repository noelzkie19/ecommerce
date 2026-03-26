# Twcako.com Layout Replication Plan

## Dark + Orange Theme

---

## Observed Layout from twcako.com

### Page Flow (Top to Bottom)

```
1. Sticky Navbar (dark navy)
2. Full-screen Hero (dark bg + photo overlay)
3. Services Section (white bg, 3 icon cards)
4. Why Choose Us (light gray, 2-col + center image)
5. Pricing Plans (white bg, 2 pricing cards)
6. Stats Section (dark bg + photo overlay, 3 stats)
7. Testimonials (light gray, carousel)
8. About Section (white bg, text + logos)
9. Meet the Founders (white bg, 3 photo cards)
10. CTA Section (dark bg + photo overlay)
11. Contact Form + Footer (light gray + dark footer)
```

---

## Our Implementation (Dark + Orange Theme)

### Color Mapping

| twcako.com (Blue)     | Our Version (Orange)   |
| --------------------- | ---------------------- |
| `#1a237e` (dark navy) | `#030712` (gray-950)   |
| `#1565c0` (blue)      | `#f97316` (orange-500) |
| Blue text accents     | Orange text accents    |
| Blue buttons          | Orange buttons         |
| Blue icon outlines    | Orange icon outlines   |

---

## Section-by-Section Implementation

### 1. Sticky Navbar

**twcako.com pattern:**

- Fixed top, dark navy background
- Logo left, hamburger menu right
- Scrolls with page but stays fixed

**Our implementation:**

```tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-white/10">
  <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
    <Logo />
    <HamburgerMenu />
  </div>
</nav>
```

**Animations:** Slide down on load, background opacity on scroll

---

### 2. Full-Screen Hero Section

**twcako.com pattern:**

- Full viewport height
- Dark background with real photo overlay (crowd/event)
- Massive bold white headline (uppercase, extra-bold)
- Colored subtitle line (blue → orange for us)
- Subtitle text
- Single rounded CTA button

**Our implementation:**

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background image with dark overlay */}
  <div className="absolute inset-0">
    <img src="/images/background.jpeg" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gray-950/75" />
  </div>

  {/* Constellation/particle decoration */}
  <div className="absolute inset-0 pointer-events-none">
    {/* SVG constellation lines */}
  </div>

  <div className="relative text-center px-6 max-w-4xl mx-auto">
    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase leading-none mb-4">
      EQUIPPING PEOPLE
    </h1>
    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-orange-500 uppercase mb-6">
      TO LEAD BETTER LIVES
    </h2>
    <p className="text-gray-300 text-lg sm:text-xl mb-10">
      Start your e-Commerce journey with us!
    </p>
    <Link
      href="/register"
      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full transition-all shadow-xl shadow-orange-500/30 hover:-translate-y-1"
    >
      GET STARTED
    </Link>
  </div>
</section>
```

**Animations:**

- Headline: fade-in-up with delay
- Subtitle: fade-in-up with 200ms delay
- CTA: fade-in-up with 400ms delay
- Background: subtle parallax on scroll

---

### 3. Services Section

**twcako.com pattern:**

- White background
- Centered section title (blue) + orange subtitle
- 3 bordered cards with icon + title + description
- Cards have subtle shadow and hover effect

**Our implementation:**

```tsx
<section className="py-20 sm:py-28 bg-white">
  <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">
        Services We Offer
      </h2>
      <p className="text-orange-500 font-semibold text-lg">
        Your Partner in Scaling e-Commerce Success
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {SERVICES.map((service) => (
        <div className="border border-gray-200 rounded-2xl p-8 text-center hover:shadow-xl hover:border-orange-200 hover:-translate-y-1 transition-all duration-300">
          <div className="w-20 h-20 mx-auto mb-6 text-orange-500">
            <service.icon />
          </div>
          <h3 className="text-xl font-bold text-orange-500 mb-3">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm">{service.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Animations:** Cards stagger-fade-in on scroll

---

### 4. Why Choose Us Section

**twcako.com pattern:**

- Light gray background
- Centered title + subtitle
- 2-column layout: left text items, center image, right text items
- Each item has icon + title + description

**Our implementation:**

```tsx
<section className="py-20 sm:py-28 bg-gray-50">
  <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl font-black text-orange-500 mb-3">
        Why Choose Us
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Your trusted partner for tailored solutions to fuel your business
        growth.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      {/* Left column */}
      <div className="space-y-8">
        {LEFT_FEATURES.map((f) => (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 text-orange-500 flex-shrink-0">
              {f.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Center image */}
      <div className="flex justify-center">
        <img src="/images/system.png" className="max-w-sm w-full" />
      </div>

      {/* Right column */}
      <div className="space-y-8">
        {RIGHT_FEATURES.map((f) => (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 text-orange-500 flex-shrink-0">
              {f.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

---

### 5. Pricing Plans Section

**twcako.com pattern:**

- White background
- Centered title + subtitle
- 2 pricing cards side by side
- Each card: plan name, price, feature list with checkmarks, CTA button

**Our implementation:**

```tsx
<section className="py-20 sm:py-28 bg-white">
  <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl font-black text-orange-500 mb-3">
        Pricing Plans
      </h2>
      <p className="text-gray-600">
        Choose a Plan That Suits Your Business Needs
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {PLANS.map((plan) => (
        <div className="border border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:border-orange-200 transition-all">
          <h3 className="text-2xl font-black text-orange-500 mb-2">
            {plan.name}
          </h3>
          <div className="text-5xl font-black text-gray-900 mb-6">
            ₱{plan.price}
          </div>
          <ul className="space-y-3 mb-8">
            {plan.features.map((f) => (
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="text-orange-500 w-4 h-4" />
                {f}
              </li>
            ))}
          </ul>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition-all">
            Subscribe Now
          </button>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 6. Stats Section (Dark Background)

**twcako.com pattern:**

- Full-width dark background with photo overlay
- 3-column stats with icon + number + label + description
- Numbers in orange/blue accent color

**Our implementation:**

```tsx
<section className="relative py-20 sm:py-28 overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0">
    <img src="/images/background.jpeg" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gray-950/85" />
  </div>

  <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
      {STATS.map((stat) => (
        <div>
          <div className="w-20 h-20 mx-auto mb-4 text-orange-500 opacity-80">
            <stat.icon />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-orange-500 mb-2">
            {stat.value}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
          <p className="text-gray-400 text-sm">{stat.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 7. Testimonials Section

**twcako.com pattern:**

- Light gray background
- Centered title + orange subtitle
- Horizontal scrolling carousel
- Each card: avatar + name + role + star rating + quote with quotation marks

**Our implementation:**

```tsx
<section className="py-20 sm:py-28 bg-gray-50">
  <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl font-black text-orange-500 mb-3">
        Testimonials
      </h2>
      <p className="text-gray-600">What Our Clients Say About Us</p>
    </div>

    {/* Carousel */}
    <div className="relative overflow-hidden">
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {TESTIMONIALS.map((t) => (
          <div className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 snap-start">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={t.avatar}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
                <StarRating rating={5} />
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              <span className="text-orange-500 text-2xl font-black">"</span>
              {t.quote}
              <span className="text-orange-500 text-2xl font-black">"</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

---

### 8. CTA Section (Dark Background)

**twcako.com pattern:**

- Full-width dark background with photo overlay
- Centered bold white headline
- Subtitle text
- No button (just text)

**Our implementation:**

```tsx
<section className="relative py-20 sm:py-28 overflow-hidden">
  <div className="absolute inset-0">
    <img src="/images/background.jpeg" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gray-950/80" />
  </div>

  <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
    <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 max-w-3xl mx-auto">
      Ready to take your e-commerce business to the next level?
    </h2>
    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
      Let us know how we can support you in building a successful business.
    </p>
    <Link
      href="/register"
      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full transition-all shadow-xl shadow-orange-500/30 hover:-translate-y-1"
    >
      GET STARTED
    </Link>
  </div>
</section>
```

---

### 9. Footer (Dark Background)

**twcako.com pattern:**

- Dark background
- 4-column layout: Logo+description, Services, Information, Contacts
- Social media icons
- Copyright bar at bottom

**Our implementation:**

```tsx
<footer className="bg-gray-950 text-gray-400">
  <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {/* Brand */}
      <div>
        <Logo />
        <p className="text-sm leading-relaxed mt-4 mb-6">Description text</p>
        <SocialIcons />
      </div>

      {/* Services */}
      <div>
        <h4 className="text-white font-bold mb-4">Services</h4>
        <ul className="space-y-2">...</ul>
      </div>

      {/* Information */}
      <div>
        <h4 className="text-white font-bold mb-4">Information</h4>
        <ul className="space-y-2">...</ul>
      </div>

      {/* Contacts */}
      <div>
        <h4 className="text-white font-bold mb-4">Contacts</h4>
        <ul className="space-y-3">
          <li className="flex gap-2">
            <MapPin /> Address
          </li>
          <li className="flex gap-2">
            <Phone /> Phone
          </li>
          <li className="flex gap-2">
            <Mail /> Email
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">
      © 2025 All rights reserved.
    </div>
  </div>
</footer>
```

---

## Animation Strategy

### Scroll-triggered Animations

Using Intersection Observer API:

```tsx
// useScrollAnimation hook
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};
```

### Animation Classes

```css
/* Fade in up */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays */
.delay-100 {
  transition-delay: 100ms;
}
.delay-200 {
  transition-delay: 200ms;
}
.delay-300 {
  transition-delay: 300ms;
}
```

---

## Files to Create/Modify

### New Files

- `src/features/store/home/hooks/useScrollAnimation.ts` - Intersection Observer hook
- `src/features/store/home/components/Navbar.tsx` - Sticky dark navbar with hamburger

### Modified Files

- `src/features/store/home/HomePage.tsx` - Complete redesign
- `src/features/store/home/components/HeroSection.tsx` - Full-screen hero
- `src/features/store/home/components/Footer.tsx` - 4-column dark footer
- `src/app/globals.css` - Add scroll animation CSS classes
- `src/app/(store)/layout.tsx` - Add navbar

---

## Responsive Breakpoints

| Breakpoint          | Layout                     |
| ------------------- | -------------------------- |
| Mobile (< 640px)    | Single column, stacked     |
| Tablet (640-1024px) | 2 columns where applicable |
| Desktop (> 1024px)  | Full layout as designed    |

---

## Typography

Matching twcako.com font style:

- **Headings**: Extra-bold/Black weight, uppercase for hero
- **Section titles**: Bold, mixed case
- **Body**: Regular weight, gray color
- **Accents**: Orange color for highlights

Font: Inter (already configured in globals.css)
