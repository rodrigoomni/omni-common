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
  /** Image source. Optional when `placeholder` is true. */
  src?: string;
  alt?: string;
  caption?: string;
  /** Fallback background while image loads or to frame transparent/short assets */
  bg?: string;
  /** When true, render a grey placeholder box instead of an Image — used for case studies still missing their final assets. */
  placeholder?: boolean;
  /** Aspect-ratio override (CSS value, e.g. "16 / 9"). Helpful for placeholder boxes. */
  aspect?: string;
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
    slug: "rapid-garden",
    title: "RapidGarden POS",
    category: "Specialty Retail Software / POS",
    color: "#2d5a27",
    image: "/images/rapid-garden-cover.png",
    images: ["/images/rapid-garden-cover.png"],
    cursorHint: "−55% cost per lead",
    cursorColors: { fill: "#22C55E", stroke: "#2d5a27" },
    year: "2025–2026",
    client: "RapidGarden POS (RapidPOS family)",
    tagline:
      "How Omni Common brought strategic clarity, a rebuilt digital presence, and a stabilized paid media engine to a specialty retail POS company navigating a crowded market.",
    overview:
      "RapidPOS had built a loyal customer base — 200+ garden centers and 320+ gun stores — on highly specialized point-of-sale software, but marketing had plateaued. We took over as fractional CMO and full execution partner, identified RapidGarden POS as the highest-leverage vertical, and rebuilt the digital foundation from the ground up.",
    challenge:
      "Flat year-over-year growth, inconsistent lead quality, and a digital presence that hadn't kept pace with where their best buyers were searching. Under the hood: paused legacy DSA campaigns had been silently driving cheap traffic, raised target CPAs had destabilized learning, spam form fills were poisoning Google's conversion signals, and Performance Max was volatile and uncontrollable.",
    solution:
      "Stabilization first, then acceleration. Corrected the spam contamination, reverted to proven bid strategies, eliminated PMAX over-reliance, and rebuilt the digital foundation — homepage and landing page redesigns, schema markup, vertical-specific landing pages, a keyword-mapped content engine, and digital PR placements that compound long after the engagement.",
    results: [
      { metric: "Cost per lead", value: "−55%" },
      { metric: "Monthly MQL volume", value: "+157%" },
      { metric: "Form fills vs 2023", value: "+88%" },
      { metric: "Organic engaged sessions YoY", value: "+60%" },
    ],
    services: [
      "Fractional CMO",
      "SEO",
      "PPC / Google Ads",
      "Website UX",
      "Content Marketing",
      "Digital PR",
      "Email Marketing",
    ],

    subtitle: "Growing RapidGarden POS from the ground up.",
    meta: [
      { label: "Client", value: "RapidGarden POS (RapidPOS family)" },
      { label: "Industry", value: "Specialty Retail Software / POS" },
      { label: "Engagement", value: "Jan 2025 – Feb 2026" },
      { label: "Focus", value: "Full-funnel growth marketing" },
      { label: "Brand allocation", value: "90% RapidGarden · 10% parent" },
    ],
    snapshot: {
      intro:
        "RapidPOS had built a loyal customer base on highly specialized POS software, but marketing had plateaued. Growth was flat YoY, lead quality was inconsistent, and inherited account chaos was poisoning the conversion signal. We took over as fractional CMO and full execution partner, identified RapidGarden POS as the highest-leverage vertical, and rebuilt the digital foundation from the ground up. Stabilization first, then acceleration.",
      bullets: [
        {
          value: "−55%",
          label: "Cost per lead",
          detail: "From peak CPL during account stabilization to record-low at engagement close.",
        },
        {
          value: "+157%",
          label: "Monthly MQL volume",
          detail: "From trough during inherited account chaos to best-ever month on record.",
        },
        {
          value: "+90%",
          label: "PPC engagement rate YoY",
          detail: "+30% engaged sessions · +36% form fill rate.",
        },
        {
          value: "+60%",
          label: "Organic engaged sessions YoY",
          detail: "+20% organic sessions · +32% organic engagement rate.",
        },
        {
          value: "+88%",
          label: "Form fills vs 2023 baseline",
          detail: "+62% form-fill conversion rate · +16% overall sessions.",
        },
        {
          value: "6%",
          label: "Non-branded organic share at audit",
          detail: "Starting point in early 2025 — rebuilt the discovery engine from scratch.",
        },
      ],
      media: {
        layout: "single",
        eyebrow: "Fig. 01 — Headline results",
        items: [
          {
            placeholder: true,
            alt: "Headline performance chart",
            caption:
              "CPL down 55%, MQLs up 157% from the inherited trough — the shape of stabilization, then acceleration.",
          },
        ],
      },
    },
    background: {
      heading: "Background — a company with multiple brands, one clear opportunity",
      paragraphs: [
        "RapidPOS is a San Diego-based point-of-sale company built on NCR Counterpoint software, customized for highly specific retail verticals — including gun stores, garden centers, specialty grocery, and feed & tack. Over two decades they had grown a loyal customer base of 200+ garden centers and 320+ gun stores, yet their marketing had plateaued. Growth was flat year-over-year, lead quality was inconsistent, and their digital presence hadn't kept pace with where their best buyers were going to find solutions.",
        "When RapidPOS engaged Omni Common, their first question was simple: where should we focus? With five distinct brands and limited marketing bandwidth, they needed strategic clarity before execution. After a thorough paid discovery — including an on-site deep dive with their leadership team — we identified RapidGarden POS as the highest-leverage vertical: a 12,000-target addressable market, strong existing momentum, and a brand ready for a real digital growth push.",
        "\"If we crush it at Specialty Grocery and Garden, that's all the growth we need.\" — Bart, RapidPOS CEO",
      ],
      media: {
        layout: "single",
        eyebrow: "Fig. 02 — The vertical opportunity",
        items: [
          {
            placeholder: true,
            alt: "RapidGarden POS landscape",
            caption: "12,000-target addressable market in garden centers, nurseries, and landscape suppliers.",
          },
        ],
      },
    },
    approach: {
      heading: "The work — stabilization, then acceleration",
      intro:
        "Acting as a fractional CMO and full execution partner, Omni Common took on the full marketing stack for RapidGarden POS. Brand effort allocation was deliberate: 90% of activity focused on RapidGarden POS, with the remainder supporting the parent brand. The first months were stabilization — diagnosing a broken signal environment and rebuilding the digital foundation — before any meaningful acceleration could compound.",
      media: {
        layout: "single",
        eyebrow: "Fig. 03 — Engagement timeline",
        items: [
          {
            placeholder: true,
            alt: "Timeline: discovery → kickoff → stabilization → acceleration → record month",
            caption:
              "Jan–Feb 2025 paid discovery · Apr account takeover · May–Aug PPC stabilization · Aug–Nov content & PR · Jan 2026 record performance month.",
          },
        ],
      },
      sections: [
        {
          title: "Paid Search (PPC) — stabilization, then precision",
          body:
            "When we took over, the account was a mess. Legacy Dynamic Search Ads paused in November 2024 had been the silent workhorse, and their removal created a performance cliff. February bid-strategy changes (target CPAs raised with bid limits) had destabilized the learning cycles. Spam form submissions in April–May 2025 were being registered as qualified leads and fed back into Google's algorithms — actively training campaigns to target the wrong audience. Performance Max was volatile and uncontrollable, requiring a full pivot back to manual search to regain control of spend and lead quality. We corrected the spam contamination, reverted to proven bid strategies, eliminated PMAX over-reliance, and instituted 30–60 day stability windows. The goal was never more traffic — it was the right traffic.",
          stat: {
            value: "−55% / +157%",
            label: "CPL · monthly MQLs (peak → record-low · trough → best-ever)",
          },
        },
        {
          title: "Website UX & SEO Foundation",
          body:
            "Redesigned the homepage with optimized imagery (WebP, sub-100KB). Updated meta titles site-wide. Implemented schema markup. Designed five new vertical-specific landing pages. The SEO audit showed strong health scores (90s), but critical gaps in link building, internal linking, and content pace — gaps we addressed at every layer.",
          stat: {
            value: "+20% / +60%",
            label: "Organic sessions YoY · organic engaged sessions YoY",
          },
          media: {
            layout: "pair",
            eyebrow: "Fig. 04 — Homepage & landing pages",
            items: [
              { placeholder: true, alt: "Homepage redesign" },
              { placeholder: true, alt: "Vertical-specific landing page" },
            ],
            caption: "Before / after of homepage and a vertical-specific landing page.",
          },
        },
        {
          title: "Content Marketing — building topical authority from scratch",
          body:
            "The strategy was built around a clear principle: write for the decision-maker, not the product. Content needed to meet garden center owners at their real operational challenges — inventory overflows, dead stock, slow checkouts, loyalty program gaps — and earn a position in search before the buyer was ready to evaluate software. Two parallel tracks: new posts targeting high-intent, non-branded keywords, and refreshes of existing URLs rebuilt with sharper SEO structure. A content map was built in advance of each production cycle — every piece had a defined target keyword, search intent, and internal linking plan before writing began.",
          stat: {
            value: "10+ / 5 / 2",
            label: "Posts published or refreshed · new landing pages · data-led PR assets",
          },
        },
        {
          title: "Digital PR & Link Building",
          body:
            "An original research study on garden center loyalty programs — seeded into trade publications — surfaced a striking finding: 30% of garden centers using loyalty programs generate 56% of participating stores' revenue. This gave RapidGarden POS a credible, data-backed voice in industry conversations, alongside 4 high-authority placements secured (including Greenhouse Grower and Brewer Magazine) with a 19-placement pipeline in development — including a Forbes feature.",
          stat: {
            value: "4 secured · 19 in pipeline",
            label: "Trade & national placements (incl. Forbes feature)",
          },
        },
        {
          title: "Email Marketing",
          body:
            "Lifecycle email infrastructure rounded out the funnel — capturing demand generated upstream by paid, organic, and content, and converting it through nurture sequences tied to vertical-specific buyer journeys.",
          stat: {
            value: "+88%",
            label: "Total form fills vs 2023 normalized baseline",
          },
        },
      ],
    },
    resultsSection: {
      heading: "Results — best-performing metrics on record",
      body:
        "The RapidGarden POS engagement drove the account to its best-performing metrics on record across paid, organic, and content channels simultaneously. By the close of the engagement, CPL had dropped 55% from its peak and MQL volume had climbed 157% from trough to record high. PPC engagement rate was up 90% YoY, engaged sessions up 30%, and the form fill rate up 36%. On the organic and content side, sessions grew 20% YoY, engaged sessions grew 60%, and the organic engagement rate climbed 32%. Against the 2023 baseline (the true comparable, since 2024 was inflated by a temporary DSA traffic anomaly), form fills were up 88% and the form fill rate up 62%. \"Our organic stuff for what we paid and built last year did phenomenal.\" — Bart, RapidPOS CEO.",
      media: {
        layout: "single",
        eyebrow: "Fig. 05 — Channel performance",
        items: [
          {
            placeholder: true,
            alt: "Paid vs organic performance dashboard",
            caption: "Paid and organic moving in concert across the engagement.",
          },
        ],
      },
    },
    opportunity: {
      heading: "Takeaway",
      bullets: [
        "Signal integrity and strategic patience outperform reactivity every time.",
        "On the paid side, restoring clean conversion data and holding bid strategies steady through volatility created the conditions for CPL to drop 55% and MQL volume to more than double.",
        "On the organic and content side, consistent production, technical optimization, and earned media links built an asset that compounds — independent of ad spend.",
        "The content program was still in its early compounding phase at close of engagement — the bulk of keyword authority gains projected to materialize in the months following.",
      ],
      closer:
        "\"I really wish we didn't have to cut budgets there — we're finally on the track of getting successful PPC at a strong cost per lead.\" — Bliss, RapidPOS Marketing Lead.",
    },
    footnote:
      "Metrics from Google Ads, Google Analytics, Google Search Console, and Omni Common's integrated KPI dashboards (2023–2026). Engagement spanned Jan 2025 – Feb 2026. 2024 was inflated by a temporary DSA traffic anomaly — 2023 is used as the comparable baseline where noted.",
  },
  {
    slug: "talitha",
    title: "Talitha",
    category: "Multi-location Café · Mission-Driven Roaster",
    color: "#e8d5b7",
    image: "/images/talitha-cover.jpg",
    images: ["/images/talitha-cover.jpg"],
    cursorHint: "+571% DTC orders",
    cursorColors: { fill: "#D97706", stroke: "#e8d5b7" },
    year: "2025",
    client: "Talitha Coffee",
    tagline:
      "Refocusing a stretched national DTC budget into a local, compounding growth system — and lifting the whole business in the process.",
    overview:
      "Talitha was trying to behave like a nationwide DTC ecommerce brand without the budget to win nationally. We concentrated that spend on the San Diego metro — investing in the cafés, the rebrand, and a community-development engine tied to the mission — and let DTC ecommerce grow as a by-product of a stronger local brand.",
    challenge:
      "National ambition without national spend, an identity transition from The WestBean Coffee Roasters to Talitha, scattered marketing efforts, no marketing infrastructure to support a café rebrand, and a website built for ecommerce, not local. Reach was high; revenue conversion wasn't.",
    solution:
      "Concentrate the budget locally where it stacks, build the mid-funnel that captures reach (Klaviyo email + SMS, lifecycle, paid social), rebuild local SEO and the website around the café experience, and run a deliberately national influencer program in parallel as the DTC growth lever.",
    results: [
      { metric: "Café AOV", value: "+33%" },
      { metric: "Q1 2026 café sales", value: "+21%" },
      { metric: "DTC ecommerce orders", value: "+571%" },
      { metric: "Brand reach YoY", value: "+343%" },
    ],
    services: [
      "Community Development",
      "Social Media",
      "Local SEM / SEO",
      "Email & Lifecycle",
      "Digital PR",
      "Influencer Marketing",
    ],

    subtitle:
      "Refocusing a stretched national DTC budget into a local, compounding growth system.",
    meta: [
      { label: "Client", value: "Talitha Coffee (formerly The WestBean Coffee Roasters)" },
      { label: "Location", value: "San Diego, CA" },
      { label: "Industry", value: "Multi-location café & specialty coffee roaster — mission-driven" },
      { label: "Service", value: "Community Growth Engine" },
      { label: "Engagement", value: "February 2025 – Present" },
    ],
    snapshot: {
      intro:
        "Talitha was trying to be a nationwide direct-to-consumer coffee brand without the budget to win nationally — spreading spend thin across the country with little to show for it. We concentrated that budget locally, where it could compound: investing in the San Diego cafés and the brand so stronger local gravity would lift the entire business. DTC ecommerce growth followed as a by-product — and the one deliberately non-local lever, influencer marketing, became the single biggest driver of that online growth.",
      bullets: [
        {
          value: "+33%",
          label: "Café average order value",
          detail: "+9–12% at all three café locations post-rebrand.",
        },
        {
          value: "+16%",
          label: "Repeat customer revenue",
          detail: "From $63,600 to $73,600 per month.",
        },
        {
          value: "+21%",
          label: "Q1 2026 vs Q1 2025 café sales",
          detail: "70–82% of post-rebrand customers were entirely new to the brand.",
        },
        {
          value: "+343%",
          label: "Brand reach YoY (April)",
          detail: "Built on ~29 press placements from a starting point of effectively zero earned media.",
        },
        {
          value: "+571%",
          label: "DTC ecommerce orders",
          detail: "Revenue roughly doubled (~+100%) from January 2025. Driven largely by influencer marketing.",
        },
        {
          value: "+80%",
          label: "Unique subscribers",
          detail: "Active subscriptions +66% across 2025. Site held ~3.7% conversion rate.",
        },
      ],
      media: {
        layout: "single",
        eyebrow: "Fig. 01 — In-café AOV and reach growth",
        items: [
          {
            placeholder: true,
            alt: "AOV and reach growth chart",
            caption:
              "Café AOV up +33% post-rebrand; brand reach +343% YoY built on ~29 press placements.",
          },
        ],
      },
    },
    background: {
      heading: "The brand — and what the budget was buying",
      paragraphs: [
        "Talitha Coffee exists for a reason bigger than coffee. The name comes from \"Talitha koum\" — \"little girl, arise\" — and the brand is built around a survivor-care mission, committed to ending human trafficking by providing employment opportunities, resources, and support to survivors. It's coffee with a purpose that socially conscious customers genuinely care about.",
        "With award-winning blends — including a Global Coffee Awards honorable mention for their Arise roast — and a growing café footprint, Talitha had the product and the purpose. What they lacked was a marketing engine to match.",
        "The brand operates three San Diego cafés — Bankers Hill, Clairemont, and Liberty Station — plus a roastery, alongside a direct-to-consumer ecommerce business at talitha.com (bags, gifts, and a subscription program).",
        "There was also a transition underway. The cafés had previously operated as The WestBean Coffee Roasters, and were being rebranded to Talitha — a premium repositioning that needed to lift the brand without alienating the existing base, and establish \"Talitha Coffee\" as the name San Diego knew.",
      ],
      media: {
        layout: "pair",
        eyebrow: "Fig. 02 — Three San Diego cafés",
        items: [
          { placeholder: true, alt: "Bankers Hill location" },
          { placeholder: true, alt: "Clairemont / Liberty Station" },
        ],
        caption: "Three San Diego cafés plus the roastery anchor the local brand.",
      },
    },
    approach: {
      heading: "Approach — focus the budget locally, then compound",
      intro:
        "Rather than chasing the whole country on a budget that couldn't support it, we concentrated Talitha's spend on the San Diego metro, where exposure across cafés, events, media, and search could stack and reinforce. A dollar spent building local brand gravity does more — and compounds further — than the same dollar scattered nationally. We invested in the cafés and the local brand, and treated growth in DTC ecommerce as a by-product. One deliberate exception: influencer marketing was run as a standalone, national-facing DTC lever — and became the single biggest driver of online ecommerce growth.",
      media: {
        layout: "single",
        eyebrow: "Fig. 03 — The Community Growth Engine",
        items: [
          {
            placeholder: true,
            alt: "Diagram of the Community Growth Engine",
            caption:
              "Community development sits at every stage of the funnel — every event becomes fuel for the other channels at once.",
          },
        ],
      },
      sections: [
        {
          title: "Community Development — the engine",
          body:
            "We turned up Talitha's in-person presence and tied it to the mission. Across 12 months we executed 49 Talitha-branded events — booth activations, coffee donations, sponsorships, and in-café gatherings — reaching an estimated 74,000+ people, many aligned directly with the cause (anti-trafficking and survivor-support events, partner conferences, mission-driven races). Events ranged from major festivals (BroAm, Coffee Fest, Binational Race) to hyperlocal touchpoints (school fundraisers, charity auctions, fitness events). We built a full event-operations infrastructure from scratch — partnership screening, day-of logistics, Square POS coupon tracking, and ROI measured back to the register.",
          stat: {
            value: "$1.80–$3.59",
            label: "Cost per café visit · 49 events · ~74K reached",
          },
        },
        {
          title: "Social Media",
          body:
            "The existing content was what the team internally called \"Pottery Barn coffee\" — polished stock-style imagery with no personality. We rebuilt Talitha's content engine around the brand and its story: people-first storytelling (founder interviews, barista spotlights, event content, UGC), high-value engagement metrics over vanity likes, and a content flywheel where every event, product launch, and café moment became social content.",
          stat: {
            value: "+235%",
            label: "Instagram growth · 2,260 → 7,569 followers",
          },
        },
        {
          title: "Rebrand Grand-Opening Campaigns",
          body:
            "For the Bankers Hill (May 10, 2025) and Clairemont (May 31, 2025) relaunches under the Talitha name, we coordinated full-funnel campaigns: Facebook events and social countdowns, targeted email blasts and community outreach, local outreach to schools and businesses, ribbon-cutting ceremonies with city officials, and influencer invitations with day-of content capture.",
          stat: {
            value: "+22.6% / +14%",
            label: "Clairemont monthly unique customers · revenue",
          },
        },
        {
          title: "Local SEM, SEO & Website",
          body:
            "Talitha's cafés started with effectively zero local SEO. We built the function from the ground up — Google Business Profile optimization across all café locations, Apple Maps listings, SMS and email review campaigns (70+ Google reviews, 20+ Yelp), BrightLocal citation building per location, neighborhood city pages with embedded Google Maps, neighborhood blog content, and a homepage/About redesign leading with the café and local brand story rather than ecommerce.",
          stat: {
            value: "+128%",
            label: "Monthly website traffic · 1,567 → 3,569 visits",
          },
        },
        {
          title: "Email, Lifecycle & Paid Social",
          body:
            "This was the missing mid-funnel, and we built it from zero. We stood up the full Klaviyo email + SMS program — welcome flows, mission storytelling, promo countdowns, seasonal sends, and event-triggered messaging — designed to capture reach and nurture it to conversion and subscription. Paid social ran dual awareness-and-traffic campaigns, driving Google Business Profile clicks at $0.12 CPC while reaching 25,000+ people per week.",
          stat: {
            value: "$168K+",
            label: "Attributable purchases · ~$0.46 per email sent",
          },
        },
        {
          title: "Digital PR",
          body:
            "The PR strategy focused on getting Talitha covered as a coffee brand, with its mission as a meaningful differentiator: roughly 29 press placements, including Travel + Leisure, The Manual, Perfect Daily Grind, Yahoo, MSN, and a live FOX 5 segment. We prepared a San Diego State of Coffee report to position Talitha as a local industry voice, coordinated holiday gift-guide placements, and generated blog content tied to PR angles (anti-trafficking awareness month, specialty releases, community stories).",
          stat: {
            value: "~29",
            label: "Press placements · from effectively zero earned media",
          },
        },
        {
          title: "Influencer Marketing — the DTC growth lever",
          body:
            "Influencer marketing was the deliberate exception to the local strategy — a standalone, national-facing program, and the single biggest driver of Talitha's DTC ecommerce growth. We landed and ran a flagship partnership with author and podcaster Jen Hatmaker — coordinating with her team across an ongoing campaign that drove hundreds of direct product sales — alongside a steady program of mission-aligned creators (vetted, contracted, briefed, and cross-published). For a purpose-driven brand, the right creators don't just sell coffee; they carry the mission to new, aligned audiences nationwide.",
          stat: {
            value: "+571% / +66%",
            label: "DTC orders · active subscriptions growth",
          },
        },
      ],
    },
    resultsSection: {
      heading: "Results — local gravity lifted the whole business",
      body:
        "In-café — where the budget went — the rebrand did what a premium repositioning should. Average order value rose +9–12% at every one of the three locations (and +33% overall as the new brand took hold), repeat customer revenue rose +16% ($63,600 → $73,600/month), and Q1 2026 café sales tracked 21% above Q1 2025 — with 70–82% of post-rebrand customers being entirely new to the brand. Clairemont led with +22.6% monthly unique customers and +14% revenue. On brand, Talitha went from near-zero earned media to roughly 29 press placements and +343% reach growth YoY, with ~30% brand recognition at the 2025 SD Coffee Fest. DTC ecommerce — the by-product — grew even though it wasn't the focus: orders +571% and revenue roughly doubled from the start of the year, while the subscription base grew +66% in active subscriptions and +80% in unique subscribers.",
      media: {
        layout: "single",
        eyebrow: "Fig. 04 — Local gravity, then DTC",
        items: [
          {
            placeholder: true,
            alt: "Café and DTC growth charts",
            caption: "Local-first investment lifted in-café metrics; DTC grew in parallel as the by-product.",
          },
        ],
      },
    },
    opportunity: {
      heading: "The takeaway",
      bullets: [
        "Talitha didn't have an awareness problem — it had a focus problem.",
        "A dollar spent building local brand gravity does more — and compounds further — than the same dollar scattered nationally.",
        "Mission-aligned community presence reinforces both the brand AND the mission in the same motion.",
        "Influencer marketing, run deliberately apart from the local engine, became the single biggest driver of online ecommerce.",
      ],
      closer:
        "That's the Community Growth Engine in action: social, community, events, PR, local SEO, email, and paid working as one interconnected system — each channel amplifying the others, so the brand goes from \"who?\" to the first name people think of, while the budget works harder than it ever did spread thin across the country.",
    },
    footnote:
      "Metrics sourced from Shopify, Square POS, Klaviyo, Google Analytics, Google Search Console, BrightLocal, and Omni Common's integrated KPI dashboards (2024–2026). DTC ecommerce and subscription figures from the Talitha KPI dashboard; café and customer figures from the Talitha Master Growth Analysis (June 2026). All performance figures are expressed as relative change.",
  },
  {
    slug: "lofty-coffee",
    title: "Lofty Coffee Co.",
    category: "Multi-location Café · Specialty Coffee Roaster",
    color: "#9CA3A4",
    // Hero left as a grey placeholder until a Lofty Coffee cover is provided.
    cursorHint: "29% → 41% returning customers",
    cursorColors: { fill: "#9CA3A4", stroke: "#6B6B66" },
    year: "2025",
    client: "Lofty Coffee Co.",
    tagline:
      "Turning a 15-year-old local favorite into a retention-driven growth machine.",
    overview:
      "After 15 years of growing on craftsmanship and word of mouth alone, Lofty had never run a real marketing program. In our first year as their growth partner, we built one from zero — and reversed a multi-year decline in new-customer acquisition in a café market that was contracting around them.",
    challenge:
      "A beloved brand with a 15-year head start, plateauing organic traffic, and an enormous untapped retention opportunity: a database of ~700,000 customer records with fewer than 200 email opt-ins, no loyalty program, no segmentation, no lifecycle infrastructure. The customer wasn't at the center of the growth strategy because there wasn't one.",
    solution:
      "We built a Community Growth Engine — community development as the connective tissue, with email + SMS, loyalty, local SEM, and social media as the amplification layer. Every event became fuel for every other channel; the loyalty program turned regulars into measured frequency.",
    results: [
      { metric: "Returning customer share", value: "29% → 41%" },
      { metric: "Loyalty penetration", value: "7% → 23%" },
      { metric: "LTV:CAC", value: "~10×" },
      { metric: "2026 revenue forecast", value: "+10.3%" },
    ],
    services: [
      "Community Development",
      "Email & Lifecycle",
      "Loyalty Program",
      "Local SEM / SEO",
      "Social Media",
      "Influencer Marketing",
    ],

    subtitle:
      "Turning a 15-year-old local favorite into a retention-driven growth machine.",
    meta: [
      { label: "Client", value: "Lofty Coffee Co." },
      { label: "Location", value: "San Diego, CA" },
      { label: "Industry", value: "Multi-location café & specialty coffee roaster" },
      { label: "Service", value: "Community Growth Engine" },
      { label: "Engagement", value: "February 2025 – Present" },
    ],
    snapshot: {
      intro:
        "After 15 years of growing on craftsmanship and word of mouth alone, Lofty had never run a real marketing program. In our first year as their growth partner, we built one from zero — and reversed a multi-year decline in new-customer acquisition in a café market that was contracting around them.",
      bullets: [
        {
          value: "29% → 41%",
          label: "Returning customer share",
          detail:
            "Of the active base (2023→2025), tracking toward 62% in 2026 — a structural shift to retention-led.",
        },
        {
          value: "~70%",
          label: "Revenue from repeat customers",
          detail:
            "Up from ~60%. Repeat transactions climbed 84% → 88%, forecast to reach 92% of all orders.",
        },
        {
          value: "75.4% → 71.6%",
          label: "One-time-visitor rate",
          detail:
            "First movement in four years. Quarterly visits surged ~30% as the distribution finally broke.",
        },
        {
          value: "7% → 23%",
          label: "Loyalty penetration",
          detail:
            "Members visit 4.4× more often than the average customer — ~7,600 loyalty visits a month.",
        },
        {
          value: "+10.3%",
          label: "2026 revenue forecast",
          detail:
            "On +7.7% transactions — while the surrounding café market was estimated down 5–10%.",
        },
        {
          value: "~10×",
          label: "LTV:CAC ratio",
          detail:
            "9.5× in the 2025 model, on a ~$6.39 cost per new customer.",
        },
      ],
      media: {
        layout: "single",
        eyebrow: "Fig. 01 — Customer base, reshaped",
        items: [
          {
            placeholder: true,
            alt: "Customer frequency distribution",
            caption:
              "Frequency distribution shifting from one-time-heavy to repeat-driven for the first time in four years.",
          },
        ],
      },
    },
    background: {
      heading: "The brand — and the engine they hadn't built",
      paragraphs: [
        "Lofty is a premium San Diego coffee company with a 15-year head start on most of its competitors. Six locations — La Costa, Solana Beach (Cedros), Little Italy, Encinitas, State Street, and the Roasting Works — anchor the brand across the county, with coffee roasted in-house and a reputation built on doing the craft exceptionally well. They focus on sustainable practices, sourcing local and organic ingredients for a robust food menu and producing ethically sourced coffee.",
        "That reputation did a lot of heavy lifting. For a decade and a half, Lofty grew the way great neighborhood cafés grow: a good corner, a great cup, and customers who told their friends. Storefront and word of mouth were the entire engine.",
        "The problem with an engine you didn't build is that you can't tune it. When we analyzed a decade of transaction data — roughly 700,000 customer records and 3.3 million transactions — we found two things hiding underneath the strong brand. First, new-customer acquisition was decelerating — declining roughly −20% per year (2023 and 2024) as the post-COVID surge normalized and a soft café market pressed on everyone. Second, the customer base was being under-monetized: a database of ~700,000 people with almost no marketing relationship attached — fewer than 200 of them opted into email.",
        "In other words: a beloved brand, plateauing organic traffic, and an enormous untapped retention opportunity.",
      ],
      media: {
        layout: "single",
        eyebrow: "Fig. 02 — Six San Diego locations",
        items: [
          {
            placeholder: true,
            alt: "Lofty Coffee San Diego location footprint",
            caption: "Six locations anchor the brand across San Diego county, plus the Roasting Works.",
          },
        ],
      },
    },
    approach: {
      heading: "Approach — a growth system, not a list of tactics",
      intro:
        "We don't sell channels. We build a growth system — an integrated set of services that compound on each other — and for a multi-location café brand, that system runs on a single engine: community development. Lofty didn't have a brand problem. They had a customer-experience problem. People already loved the product. What was missing was the system to capture, nurture, and reward that love and turn it into measurable growth.",
      media: {
        layout: "single",
        eyebrow: "Fig. 03 — The Community Growth Engine",
        items: [
          {
            placeholder: true,
            alt: "Community Growth Engine funnel diagram",
            caption:
              "Community development sits at every funnel stage; every other service is fuel and amplification.",
          },
        ],
      },
      sections: [
        {
          title: "Community Development — the engine",
          body:
            "We turned community presence into a measured acquisition channel. Across 2025 we executed 31+ community events — booth activations, coffee donations, in-café events, and sponsorships — putting Lofty in front of tens of thousands of people in person at marquee San Diego moments: the Carlsbad 5000, the Del Mar Wine + Food Festival, the Del Mar Celebrity Pickleball Tournament, and a flagship Lofty 15-Year Anniversary celebration. Every event ran through a full operation — prospecting, vetting against brand fit and geography, Square POS coupon tracking, and post-event ROI measurement down to the café register — at an estimated $1.80–$3.59 cost per café visit. And every event carried a clear CTA feeding the retention system: loyalty sign-up, email opt-in, in-store offer redemption.",
          stat: {
            value: "5×",
            label: "Community event reach YoY · ~70K → ~350K impressions at lower total cost",
          },
          media: {
            layout: "pair",
            eyebrow: "Fig. 04 — Event activations",
            items: [
              { placeholder: true, alt: "Carlsbad 5000 activation" },
              { placeholder: true, alt: "15-year anniversary celebration" },
            ],
          },
        },
        {
          title: "Social Media",
          body:
            "Lofty had no real content program. We built one with a clear brief: put the café experience online and give the craft the production it deserves. Across both brands we published 200+ posts generating nearly half a million views. Event and community content consistently drove the highest reach, and seasonal launches plus the 15-year anniversary became repeatable social moments.",
          stat: {
            value: "+116%",
            label: "Lofty audience reach YoY (April)",
          },
        },
        {
          title: "Local SEM",
          body:
            "A true build-from-zero. Lofty started with near-nonexistent local SEO. We audited and optimized Google Business Profiles for all six locations, implemented schema and structured data, built local citations and links, ran lean Google Ads on high-intent local terms, and launched SMS-triggered Google review campaigns. The result: roughly 128K branded-search impressions (Apr–Dec), café-page redesigns, and neighborhood content to keep compounding.",
          stat: {
            value: "+28K / +19K",
            label: "Incremental searches — Little Italy / Carlsbad (Q3 YoY)",
          },
        },
        {
          title: "Email & Lifecycle Marketing",
          body:
            "Also built from zero. We stood up the full Klaviyo email + SMS infrastructure, segmented the Square POS base by visit frequency, and shipped a 4–7-send-per-month cadence of promo, seasonal, loyalty, and event-tied messaging. We paired this with a high-quality loyalty program — not \"buy 10, get 1 free,\" but exclusive access and experiences (early access to new blends, members-only events, branded merchandise) positioned as a reflection of Lofty's premium, community-driven brand.",
          stat: {
            value: "47.5%",
            label: "Email open rate · ~950K sent in 2025 (≈2× industry benchmark)",
          },
        },
        {
          title: "Loyalty Program",
          body:
            "Loyalty penetration grew from 7% to 23% of the customer base, with members visiting 4.4× more often than the average customer, compounding at ~5% month over month, and now driving ~7,600 loyalty visits a month out of roughly 42,000 total. The program is doing exactly what it was designed to do: drive frequency.",
          stat: {
            value: "7% → 23%",
            label: "Loyalty penetration · 4.4× visit frequency · ~7,600 monthly loyalty visits",
          },
        },
        {
          title: "Influencer Marketing",
          body:
            "We finalized a San Diego–focused influencer strategy (lifestyle, food, fitness, and surf-culture creators) and began activating local creators around events and launches — vetting, contracting, briefing, and cross-publishing to Lofty's owned channels, with the program structured to feed UGC back into social and email.",
          stat: {
            value: "0 → 6,000",
            label: "SMS subscribers grown in a single year",
          },
        },
      ],
    },
    resultsSection: {
      heading: "Results — a business that changed shape",
      body:
        "The headline isn't a single campaign — it's a business that changed shape. The frequency distribution that had been frozen for four straight years finally started moving: one-time visitors dropped from 75.4% to 71.6%, and quarterly visitors surged ~30%. That shift, plus the loyalty and email programs, drove returning customers from 29% to 41% of the active base — with returning customers now generating ~70% of revenue (up from ~60%) and repeat transactions up to 88%. 22% more new customers came back within their first year. Most importantly, this happened against a falling market: Lofty grew transactions and revenue YoY while comparable cafés were estimated down 5–10% — with March–May 2026 transactions up +12.0%, +9.8%, and +8.9% YoY and a full-year 2026 forecast of +10.3% revenue growth on +7.7% transactions. On a unit-economics basis, the program returns an estimated ~10× LTV:CAC ratio.",
      media: {
        layout: "single",
        eyebrow: "Fig. 05 — Trailing months",
        items: [
          {
            placeholder: true,
            alt: "Revenue and transactions trend",
            caption: "Revenue and transaction growth YoY against an estimated −5–10% café market.",
          },
        ],
      },
    },
    opportunity: {
      heading: "What the numbers mean",
      bullets: [
        "Retention drives revenue. Pushing repeat customers toward 70% of revenue proves that investing in lifecycle marketing directly increases sales without proportional increases in new-customer acquisition spend.",
        "Loyalty members visit more often. The steady growth in returning loyalty visits shows the program is doing exactly what it was designed to do: drive frequency.",
        "Community investment compounds. Reaching 5× more people while spending less overall shows the event strategy got sharper, not just bigger.",
        "Higher-value relationships compound. Deeper customer relationships mean more visits per customer and a more durable revenue base than new-customer acquisition alone could ever build.",
      ],
      closer:
        "Lofty proved that a strong brand and flat growth aren't a contradiction — they're an opportunity. The craft was already there. What was missing was a system to turn awareness into action, and action into habit. We built that system in a year, powered it with a community-development engine, and turned a 15-year-old favorite into a brand that's compounding again.",
    },
    footnote:
      "Metrics sourced from Square POS, Klaviyo, Google Search Console, BrightLocal, and Omni Common's integrated KPI dashboards and the Lofty Master Growth Analysis (June 2026). All performance figures are expressed as relative change.",
  },
];
