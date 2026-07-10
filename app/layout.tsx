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
  title: "Designing the AI-Native Organisation | Cha Lee",
  description:
    "A premium keynote-style presentation for a Head of Design interview at Macquarie Bank.",
  openGraph: {
    title: "Designing the AI-Native Organisation",
    description:
      "Lessons from building an AI company while leading enterprise design teams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Designing the AI-Native Organisation",
    description:
      "Lessons from building an AI company while leading enterprise design teams.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
