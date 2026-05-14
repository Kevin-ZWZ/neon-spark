import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA — AI-Powered Cyberpunk Design Generator",
  description:
    "Generate future aesthetics. AI-powered cyberpunk design & color palette generator. Create cinematic, neon-infused visuals in seconds.",
  keywords: [
    "AI design",
    "cyberpunk",
    "color palette",
    "generator",
    "futuristic",
    "neon",
  ],
  openGraph: {
    title: "AURA — AI Futuristic Design Generator",
    description:
      "Generate future aesthetics with AI. Cyberpunk design & color palette generator.",
    type: "website",
  },
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
      <body className="min-h-full bg-black text-white">{children}</body>
    </html>
  );
}
