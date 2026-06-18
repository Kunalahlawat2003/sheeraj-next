// ============================================================================
//  SHEERAJ PROJECTS — SITE CONTENT (typed)
//  Ported from the live site + extended for the cinematic rebuild.
//  Swap copy / numbers / image paths freely. Images live in /public/images.
// ============================================================================

export const company = {
  name: "Sheeraj Projects",
  legalName: "Sheeraj Projects Private Limited",
  motto: "Building Establishments",
  tagline: "Building India's Infrastructure. Crafting Island Escapes.",
  theme: "Building the Roads That Connect India. Building the Destinations That Inspire It.",
  established: 2009,
  domain: "sheerajprojects.com",
  email: "info@sheerajprojects.com",
  careersEmail: "careers@sheerajprojects.com",
  phone: "+91 00000 00000",
  address: "Head Office, India",
  social: { linkedin: "#", instagram: "#", facebook: "#" },
  erpUrl: "#",
};

export type NavItem = {
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
  note?: string;
  tag?: string;
  children?: NavItem[];
};

export const nav: NavItem[] = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Andaman Projects", to: "/hospitality", tag: "New" },
  { label: "Careers", to: "/careers" },
  {
    label: "Resources",
    children: [
      { label: "Partners", to: "/#partners", note: "Trusted network" },
      { label: "Rent Machinery", to: "/#rental", note: "Plant & fleet" },
      { label: "ERP", to: "/erp", note: "Coming soon" },
    ],
  },
];

export const stats = [
  { value: 15, suffix: "+", label: "Years of engineering" },
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 850, suffix: " km", label: "Highways & canals built" },
  { value: 6, suffix: "", label: "States of operation" },
];

export type Service = {
  key: string;
  title: string;
  blurb: string;
  icon: IconName;
  span?: "wide" | "tall";
};

export const services: Service[] = [
  {
    key: "highways",
    title: "Highways & Expressways",
    blurb:
      "National and state highway packages, service roads, and high-speed corridors engineered for decades of service.",
    icon: "highway",
    span: "wide",
  },
  {
    key: "ring-roads",
    title: "Ring Roads",
    blurb:
      "Orbital corridors and grade separators that unclog cities and keep regions moving.",
    icon: "ring",
  },
  {
    key: "canals",
    title: "Water Canals",
    blurb:
      "Lined canals, distributaries, and water-management systems carrying life to farmland.",
    icon: "canal",
  },
  {
    key: "government",
    title: "Government & EPC",
    blurb:
      "A trusted EPC partner to public authorities — civic infrastructure delivered on time, to spec.",
    icon: "landmark",
  },
  {
    key: "infrastructure",
    title: "Heavy Civil Infrastructure",
    blurb:
      "Bridges, interchanges, and large-scale civil engineering executed with an in-house fleet.",
    icon: "crane",
  },
  {
    key: "hospitality",
    title: "Hospitality Development",
    blurb:
      "Luxury resorts and tropical architecture on the Andaman & Nicobar Islands.",
    icon: "palm",
    span: "wide",
  },
];

export const aboutHighlights = [
  "ISO-grade quality processes across every package",
  "In-house engineering, fleet & project-controls teams",
  "Safety-first culture with zero-harm targets",
  "On-time delivery backed by a 15-year track record",
];

export const buildSequence = [
  {
    no: "01",
    title: "Survey & Foundation",
    body: "Alignment is set, ground is broken, and the earth is shaped to grade.",
  },
  {
    no: "02",
    title: "Steel Rises",
    body: "Rebar cages and beams ascend — the skeleton of every structure we build.",
  },
  {
    no: "03",
    title: "Concrete & Carriageway",
    body: "Decks are poured, canals are lined, and lanes are laid kilometre by kilometre.",
  },
  {
    no: "04",
    title: "The Connection",
    body: "Bridges link, water flows, roads open — and a destination comes alive.",
  },
];

export const media = {
  heroImage: "/images/hero-infrastructure.jpg",
  aboutImage: "/images/about-engineering.jpg",
  hospitalityHero: "/images/hospitality-hero.jpg",
  hospitalityVideo: "/videos/hospitality-hero.mp4",
  islandAerial: "/images/island-aerial.jpg",
};

