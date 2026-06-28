"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Preloader from "./Preloader";
import SmoothScroll from "@/components/providers/SmoothScroll";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
