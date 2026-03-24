import { Footer } from "@/features/store/home/components/Footer";
import { Navbar } from "@/shared/components/layout/Navbar";

export default function AffiliatePublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full flex flex-col items-center pt-14">
        <div className="w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