export const chairman = {
  name: "Chairman's Name",
  role: "Founder & Chairman",
  photo: "/images/chairman.jpg",
  shortQuote:
    "We don't just build structures — we build the confidence of every community we serve.",
};

export const hospitality = {
  headline: "Building Luxury Amid Paradise.",
  location: "Andaman & Nicobar Islands",
  intro:
    "Sheeraj brings the precision of infrastructure to the world of luxury hospitality. Our flagship resort on the Andaman & Nicobar Islands blends sustainable design, local craft, and engineering excellence into an escape that feels effortless — and is anything but.",
  features: [
    { title: "Beachfront Resorts", blurb: "Low-impact, high-luxury stays around turquoise waters.", icon: "palm" as IconName },
    { title: "Sustainable by Design", blurb: "Solar-ready systems, rainwater harvesting, local materials.", icon: "leaf" as IconName },
    { title: "Signature Experiences", blurb: "Overwater decks, infinity pools, wellness retreats.", icon: "sun" as IconName },
    { title: "Resilient Construction", blurb: "Coastal-grade structures built to marine durability standards.", icon: "shield" as IconName },
  ],
  image: "/images/island-aerial.jpg",
};

export type ProjectStatus = "Executed" | "Ongoing" | "Awarded";

export type Project = {
  name: string;
  category: string;
  location: string;
  status: ProjectStatus;
  year: string;
  blurb: string;
  image: string;
  featured?: boolean;
};

export const projects: Project[] = [
  // ── Executed (2) ──
  {
    name: "MP District Roads MDR-07 — Widening & Reconstruction (Package 2)",
    category: "Highways",
    location: "Madhya Pradesh",
    status: "Executed",
    year: "2020",
    blurb: "Widening and reconstruction of Madhya Pradesh district roads under Package 2 (MP-MDR-07).",
    image: "/images/project-highway.jpg",
  },
  {
    name: "Four-Laning of NH-8E, Mahuva–Kagavadar (Package III)",
    category: "Highways",
    location: "Gujarat",
    status: "Executed",
    year: "2025",
    blurb: "Balance four-laning works on the Mahuva–Kagavadar section of NH-8E.",
    image: "/images/project-expressway.jpg",
  },

  // ── Ongoing (3) ──
  {
    name: "Remodeling of WJC Augmentation Canal (NABARD RIDF XXV)",
    category: "Canals",
    location: "Haryana",
    status: "Ongoing",
    year: "Mar 2026",
    blurb: "Remodeling of the augmentation canal main branch from Hamida Head to Picholia Head.",
    image: "/images/project-canal.jpg",
  },
  {
    name: "KMP Link Elevated Road — Spur to Delhi–Mumbai Expressway",
    category: "Highways",
    location: "Haryana",
    status: "Ongoing",
    year: "Jun 2026",
    blurb: "Elevated road with service roads forming the KMP link spur to the Delhi–Mumbai Expressway.",
    image: "/images/hero-infrastructure.jpg",
  },
  {
    name: "Jaipur Ring Road (NH-148C) — Two Interchanges",
    category: "Ring Roads",
    location: "Rajasthan",
    status: "Ongoing",
    year: "Jun 2026",
    blurb: "Balance works on two interchanges of the Jaipur Ring Road (NH-148C).",
    image: "/images/project-expressway.jpg",
  },

  // ── Awarded (4) ──
  {
    name: "5-Star Eco-Tourism Resort, Shaheed Dweep Island (PPP)",
    category: "Hospitality",
    location: "Andaman & Nicobar Islands",
    status: "Awarded",
    year: "75-yr concession",
    blurb: "A 5-star eco-tourism resort on Shaheed Dweep Island, developed on a PPP basis.",
    image: "/images/resort-overwater.jpg",
  },
  {
    name: "Megapode Resort, Sri Vijaya Puram (DBFOT)",
    category: "Hospitality",
    location: "Andaman & Nicobar Islands",
    status: "Awarded",
    year: "50-yr concession",
    blurb: "Design, build, finance, operate & transfer of the Megapode Resort at Sri Vijaya Puram.",
    image: "/images/island-aerial.jpg",
  },
  {
    name: "Four-Laning of GGM–Alwar Road (NH-248A), Nuh",
    category: "Highways",
    location: "Haryana",
    status: "Awarded",
    year: "LOA issued",
    blurb: "Four-laning and strengthening of the GGM–Alwar road (NH-248A) near Nuh.",
    image: "/images/project-highway.jpg",
  },
  {
    name: "Six-Lane Flyovers & EC, Indore (Pigdambar–Dhanmod)",
    category: "Bridges",
    location: "Madhya Pradesh",
    status: "Awarded",
    year: "LOA awaited",
    blurb: "Six-laning with flyovers and elevated corridors across the Pigdambar–Dhanmod stretch.",
    image: "/images/project-bridge.jpg",
  },
];

