import { redirect } from "next/navigation";

export default async function AffiliateRegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{
    ref?: string;
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  const ref = params.ref;

  // Redirect to onboarding page with the ref parameter preserved
  if (ref) {
    redirect(`/affiliate/onboarding?ref=${encodeURIComponent(ref)}`);
  }

  redirect("/affiliate/onboarding");
}
