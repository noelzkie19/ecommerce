import { redirect } from "next/navigation";

interface PaymentCallbackPageProps {
  searchParams: Promise<{ intent_id: string; user_id?: string }>;
}

/**
 * Redirects /affiliate/payment/callback to /affiliate/registration/callback
 * This is needed because the backend uses /affiliate/payment/callback as the return URL
 */
export default async function PaymentCallbackPage({
  searchParams,
}: PaymentCallbackPageProps) {
  const { intent_id, user_id } = await searchParams;

  const params = new URLSearchParams();
  params.set("intent_id", intent_id);
  if (user_id) params.set("user_id", user_id);

  redirect(`/affiliate/registration/callback?${params.toString()}`);
}