export const partners = [
  "Aurelia Infra",
  "Meridian Steel",
  "TerraForm EPC",
  "Vayu Logistics",
  "Coastline Materials",
  "Stratus Consulting",
  "Granite & Co.",
  "Helios Energy",
];

export const machinery = [
  "Excavator",
  "Bulldozer",
  "Wheel Loader",
  "Motor Grader",
  "Soil Compactor / Roller",
  "Concrete Batching Plant",
  "Tower / Crawler Crane",
  "Tipper / Dumper",
  "Asphalt Paver",
];

export const careers = {
  intro:
    "Sheeraj is growing — across infrastructure and a brand-new hospitality vertical. If you want to build things that last, we want to meet you.",
  openings: [
    { title: "Project Engineer — Highways", location: "Project Site, India", type: "Full-time" },
    { title: "Site Engineer — Hospitality", location: "Andaman & Nicobar Islands", type: "Full-time" },
    { title: "Quantity Surveyor", location: "India", type: "Full-time" },
    { title: "Safety Officer", location: "Multiple Sites", type: "Full-time" },
  ],
};

export const contact = {
  intro:
    "Whether you're a public authority, a project partner, or planning your next escape — we'd love to hear from you.",
  offices: [
    { label: "Head Office", value: company.address },
    { label: "Hospitality Division", value: "Andaman & Nicobar Islands" },
  ],
};

