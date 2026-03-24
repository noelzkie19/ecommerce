import { AdminSidebar } from "@/shared/components/layout/AdminSidebar";
import { AdminTopBar } from "@/shared/components/layout/AdminTopBar";

export default function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      {/* Desktop: offset for fixed sidebar; Mobile: top padding for fixed top bar */}
      <div className="flex-1 md:ml-52 pt-14 md:pt-0">
        <AdminTopBar />
        <main className="overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
