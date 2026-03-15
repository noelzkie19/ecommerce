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
      <div className="flex-1 ml-52">
        <AdminTopBar />
        {children}
      </div>
    </div>
  );
}
