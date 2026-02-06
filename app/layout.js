import { Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "DineDiscover | Professional Restaurant Discovery",
  description: "Find the world's best dining experiences with DineDiscover.",
  manifest: "/manifest.webmanifest", // Explicitly link if needed, though Next.js usually handles it. But for PWA plugin compatibility, safe to add. 
  // Actually, app/manifest.js generates /manifest.webmanifest and injects the link automatically. 
  // But let's add apple logic.
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DineDiscover",
  },
};

export const viewport = {
  themeColor: "#FF6B35",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Often desired for app-like feel
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
