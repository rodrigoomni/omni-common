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
    slug: "numberbarn",
    title: "NumberBarn",
    category: "SaaS / Telecom Marketplace",
    color: "#1e3a5f",
    image: "/images/numberbarn-cover.png",
    cursorHint: "+100% impression growth",
    cursorColors: { fill: "#3B82F6", stroke: "#1e3a5f" },
    year: "2025",
    client: "NumberBarn",
    tagline: "Turning a phone number marketplace into a search-led growth engine.",
    overview:
      "NumberBarn is a marketplace where people buy, sell, and park phone numbers. We built their intelligence model first — then executed a search-led strategy that doubled their visibility and grew transactions by 40%.",
    challenge:
      "NumberBarn had a solid product but no clear picture of what was driving growth. Organic traffic had flatlined, paid spend lacked attribution, and they were unsure where to invest next.",
    solution:
      "We pulled data from their full stack, built an attribution model, and identified high-intent search gaps nobody was capturing. SEO and content targeted real buyer search behavior, PPC was reallocated to the highest-converting terms, and the entire funnel was optimized for conversions.",
    results: [
      { metric: "Impression growth", value: "+100%" },
      { metric: "Organic traffic", value: "+40%" },
      { metric: "Transaction growth", value: "+40%" },
      { metric: "Search visibility", value: "2x" },
    ],
    services: ["SEO", "PPC", "Content Marketing", "CRO", "Attribution"],
  },
  {
    slug: "trio-flatmount",
    title: "Trio Flatmount",
    category: "E-Commerce / Tech Accessories",
    color: "#dde8d0",
    image: "/images/trio-cover.jpg",
    cursorHint: "+340% revenue growth",
    cursorColors: { fill: "#DC2626", stroke: "#dde8d0" },
    year: "2024",
    client: "Trio Flatmount",
    tagline: "From niche Starlink accessory to the go-to mount for mobile internet.",
    overview:
      "Trio Flatmount sells mounting solutions for Starlink satellite dishes to the van life and RV crowd. We built their search-led growth system from scratch — brand, content, and paid all working together.",
    challenge:
      "New product category, zero brand recognition, bootstrapped budget. They needed to educate a technical audience and capture search demand that didn't have a clear leader yet.",
    solution:
      "Our intelligence model showed search demand existed but nobody was owning it. We built SEO-optimized product pages and how-to content that captured that demand, ran targeted paid campaigns to the RV and van life community, and set up lifecycle emails that drove reviews and repeat buys.",
    results: [
      { metric: "Revenue growth", value: "+340%" },
      { metric: "Organic traffic", value: "+520%" },
      { metric: "Review count", value: "400+" },
      { metric: "Social followers", value: "+8K" },
    ],
    services: ["SEO", "Paid Social", "Content Marketing", "Email Marketing", "Brand Identity"],
  },
  {
    slug: "talitha-and-lofty",
    title: "Talitha & Lofty",
    category: "E-Commerce / Coffee & Roasters",
    color: "#e8d5b7",
    image: "/images/talitha-cover.jpg",
    cursorHint: "+215% DTC revenue",
    cursorColors: { fill: "#D97706", stroke: "#e8d5b7" },
    year: "2025",
    client: "Talitha & Lofty Coffee Roasters",
    tagline: "Scaling a mission-driven coffee brand from local favorite to national presence.",
    overview:
      "Talitha & Lofty is a specialty coffee roaster on a mission — creating opportunities for survivors of trafficking. We built their intelligence model, found untapped search demand, and scaled DTC revenue without losing what makes them special.",
    challenge:
      "They had a loyal local following and a powerful story, but their online presence wasn't converting awareness into sales. Organic search had plateaued, paid campaigns underperformed, and the brand story wasn't translating to digital channels.",
    solution:
      "Data showed their mission was their biggest growth asset — it just wasn't reaching the right people through search. We built SEO content around their story and high-intent product terms, ran paid campaigns to qualified DTC audiences, and created lifecycle emails that turned first-time buyers into subscribers.",
    results: [
      { metric: "DTC revenue", value: "+215%" },
      { metric: "Organic traffic", value: "+380%" },
      { metric: "Email revenue", value: "+162%" },
      { metric: "CAC reduction", value: "-41%" },
    ],
    services: ["SEO", "Paid Social", "Email Marketing", "Content Marketing", "CRO"],
  },
  {
    slug: "rapid-garden",
    title: "Rapid Garden",
    category: "SaaS / Green Industry POS",
    color: "#2d5a27",
    image: "/images/rapid-garden-cover.png",
    cursorHint: "+275% demo requests",
    cursorColors: { fill: "#22C55E", stroke: "#2d5a27" },
    year: "2025",
    client: "Rapid Garden POS",
    tagline: "Putting a niche POS platform in front of every garden center searching for a solution.",
    overview:
      "Rapid Garden POS builds point-of-sale software purpose-built for garden centers, nurseries, and landscape suppliers. We built their search-led growth system to capture high-intent buyers in a niche vertical.",
    challenge:
      "Rapid Garden had a strong product but low visibility. Garden centers searching for POS solutions were finding generic competitors. Paid spend was broad and inefficient, and organic search wasn't capturing the niche terms that drive demo requests.",
    solution:
      "Our intelligence model identified the exact search terms garden center operators use when looking for a POS. We built SEO content targeting those long-tail queries, restructured PPC to focus on high-intent industry keywords, and launched a content strategy around green industry pain points that positioned Rapid Garden as the specialist.",
    results: [
      { metric: "Demo requests", value: "+275%" },
      { metric: "Organic traffic", value: "+410%" },
      { metric: "Cost per lead", value: "-52%" },
      { metric: "Search visibility", value: "3x" },
    ],
    services: ["SEO", "PPC", "Content Marketing", "CRO", "Digital PR"],
  },
];
