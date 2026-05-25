import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Omni Common — Search-Led Growth Marketing",
  description:
    "Search-led growth marketing for e-commerce, SaaS, and marketplace brands doing $5M–$50M. We build the growth model first, then execute.",
  icons: {
    icon: [
      {
        url: "/favicon-color.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="grain">
        <SmoothScroll />
        <CustomCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