// ============================================================================
//  HOSPITALITY PAGE — full cinematic showcase content
// ============================================================================
export const hospitalityPage = {
  hero: {
    eyebrow: "Andaman & Nicobar Islands",
    sub: "An aerial flyover of turquoise lagoons and white sand — where heavy machinery is quietly shaping a beachfront resort that will feel like it was always here.",
  },
  vision: {
    eyebrow: "The Vision",
    title: "We build the roads that connect India — and the shores that restore it.",
    body: "Sheeraj is translating two decades of civil-engineering discipline into a new language: barefoot luxury. Our flagship island resort is engineered with the same rigour as a national highway, then dissolved into the landscape until only the experience remains.",
    points: [
      "Designed around the tide, the reef and the prevailing breeze",
      "Built to coastal-grade durability for every monsoon season",
      "Crafted with island materials and island hands",
    ],
  },
  masterplan: {
    eyebrow: "The Masterplan",
    title: "One island. Seven worlds.",
    intro:
      "A low-density plan that touches the ground lightly — villas tucked into the treeline, suites floating over the lagoon, and a wild reef left exactly as we found it.",
    zones: [
      { name: "Arrival Jetty", blurb: "A timber pier where the journey begins.", x: 20, y: 70, icon: "anchor" as IconName },
      { name: "Beachfront Villas", blurb: "Sand-level suites under the palms.", x: 38, y: 52, icon: "palm" as IconName },
      { name: "Overwater Suites", blurb: "Decks suspended above the lagoon.", x: 62, y: 40, icon: "droplet" as IconName },
      { name: "Lagoon Infinity Pool", blurb: "Water that meets the horizon.", x: 50, y: 62, icon: "pool" as IconName },
      { name: "Wellness Sanctuary", blurb: "A spa folded into the forest.", x: 74, y: 64, icon: "flower" as IconName },
      { name: "Marine Centre", blurb: "Reef research & guided dives.", x: 80, y: 30, icon: "fish" as IconName },
      { name: "Island Dining", blurb: "Open-fire kitchens on the shore.", x: 30, y: 34, icon: "sun" as IconName },
    ],
  },
  architecture: {
    eyebrow: "Tropical Architecture",
    title: "Structures that disappear into the landscape.",
    intro:
      "Deep eaves, cross-ventilation and locally fired clay — climate-responsive design that needs less, lasts longer, and frames the view rather than blocking it.",
    items: [
      { title: "Beachfront Villas", blurb: "Private pools, sand-level living, palm-shaded decks.", image: "/images/exp-beach-villa.jpg" },
      { title: "Overwater Decks", blurb: "Glass floors, direct lagoon access, sunrise alignment.", image: "/images/exp-overwater-deck.jpg" },
      { title: "The Grand Arrival", blurb: "An open pavilion that breathes with the sea breeze.", image: "/images/resort-overwater.jpg" },
    ],
  },
  sustainability: {
    eyebrow: "Sustainable by Design",
    title: "Luxury that gives more than it takes.",
    intro:
      "Every system is engineered to tread lightly on a fragile island ecosystem — because paradise is the asset we're protecting.",
    items: [
      { title: "Solar-Ready Power", blurb: "Rooftop arrays and storage sized for off-grid resilience.", icon: "sun" as IconName },
      { title: "Rainwater Harvesting", blurb: "Monsoon capture and greywater reuse across the estate.", icon: "droplet" as IconName },
      { title: "Reef-Safe Construction", blurb: "Silt barriers and zero-discharge marine works.", icon: "fish" as IconName },
      { title: "Local Craft & Materials", blurb: "Island timber, clay and stone, worked by island artisans.", icon: "leaf" as IconName },
      { title: "Coastal-Grade Resilience", blurb: "Structures rated for cyclone and salt for decades.", icon: "shield" as IconName },
      { title: "Low-Impact Footprint", blurb: "Under 18% built area; the rest left wild.", icon: "palm" as IconName },
    ],
  },
  amenities: {
    eyebrow: "Luxury Amenities",
    title: "Every reason to never leave.",
    items: [
      { title: "Lagoon Infinity Pool", image: "/images/exp-infinity-pool.jpg", blurb: "An edge that vanishes into the sea." },
      { title: "Overwater Deck", image: "/images/exp-overwater-deck.jpg", blurb: "Sunrise yoga above the reef." },
      { title: "Forest Wellness Spa", image: "/images/exp-wellness.jpg", blurb: "Treatments scented with island botanicals." },
      { title: "Shoreline Dining", image: "/images/exp-island-dining.jpg", blurb: "Open-fire kitchens, feet in the sand." },
      { title: "Marine Discovery", image: "/images/exp-marine.jpg", blurb: "Guided dives on a living reef." },
      { title: "Beachfront Villa", image: "/images/exp-beach-villa.jpg", blurb: "Your own stretch of private shore." },
    ],
  },
  construction: {
    eyebrow: "Construction Process",
    title: "Watch paradise being built.",
    intro:
      "The same fleet that lays our highways is, right now, shaping a coastline — phase by phase, with engineering precision.",
    phases: [
      { no: "01", title: "Reclaim & Foundation", body: "Coastal-grade piles and platforms rise from the sand; the shoreline is shaped and stabilised." },
      { no: "02", title: "Structure & Villas", body: "Cranes lift the frames as beachfront villas and overwater decks take shape over the lagoon." },
      { no: "03", title: "Water & Landscape", body: "Infinity pools fill, lagoons are sculpted, and thousands of palms are planted by hand." },
      { no: "04", title: "The Reveal", body: "Lights warm the shoreline, the doors open, and the island becomes a destination." },
    ],
  },
  expansion: {
    eyebrow: "Future Expansion",
    title: "A horizon that keeps growing.",
    phases: [
      { year: "2024", title: "Groundbreaking", body: "Site mobilisation and foundation works begin on the flagship island." },
      { year: "2026", title: "Phase I Opening", body: "Beachfront villas, the lagoon pool and the arrival pavilion welcome first guests." },
      { year: "2028", title: "Overwater & Wellness", body: "Overwater suites and the forest spa extend the estate across the lagoon." },
      { year: "2030", title: "Island Network", body: "A second island and marine sanctuary join the Sheeraj hospitality collection." },
    ],
  },
  gallery: [
    "/images/island-aerial.jpg",
    "/images/resort-overwater.jpg",
    "/images/exp-infinity-pool.jpg",
    "/images/exp-overwater-deck.jpg",
    "/images/exp-beach-villa.jpg",
    "/images/exp-wellness.jpg",
    "/images/exp-island-dining.jpg",
    "/images/exp-marine.jpg",
  ],
  investment: {
    eyebrow: "Investment Opportunity",
    title: "Own a stake in the islands' future.",
    body: "A rare opportunity to invest in India's emerging luxury-island market, backed by an EPC builder with a fifteen-year delivery record. Branded residences and equity participation available for Phase I.",
    stats: [
      { value: 40, suffix: " acres", label: "Flagship island estate" },
      { value: 120, suffix: " keys", label: "Villas & overwater suites" },
      { value: 18, suffix: "%", label: "Maximum built footprint" },
      { value: 2026, suffix: "", label: "Phase I opening" },
    ],
  },
};

