import type { Metadata } from "next";
import { Manrope, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { SessionProvider } from "@/providers/SessionProvider";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

// Base for absolute URLs in link previews (Open Graph / Twitter images).
// Set NEXT_PUBLIC_SITE_URL to the deployed address of the website.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixels.sohailcodes.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pixels — Wallpapers tailored for you",
  description:
    "Endless HD wallpapers picked to your taste. Search, like, and download in one tap — free, no account required.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Pixels — Wallpapers tailored for you",
    description:
      "Endless HD wallpapers picked to your taste. Search, like, and download in one tap — free, no account required.",
    images: ["/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${display.variable} ${mono.variable} font-sans`}
      >
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
