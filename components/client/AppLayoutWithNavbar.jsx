"use client"; // Must be a client component to check pathname

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayoutWithNavbar({ children }) {
  const pathname = usePathname();
  
  // Define paths where Navbar should be hidden
  const isCmsPage = pathname.includes("/admin") || pathname.includes("/restaurant");
  return (
    <>
      {!isCmsPage && <Navbar />}
      {children}
      {!isCmsPage && <Footer />}
    </>
  );
}