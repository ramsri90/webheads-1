import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedBackground } from "@/components/animated-bg";
import { SmoothScrollProvider } from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webbheads.com"),
  title: "WebbHeads | Best Digital Agency in Vizag",
  description: "WebbHeads is the top digital agency in Vizag. We build high-converting Next.js websites, mobile apps, and AI automations starting at ₹18,000.",
  keywords: [
    "WebbHeads",
    "best digital agency in vizag",
    "web design agency vizag",
    "web development company visakhapatnam",
    "best web developers in vizag",
    "mobile app development vizag",
    "ai automation agency vizag",
    "digital marketing company vizag",
    "seo services in vizag",
    "next.js web developers vizag"
  ],
  authors: [{ name: "DJ Kushal & Vivek Ram Sri", url: "https://webbheads.com" }],
  creator: "WebbHeads Digital Agency",
  publisher: "WebbHeads",
  alternates: {
    canonical: "https://webbheads.com",
  },
  openGraph: {
    title: "WebbHeads | Best Digital Agency in Vizag",
    description: "WebbHeads is the top digital agency in Vizag. We build high-converting Next.js websites, mobile apps, and AI automations starting at ₹18,000.",
    url: "https://webbheads.com",
    siteName: "WebbHeads",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "WebbHeads Best Digital Agency in Vizag",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebbHeads | Best Digital Agency in Vizag",
    description: "WebbHeads is the top digital agency in Vizag. We build high-converting Next.js websites, mobile apps, and AI automations starting at ₹18,000.",
    creator: "@webbheads",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-AP",
    "geo.placename": "Visakhapatnam",
    "geo.position": "17.6868;83.2185",
    ICBM: "17.6868, 83.2185",
  },
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
      <body className="min-h-full flex flex-col bg-white text-teal-950 relative overflow-x-hidden">
        <SmoothScrollProvider>
          <AnimatedBackground />
          <div className="relative z-10 flex flex-col min-h-full">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
