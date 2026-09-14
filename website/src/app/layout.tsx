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

export const metadata: Metadata = {
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
