import { Footer } from "@/features/store/home/components/Footer";
import { Navbar } from "@/shared/components/layout/Navbar";
import { AffiliateTracking } from "@/features/store/affiliate/AffiliateTracking";
import { BaseMetaPixel } from "@/features/store/affiliate/BaseMetaPixel";

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BaseMetaPixel />
      <AffiliateTracking />
      <Navbar />
      <main className="min-h-screen w-full flex flex-col items-center">
        <div className="w-full">{children}</div>
      </main>
      <Footer />
    </>
  );
}
