export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  color: string;
  image?: string;
  images?: string[];
  cursorHint: string;
  cursorColors?: { fill: string; stroke: string };
  year: string;
  client: string;
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  services: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "talitha-and-lofty",
    title: "Talitha & Lofty",
    category: "Coffee & Specialty Roasters",
    color: "#e8d5b7",
    image: "/images/talitha-cover.jpg",
    cursorHint: "+215% DTC revenue",
    cursorColors: { fill: "#D97706", stroke: "#e8d5b7" },
    year: "2025",
    client: "Talitha & Lofty Coffee Roasters",
    tagline: "Scaling a mission-driven coffee brand from local favorite to national presence.",
    overview:
      "Talitha & Lofty is a specialty coffee roaster with a powerful mission — creating opportunities for survivors of trafficking. We built an omni-channel growth engine that honored their story while scaling revenue across DTC, wholesale, and retail.",
    challenge:
      "Despite a loyal local following and a compelling mission, Talitha & Lofty's digital presence wasn't converting awareness into sales. Their organic reach had plateaued, paid campaigns were underperforming, and their brand story wasn't translating online.",
    solution:
      "We unified their Search, Lifecycle, and Social channels into a cohesive growth system. SEO-optimized content marketing told their origin story at scale, targeted paid campaigns drove qualified DTC traffic, and automated email flows turned first-time buyers into subscribers.",
    results: [
      { metric: "DTC revenue", value: "+215%" },
      { metric: "Organic traffic", value: "+380%" },
      { metric: "Email revenue", value: "+162%" },
      { metric: "CAC reduction", value: "-41%" },
    ],
    services: ["SEO", "Paid Social", "Email Marketing", "Content Strategy", "CRO"],
  },
  {
    slug: "skincare-junkie",
    title: "Skincare Junkie",
    category: "DTC Beauty & Skincare",
    color: "#f5e1d0",
    image: "/images/skincare-junkie-cover.jpg",
    cursorHint: "+290% monthly revenue",
    cursorColors: { fill: "#7B3F8D", stroke: "#F5C6D0" },
    year: "2025",
    client: "Skincare Junkie by Dr. Blair Rose",
    tagline: "Turning dermatologist credibility into a DTC growth machine.",
    overview:
      "Skincare Junkie is a dermatologist-developed skincare line by Dr. Blair Rose, featured in Vogue, ELLE, and The New York Times. We architected a full-funnel growth strategy that leveraged her clinical authority to dominate in a saturated beauty market.",
    challenge:
      "The brand had strong press coverage and product-market fit, but was struggling to convert media buzz into consistent, scalable revenue. Paid acquisition costs were climbing, retention was low, and the brand lacked a systematic approach to growth.",
    solution:
      "We built a marketing mix model that balanced brand-building content with performance marketing. Influencer partnerships amplified Dr. Blair's authority, SEO captured high-intent search traffic for skincare concerns, and a revamped email lifecycle turned one-time buyers into loyal customers.",
    results: [
      { metric: "Monthly revenue", value: "+290%" },
      { metric: "ROAS", value: "4.8x" },
      { metric: "Repeat purchase rate", value: "+87%" },
      { metric: "Organic rankings", value: "Top 3" },
    ],
    services: ["Paid Ads", "SEO", "Influencer Marketing", "Email & SMS", "CRO"],
  },
  {
    slug: "exodus",
    title: "eXODUS",
    category: "DTC / Lifestyle Brand",
    color: "#1a1a2e",
    image: "/images/exodus-cover.jpg",
    cursorHint: "+175% new signups",
    cursorColors: { fill: "#D4A017", stroke: "#1a1a2e" },
    year: "2024",
    client: "eXODUS",
    tagline: "Launching a lifestyle brand from zero to cultural relevance.",
    overview:
      "eXODUS is a bold lifestyle brand built around self-expression and community. We crafted their digital identity, built their growth engine, and launched them into a competitive DTC landscape with a strategy rooted in culture, content, and conversion.",
    challenge:
      "As a new entrant with no existing audience, eXODUS needed to build brand awareness, establish credibility, and drive sales simultaneously — all on a lean budget against established competitors.",
    solution:
      "We developed a content-first strategy anchored in social storytelling and influencer seeding. Paid social drove top-of-funnel awareness, SEO captured branded and category search demand, and automated email flows converted browsers into buyers and repeat customers.",
    results: [
      { metric: "Launch revenue", value: "$180K" },
      { metric: "Social reach", value: "2.4M" },
      { metric: "Email list growth", value: "+12K" },
      { metric: "ROAS", value: "5.2x" },
    ],
    services: ["Brand Identity", "Paid Social", "SEO", "Email Marketing", "Content Creation"],
  },
  {
    slug: "trio-flatmount",
    title: "Trio Flatmount",
    category: "eCommerce / Tech Accessories",
    color: "#dde8d0",
    image: "/images/trio-cover.jpg",
    cursorHint: "+340% revenue growth",
    cursorColors: { fill: "#DC2626", stroke: "#dde8d0" },
    year: "2024",
    client: "Trio Flatmount",
    tagline: "From niche Starlink accessory to the go-to mount for mobile internet.",
    overview:
      "Trio Flatmount designs and sells mounting solutions for Starlink satellite dishes, targeting the fast-growing van life, RV, and mobile connectivity market. We built their brand and growth engine from the ground up.",
    challenge:
      "Trio Flatmount was entering a new product category with zero brand recognition. They needed to educate the market, build trust with a technical audience, and drive sales — all on a bootstrapped budget.",
    solution:
      "We created a content-led growth strategy targeting the Starlink and mobile lifestyle communities. SEO-optimized product pages and how-to guides captured search demand, targeted social campaigns reached RV and van life enthusiasts, and a post-purchase email flow drove reviews and repeat purchases.",
    results: [
      { metric: "Revenue growth", value: "+340%" },
      { metric: "Organic traffic", value: "+520%" },
      { metric: "Review count", value: "400+" },
      { metric: "Social followers", value: "+8K" },
    ],
    services: ["SEO", "Paid Social", "Content Creation", "Email Marketing", "Brand Identity"],
  },
];
