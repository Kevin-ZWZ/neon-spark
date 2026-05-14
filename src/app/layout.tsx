import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import Provider from "@/components/SessionProvider";
import { SoundProvider } from "@/components/SoundProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-cyber-heading",
  subsets: ["latin"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-cyber-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEON SPARK — AI Cyberpunk Color Palette Generator",
  description:
    "Generate cyberpunk color palettes with AI. NEON SPARK creates cinematic, neon-infused color schemes in seconds.",
  keywords: [
    "AI design",
    "cyberpunk",
    "color palette",
    "generator",
    "futuristic",
    "neon",
  ],
  openGraph: {
    title: "NEON SPARK — AI Cyberpunk Palette Generator",
    description:
      "Generate cyberpunk color palettes with AI. Neon-infused color schemes in seconds.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        <SoundProvider>
          <Provider>{children}</Provider>
        </SoundProvider>
      </body>
    </html>
  );
}