// ============================================================================
//  LEADERSHIP / TEAM
// ============================================================================
export type Person = {
  name: string;
  role: string;
  photo: string;
  message: string;
};

export const team = {
  chairman: {
    name: "Rajeev Sheeraj",
    role: "Founder & Chairman",
    photo: "/images/chairman.jpg",
    message:
      "Everything bearing the Sheeraj name is built to outlast us. That quiet promise — made when we laid our first kilometre of highway — still guides every decision we make, from canals and corridors to the shores of the Andamans.",
  } as Person,
  directors: [
    { name: "Director One", role: "Managing Director", photo: "/images/about-engineering.jpg", message: "We treat every project as infrastructure for the next generation — engineered to a standard, never just a deadline." },
    { name: "Director Two", role: "Director — Operations", photo: "/images/project-highway.jpg", message: "Our fleet and field teams turn drawings into roads, season after season, without ever cutting a corner." },
    { name: "Director Three", role: "Director — Hospitality", photo: "/images/resort-overwater.jpg", message: "On the islands we build experiences as carefully as we have always built bridges." },
    { name: "Director Four", role: "Director — Engineering", photo: "/images/project-bridge.jpg", message: "Precision is a culture here. It lives in the way we plan, pour and finish every structure." },
  ] as Person[],
  ca: {
    name: "S. Menon",
    role: "Chief Financial Officer · Chartered Accountant",
    photo: "/images/project-government.jpg",
    message:
      "Disciplined finance is the foundation beneath every structure we deliver — transparent, audited, and built for the long term.",
  } as Person,
};

export const chairmanMessage = {
  name: team.chairman.name,
  role: team.chairman.role,
  photo: team.chairman.photo,
  signature: team.chairman.name,
  paragraphs: [
    "When we laid our first kilometre of highway, we made a quiet promise: that everything bearing the Sheeraj name would be built to outlast us. Fifteen years on, that promise still guides every decision we make.",
    "Today, that same discipline carries us into a new chapter. As we shape resorts on the shores of the Andaman & Nicobar Islands, we bring the rigour of infrastructure to the artistry of hospitality — engineering experiences as carefully as we have always engineered roads, canals, and bridges.",
    "Our people remain our proudest achievement. Their craftsmanship, their integrity, and their refusal to cut corners are the real foundation of this company.",
    "To our partners and clients: thank you for trusting us to build what matters. The best of Sheeraj is still ahead.",
  ],
};

