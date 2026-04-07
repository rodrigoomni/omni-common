import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Omni Common — Executive Growth Marketing Agency",
  description:
    "The first ever executive growth marketing agency built for businesses ready to scale. We don't just run campaigns — we architect growth systems.",
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
