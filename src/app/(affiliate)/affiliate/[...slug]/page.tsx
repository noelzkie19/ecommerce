import { redirect } from "next/navigation";

export default function AffiliateCatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  // Catch any undefined routes like /affiliate/undefined or invalid paths
  // Redirect to the main affiliate dashboard
  // The middleware will handle authentication check
  // Specific routes like /dashboard, /profile, etc. take precedence over this catch-all
  redirect("/affiliate/dashboard");
}
