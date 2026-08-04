import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedBackground } from "@/components/animated-bg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebbHeads | Modern Web Design, Mobile Apps, AI Automation & SEO in Vizag",
  description: "WebbHeads - Modern web design, mobile app development, and AI-powered solutions to grow your business online.",
  keywords: ["WebbHeads", "web design Vizag", "AI automation", "mobile app development", "SEO services Vizag", "Next.js agency"],
  icons: {
    icon: [
      { url: "/icon.svg?v=11", type: "image/svg+xml" },
      { url: "/icon.png?v=11", type: "image/png" }
    ],
    shortcut: ["/icon.svg?v=11"],
    apple: [
      { url: "/icon.svg?v=11", type: "image/svg+xml" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.svg?v=11" type="image/svg+xml" />
        <link rel="shortcut icon" href="/icon.svg?v=11" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg?v=11" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-teal-950 relative">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
