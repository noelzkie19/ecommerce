/**
 * Meta Pixel (Facebook Pixel) tracking utility
 *
 * This module provides functions to track events using Meta's Facebook Pixel.
 * Each affiliate can have their own Pixel ID, allowing per-user tracking.
 *
 * Usage:
 * - Initialize with the affiliate's pixelId
 * - Track page views when visitors arrive via affiliate links
 * - Track purchases when conversions happen
 */

// Type for Meta Pixel event data
export interface MetaPixelEventData {
  value?: number;
  currency?: string;
  content_ids?: string[];
  content_type?: string;
  contents?: Array<{
    id: string;
    quantity: number;
    item_price?: number;
  }>;
  num_items?: number;
  custom_data?: Record<string, unknown>;
}

// Extended window type for Meta Pixel
interface MetaWindow extends Window {
  fbq?: (cmd: string, event: string, data?: MetaPixelEventData) => void;
}

// Store for the current pixel ID and referral info
let currentPixelId: string | null = null;
let currentReferralCode: string | null = null;

/**
 * Initialize the Meta Pixel with an affiliate's Pixel ID
 * @param pixelId - The Meta Pixel ID (e.g., "1234567890")
 * @param referralCode - Optional referral code for attribution
 */
export function initMetaPixel(pixelId: string, referralCode?: string): void {
  currentPixelId = pixelId;
  currentReferralCode = referralCode || null;

  // Initialize the Meta Pixel script
  if (globalThis.window != null) {
    initPixelScript(pixelId);
  }
}

/**
 * Get the current pixel ID
 */
export function getPixelId(): string | null {
  return currentPixelId;
}

/**
 * Get the current referral code
 */
export function getReferralCode(): string | null {
  return currentReferralCode;
}

/**
 * Clear the current pixel tracking data
 */
export function clearMetaPixel(): void {
  currentPixelId = null;
  currentReferralCode = null;
}

/**
 * Inject the Meta Pixel script into the page
 */
function initPixelScript(pixelId: string): void {
  // Check if script already exists
  if (globalThis.document == null) {
    return;
  }
  if (globalThis.document.getElementById("meta-pixel-script")) {
    return;
  }

  // Create and append the pixel script
  const script = document.createElement("script");
  script.id = "meta-pixel-script";
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
  `;
  document.head.appendChild(script);

  // Add noscript fallback
  const noscript = document.createElement("noscript");
  noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>`;
  document.head.appendChild(noscript);
}

/**
 * Track a standard Meta Pixel event
 * @param eventName - The name of the event (e.g., "PageView", "Purchase")
 * @param data - Optional event data
 */
export function trackMetaPixelEvent(
  eventName: string,
  data?: MetaPixelEventData,
): void {
  if (!currentPixelId) {
    console.warn("[MetaPixel] No pixel ID initialized");
    return;
  }

  if (globalThis.document == null) {
    return;
  }

  // Ensure pixel is initialized
  const metaWin = globalThis as unknown as MetaWindow;
  if (!metaWin.fbq) {
    initPixelScript(currentPixelId);
  }

  const eventData: MetaPixelEventData = {
    ...data,
    // Add referral data to custom_data if present
    ...(currentReferralCode && {
      custom_data: {
        ...data?.custom_data,
        referral_code: currentReferralCode,
      },
    }),
  };

  // Track the event
  if (metaWin.fbq) {
    metaWin.fbq("track", eventName, eventData);
  }
}

/**
 * Track a PageView event
 * Call this when a visitor arrives via an affiliate link
 */
export function trackPageView(): void {
  trackMetaPixelEvent("PageView");
}

/**
 * Track a Purchase event
 * Call this when a customer completes a purchase
 * @param value - The total value of the purchase
 * @param currency - The currency code (default: "PHP")
 * @param items - Array of items purchased
 */
export function trackPurchase(
  value: number,
  items: Array<{ id: string; quantity: number; price: number }>,
  currency: string = "PHP",
): void {
  trackMetaPixelEvent("Purchase", {
    value,
    currency,
    contents: items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      item_price: item.price,
    })),
    num_items: items.reduce((sum, item) => sum + item.quantity, 0),
  });
}

/**
 * Track an AddToCart event
 * @param value - Value of the items added
 * @param items - Items added to cart
 * @param currency - Currency code
 */
export function trackAddToCart(
  value: number,
  items: Array<{ id: string; quantity: number; price: number }>,
  currency: string = "PHP",
): void {
  trackMetaPixelEvent("AddToCart", {
    value,
    currency,
    contents: items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      item_price: item.price,
    })),
    num_items: items.reduce((sum, item) => sum + item.quantity, 0),
  });
}

/**
 * Track an InitiateCheckout event (when user starts checkout)
 * @param value - Total value of the cart
 * @param items - Items in the cart
 * @param currency - Currency code
 */
export function trackInitiateCheckout(
  value: number,
  items: Array<{ id: string; quantity: number; price: number }>,
  currency: string = "PHP",
): void {
  trackMetaPixelEvent("InitiateCheckout", {
    value,
    currency,
    contents: items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      item_price: item.price,
    })),
    num_items: items.reduce((sum, item) => sum + item.quantity, 0),
  });
}

/**
 * Track a ViewContent event (when user views a product)
 * @param productId - ID of the product viewed
 * @param value - Product value
 * @param currency - Currency code
 */
export function trackViewContent(
  productId: string,
  value: number,
  currency: string = "PHP",
): void {
  trackMetaPixelEvent("ViewContent", {
    value,
    currency,
    content_ids: [productId],
    content_type: "product",
  });
}

/**
 * Track a Lead event (when user signs up or expresses interest)
 */
export function trackLead(): void {
  trackMetaPixelEvent("Lead");
}

/**
 * Track a CompleteRegistration event (when user completes registration)
 * @param value - Optional registration value
 * @param currency - Currency code
 */
export function trackCompleteRegistration(
  value?: number,
  currency: string = "PHP",
): void {
  trackMetaPixelEvent("CompleteRegistration", {
    ...(value && { value, currency }),
  });
}
