import type { Metadata } from "next";
import PeakSeasonView from "./peak-season-view";

const TITLE = "Peak Season Takeover — 90-Day Paid Search Account Takeover";
const DESCRIPTION =
  "Hand us the keys in August. Walk into Black Friday with a paid search account that has already found its rhythm. 90-day account takeover from $990.";
const PATH = "/ppc-black-friday-peak-season-takeover/";

// Next replaces (not merges) openGraph/twitter from the root layout, so the
// image has to be restated here or this page ships without a share preview.
const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Omni Common — Peak Season Takeover",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
    siteName: "Omni Common",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function Page() {
  return <PeakSeasonView />;
}
