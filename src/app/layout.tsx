import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { quickSetup } from "../../pre-hydration-cleanup/dist/index.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnchorChain Intelligence - Global Anchor Chain Directory",
  description: "The world's most comprehensive directory of anchor chain manufacturers, certifications, and industry intelligence. Find, compare, and connect with certified suppliers worldwide.",
  keywords: "anchor chain, marine chain, manufacturers, certification, Lloyd's Register, ABS, DNV, maritime, shipping",
  authors: [{ name: "AnchorChain Intelligence" }],
  openGraph: {
    title: "AnchorChain Intelligence - Global Anchor Chain Directory",
    description: "The world's most comprehensive directory of anchor chain manufacturers, certifications, and industry intelligence.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnchorChain Intelligence - Global Anchor Chain Directory",
    description: "The world's most comprehensive directory of anchor chain manufacturers, certifications, and industry intelligence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script {...quickSetup()} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
