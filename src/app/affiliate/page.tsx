import { redirect } from "next/navigation";

export default function AffiliateRootPage() {
  // Redirect to the main affiliate dashboard
  // The middleware will handle authentication check
  redirect("/affiliate/dashboard");
}
