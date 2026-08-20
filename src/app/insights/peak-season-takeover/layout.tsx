import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peak Season Takeover — 90-day account takeover for DTC brands",
  description:
    "Hand us the keys in August. Walk into Black Friday with Google and Meta accounts that have already found their rhythm. 10 spots. Enrollment closes Aug 31.",
  openGraph: {
    title: "Peak Season Takeover — Omni Common",
    description:
      "90-day account takeover for DTC brands. Rebuild the signal in September while impressions are cheap, arrive at Black Friday with accounts already at full stride.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peak Season Takeover — Omni Common",
    description:
      "90-day account takeover for DTC brands. Rebuild in September, execute in November.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
