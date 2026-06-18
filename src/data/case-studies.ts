export interface CaseStudyMeta {
  label: string;
  value: string;
}

export interface SnapshotBullet {
  /** Headline value, e.g. "−69%" or "46 → 60" */
  value?: string;
  /** Short label that sits under the value, e.g. "Account CAC YoY" */
  label?: string;
  /** Optional supporting line under the label */
  detail?: string;
  /** Legacy / fallback inline-row rendering when value/label aren't set */
  highlight?: string;
  text?: string;
}

/** Small metric callout that can trail an approach subsection */
export interface ApproachStat {
  value: string;
  label: string;
}

export interface MediaItem {
  src: string;
  alt?: string;
  caption?: string;
  /** Fallback background while image loads or to frame transparent/short assets */
  bg?: string;
}

export interface MediaBlock {
  /** `single` — one image. `pair` — two side-by-side. `grid` — 3+ in a grid. `wide` — extends past the reading column on lg+. */
  layout?: "single" | "pair" | "grid" | "wide";
  items: MediaItem[];
  caption?: string;
  /** Optional small eyebrow above the block, e.g. "Figure 01" */
  eyebrow?: string;
}

export interface ApproachSection {
  title: string;
  body: string;
  media?: MediaBlock;
  /** Trailing metric chip rendered at the end of the subsection */
  stat?: ApproachStat;
}

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

  // Rich case study fields (optional — populated for hero studies)
  subtitle?: string;
  meta?: CaseStudyMeta[];
  snapshot?: {
    intro: string;
    bullets: SnapshotBullet[];
    media?: MediaBlock;
  };
  background?: {
    heading: string;
    paragraphs: string[];
    media?: MediaBlock;
  };
  approach?: {
    heading: string;
    intro: string;
    sections: ApproachSection[];
    media?: MediaBlock;
  };
  resultsSection?: {
    heading: string;
    body: string;
    media?: MediaBlock;
  };
  opportunity?: {
    heading: string;
    bullets: string[];
    closer: string;
    media?: MediaBlock;
  };
  footnote?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "numberbarn",
    title: "NumberBarn",
    category: "SaaS / Telecom Marketplace",
    color: "#1e3a5f",
    image: "/images/numberbarn-cover.png",
    images: ["/images/numberbarn-cover.png"],
    cursorHint: "+100% impression growth",
    cursorColors: { fill: "#3B82F6", stroke: "#1e3a5f" },
    year: "2025",
    client: "NumberBarn",
    tagline: "Rebuilding the engine under NumberBarn's growth.",
    overview:
      "NumberBarn is a marketplace where people buy, sell, and park phone numbers. We built their intelligence model first — then executed a search-led strategy that doubled their visibility and grew transactions by 40%.",
    challenge:
      "NumberBarn had a solid product but no clear picture of what was driving growth. Organic traffic had flatlined, paid spend lacked attribution, and they were unsure where to invest next.",
    solution:
      "We pulled data from their full stack, built an attribution model, and identified high-intent search gaps nobody was capturing. SEO and content targeted real buyer search behavior, PPC was reallocated to the highest-converting terms, and the entire funnel was optimized for conversions.",
    results: [
      { metric: "Account CAC", value: "−69%" },
      { metric: "Net-new buyers", value: "+270%" },
      { metric: "Total purchases YoY", value: "+20%" },
      { metric: "Domain Rating", value: "46 → 60" },
    ],
    services: ["SEO", "Digital PR", "Content", "Landing Page UXO", "Paid Search"],

    subtitle: "Rebuilding the engine under NumberBarn's growth.",
    meta: [
      { label: "Client", value: "NumberBarn" },
      { label: "Industry", value: "Telecom / virtual phone numbers" },
      { label: "Engagement", value: "Q4 2024 – Present" },
      { label: "Focus", value: "Search-Led Growth Engine" },
      { label: "Channels", value: "SEO · Digital PR · Content · Landing Page UXO · Paid Search" },
    ],
    snapshot: {
      intro:
        "NumberBarn had been growing — but paying for it with increasingly expensive paid search, as sales & marketing nearly doubled as a share of revenue (5.5% → 11%). Omni Common's thesis: shift acquisition toward organic, where the cost to land a buyer runs ~4× lower. In year one we reversed a multi-year slowdown and rebuilt the engine so growth compounds instead of having to be re-bought.",
      bullets: [
        {
          value: "−69%",
          label: "Account CAC YoY",
          detail: "The key lever in an acquisition-led business.",
        },
        {
          value: "+270%",
          label: "Net-new buyers",
          detail: "3,664 → 13,544. Unique buying accounts +35% YoY.",
        },
        {
          value: "+20%",
          label: "Total purchases YoY (GA)",
          detail: "Organic search purchases +51%, paid +42%.",
        },
        {
          value: "46 → 60",
          label: "Domain Rating",
          detail: "+14 pts in 24 months. Top-3 keywords ~4× (~500 → ~2,000).",
        },
        {
          value: "+288%",
          label: "Search impressions",
          detail: "Organic clicks ~+105% (trailing 90 days YoY).",
        },
        {
          value: "+1,100%",
          label: "ChatGPT-referred purchases",
          detail: "Converting 68% above site average. Now the 6th-highest purchase driver.",
        },
      ],
    },
    background: {
      heading: "Background — a big ship with slowing momentum",
      paragraphs: [
        "NumberBarn is a phone number marketplace, specializing in helping people purchase, store, and forward numbers. They also serve business owners with tools to improve their marketing and business tech stack.",
        "When Omni Common first engaged, NumberBarn stored scattered customer data but didn't really know WHO their customers were, WHAT mattered to them, or HOW to talk to them. We analyzed their data and conducted customer surveys and interviews to develop a full funnel understanding of their consumer make-up as well as map their journey through every touch point. We identified distinct behaviors, needs, and patterns that aided in the development of ICPs and marketing message mapping.",
        "Most importantly, we discovered a key differentiator between certain customer segments: those who WANTED to buy, store, forward a number and those who NEEDED to based on certain life circumstances. This insight informed our ICP specific marketing messaging and resulted in clearer, more customer-focused messaging across the site.",
        "Virtual phone numbers: vanity, toll-free, area-code, parking, forwarding, porting. Real assets (established base, domain authority, brand) but decelerating growth that was increasingly bought, not earned. The business is acquisition-led: ~80–85% of buyers each year are new, repeat frequency flat (~1.4×/yr). Without organic investment, growth was drifting toward flat — the reason for engaging Omni Common in Q4 2024.",
      ],
      media: {
        layout: "single",
        eyebrow: "Fig. 01",
        items: [
          {
            src: "/images/numberbarn-cover.png",
            alt: "NumberBarn marketplace, the legacy state before our engagement",
            caption: "The NumberBarn marketplace prior to engagement — strong assets, no clear picture of where growth was coming from.",
            bg: "#1e3a5f",
          },
        ],
      },
    },
    approach: {
      heading: "Approach — SEO as a formula",
      intro:
        "Four interdependent systems that multiply each other — technical, content, digital PR, landing-page UXO — with paid managed alongside so the channels reinforce rather than cannibalize.",
      media: {
        layout: "single",
        eyebrow: "Fig. 02 — The Growth Formula",
        items: [
          {
            src: "/images/seo-illustration.svg",
            alt: "Diagram of the four interdependent systems",
            caption: "Search-led growth, modeled as four channels that compound when run as one system.",
            bg: "var(--surface)",
          },
        ],
      },
      sections: [
        {
          title: "Content Marketing",
          body: "49 blog posts published in 2025 across two tracks (purchase-adjacent education + refresh/consolidation). Tightened publishing/QA pipeline; aligned terminology and topic selection with the client's editorial lead. Culled and consolidated thin/dated posts (SEO hygiene) and shipped a blog redesign. Blog traffic +234% YoY (Q4'25 vs Q4'24); ~48K Google visits and 4.1M impressions.",
          stat: { value: "+234%", label: "Blog traffic YoY · 4.1M impressions" },
        },
        {
          title: "Digital PR & Link Building",
          body: "557 links from 464 unique referring domains, average DR 69.73, 147 links at DR 71+. Original data-driven campaigns: Ghosting (125 placements), Debt Collection Calls and Phone Bills (avg DR ~80s), Robocalls and Phone Etiquette (sustained broadcast/publisher coverage). Drove NumberBarn DR from 46 → 60 and seeded AI-discovery signals.",
          stat: { value: "557", label: "Links from 464 domains · avg DR 69.73" },
        },
        {
          title: "Technical SEO",
          body: "12 technical batches across the year surfacing 33 optimizations (template, crawl, indexing, Core Web Vitals); internal-linking automation for topical clusters; content consolidation redirecting/merging 58 older posts. New single-day organic-click highs of 1,197 (July) then 1,680 (Oct 21). Impressions +288%, organic clicks ~+105% (90-day YoY).",
          stat: { value: "+288%", label: "Search impressions · 90-day YoY" },
        },
        {
          title: "Landing Page UXO & CRO",
          body: "17 top-level landing pages rewritten, redesigned, and coded for commercial intent (vanity, local/geo, toll-free, area-code, search, call-forwarding, purchase-and-port, lawyers, roofing) — development included at no upcharge, plug-and-play ready. /local launched Aug 31 and is competing in 100K+ monthly searches; /search redesign live June 30; homepage redesign through multiple review rounds; CRO experimentation (CrazyEgg on /number-parking). Biggest unlock ahead: publishing the finished pages.",
          stat: { value: "17", label: "Landing pages built · 100K+ monthly searches" },
        },
        {
          title: "Paid Search (PPC)",
          body: "Full account ownership. Returned non-branded campaigns to Maximize Conversion Value w/ tROAS; continuous query/keyword hygiene; \"top keywords\" focus and exact-match tests; ad-copy testing (benefit themes beat personality-led); promo alignment for on-sale numbers. Best efficiency in three years — CPA ~−27%, ROAS ~+26% YoY on lower spend.",
          stat: { value: "+26% ROAS", label: "On −27% CPA. Best efficiency in 3 years." },
        },
      ],
    },
    resultsSection: {
      heading: "Results — growth was decelerating; we reversed it",
      body: "Run together the services compounded: total purchases +20% YoY, organic +51%, paid +42%. The number that ties it together is account CAC, down 69% — in a business that re-acquires most of its revenue each year, acquisition cost governs everything. Channels reinforce: organic + paid presence together converts at 17.5% vs. 4.2% organic alone. A new tailwind also arrived — AI discovery: ChatGPT-referred purchases +1,100% YoY at a 4.23% conversion rate (68% above site average), now the 6th-highest purchase driver.",
      media: {
        layout: "single",
        eyebrow: "Fig. 03 — Trailing 12 months",
        items: [
          {
            src: "/images/growth-illustration.svg",
            alt: "Growth chart illustrating the compounded results",
            caption: "Compounded performance across organic and paid search, year over year.",
            bg: "var(--surface)",
          },
        ],
      },
    },
    opportunity: {
      heading: "The opportunity ahead",
      bullets: [
        "A major competitor's mid-2025 rebrand collapsed its organic traffic 99.5%, redistributing ~640K monthly area-code clicks; NumberBarn captures ~1.9% today.",
        "The enterprise incumbent has shed ~75% of ranking pages in 24 months — winnable now.",
        "The 17 landing pages are built and ready; publishing them is the single highest-leverage action remaining.",
      ],
      closer:
        "Holding SEO investment steady, the marginal cost of each new transaction keeps falling — blended CAC down as volume grows several-fold, bringing marketing's share of revenue back toward earlier levels.",
    },
    footnote:
      "Metrics sourced from Google Analytics 4, Google Search Console, Google Ads, and Ahrefs (2024–2026). Figures reflect 2025 full-year actuals/forecast vs. prior year unless noted.",
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
