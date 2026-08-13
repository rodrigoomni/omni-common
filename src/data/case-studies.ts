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
  /** Optional homepage thumbnail — falls back to `image` when unset. */
  thumbnail?: string;
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
    /** Optional section heading override — falls back to "The wins at a glance." Supports inline HTML markup. */
    heading?: string;
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
    /** Optional eyebrow override, e.g. "03 — Omni Common's Approach". Defaults to "03 — Approach". */
    eyebrow?: string;
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
    image: "/images/case-studies-thumbnails/numberbarn.webp",
    thumbnail: "/images/case-studies-thumbnails/numberbarn.webp",
    images: ["/images/case-studies-thumbnails/numberbarn.webp"],
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
      { label: "Industry", value: "Telecom / Virtual phone numbers" },
      { label: "Engagement", value: "Q4 2024 – Present" },
      { label: "Focus", value: "Search-Led Growth Engine" },
      { label: "Channels", value: "SEO · Digital PR · Content · Landing Page UXO · Paid Search" },
    ],
    snapshot: {
      heading:
        "<span class=\"rt-blue\">The Main Problem:</span> &lsquo;Paid&rsquo; was becoming too expensive for obtaining customers",
      intro:
        "<p class=\"rt-subheading\">Problem</p><p>Before Omni Common, NumberBarn was growing, yet paying heavily for it through increasingly expensive Paid search. In a short window of time, their Sales &amp; Marketing budget had nearly doubled.</p><p>While their revenue was growing, their YoY growth rate had fallen four years running (40.7% → 29.5% → 20.0% → 13.3%). Their no-investment trajectory for 2025 was projected at +1.5%–7.4%. As 80%–85% of their revenue is re-acquired from new buyers each year, they were spending more to grow less.</p><p class=\"rt-subheading\">Omni Common&rsquo;s Solution</p><p>The fix wasn&rsquo;t more spend, it was changing the mix. Omni Common&rsquo;s thesis: <b class=\"rt-blue\">shift customer acquisition toward Organic</b><span class=\"rt-blue\">.</span> (There, the cost to land a customer runs <span class=\"rt-dark\">~4× lower</span>.) <b class=\"rt-navy\">In year one</b>, <b class=\"rt-navy\">we reversed a multi-year slowdown and completely rebuilt their marketing trends</b>, allowing their growth to compound by itself, rather than having to be repurchased again and again.</p>",
      bullets: [
        {
          value: "−69%",
          label: "Account CAC, YoY",
          detail: "The key lever in an acquisition-led business.",
        },
        {
          value: "+270%",
          label: "Net-New Buyers",
          detail: "3,664 → 13,544 · Unique buying accounts +35% YoY.",
        },
        {
          value: "+20%",
          label: "Total Purchases YoY (GA)",
          detail: "Organic search purchases +51%, Paid +42%.",
        },
        {
          value: "46 → 60",
          label: "Domain Rating",
          detail: "+14 pts in 24 months · Top-3 keywords ~4× (~500 → ~2,000).",
        },
        {
          value: "+288%",
          label: "Search Impressions",
          detail: "Organic clicks ~+105% (trailing 90 days YoY).",
        },
        {
          value: "+1,100%",
          label: "ChatGPT-Referred Purchases",
          detail: "Converting 68% above site average, now the 6th-highest purchase driver.",
        },
      ],
    },
    background: {
      heading: "A Big Ship With Slowing Momentum",
      paragraphs: [
        "<b class=\"rt-blue\">NumberBarn is a phone number marketplace, specializing in helping people purchase, store, and forward numbers.</b> They also serve business owners tools to improve their marketing and business tech stack.",
        "When Omni Common first came on the scene, NumberBarn stored all their customer data, but didn't fully know <b>WHO</b> their customers were, <b>WHAT</b> mattered to them, or <b>HOW</b> to talk to them. (No worries, that&rsquo;s a surprisingly common problem.)",
        "In addition, their marketing channels were calibrated in such a way where long-term growth was unlikely. Their company vitals were getting all jumbled up.",
        "<ul class=\"cs-bullets\"><li><b>Channel mix was dangerously Paid-heavy:</b> Paid 50% of transactions / 45% of revenue; Organic only 27% of transactions. A large tracked Direct bucket masked a thin Organic base.</li><li><b>Customer Acquisition Cost (CAC) was climbing:</b> There was no structural mechanism to bring down CAC with Paid being dominant and Organic being flat, YoY.</li><li><b>Average Order Value &ldquo;decline&rdquo; misread:</b> Price per phone number barely moved; number of sales per customer actually fell because of an influx of first-time single-number buyers, a true-blue sign of successful acquisition in action, not a pricing problem!</li><li><b>Untapped landing-page opportunity:</b> Area-code pages were on broken query-string URLs; a full set of pages designed/written/built, yet none had gone live.</li></ul>",
      ],
      media: {
        layout: "single",
        eyebrow: "Fig. 01",
        items: [
          {
            src: "/images/numberbarn-background.webp",
            alt: "The NumberBarn marketplace prior to engagement",
            caption: "The NumberBarn marketplace prior to engagement — strong assets, no clear picture of where growth was coming from.",
          },
        ],
      },
    },
    approach: {
      eyebrow: "03 — Omni Common's Approach",
      heading: "Data Sorting + SEO + Spend = Organic Growth",
      intro:
        "<p><b class=\"rt-blue\">The very first thing we did was analyze their mountain of unsorted data</b>. Anywhere we found gaps, we developed customer surveys and conducted customer interviews to develop a full-funnel understanding of their consumer make-up. We mapped their customer&rsquo;s journey at every touch point, <b>in writing</b>.</p><p>After doing this, we identified specific needs and patterns, which we then used to create Ideal Customer Profiles (ICPs) and marketing message mapping. (Science!)</p><p>After we had a mathematical breakdown of their behaviors, we discovered a key differentiator between different customer segments. There were customers who <em>wanted</em> to buy, store, forward a number and those who <em>needed</em> to, based on certain life circumstances. A simple, but important distinction.</p><p><b class=\"rt-blue\">Second, we identified, designed, and internally executed on four interdependent deliverables that we calculated would multiply organically</b>. These were: Technical, Content Marketing (i.e., blog posts), Digital PR, and Landing-page UXO. (We also managed Paid spend alongside their marketing channels to reinforce rather than cannibalize site traffic, because we&rsquo;re smart like that.)</p><p><b>Finally, we set out to untangle their marketing spend and set it correctly across all their channels.</b></p><p>The through line in their data, stagnant growth wasn&rsquo;t a brand problem, it was a channel-mix problem. Fix the mix, fix the unit economics.</p><p><b>Here&rsquo;s what happened:</b></p>",
      sections: [
        {
          title: "Rebuild Content Marketing",
          body: "<p>We wrote 49 blog posts in 2025 (yes, researched and written by a real person, not AI). We sorted them by two main tracks: &ldquo;purchase-adjacent education&rdquo; + &ldquo;refresh/consolidation&rdquo;. In addition, we tightened the publishing/QA pipeline, aligned terminology and topic selection with client&rsquo;s editorial lead, culled and consolidated thin/dated posts (SEO hygiene), and shipped a blog redesign.</p><p><b class=\"rt-blue\">The result?</b> Blog traffic rose +234% YoY (Q4&rsquo;25 vs. Q4&rsquo;24), with ~48K Google visits and 4.1M impressions.</p>",
          stat: { value: "+234%", label: "Blog traffic YoY · <b class=\"rt-green\">4.1M</b> impressions" },
        },
        {
          title: "Digital PR & Link Building",
          body: "<p>We drove NumberBarn Domain Rating (DR) from 46 → 60 and seeded very important AI-discovery signals.</p><p><b class=\"rt-blue\">Here&rsquo;s how it happened:</b> 147 earned links at DR 71+. Examples of original data-driven campaigns: Ghosting (125 placements), Debt Collection Calls and Phone Bills (avg. DR ~80s), Robocalls and Phone Etiquette (sustained broadcast/publisher coverage).</p>",
          stat: { value: "557", label: "Links from <b class=\"rt-green\">464</b> domains · avg. DR <b class=\"rt-green\">69.73</b>" },
        },
        {
          title: "Technical SEO",
          body: "<p>We conducted: 12 technical batches across the year, surfacing 33 optimizations (i.e., template, crawl, indexing, Core Web Vitals), internal-linking automation for topical clusters, content consolidation redirecting/merging 58 older posts.</p><p><b class=\"rt-blue\">This all established new single-day Organic-click highs:</b> 1,197 (July 2025) → 1,680 (Oct 2025). Impressions grew +288%, Organic clicks grew ~+105% (90-day YoY).</p>",
          stat: { value: "+288%", label: "Search impressions · 90-day YoY" },
        },
        {
          title: "Landing Page UXO & CRO",
          body: "<p>17 top-level landing pages were rewritten, redesigned, and coded for commercial intent (i.e., vanity, local/geo, toll-free, area-code, search, call-forwarding, purchase-and-port, lawyers, roofing). This development was included at no up-charge, plug-and-play ready.</p><p><b class=\"rt-blue\">In one example</b>, &ldquo;/local&rdquo; launched Aug 2025, and is currently bringing in 100K+ monthly searches.</p>",
          stat: { value: "17", label: "Landing pages built · <b class=\"rt-green\">100K+</b> monthly searches" },
        },
        {
          title: "Paid Search (PPC)",
          body: "<p>We took full account ownership of their Paid channels. We returned non-branded campaigns to maximize conversion value w/ tROAS, did continuous query/keyword hygiene, executed top keywords focus with exact-match tests, implemented ad-copy testing, and sorted promo alignment for on-sale numbers.</p><p><b class=\"rt-blue\">All this created the best efficiency in three years</b>: CPA ~−27%, ROAS ~+26% YoY on lower spend.</p><p>In Q2 2025, nine months into the engagement, Google Ads efficiency hit a record CPA down 28% year over year ($28.02 to $20.04) and ROAS up 23% (2.86x to 3.52x), achieved on 17% less spend.</p>",
          stat: { value: "<span class=\"rt-green\">+26%</span> ROAS", label: "On <b class=\"rt-green\">−27%</b> CPA. Best efficiency in 3 years." },
        },
      ],
    },
    resultsSection: {
      heading: "What Omni Common Accomplished",
      body: "<p><b>Overall Results:</b> Growth was quickly decelerating. We reversed and accelerated it.</p><p><b>Calculated together, the solutions we prescribed and executed compounded.</b> Total purchases were up: +20% YoY, Organic +51%, and Paid +42%. The number that best ties it together is account Customer Acquisition Cost (CAC), <b>down a massive 69%</b>! For a business that needs to re-acquire most of its revenue each year (people don&rsquo;t necessarily buy new phone numbers every year), acquisition cost governs everything.</p><p>The channels we built also worked well in tandem: Organic + Paid together converted at 17.5%, compared to Organic previously converting at 4.2% by itself. Not only that, but a new tailwind arrived half-way through the year: &ldquo;AI discovery&rdquo;! ChatGPT-referred purchases were up +1,100% YoY, with a 4.23% conversion rate (68% above site average), and is now the 6th-highest purchase driver.</p><p>It all worked so well, we continue to work as their growth partner on new opportunities to this day!</p>",
      media: {
        layout: "single",
        eyebrow: "Fig. 03 — Trailing 12 months",
        items: [
          {
            src: "/images/numberbarn-results.webp",
            alt: "Compounded performance across organic and paid search",
            caption: "Compounded performance across organic and paid search, year over year.",
          },
        ],
      },
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
    thumbnail: "/images/case-studies-thumbnails/rapid.webp",
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
      heading: "What Omni Common Accomplished",
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
    thumbnail: "/images/case-studies-thumbnails/talitha.webp",
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
      heading: "What Omni Common Accomplished",
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
      heading: "Takeaway",
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
    thumbnail: "/images/case-studies-thumbnails/lofty.webp",
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
      heading: "What Omni Common Accomplished",
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
  {
    slug: "trio-flatmount",
    title: "TRIO Flatmount",
    category: "Consumer Electronics · Starlink Mounting Systems",
    color: "#374151",
    thumbnail: "/images/case-studies-thumbnails/trio.webp",
    cursorHint: "−23% → +48% YoY orders",
    cursorColors: { fill: "#374151", stroke: "#111827" },
    year: "2026",
    client: "TRIO Flatmount",
    tagline:
      "Turning a declining order line into TRIO's best year on record.",
    overview:
      "How Omni Common reversed a multi-quarter drop in orders, then rebuilt the acquisition mix underneath it — so the growth gets cheaper as it scales.",
    challenge:
      "TRIO's early paid-search advantage had eroded: orders were running 23% below the prior year through the first half of 2025 while paid spend rose against it. Roughly 70% of customers had never heard of TRIO before they bought, competitors were outranking the brand on the exact transactional terms buyers search, and four platforms reported four different numbers for the same month — so no budget conversation could get past being an argument.",
    solution:
      "Three moves, in order. Build the brand the product had outgrown — identity, voice, personas, and positioning. Build the number — a triangulation model that reconciles Shopify, GA4, Fairing, Google Ads, and Meta into one channel-by-channel view of where orders actually come from. Then shift acquisition from paid toward organic, where TRIO's cost to land a customer runs a small fraction of paid. Paid search carries the recovery in the near term while SEO's J-curve builds. That's the Search-Led Growth Engine: paid buys a transaction once, search buys compounding.",
    results: [
      { metric: "YoY order growth", value: "−23% → +48%" },
      { metric: "Search-attributed orders", value: "~4×" },
      { metric: "Gross transactions vs. plan", value: "+16%" },
      { metric: "Net Promoter Score", value: "56" },
    ],
    services: [
      "Growth Platform & Brand Identity",
      "Attribution & Measurement",
      "Website & UX",
      "Technical SEO",
      "Content Marketing",
      "Digital PR & Link Building",
      "Paid Search & Social",
      "Influencer Marketing",
    ],

    subtitle:
      "Turning a declining order line into TRIO's best year on record — by rebuilding the brand, the measurement, and the acquisition mix underneath it.",
    meta: [
      { label: "Client", value: "TRIO Flatmount" },
      { label: "Industry", value: "Starlink mounting systems · direct-to-consumer + dealer" },
      { label: "Service", value: "Search-Led Growth Engine" },
      { label: "Engagement", value: "October 2025 – Present" },
    ],
    snapshot: {
      intro:
        "TRIO's paid-search advantage had eroded and orders were 23% below the prior year through H1 2025, while every channel dashboard told a different story. In our first three quarters, we reversed the decline, beat the growth model we sold against, and started shifting the acquisition mix toward the channel that gets cheaper over time. Every month of 2026 came in above the prior year.",
      bullets: [
        {
          value: "−23% → +48%",
          label: "YoY order growth",
          detail: "Same-month, Jan–Jun, so seasonality is controlled for — a 71-point swing.",
        },
        {
          value: "2,273 → 3,356",
          label: "Jan–Jun orders",
          detail: "2026 didn't just recover — it cleared 2024's pre-decline volume of 2,950.",
        },
        {
          value: "~4×",
          label: "Search-attributed orders",
          detail: "87 (Oct '25) → 385 (Jun '26); ~46% of the attributed mix by spring.",
        },
        {
          value: "+16%",
          label: "Gross transactions vs. forecast",
          detail: "4,315 actual against ~3,720 modeled (Oct '25–Jun '26); net-new ran +12%.",
        },
        {
          value: "+41%",
          label: "SEO transactions vs. forecast",
          detail: "228 vs. 162 net-new; May organic sessions came in 10× the forecast.",
        },
        {
          value: "4 of 4",
          label: "Months paid beat plan",
          detail: "Mar–Jun conversion goals all cleared, with CPA falling from $117 to ~$92.",
        },
      ],
      media: {
        layout: "single",
        eyebrow: "Fig. 01 — Order line, reversed",
        items: [
          {
            placeholder: true,
            alt: "Monthly orders 2025 vs. 2026",
            caption:
              "Every month of 2026 above the prior year; June the best on record.",
          },
        ],
      },
    },
    background: {
      heading: "A great product in a market that had just gotten crowded",
      paragraphs: [
        "TRIO Flatmount builds low-profile Starlink mounting systems — flat mounts, speed mounts, mini mounts, pole and interior mounts — engineered to hold a dish at highway speed on trucks, vans, RVs, and boats. It's a considered, high-ticket purchase: roughly a $300 first order from a buyer who researches before they commit, sold direct on Shopify alongside a growing dealer and wholesale channel.",
        "For a while, being early was enough. TRIO owned a niche that barely existed, paid search found the few people looking, and the ROAS was extraordinary. Then the category filled in. Competitors arrived with better backlink profiles and started taking the transactional keywords. Starlink cut hardware prices, which quietly repriced every accessory around it. Paid search kept spending against a shrinking edge — and because nobody could agree on what any channel was actually producing, there was no way to argue for moving the money somewhere better.",
      ],
      media: {
        layout: "single",
        eyebrow: "Fig. 02 — The product line",
        items: [
          {
            placeholder: true,
            alt: "TRIO Flatmount product family",
            caption:
              "Flat, speed, mini, pole, and interior mounts — engineered for highway-speed use.",
          },
        ],
      },
    },
    approach: {
      heading: "Build the brand. Build the number. Then move the money.",
      intro:
        "We started with measurement, because nothing else could be decided without it. In one month, the same set of orders was reported as 111 Google-organic purchases by Shopify and 36 by GA4; Meta claimed 127 paid orders where Shopify and GA4 both saw about 30. Any budget conversation built on those numbers was going to be an argument, not a decision. So we built a triangulation model that reconciles all five sources — Shopify as the volume source of truth, with GA4, the Fairing post-purchase survey, Google Ads, and Meta distributing that total across channels by proportional contribution. Then we ran the engine. The brand and the site came first — there's no point sending better traffic to a page that can't convert it, or spending against a name nobody remembers — and paid search was rebuilt to carry acquisition through the winter while four interdependent organic systems compounded underneath: technical SEO, content, digital PR, and ongoing UXO.",
      media: {
        layout: "single",
        eyebrow: "Fig. 03 — The Search-Led Growth Engine",
        items: [
          {
            placeholder: true,
            alt: "Search-Led Growth Engine diagram",
            caption:
              "Paid buys a transaction once; search buys compounding. The mix shifts toward organic as it takes share.",
          },
        ],
      },
      sections: [
        {
          title: "Growth Platform & Brand Identity",
          body:
            "A product that sells without a brand is selling on borrowed time. Roughly 70% of TRIO's customers had never heard of the brand before they bought — they arrived off a search, compared boxes, and picked one. That works beautifully until competitors show up, and then it's the whole problem: nothing about TRIO was memorable enough to be chosen on purpose. So we built the foundation the product had outgrown — a full Growth Platform: customer personas grounded in survey and interview data, a buyer's-journey map, a sales-funnel model, a message map, market analysis and positioning, a visual brand guide, and a voice-and-tone guide. TRIO's voice came out of that work as three pillars — Steady, Conversant, Catalytic. The client's own term for the finished guide was their \"North Star\": every page, ad, article, and creator brief downstream of it argues the same way.",
          stat: {
            value: "7 · 3",
            label: "Foundational deliverables · brand voice pillars governing every channel",
          },
        },
        {
          title: "Attribution & Measurement",
          body:
            "We replaced four contradictory dashboards with one number. The triangulation model reconciles Shopify, GA4, Fairing, Google Ads, and Meta monthly, and it's the reason every budget increase from February onward was a calculation rather than a guess. It also surfaced channels the platforms couldn't see at all — word-of-mouth, YouTube, and AI assistants only exist in self-reported survey data. That last point stopped being academic fast: post-purchase survey responses showed creators and YouTube driving roughly 21.6% of reported discovery, and those buyers almost always completed the purchase through a Google ad or an organic result. Under last-click, every one of those sales was paid search's trophy. Creators were making demand and search was collecting it — an argument for funding both rather than defending one. Alongside it we built a forecast-versus-actuals model on both a net-new and gross basis, so performance is measured against the plan TRIO actually bought.",
          stat: {
            value: "5 sources",
            label: "Reconciled monthly · 21.6% of discovery credited to creators last-click missed entirely",
          },
        },
        {
          title: "Website, UX & Technical SEO",
          body:
            "We rebuilt the storefront around how people actually shop for a mount. The old site opened on a full-bleed hero and a \"select your antenna\" row — handsome, but it asked first-time visitors to figure out which of four mounts fit their dish and vehicle before seeing a price. Our process is fixed: keyword and persona research first, captured in a content MAP; then a full high-fidelity mockup; then a content brief; then we build it in Shopify ourselves. The new homepage went live November 12, 2025, leading with the job to be done — a mount-finder grid showing every model with price, rating, and finish; then durability proof; then the accessories that complete a build. Underneath: a top nav rebuilt by use case and vehicle type, a routed \"choose your own adventure\" flow, PDPs rewritten highest-traffic-first, add-to-cart logic that requires an attachment, a faceted PLP, monthly technical batches (crawl, indexing, internal linking, H1s, broken links), Merchant Center extended into Canada, and heat mapping in early so the next change gets argued from behavior.",
          stat: {
            value: "1.78% → 2.6%",
            label: "PLP conversion rate · +93% revenue from that page · unranked → #3 on \"Starlink mount\"",
          },
        },
        {
          title: "Paid Search & Social",
          body:
            "We took full account ownership and scaled spend only as fast as the economics allowed. Budget moved from roughly $20K/month in February to $30K in March, $40K in May, and $45K in June — each step gated on the prior month's CPA, not on optimism. We restructured the whole account: paused wasteful targeting, repaired conversion tracking, pulled high-converting keywords out of PMAX into dedicated Search campaigns for control, and split campaigns to separate new-customer cost from retargeting. Cohort analysis showed two distinct buyers — 66% convert within 24 hours, 17% take twelve days or more — so we ran two directions at once: urgency for the fast decision-makers, technical proof for the researchers still comparing mounts a week later. Volume beat the goal every month from March through June while CPA fell: 227 conversions at $117 in March, 310 at $96 in April, 403 at $98 in May, and 496 at $92 in June — TRIO's best month on record.",
          stat: {
            value: "496 / $92",
            label: "June conversions vs. 428 goal · CPA vs. $105 target",
          },
        },
        {
          title: "Content Marketing",
          body:
            "We wrote for the searches buyers actually run before a $300 purchase — installation guides, surface-by-surface how-tos, and product comparisons, published on a cadence that built topical depth rather than volume. Boating articles recovered lost rankings for mini-mount terms; a Starlink Roam guide generated nearly 20,000 impressions on its own; an RV article A/B test settled which page should own the intent. We also built search-led video: a TRIO-versus-OEM pole-mount comparison shot in a deliberately plain, credible style, published to answer a query rather than to chase views. It now surfaces in Google AI Overviews, and 43% of its views arrive from Google Search.",
          stat: {
            value: "+84% / +132%",
            label: "MoM organic purchases (Mar → Apr) · clicks on a single refreshed page",
          },
        },
        {
          title: "Digital PR & Link Building",
          body:
            "Domain authority was the constraint, so we went after it directly. Competitors were winning transactional keywords on the strength of their backlink profiles, not their pages. We ran original data campaigns pitched to national and industry press — pivoting the angle when a TRIO-specific dataset failed to land and a broader, more shareable one did — and we deliberately pursued high-relevance, low-authority niche sites like Starlink installers, where topical fit outweighs the metric. The program also opened inbound doors, including product reviews and Q&As in the RV and tech press.",
          stat: {
            value: "4",
            label: "Placements in a single month · plus sustained inbound coverage",
          },
        },
        {
          title: "Influencer Marketing",
          body:
            "We built a creator pipeline where the audience already owns the problem. Van life first, then deliberately outward into marine, hunting and off-road, and construction and fleet — matching TRIO's expanding retail and dealer footprint. Creators receive product with affiliate links; the point isn't affiliate conversion, it's showing a real mount at real highway speed to people who'd otherwise improvise one. The signal that it's working shows up where it should: named creators started appearing in TRIO's post-purchase survey responses as the reason people bought.",
          stat: {
            value: "94 → 19",
            label: "Creators prospected · active collaborations in a single month",
          },
        },
      ],
    },
    resultsSection: {
      heading: "What Omni Common Accomplished",
      body:
        "TRIO's orders were falling. We reversed it, and then beat the plan. Same-month year-over-year growth swung 71 points — from −23% across the first half of 2025 to +48% across the first half of 2026 — and 2026 didn't merely recover, it cleared TRIO's pre-decline 2024 volume. Against the growth model we sold against, gross transactions came in 16% ahead of forecast and net-new transactions 12% ahead, with June the best month for orders and revenue in company history. The more durable result is the mix: search-attributed orders grew roughly 4× from the fall 2025 trough to spring 2026, reaching about 46% of attributed orders, and SEO delivered 41% more net-new transactions than forecast — May organic sessions ran ten times the modeled number. Because organic acquires a customer at a small fraction of paid cost, every point of share it takes pulls the blended cost of the whole engine down. Paid didn't get worse while that happened; it got better, beating its conversion goal in each of the last four months at a falling CPA. A new channel arrived on its own: self-reported purchases from AI assistants went from one to three a month to 19 in March alone, and publishing an llms.txt file in June correlated with a sharp rise in AI-driven impressions. And the brand caught up to the product: branded search impressions grew more than 30% over a two-month stretch, and the customer survey returned an NPS of 56 — an excellent score, above the consumer goods and services benchmark.",
      media: {
        layout: "single",
        eyebrow: "Fig. 04 — Mix shift, in progress",
        items: [
          {
            placeholder: true,
            alt: "Attributed orders by channel, Oct 2025 vs. Jun 2026",
            caption:
              "Search-attributed orders grew ~4× and reached ~46% of the attributed mix; paid CPA fell from $117 to ~$92.",
          },
        ],
      },
    },
    opportunity: {
      heading: "The takeaway",
      bullets: [
        "TRIO's problem was never the product — it was that roughly seven in ten customers bought without knowing whose product it was.",
        "A brand worth remembering means the product gets chosen on purpose, not stumbled into.",
        "One number, five sources, agreed in advance turns budget decisions into arithmetic instead of argument.",
        "Shifting from rented growth in paid search into owned growth in organic makes every future order cheaper to acquire.",
      ],
      closer:
        "Nine months in, the decline is behind them, the plan is beaten, and the engine is getting cheaper to run. That's the point of a search-led engine — the growth compounds instead of resetting every time the budget does.",
    },
    footnote:
      "Metrics sourced from Shopify, GA4, Google Ads, Meta, the Fairing post-purchase survey, and Omni Common's triangulation attribution model (2025–2026). Forecast comparisons are measured against the growth model presented at engagement start. All performance figures are expressed as relative change.",
  },
];