// ============================================================================
//  SERVICES — detail content for the dedicated page
// ============================================================================
export const serviceDetail: Record<string, { points: string[]; image: string }> = {
  highways: {
    points: ["NH & SH packages, service roads and high-speed corridors", "Flexible & rigid pavements to IRC standards", "Drainage, safety furniture and intelligent road systems"],
    image: "/images/project-highway.jpg",
  },
  "ring-roads": {
    points: ["Orbital corridors & city bypasses", "Grade separators and interchanges", "Congestion relief for growing regions"],
    image: "/images/project-expressway.jpg",
  },
  canals: {
    points: ["Lined main canals & distributary networks", "Cross-drainage and regulating structures", "Assured irrigation across thousands of hectares"],
    image: "/images/project-canal.jpg",
  },
  government: {
    points: ["Turnkey EPC delivery for public authorities", "Civic and public-works infrastructure", "On-time, to-spec, fully audited"],
    image: "/images/project-government.jpg",
  },
  infrastructure: {
    points: ["RCC and pre-stressed concrete bridges", "Interchanges, culverts and grade separators", "Large-scale civil works with an in-house fleet"],
    image: "/images/project-bridge.jpg",
  },
  hospitality: {
    points: ["Beachfront & overwater resort construction", "Tropical, climate-responsive architecture", "Coastal-grade, sustainable building systems"],
    image: "/images/resort-overwater.jpg",
  },
};

