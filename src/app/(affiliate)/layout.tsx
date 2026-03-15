import { AffiliateSidebar } from "@/features/affiliate";

export default function AffiliateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AffiliateSidebar />
      {/* Desktop: offset for fixed sidebar; Mobile: top padding for fixed top bar */}
      <main className="flex-1 md:ml-56 pt-14 md:pt-0 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
