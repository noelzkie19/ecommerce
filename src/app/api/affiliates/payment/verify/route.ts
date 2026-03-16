import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/affiliates/payment/verify
 *
 * PayMongo redirects the user's browser to this URL after a GCash/Maya payment.
 * Query params sent by PayMongo (and our backend):
 *   - intentId          — the payment intent ID we passed when creating the intent
 *   - payment_intent_id — same value, sent by PayMongo's redirect
 *   - userId            — the affiliate user ID we appended to the callback URL
 *
 * This handler simply redirects the browser to the real callback page that
 * handles payment verification UI.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Accept either param name for the intent ID
  const intentId =
    searchParams.get("intentId") || searchParams.get("payment_intent_id") || "";
  const userId = searchParams.get("userId") || "";

  const params = new URLSearchParams();
  if (intentId) params.set("intent_id", intentId);
  if (userId) params.set("user_id", userId);

  const redirectUrl = `/affiliate/registration/callback?${params.toString()}`;

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
