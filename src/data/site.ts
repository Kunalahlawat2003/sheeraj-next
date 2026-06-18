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
  children?: NavItem[];
};

export const nav: NavItem[] = [
  { label: "About", to: "/#about" },
  { label: "Services", to: "/#services" },
  { label: "Projects", to: "/#projects" },
  { label: "Hospitality", to: "/#hospitality" },
  { label: "Careers", to: "/#careers" },
  {
    label: "Resources",
    children: [
      { label: "Partners", to: "/#partners", note: "Trusted network" },
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

export type Project = {
  name: string;
  category: string;
  location: string;
  status: "Ongoing" | "Completed";
  year: string;
  blurb: string;
  image: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Andaman Island Resort",
    category: "Hospitality",
    location: "Andaman & Nicobar Islands",
    status: "Ongoing",
    year: "2024–",
    blurb:
      "Our flagship luxury resort — beachfront villas, wellness spaces, and sustainable systems on a pristine island.",
    image: "/images/resort-overwater.jpg",
    featured: true,
  },
  {
    name: "State Highway Corridor",
    category: "Highways",
    location: "India",
    status: "Completed",
    year: "2022",
    blurb: "Multi-lane carriageway with service roads, drainage, and safety furniture, delivered ahead of schedule.",
    image: "/images/project-highway.jpg",
  },
  {
    name: "Major Irrigation Canal",
    category: "Canals",
    location: "India",
    status: "Completed",
    year: "2021",
    blurb: "Lined main canal and distributary network expanding assured irrigation across thousands of hectares.",
    image: "/images/project-canal.jpg",
  },
  {
    name: "River Bridge & Approaches",
    category: "Bridges",
    location: "India",
    status: "Completed",
    year: "2020",
    blurb: "Pre-stressed concrete bridge with reinforced approaches connecting communities across the river.",
    image: "/images/project-bridge.jpg",
  },
  {
    name: "Public Infrastructure Package",
    category: "Government",
    location: "India",
    status: "Completed",
    year: "2019",
    blurb: "Turnkey civic works delivered as EPC partner to the public authority, on time and to specification.",
    image: "/images/project-government.jpg",
  },
  {
    name: "Expressway Package",
    category: "Highways",
    location: "India",
    status: "Ongoing",
    year: "2023–",
    blurb: "High-speed corridor featuring structures, interchanges, and intelligent road systems.",
    image: "/images/project-expressway.jpg",
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
