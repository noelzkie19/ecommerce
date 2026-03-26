import { redirect } from "next/navigation";

interface StoreRedirectPageProps {
  params: Promise<{ storeId: string }>;
}

/**
 * Public affiliate store redirect page.
 *
 * URL: /s/:storeId
 *
 * When a visitor clicks an affiliate's store link (e.g. yoursite.com/s/STOREID),
 * this page redirects them to the ecommerce store homepage with the storeId
 * as a query param. The AffiliateTracking component on the store layout will
 * then look up the affiliate's pixelId from the storeId and initialize Meta Pixel.
 *
 * No authentication is required — this is a fully public route.
 */
export default async function StoreRedirectPage({
  params,
}: StoreRedirectPageProps) {
  const { storeId } = await params;

  if (!storeId) {
    redirect("/");
  }

  // Redirect to the store shop page with the storeId as ref param
  // The AffiliateTracking component will resolve the pixelId from the storeId.
  redirect(`/shop?ref=store_${encodeURIComponent(storeId)}`);
}
