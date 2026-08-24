import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ChatGPTPixel } from "@/components/chatgpt-pixel";
import { CustomCursor } from "@/components/custom-cursor";
import { GoogleAnalytics } from "@/components/google-analytics";
import { Navigation } from "@/components/navigation";
import { TrioModalProvider } from "@/components/trio-coming-soon";

const SITE_URL = "https://omnicommon.com";
const OG_IMAGE = `${SITE_URL}/og-image.webp`;
const OG_IMAGE_SQUARE = `${SITE_URL}/og-image-square.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Omni Common — Search-Led Growth Marketing",
    template: "%s | Omni Common",
  },
  description:
    "Search-led growth marketing for e-commerce, SaaS, and marketplace brands doing $5M–$50M. We build the growth model first, then execute.",
  applicationName: "Omni Common",
  keywords: [
    "growth marketing",
    "SEO",
    "PPC",
    "executive growth",
    "e-commerce marketing",
    "SaaS marketing",
    "search-led growth",
  ],
  authors: [{ name: "Omni Common" }],
  creator: "Omni Common",
  publisher: "Omni Common",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Omni Common",
    title: "Omni Common — Search-Led Growth Marketing",
    description:
      "Search-led growth marketing for e-commerce, SaaS, and marketplace brands doing $5M–$50M. We build the growth model first, then execute.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Omni Common — Search-Led Growth Marketing",
      },
      {
        url: OG_IMAGE_SQUARE,
        width: 1200,
        height: 1200,
        alt: "Omni Common — Search-Led Growth Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omni Common — Search-Led Growth Marketing",
    description:
      "Search-led growth marketing for e-commerce, SaaS, and marketplace brands doing $5M–$50M.",
    images: [OG_IMAGE, OG_IMAGE_SQUARE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A2B47" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://identity.netlify.com" />
      </head>
      <body className="grain">
        <TrioModalProvider>
          <CustomCursor />
          <Navigation />
          {children}
        </TrioModalProvider>
        <GoogleAnalytics />
        <ChatGPTPixel />
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          integrity="sha384-dy2tW8xkhLIj8lZR42MCwZhhDb2cCewZiw0uA65CMpdHiJzL+iubx7HzHcCXU2rW"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">{`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", function(user) {
              if (!user) {
                window.netlifyIdentity.on("login", function() {
                  window.location.assign("/admin/");
                });
              }
            });
          }
        `}</Script>
      </body>
    </html>
  );
}