// ============================================================================
//  PROJECT DETAIL
// ============================================================================
export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export type ProjectDetail = {
  overview: string;
  scope: string[];
  gallery: string[];
  facts: { label: string; value: string }[];
  timeline: { phase: string; label: string }[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  "andaman-island-resort": {
    overview:
      "Our flagship luxury resort on a pristine Andaman island — beachfront villas, overwater suites, a lagoon infinity pool and a wellness sanctuary, engineered to coastal-grade durability and built to disappear into the landscape.",
    scope: ["40-acre low-density masterplan", "Beachfront & overwater villas", "Lagoon infinity pool & marine centre", "Solar-ready, reef-safe systems"],
    gallery: ["/images/resort-overwater.jpg", "/images/exp-infinity-pool.jpg", "/images/exp-overwater-deck.jpg", "/images/island-aerial.jpg"],
    facts: [
      { label: "Location", value: "Andaman & Nicobar Islands" },
      { label: "Status", value: "Ongoing · Phase I" },
      { label: "Keys", value: "120 villas & suites" },
      { label: "Opening", value: "2026" },
    ],
    timeline: [
      { phase: "2024", label: "Groundbreaking & foundations" },
      { phase: "2025", label: "Villas & overwater structures" },
      { phase: "2026", label: "Phase I opening" },
    ],
  },
  "state-highway-corridor": {
    overview:
      "A multi-lane state-highway corridor with service roads, drainage and safety furniture, delivered ahead of schedule to exacting IRC standards.",
    scope: ["Multi-lane carriageway", "Service roads & junctions", "Drainage & safety furniture", "Road-marking & signage"],
    gallery: ["/images/project-highway.jpg", "/images/project-expressway.jpg", "/images/project-bridge.jpg"],
    facts: [
      { label: "Location", value: "India" },
      { label: "Status", value: "Executed" },
      { label: "Length", value: "Multi-lane corridor" },
      { label: "Year", value: "2022" },
    ],
    timeline: [
      { phase: "Survey", label: "Alignment & earthwork" },
      { phase: "Build", label: "Pavement & structures" },
      { phase: "Open", label: "Handover" },
    ],
  },
  "major-irrigation-canal": {
    overview:
      "A lined main canal and distributary network expanding assured irrigation across thousands of hectares of farmland.",
    scope: ["Lined main canal", "Distributary network", "Cross-drainage structures", "Regulating gates"],
    gallery: ["/images/project-canal.jpg", "/images/project-government.jpg"],
    facts: [
      { label: "Location", value: "India" },
      { label: "Status", value: "Executed" },
      { label: "Command area", value: "Thousands of ha" },
      { label: "Year", value: "2021" },
    ],
    timeline: [
      { phase: "Excavation", label: "Canal prism" },
      { phase: "Lining", label: "Concrete lining" },
      { phase: "Commission", label: "Water release" },
    ],
  },
  "river-bridge-and-approaches": {
    overview:
      "A pre-stressed concrete bridge with reinforced approaches connecting communities across the river.",
    scope: ["Pre-stressed concrete superstructure", "Pile foundations", "Reinforced approaches", "Crash barriers & lighting"],
    gallery: ["/images/project-bridge.jpg", "/images/project-highway.jpg"],
    facts: [
      { label: "Location", value: "India" },
      { label: "Status", value: "Awarded" },
      { label: "Type", value: "PSC bridge" },
      { label: "Year", value: "2025" },
    ],
    timeline: [
      { phase: "Foundations", label: "Piling & pier caps" },
      { phase: "Spans", label: "Girder launch" },
      { phase: "Open", label: "Deck & handover" },
    ],
  },
  "public-infrastructure-package": {
    overview:
      "Turnkey civic works delivered as EPC partner to the public authority — on time and to specification.",
    scope: ["Turnkey EPC", "Civic infrastructure", "Utilities & roads", "Quality & safety controls"],
    gallery: ["/images/project-government.jpg", "/images/project-canal.jpg"],
    facts: [
      { label: "Location", value: "India" },
      { label: "Status", value: "Awarded" },
      { label: "Delivery", value: "Turnkey EPC" },
      { label: "Year", value: "2025" },
    ],
    timeline: [
      { phase: "Design", label: "Detailed engineering" },
      { phase: "Build", label: "Execution" },
      { phase: "Handover", label: "Commissioning" },
    ],
  },
  "expressway-package": {
    overview:
      "A high-speed corridor package featuring structures, interchanges and intelligent road systems.",
    scope: ["High-speed corridor", "Interchanges & structures", "Intelligent transport systems", "Tolling readiness"],
    gallery: ["/images/project-expressway.jpg", "/images/project-highway.jpg", "/images/project-bridge.jpg"],
    facts: [
      { label: "Location", value: "India" },
      { label: "Status", value: "Ongoing" },
      { label: "Type", value: "Expressway" },
      { label: "Year", value: "2023–" },
    ],
    timeline: [
      { phase: "Earthwork", label: "Formation" },
      { phase: "Structures", label: "Interchanges" },
      { phase: "Surfacing", label: "Pavement & ITS" },
    ],
  },
  "coastal-ring-road": {
    overview:
      "An orbital ring road with grade separators and service roads, easing congestion around a fast-growing coastal city.",
    scope: ["Orbital carriageway", "Grade separators & junctions", "Service roads & drainage", "Safety furniture & lighting"],
    gallery: ["/images/hero-infrastructure.jpg", "/images/project-expressway.jpg", "/images/project-highway.jpg"],
    facts: [
      { label: "Location", value: "India" },
      { label: "Status", value: "Ongoing" },
      { label: "Type", value: "Ring road" },
      { label: "Year", value: "2024–" },
    ],
    timeline: [
      { phase: "Earthwork", label: "Formation & embankment" },
      { phase: "Structures", label: "Grade separators" },
      { phase: "Surfacing", label: "Pavement & furniture" },
    ],
  },
  "elevated-metro-viaduct": {
    overview:
      "An elevated mass-transit viaduct of precast segmental spans threading through a dense urban corridor — awarded and mobilising.",
    scope: ["Precast segmental spans", "Pile & pier foundations", "Station structures", "Erection by launching girder"],
    gallery: ["/images/about-engineering.jpg", "/images/project-bridge.jpg", "/images/project-expressway.jpg"],
    facts: [
      { label: "Location", value: "India" },
      { label: "Status", value: "Awarded" },
      { label: "Type", value: "Metro viaduct" },
      { label: "Year", value: "2025" },
    ],
    timeline: [
      { phase: "Mobilise", label: "Casting yard & survey" },
      { phase: "Substructure", label: "Piles & piers" },
      { phase: "Superstructure", label: "Segment erection" },
    ],
  },
  "national-highway-package": {
    overview:
      "A greenfield national-highway package with major structures, awarded and mobilising for execution to IRC/MoRTH standards.",
    scope: ["Greenfield carriageway", "Major & minor bridges", "Interchanges & culverts", "Road safety & ITS"],
    gallery: ["/images/project-highway.jpg", "/images/project-expressway.jpg", "/images/project-bridge.jpg"],
    facts: [
      { label: "Location", value: "India" },
      { label: "Status", value: "Awarded" },
      { label: "Type", value: "National highway" },
      { label: "Year", value: "2025" },
    ],
    timeline: [
      { phase: "Mobilise", label: "Survey & DPR review" },
      { phase: "Earthwork", label: "Formation" },
      { phase: "Structures", label: "Bridges & pavement" },
    ],
  },
};

// ============================================================================
//  CAREERS — jobs with detail for the dedicated page
// ============================================================================
export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobDepartments = ["All", "Engineering", "Hospitality", "Operations", "Safety", "Finance"];
export const jobLocations = ["All", "Project Site, India", "Andaman & Nicobar Islands", "Head Office", "Multiple Sites"];
export const jobTypes = ["All", "Full-time", "Contract"];

export const jobs: Job[] = [
  {
    slug: "project-engineer-highways",
    title: "Project Engineer — Highways",
    department: "Engineering",
    location: "Project Site, India",
    type: "Full-time",
    summary: "Lead execution of highway packages from earthwork to surfacing, owning quality, schedule and safety on site.",
    responsibilities: ["Plan and supervise daily site execution", "Coordinate survey, quantities and quality control", "Drive schedule adherence and zero-harm safety"],
    requirements: ["B.E./B.Tech Civil with 4+ years on highways", "Strong knowledge of IRC/MoRTH specifications", "Hands-on site leadership experience"],
  },
  {
    slug: "site-engineer-hospitality",
    title: "Site Engineer — Hospitality",
    department: "Hospitality",
    location: "Andaman & Nicobar Islands",
    type: "Full-time",
    summary: "Execute coastal-grade resort construction — villas, decks and pools — to luxury finishes on a remote island site.",
    responsibilities: ["Supervise structural and finishing works", "Manage marine-grade and reef-safe methods", "Coordinate with architects and consultants"],
    requirements: ["B.E./B.Tech Civil with 3+ years", "Finishing & MEP coordination experience", "Willingness to be island-based"],
  },
  {
    slug: "quantity-surveyor",
    title: "Quantity Surveyor",
    department: "Operations",
    location: "Head Office",
    type: "Full-time",
    summary: "Own measurement, billing and cost control across multiple infrastructure packages.",
    responsibilities: ["Prepare BOQs, measurements and bills", "Manage subcontractor reconciliation", "Track cost vs. budget and variations"],
    requirements: ["Diploma/Degree in Civil with QS experience", "Strong Excel and BBS/estimation skills", "Eye for detail and contracts"],
  },
  {
    slug: "safety-officer",
    title: "Safety Officer",
    department: "Safety",
    location: "Multiple Sites",
    type: "Full-time",
    summary: "Champion a zero-harm culture across active sites through training, audits and rigorous compliance.",
    responsibilities: ["Conduct toolbox talks and inductions", "Run safety audits and incident reviews", "Maintain statutory HSE compliance"],
    requirements: ["Diploma in Industrial Safety (ADIS)", "3+ years on construction sites", "Strong communication and firmness"],
  },
  {
    slug: "finance-executive",
    title: "Finance Executive",
    department: "Finance",
    location: "Head Office",
    type: "Full-time",
    summary: "Support accounting, compliance and reporting under the CFO across the group's projects.",
    responsibilities: ["Maintain ledgers and reconciliations", "Assist GST/TDS and statutory filings", "Support MIS and audit cycles"],
    requirements: ["B.Com / Inter-CA", "Tally/ERP and GST working knowledge", "2+ years in construction finance preferred"],
  },
];

export type IconName =
  | "highway"
  | "ring"
  | "canal"
  | "landmark"
  | "crane"
  | "palm"
  | "leaf"
  | "sun"
  | "shield"
  | "wave"
  | "droplet"
  | "fish"
  | "anchor"
  | "flower"
  | "pool";
