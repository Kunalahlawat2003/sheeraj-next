// ============================================================================
//  SHEERAJ PROJECTS — SITE CONTENT (typed)
//  Ported from the live site + extended for the cinematic rebuild.
//  Swap copy / numbers / image paths freely. Images live in /public/images.
// ============================================================================

// Static image imports — Next hashes the file CONTENTS, so replacing the file
// busts the cache automatically (no stale optimized copy). Prefer this over a
// bare "/images/..." string for any image you expect to swap out.
import andaman1 from "../../public/images/1.jpeg";
import andaman2 from "../../public/images/2.jpeg";
import andaman3 from "../../public/images/3.jpeg";
import andaman5 from "../../public/images/andaman/5.png";
import andamanVision from "../../public/images/andaman/vision.jpg";

export const company = {
  name: "SHEERAJ Projects",
  legalName: "SHEERAJ Projects Private Limited",
  motto: "Building Establishments",
  tagline: "Building India's Infrastructure. Crafting Island Escapes.",
  theme: "Building the Roads That Connect India. Building the Destinations That Inspire It.",
  established: 2016,
  domain: "sheerajprojects.com",
  email: "info@sheerajprojects.com",
  careersEmail: "careers@sheerajprojects.com",
  phone: "+91-9355125999",
  address: "1411, Tower 1, DLF Corporate Greens, Sector 74A, Gurugram, Haryana - 122004",
  social: {
    instagram: "https://www.instagram.com/sheerajprojectspvtltd",
    youtube: "https://www.youtube.com/@SheerajProjects",
    facebook: "https://www.facebook.com/people/Sheeraj-Projects-Private-Limited/61556815384432/",
    linkedin: "https://www.linkedin.com/company/sheeraj-projects-pvt-ltd",
  },
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
      { label: "ERP", to: "https://sppl.enway.org/index.php"},
      { label: "Form 5A", href: "/Form 5A.pdf", external: true, note: "Download PDF" },
    ],
  },
];

export const stats = [
  { value: 10, suffix: "+", label: "Years of engineering" },
  { value: 2, suffix: "+", label: "Projects delivered" },
  { value: 97.59, suffix: " km", label: "Highways & canals built" },
  { value: 5, suffix: "", label: "States of operation" },
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
    title: "Elevated Corridors",
    blurb:
      "Orbital corridors and grade separators that unclog cities and keep regions moving.",
    icon: "ring",
  },
  {
    key: "canals",
    title: "Irrigation Canals",
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
  {
    key: "real-estate",
    title: "Real Estate Development",
    blurb:
      "Transforming rare destinations into world-class luxury villa communities defined by beauty, comfort, and exclusivity.",
    icon: "real-estate",
  },
];

export const aboutHighlights = [
  "ISO-compliant quality management across every contract package",
  "In-house engineering, heavy machinery fleet, and logistics asset control",
  "Safety-first operating culture with strict zero-incident targets",
  "Turnkey delivery backed by a solid 10-year multi-terrain track record",
];

export const buildSequence = [
  {
  no: "01",
  title: "Vision & Planning",
  body: "Every destination begins with careful planning, site evaluation, and a vision shaped around its unique surroundings.",
},
{
  no: "02",
  title: "Design & Development",
  body: "Master plans take shape as architecture, infrastructure, and landscape design come together to define the community.",
},
{
  no: "03",
  title: "Construction & Craftsmanship",
  body: "Luxury villas, amenities, and supporting infrastructure are built with precision, quality, and attention to every detail.",
},
{
  no: "04",
  title: "A Destination Realized",
  body: "The completed development emerges as a distinctive destination where exceptional design meets unforgettable experiences.",
},
];

export const media = {
  heroImage: "/images/hero-infrastructure.jpg",
  aboutImage: "/images/about-engineering.jpg",
  hospitalityHero: "/images/hospitality-hero.jpg",
  hospitalityVideo: "/videos/hospitality-hero.mp4",
  islandAerial: "/images/island-aerial2.jpg",
};

export const chairman = {
  name: "Chairman's Name",
  role: "Founder & Chairman",
  photo: "/images/chairman-Sir.jpg",
  shortQuote:
    "We don't just clear pathways or construct layouts—we build infrastructure that drives national economic growth.",
};

export const hospitality = {
  headline: "Building Luxury Amidst Paradise.",
  location: "Andaman & Nicobar Islands",
  intro:
    "SHEERAJ brings the precision of infrastructure to the world of luxury hospitality. Our flagship resort on the Andaman & Nicobar Islands blends sustainable design, local craft, and engineering excellence into an escape that feels effortless — and is anything but.",
  features: [
    { title: "Beachfront Resorts", blurb: "Low-impact, high-luxury stays around turquoise waters.", icon: "palm" as IconName },
    { title: "Sustainable by Design", blurb: "Solar-ready systems, rainwater harvesting, local materials.", icon: "leaf" as IconName },
    { title: "Signature Experiences", blurb: "Overwater decks, infinity pools, wellness retreats.", icon: "sun" as IconName },
    { title: "Resilient Construction", blurb: "Coastal-grade structures built to marine durability standards.", icon: "shield" as IconName },
  ],
  image:"/images/andaman/destination.jpg",
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
  coverPosition?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  // ── Executed (2) ──
  {
    name: "Madhya Pradesh Road Development Corporation — Widening & Reconstruction of District Road",
    category: "Highways",
    location: "Madhya Pradesh",
    status: "Executed",
    year: "2020",
    blurb: "Widening and reconstruction of district road under Madhya Pradesh Road Development Corporation.",
    image: "/images/mp/1.jpeg",
  },
  {
    name: "National Highways Authority of India — Construction of Four Laning of NH-8E, Mahuva–Kagavadar",
    category: "Highways",
    location: "Gujarat",
    status: "Executed",
    year: "2025",
    blurb: "Balance four-laning works on the Mahuva–Kagavadar section of NH-8E.",
    image: "/images/mahuva/1.jpeg",
  },

  // ── Ongoing (3) ──
  {
    name: "Haryana Irrigation & Water Resources Department — Remodeling of Augmentation Canal",
    category: "Canals",
    location: "Haryana",
    status: "Ongoing",
    year: "Mar 2026",
    blurb: "Remodeling of the augmentation canal main branch from HAmidsta Head to Picholia Head.",
    image: "/images/karnal/1.jpeg",
  },
  {
    name: "Public Works Department — Construction of Elevated Road",
    category: "Highways",
    location: "Haryana",
    status: "Ongoing",
    year: "Jun 2026",
    blurb: "Construction of elevated road with service road from Delhi–Agra NH-19 to DND–Faridabad–Ballabhgarh bypass KMP link (spur to Delhi–Mumbai Expressway) via Ballabhgarh–Mohna Road. ₹163.00 Cr for the Public Works Department.",
    image: "/images/faridabad/2.jpg",
  },
  {
    name: "National Highway Authority of India — Construction of Two Number of Interchanges",
    category: "Ring Roads",
    location: "Rajasthan",
    status: "Ongoing",
    year: "Jun 2026",
    blurb: "Balance works on two interchanges of the Jaipur Ring Road (NH-148C).",
    image: "/images/jaipur/jaipur-ring-road-1.jpg",
  },

  // ── Awarded (4) ──
  {
    name: "ANIIDCO — Development of 5-Star Eco-Tourism Resort",
    category: "Hospitality",
    location: "Andaman & Nicobar Islands",
    status: "Awarded",
    year: "75-yr concession",
    blurb: "A 5-star eco-tourism resort on Shaheed Dweep Island, developed on a PPP basis.",
    image: "/images/Shaheed/shaheed-1.jpeg",
    coverPosition: "left center",
  },
  {
    name: "ANIIDCO — Design, Build, Finance, Operate and Transfer of Megapode Resort",
    category: "Hospitality",
    location: "Andaman & Nicobar Islands",
    status: "Awarded",
    year: "50-yr concession",
    blurb: "Design, build, finance, operate & transfer of the Megapode Resort at Sri Vijaya Puram.",
    image: "/images/megapode/megapode-1.jpeg",
  },
  {
    name: "MoRTH — Construction of 4 Lane with Paved Shoulders",
    category: "Highways",
    location: "Haryana",
    status: "Awarded",
    year: "LOA issued",
    blurb: "Four-laning and strengthening of the GGM–Alwar road (NH-248A) near Nuh.",
    image: "/images/nuh/1.png",
  },
  {
    name: "NHAI — Construction of 6-Lane Elevated Corridor",
    category: "Bridges",
    location: "Madhya Pradesh",
    status: "Awarded",
    year: "LOA awaited",
    blurb: "Six-laning with flyovers and elevated corridors across the Pigdambar–Dhanmod stretch.",
    image: "/images/indore/1.jpeg",
  },
];

export const partners: { name: string; logo?: string }[] = [
  { name: "Volvo",          logo: "/images/fleetPartners/VOLVO.jpg" },
  { name: "Ashok Leyland",  logo: "/images/fleetPartners/ASHOK-LEYLAND.jpg" },
  { name: "Liugong",        logo: "/images/fleetPartners/liugong.png" },
  { name: "Linnhoff",       logo: "/images/fleetPartners/LINNHOFF.png" },
  { name: "JCB",            logo: "/images/fleetPartners/JCB.png" },
  { name: "Tata Motors",    logo: "/images/fleetPartners/TATA-MOTORS.jpg" },
  { name: "Terex",          logo: "/images/fleetPartners/TEREX.jpg" },
  { name: "Caterpillar",    logo: "/images/fleetPartners/CATERPILLAR.jpg" },
  { name: "Schwing Stetter",logo: "/images/fleetPartners/SCHWING-STETTER.png" },
  { name: "Mahindra",       logo: "/images/fleetPartners/MAHINDRA.png" },
  { name: "Apollo",         logo: "/images/fleetPartners/apollo.png" },
  { name: "Putzmeister",    logo: "/images/fleetPartners/putzmeister.jpg" },
  { name: "Ammann",         logo: "/images/fleetPartners/ammann.png" },
];

export const bankers: { name: string; logo?: string }[] = [
  { name: "HDFC Bank",           logo: "/images/bank/HDFC-BANK.jpg" },
  { name: "IndusInd Bank",       logo: "/images/bank/INDUSIND-BANK.png" },
  { name: "Yes Bank",            logo: "/images/bank/YES.jpg" },
  { name: "ICICI Bank" },
  { name: "IDFC First Bank",     logo: "/images/bank/IDFC-FIRST-BANK.png" },
  { name: "Axis Bank",           logo: "/images/bank/AXIS-BANK.jpg" },
  { name: "Punjab National Bank",logo: "/images/bank/PNB-BANK.jpg" },
  { name: "Deutsche Bank",       logo: "/images/bank/deutsche-bank_thumb.webp" },
  { name: "Oxyzo Bank",          logo: "/images/bank/oxyzo.webp" },
];

export const machinery: { group: string; items: string[] }[] = [
  {
    group: "Tipper Truck",
    items: ["Tata Tipper Truck", "Mahindra Tipper Truck", "Ashok Leyland Tipper Truck"],
  },
  { group: "Transit Mixer", items: ["Tata Mixer"] },
  { group: "Shifting Trailor", items: ["Ashok Leyland Shifting Trailor"] },
  { group: "Water Tanker", items: ["Tata Water Tanker"] },
  { group: "Transit Trailer", items: ["Tata Transit Trailer"] },
  {
    group: "Diesel Tanker",
    items: ["Tata Diesel Tanker", "Ashok Leyland Diesel Tanker"],
  },
  { group: "Camper", items: ["Mahindra Camper"] },
  { group: "Motor Bike", items: ["Hero Motor Bike", "Honda Motor Bike", "Bajaj Motor Bike"] },
  { group: "Tractors", items: ["Tractor Broomer", "Tractor Dewatering", "Tractor Holland"] },
  {
    group: "Wheel Loader",
    items: ["JCB Wheel Loader", "Liugong Wheel Loader", "Backhoe Loader"],
  },
  { group: "Roller", items: ["Wirtgen Roller"] },
  { group: "Soil Compactor", items: ["Wirtgen Soil Compactor"] },
  { group: "Grader", items: ["CAT Grader", "Mahindra Grader"] },
  {
    group: "Excavator",
    items: [
      "CAT Excavator",
      "Komatsu Excavator",
      "Volvo Excavator",
      "Kobelco Excavator",
      "Tata Hitachi Excavator",
      "L&T Excavator",
    ],
  },
  { group: "Crane", items: ["Escorts Crane"] },
  { group: "Stone Crusher", items: ["Metsu Stone Crusher", "Puzzolana Stone Crusher"] },
  {
    group: "Batching Plant",
    items: [
      "Aquarious Batching Plant",
      "Conmet Batching Plant",
      "Liebherr Batching Plant",
      "Schwing Stetter Batching Plant",
    ],
  },
  { group: "Hot Mix Plant", items: ["Everest Hot Mix Plant"] },
  { group: "Sand Washing Plant", items: ["CDE Sand Washing Plant"] },
  {
    group: "Paver",
    items: ["Volvo Paver", "Ingersoll Paver", "Wirtgen Paver", "Appollo Paver", "Conmet Paver"],
  },
  { group: "Texture Curing Machine", items: ["Kiwi Texture Curing Machine"] },
  { group: "Concrete Pump", items: ["Sany Concrete Pump", "Putzmeister Concrete Pump"] },
  { group: "Air Compressor", items: ["Sany Air Compressor", "Ingersoll"] },
  { group: "Tower Light", items: ["Ingersoll Tower Light"] },
  {
    group: "Diesel Generator Set",
    items: [
      "Jackson Diesel Generator Set",
      "Koel Diesel Generator Set",
      "Powerica Diesel Generator Set",
      "Kirloskar Diesel Generator Set",
      "CAT Diesel Generator Set",
      "Field Marshall Diesel Generator Set",
      "Mahindra Diesel Generator Set",
    ],
  },
  {
    group: "Other Machines",
    items: [
      "TMC",
      "Bitumen Bouser",
      "Service Van",
      "Dewatering Pump",
      "Kerb Lying machine",
      "Baby Roller",
      "JCB Telehandler",
    ],
  },
];

export const careers = {
  intro:
    "SHEERAJ is growing — across infrastructure and a brand-new hospitality vertical. If you want to build things that last, we want you on our team.",
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
    sub: "Amidst lush green forests, turquoise lagoons, and pristine white-sand beaches, we are quietly crafting beachfront destinations through sustainable eco-engineering, creating places that feel as though they have always been part of the landscape.",
  },
  vision: {
    eyebrow: "The Vision",
    title: "Curated with care, designed to inspire, and destined to be remembered for a lifetime.",
    body: "At SHEERAJ, every resort is envisioned as more than a destination. It is a carefully curated experience where architecture, nature, and hospitality come together effortlessly.",
    image: andamanVision,
    points: [
      "Designed around nature, wellness, and relaxation",
      "Created for timeless elegance and enduring value",
      "Rooted in local character and global standards",
    ],
  },
  masterplan: {
    eyebrow: "The Masterplan",
    title: "One island. Seven worlds.",
    intro:
      "A low-density plan that touches the ground lightly — villas tucked into the treeline, suites floating over the lagoon, and a wild reef left exactly as we found it.",
    zones: [
      { name: "Arrival Jetty", blurb: "A timber pier where the journey begins.", x: 28, y: 28, icon: "anchor" as IconName },
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
    title: "Building world-class resorts inspired by nature.",
    intro:
      "SHEERAJ specializes in the development and construction of premium hospitality destinations. From beachfront villas and overwater experiences to iconic arrival spaces, every project is designed to blend seamlessly with its surroundings while meeting the highest standards of quality and craftsmanship.",
    items: [
      { title: "Luxury Resort Development", blurb: "End-to-end development of world-class hospitality destinations.", image: andaman1, fit: "contain" },
      { title: "Construction & Project Execution", blurb: "Delivering complex resort projects with precision, quality, and efficiency.", image: andaman2, fit: "contain" },
      { title: "Destination Infrastructure", blurb: "Creating the infrastructure that transforms locations into thriving destinations.", image: andaman3, fit: "contain" },
    ],
  },
  sustainability: {
    eyebrow: "SHEERAJ Difference",
    title: "Building exceptional destinations through vision, precision, and craftsmanship.",
    intro:
      "From concept to completion, SHEERAJ develops hospitality projects that balance architectural elegance, construction excellence, and environmental responsibility—creating destinations designed to inspire for decades.",
    items: [
      { title: "Strategic Planning", blurb: "Every development begins with detailed planning and feasibility analysis.", icon: "landmark" as IconName },
      { title: "Quality Construction", blurb: "Premium materials, skilled execution, and uncompromising standards.", icon: "crane" as IconName },
      { title: "Sustainable Practices", blurb: "Responsible development that respects natural surroundings.", icon: "leaf" as IconName },
      { title: "Local Integration", blurb: "Projects designed to celebrate regional culture and craftsmanship.", icon: "flower" as IconName },
      { title: "Coastal Expertise", blurb: "Specialized solutions for beachfront and island environments.", icon: "wave" as IconName },
      { title: "Enduring Value", blurb: "Developments built to remain relevant, resilient, and desirable over time.", icon: "shield" as IconName },
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
    eyebrow: "Andaman Projects",
    title: "Our projects in Andaman & Nicobar Islands.",
    phases: [
      { year: "₹250.4 CR", title: "Ultra-Luxury Wellness Retreat, Shaheed Dweep Island", body: "Development of 5-Star Eco-Tourism Resort at Shaheed Dweep Island, ANI on PPP basis. Awarded by ANIIDCO. Construction Period: 3 Yrs | Concession Period: 75 Yrs (Incl. Construction Period)." },
      { year: "₹270.9 CR", title: "Megapode Conventional Hotel, Sri Vijaya Puram", body: "Design, Build, Finance, Operate and Transfer (DBFOT) of Megapode Resort at Sri Vijaya Puram. Awarded by ANIIDCO. Construction Period: 3 Yrs | Concession Period: 50 Yrs (Incl. Construction Period)." },
    ],
  },
  gallery: [
    "/images/island-aerial2.jpg",
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
    body: "Two government-awarded projects in one of India's most coveted island destinations — backed by SHEERAJ's two-decade EPC track record. Both developments operate under long-term concession frameworks with ANIIDCO, giving investors a rare combination of sovereign backing, operational upside, and enduring asset value.",
    stats: [
      { value: 521.3, suffix: " CR", label: "Combined project value" },
      { value: 75, suffix: " Yrs", label: "Concession period" },
      { value: 2, suffix: "", label: "Government-awarded projects" },
      { value: 2029, suffix: " Yrs", label: "Delivery time" },
    ],
  },
  community: {
    eyebrow: "Gated Villa Community",
    title: "Get Into the Community",
    intro:
      "Experience a thoughtfully planned 20-acre gated villa community designed for luxury, privacy, and modern living.",
    image: andaman5,
    bodyTitle: "A Community Crafted Around Luxury Living",
    body: "Spread across 20 acres of beautifully planned landscape, our gated villa community combines architectural elegance with open green spaces, premium amenities, and a secure environment. Every villa is positioned to maximize privacy while keeping residents connected to the heart of the community.",
    features: [
      "20 Acre Master-Planned Community",
      "Premium Independent Villas",
      "24×7 Gated Security",
      "Landscaped Green Spaces",
      "Clubhouse & Recreation Areas",
      "Wide Internal Roads",
      "Resort-Style Amenities",
      "Sustainable Community Design",
    ],
    // Uniform shape (display wins over value) so the cards map cleanly.
    stats: [
      { value: 20, suffix: "", unit: "Acres", display: "", label: "Master Planned Development" },
      { value: 100, suffix: "+", unit: "", display: "", label: "Luxury Villas" },
      { value: 70, suffix: "%", unit: "", display: "", label: "Open Green Spaces" },
      { value: 0, suffix: "", unit: "", display: "24/7", label: "Security & Surveillance" },
    ],
    plan: {
      eyebrow: "Master Plan",
      title: "The 20-Acre Community Layout",
      image: andaman5,
      // Index-matched to the pin coordinates in Community.tsx.
      zones: [
        "Arrival + Lobby",
        "All-Day Dining",
        "Pool / Cabana Pavilion",
        "Garden Villas",
        "Lagoon Villas",
        "Sea View Villas",
        "Presidential Villa",
        "Spa / Wellness",
      ],
    },
    cta: {
      title: "Discover Your Place in the Community",
      body: "Explore available villas, amenities, and the lifestyle designed around comfort, privacy, and connection.",
      primary: { label: "Explore Villas", href: "#masterplan" },
      secondary: { label: "View Master Plan", href: "#community-plan" },
    },
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
  qualification?: string;
  company?: string;
};

export const team = {
  chairman: {
    name: "Mr. Rajender Singh Pannu",
    role: "Founder & Chairman",
    photo: "/images/chairman-Sir.jpg",
    message:
      "Everything bearing the SHEERAJ name is built to outlast us. That quiet promise — made when we laid our first kilometre of highway — still guides every decision we make, from canals and corridors to the shores of the Andamans.",
  } as Person,
  md: {
    name: "Director One",
    role: "Managing Director",
    photo: "/images/about-engineering.jpg",
    message:
      "We treat every project as infrastructure for the next generation — engineered to a standard, never just a deadline.",
  } as Person,
  directors: [
    { name: "Mr. Rahul Singh Gulia", role: "Director", qualification: "MBA", photo: "/images/boardMember/rahulSir.png", message: "True business leadership is about far more than results—it is about building trust, empowering people, and making decisions that create lasting value. We lead with purpose, integrity, and the courage to embrace change. At our core lies a strong management-systems philosophy: robust processes, defined standards, and continuous improvement that turn vision into consistent, measurable outcomes. By aligning innovation with disciplined execution and a dedicated team, we transform every opportunity into enduring success. Guided by clear values and uncompromising quality, we are not just building a business—we are engineering a future of sustainable, meaningful impact." },
    { name: "Mr. Pavitra Kumar", role: "Director", qualification: "M.Ed., MBA", photo: "/images/boardMember/pavitraSir.png", message: `Every achievement stands on one foundation—dedication, perseverance, and the relentless pursuit of excellence. Every milestone tells a story. A story of passion. A story of determination. A story written, day after day, by a team that refuses to settle. We do not fear challenges—we transform them. Through unwavering effort, we build value that lasts and a standard that endures. "Hard work is talent’s only true rival—and its greatest ally" And this is only the beginning.` },
    { name: "Mr. Arpit Kadyan", role: "Director", qualification: "LLB", photo: "/images/boardMember/arpitSir.png", message: "Integrity is the cornerstone of everything we do. Compliance, to us, is far more than an obligation—it is a reflection of our values. We conduct our business with transparency, accountability, and unwavering adherence to every legal and ethical principle. True leadership lies in doing what is right, even when no one is watching. By upholding the highest standards of governance, we earn the trust of our clients, partners, and communities. This is how we operate responsibly, build an enduring reputation, and create lasting value for all." },
  ] as Person[],
  coo: {
    name: "Mr. Dilbagh Singh Dhandha",
    role: "Chief Operating Officer",
    qualification: "BE Civil",
    photo: "/images/boardMember/dhandhaSir.jpg",
    message:
      "Efficient and effective execution is where vision meets results. It begins with clarity—understanding the goal, planning the approach, and prioritising what matters. Guided by Six Sigma and Kaizen principles, we focus on reducing defects, ensuring process consistency, and pursuing continuous incremental improvement. Efficiency ensures we do things right; effectiveness ensures we do the right things. By combining structured processes with focus, accountability, and attention to detail, we turn plans into outcomes and effort into achievement—delivering every task with precision, purpose, and lasting quality.",
  } as Person,
  ca: {
    name: "Mr. Alok Bishnoi",
    role: "Auditor",
    company: "Goddara & Company",
    photo: "/images/boardMember/CA2.jpg",
    message:
      "He is the independent auditor of the Company, appointed to provide objective assurance on our financial statements and compliance with applicable laws and accounting standards. Through professional diligence, integrity, and a commitment to the highest auditing standards, he helps strengthen transparency, accountability, and stakeholder confidence in our operations.",
  } as Person,
};

// Full chairman address rendered in the leadership card on the About page.
export const chairmanAddress = {
  before: [
    "It gives me immense pleasure to connect with you through this medium. May this message find you in best of health and happiness. Having an experience of about 40 years in the field of construction and encountering a lot of turbulence and overcoming them eventually by trial-and-error methods, I had developed some revolutionary engineering strategies. I have a vision that I wanted to manifest which led to the birth of an enigma called SHEERAJ PROJECTS PRIVATE LIMITED. Its amalgamation with the SHEERAJ Family's paragons of virtue has aided us in experiencing exponential growth in a brief time. Finally, I wish to express it as we have this moment to catch breath in the company of your thoughts.",
  ],
  quoteLeadIn: "I believe",
  quote:
    "To accomplish great things, we must not only act, but also dream together, not only plan, but believe together.",
  after: [
    "Our country is on the path of becoming great again after several centuries of exploitation and turmoil, and without missing such an opportunity we want to contribute as much as we can in this trajectory towards development. Given the importance of infrastructure projects in a country's development and considering the quality which we have maintained in our projects, we desire to be among the leading NATION BUILDERS.",
    "I would like to take this opportunity to thank you whole-heartedly for your commitment, sacrifice, sweat and blood in all our present and future endeavours. Through your care and perseverance we have been able to complete prestigious projects and, as a result, exhibit unequivocal trust in our clients.",
    "We are grateful for our associates' and bankers' perpetual assistance as well as encouragement in our commitments. On behalf of the entire SHEERAJ family, I would like to thank you for your continued credence in us and wish you all the best for your future endeavours.",
  ],
};

export const chairmanMessage = {
  name: team.chairman.name,
  role: team.chairman.role,
  photo: team.chairman.photo,
  signature: team.chairman.name,
  paragraphs: [
    "When we laid our first kilometre of highway, we made a quiet promise: that everything bearing the SHEERAJ name would be built to outlast us. Fifteen years on, that promise still guides every decision we make.",
    "Today, that same discipline carries us into a new chapter. As we shape resorts on the shores of the Andaman & Nicobar Islands, we bring the rigour of infrastructure to the artistry of hospitality — engineering experiences as carefully as we have always engineered roads, canals, and bridges.",
    "Our people remain our proudest achievement. Their craftsmanship, their integrity, and their refusal to cut corners are the real foundation of this company.",
    "To our partners and clients: thank you for trusting us to build what matters. The best of SHEERAJ is still ahead.",
  ],
};

// ============================================================================
//  SERVICES — detail content for the dedicated page
// ============================================================================
export const serviceDetail: Record<string, { points: string[]; image: string }> = {
  highways: {
    points: ["NH & SH packages, service roads and high-speed corridors", "Flexible & rigid pavements to IRC standards", "Drainage, safety furniture and intelligent road systems"],
    image: "/images/services/1.jpg",
  },
  "ring-roads": {
    points: ["Orbital corridors & city bypasses", "Grade separators and interchanges", "Congestion relief for growing regions"],
    image: "/images/services/2.jpg",
  },
  canals: {
    points: ["Lined main canals & distributary networks", "Cross-drainage and regulating structures", "Assured irrigation across thousands of hectares"],
    image: "/images/services/3.jpg",
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
    image: "/images/services/6.jpeg",
  },
  "real-estate": {
    points: ["Master-planned gated communities and villa townships", "Premium residential construction to international finishes", "End-to-end delivery from land development to handover"],
    image: "/images/andaman/5.png",
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
  /** Full official contract title, when it differs from the display name. */
  officialName?: string;
  /** Awarding authority / client. */
  client?: string;
  /** Headline contract value, pre-formatted (e.g. "₹107.29 Cr"). */
  value?: string;
  /** The stretch / section the works cover. */
  stretch?: string;
};

export const projectDetails: Record<string, ProjectDetail> = {
  "national-highways-authority-of-india-construction-of-four-laning-of-nh-8e-mahuva-kagavadar": {
    officialName:
      "Construction of left out work of four laning of Mahuva To Kagavadar Section of NH-8E from KM 100.100 To KM 139.915 (Design Chainage from KM 100.450 To KM 140.470) (Package-III)",
    client: "National Highways Authority of India (NHAI)",
    value: "₹514.00 Cr",
    stretch: "KM 100.100 to KM 139.915 — Mahuva to Kagavadar",
    overview:
      "Executed for the National Highways Authority of India, this package covers the left-out balance works of the four-laning of NH-8E between Mahuva and Kagavadar in Gujarat. The scope spans a 39.8 km highway reach (design chainage KM 100.450 to KM 140.470) and delivers a four-lane divided carriageway with service roads, major and minor structures, cross-drainage and all road safety systems to NHAI/MoRTH standards — completing the last mile of a nationally significant corridor.",
    scope: [
      "Four-lane divided carriageway over 39.8 km",
      "Service roads and drainage infrastructure",
      "Major and minor bridges and culverts",
      "Pavement design and construction to MoRTH specs",
      "Road furniture, signage, lighting and safety barriers",
      "Quality assurance and NHAI third-party inspection compliance",
    ],
    gallery: [
      "/images/mahuva/2.jpeg",
      "/images/mahuva/3.jpeg",
      "/images/mahuva/4.jpeg",
      "/images/mahuva/5.jpeg",
      "/images/mahuva/6.jpeg",
    ],
    facts: [
      { label: "State", value: "Gujarat" },
      { label: "Highway", value: "NH-8E" },
      { label: "Project Value", value: "₹514.00 Cr" },
      { label: "Completion", value: "2025" },
    ],
    timeline: [
      { phase: "Earthwork", label: "Formation & embankment" },
      { phase: "Structures", label: "Bridges, culverts & drainage" },
      { phase: "Surfacing", label: "Pavement & road furniture" },
      { phase: "Handover", label: "Safety audit & commissioning" },
    ],
  },
  "haryana-irrigation-and-water-resources-department-remodeling-of-augmentation-canal": {
    officialName:
      "Remodeling of augmentation canal from RD 0KM to KM 75.25KM i.e. From HAmidsta Head to Picholia Head (Merging point with WJC Main Branch) main branch under NABARD RIDF XXV",
    client: "Haryana Irrigation & Water Resources Department",
    value: "₹928.34 Cr",
    stretch: "RD 0KM to KM 75.25KM — HAmidsta Head to Picholia Head",
    overview:
      "Commissioned under NABARD's Rural Infrastructure Development Fund (RIDF XXV), this project remodels 75.25 km of the WJC Augmentation Canal main branch from HAmidsta Head to Picholia Head — the merging point with the WJC Main Branch — in Haryana. The works involve full-length concrete lining, hydraulic restructuring, and replacement of aging cross-drainage and regulating structures to restore the canal's design discharge capacity and extend assured irrigation to thousands of hectares of farmland across the region.",
    scope: [
      "Full-length concrete lining over 75.25 km canal reach",
      "Hydraulic remodeling to restore design discharge capacity",
      "Replacement of cross-drainage works and regulators",
      "De-silting, earthwork and slope protection",
      "Canal road and inspection path reinstatement",
      "Quality control and supervision to CWC / NABARD norms",
    ],
    gallery: [
      "/images/karnal/2.jpeg",
      "/images/karnal/3.jpeg",
      "/images/karnal/4.jpeg",
      "/images/karnal/5.jpeg",
      "/images/karnal/6.jpeg",
    ],
    facts: [
      { label: "State", value: "Haryana" },
      { label: "Project Cost", value: "₹928.34 Cr" },
      { label: "Work Executed", value: "₹816.23 Cr" },
      { label: "Completion", value: "Mar 2026" },
    ],
    timeline: [
      { phase: "Mobilisation", label: "Survey, de-silting & earthwork" },
      { phase: "Structures", label: "Cross-drainage & regulators" },
      { phase: "Lining", label: "Concrete lining & slope protection" },
      { phase: "Commissioning", label: "Hydraulic testing & handover" },
    ],
  },
  "national-highway-authority-of-india-construction-of-two-number-of-interchanges": {
    officialName:
      "Construction of Balance Works of Two Number of Interchanges at Jaipur Ring Road (NH-148C) from Tonk Road (NH-52) to Ajmer Road Section (NH-48), Rajasthan — National Highway Authority of India",
    client: "National Highway Authority of India (NHAI)",
    value: "₹107.29 Cr",
    stretch: "Tonk Road (NH-52) → Ajmer Road (NH-48)",
    overview:
      "Construction of the balance works of two interchanges on the Jaipur Ring Road (NH-148C), connecting the Tonk Road (NH-52) and Ajmer Road (NH-48) sections of Rajasthan's capital. Executed for the National Highway Authority of India, the package delivers grade-separated interchanges, ramps, service roads and safety systems engineered to national-highway standards — easing through-traffic and unlocking orbital connectivity around Jaipur.",
    scope: [
      "Two grade-separated interchanges",
      "Ramps & loop connectors",
      "Service roads & cross-drainage",
      "Road furniture, signage & lighting",
      "Pavement & safety systems to NHAI spec",
    ],
    gallery: [
      "/images/jaipur/jaipur-ring-road-2.jpg",
      "/images/jaipur/jaipur-ring-road-3.jpg",
      "/images/jaipur/jaipur-ring-road-4.jpg",
      "/images/jaipur/jaipur-ring-road-5.jpg",
      "/images/jaipur/jaipur-ring-road-6.jpg",
    ],
    facts: [
      { label: "State", value: "Rajasthan" },
      { label: "Highway", value: "NH-148C" },
      { label: "Project Value", value: "₹107.29 Cr" },
      { label: "Completion", value: "June 2026" },
    ],
    timeline: [
      { phase: "Earthwork", label: "Formation & embankment" },
      { phase: "Structures", label: "Interchanges & ramps" },
      { phase: "Surfacing", label: "Pavement & finishing" },
    ],
  },
  "morth-construction-of-4-lane-with-paved-shoulders": {
    officialName:
      "Construction of Four-Lane with Paved Shoulders of GGM–Alwar Road (NH-248A) from Nuh–Firozpur Jhirka up to Rajasthan Border (KM 46.95 to KM 95.97, Design Chainage KM 96.980), excluding KM 50.900–54.46 and KM 61.900–65.18, including strengthening & improvement of the existing road over 6.84 km in Malab village (KM 50.900–54.46) and Bhadas village (KM 61.900–65.18), Nuh, Haryana",
    client: "Ministry of Road Transport & Highways (MoRTH)",
    value: "₹180.09 Cr",
    stretch: "KM 46.95 to KM 95.97 — Nuh–Firozpur Jhirka to Rajasthan Border",
    overview:
      "Awarded by the Ministry of Road Transport & Highways, this package delivers the four-laning with paved shoulders of the GGM–Alwar road (NH-248A) from Nuh and Firozpur Jhirka up to the Rajasthan border in Haryana. The works span the reach from KM 46.95 to KM 95.97 (design chainage KM 96.980) — excluding the built-up stretches at KM 50.900–54.46 and KM 61.900–65.18 — and additionally cover the strengthening and improvement of 6.84 km of existing road through Malab village (KM 50.900–54.46) and Bhadas village (KM 61.900–65.18). On completion, the corridor will upgrade a key inter-state link between the Gurugram region and Alwar to national-highway standards.",
    scope: [
      "Four-laning with paved shoulders of NH-248A",
      "Main carriageway from KM 46.95 to KM 95.97 (design chainage KM 96.980)",
      "Strengthening & improvement of 6.84 km existing road through Malab and Bhadas villages",
      "Major and minor structures, culverts and cross-drainage works",
      "Service roads, road furniture, signage, lighting and safety barriers",
      "Construction to IRC / MoRTH specifications",
    ],
    gallery: [
      "/images/nuh/4.jpeg",
      "/images/nuh/2.jpeg",
      "/images/nuh/3.jpeg",
      "/images/nuh/5.jpeg",
      "/images/nuh/6.jpeg",
    ],
    facts: [
      { label: "State", value: "Haryana" },
      { label: "Highway", value: "NH-248A" },
      { label: "Project Value", value: "₹180.09 Cr" },
      { label: "Authority", value: "MoRTH" },
    ],
    timeline: [
      { phase: "Mobilise", label: "Survey, DPR review & setting out" },
      { phase: "Earthwork", label: "Formation & embankment" },
      { phase: "Structures", label: "Culverts, drainage & strengthening" },
      { phase: "Surfacing", label: "Pavement, furniture & handover" },
    ],
  },
  "nhai-construction-of-6-lane-elevated-corridor": {
    officialName:
      "Construction of Six-Lane Elevated Corridors at Pigdambar Chauraha (KM 14.235) and Medicaps (KM 13.430), a Light Vehicle Underpass (LVUP) at Sirsodiya Junction (KM 61.660), and Flyovers at Dhanmod Bypass (KM 65.455) and Dhanmod Bypass End (KM 73.495), Indore, Madhya Pradesh",
    client: "National Highways Authority of India (NHAI)",
    value: "₹213.59 Cr",
    stretch: "Pigdambar–Dhanmod — KM 13.430 to KM 73.495",
    overview:
      "Awarded by the National Highways Authority of India, this Indore package delivers a series of grade-separated structures along the Pigdambar–Dhanmod corridor in Madhya Pradesh. The scope comprises six-lane elevated corridors at Pigdambar Chauraha (KM 14.235) and Medicaps (KM 13.430), a light-vehicle underpass at Sirsodiya Junction (KM 61.660), and flyovers at the Dhanmod Bypass (KM 65.455) and Dhanmod Bypass End (KM 73.495). Together the works untangle the corridor's busiest junctions and carry through-traffic clear of local movement, with a planned construction period of 18 months from the award of the Letter of Acceptance.",
    scope: [
      "Six-lane elevated corridor at Pigdambar Chauraha (KM 14.235)",
      "Six-lane elevated corridor at Medicaps (KM 13.430)",
      "Light Vehicle Underpass (LVUP) at Sirsodiya Junction (KM 61.660)",
      "Flyover at Dhanmod Bypass (KM 65.455)",
      "Flyover at Dhanmod Bypass End (KM 73.495)",
      "Approaches, drainage, road furniture and safety systems to NHAI / MoRTH specs",
    ],
    gallery: [
      "/images/indore/2.jpeg",
      "/images/indore/3.jpeg",
      "/images/indore/4.jpeg",
      "/images/indore/5.jpeg",
      "/images/indore/6.jpeg",
    ],
    facts: [
      { label: "State", value: "Madhya Pradesh" },
      { label: "Authority", value: "NHAI" },
      { label: "Project Value", value: "₹213.59 Cr" },
      { label: "Duration", value: "18 months" },
    ],
    timeline: [
      { phase: "Mobilise", label: "LOA, survey & casting yard setup" },
      { phase: "Substructure", label: "Piles, pier caps & foundations" },
      { phase: "Superstructure", label: "Girders, deck & underpass" },
      { phase: "Surfacing", label: "Pavement, furniture & handover" },
    ],
  },
  "madhya-pradesh-road-development-corporation-widening-and-reconstruction-of-district-road": {
    officialName:
      "Widening & Reconstruction of Madhya Pradesh District Road 11 Sector Projects, Package 2: Sirsod–Pkthhore Road and Nlarwar–Chitori to Amola Road (MP-MDR-07-01 & MP-MDR-07-18)",
    client: "Madhya Pradesh Road Development Corporation (MPRDC)",
    value: "₹123.68 Cr",
    stretch: "Sirsod–Pkthhore Road (MP-MDR-07-01) & Nlarwar–Chitori to Amola Road (MP-MDR-07-18)",
    overview:
      "Executed for the Madhya Pradesh Road Development Corporation, this package widened and reconstructed two district-road sections under the State's MP District Road 11-Sector Projects programme (Package 2) — the Sirsod–Pkthhore road (MP-MDR-07-01) and the Nlarwar–Chitori to Amola road (MP-MDR-07-18). The works upgraded the existing alignments to a stronger, wider cross-section with rebuilt pavement, cross-drainage and road-safety systems, completed in 2020 at a contract value of ₹123.68 crore.",
    scope: [
      "Widening & reconstruction of Sirsod–Pkthhore Road (MP-MDR-07-01)",
      "Widening & reconstruction of Nlarwar–Chitori to Amola Road (MP-MDR-07-18)",
      "Pavement reconstruction and strengthening to IRC/MoRTH specs",
      "Cross-drainage works, culverts and side drains",
      "Road furniture, signage and safety systems",
    ],
    gallery: [
      "/images/mp/2.jpeg",
      "/images/mp/3.jpeg",
      "/images/mp/4.jpeg",
      "/images/mp/5.jpeg",
      "/images/mp/6.jpeg",
    ],
    facts: [
      { label: "State", value: "Madhya Pradesh" },
      { label: "Authority", value: "MPRDC" },
      { label: "Project Value", value: "₹123.68 Cr" },
      { label: "Completed", value: "2020" },
    ],
    timeline: [
      { phase: "Mobilise", label: "Survey, setting-out & site setup" },
      { phase: "Earthwork", label: "Widening, formation & sub-grade" },
      { phase: "Pavement", label: "Reconstruction & strengthening" },
      { phase: "Surfacing", label: "Furniture, drainage & handover" },
    ],
  },
  "public-works-department-construction-of-elevated-road": {
    officialName:
      "Construction of Elevated Road with Service Road, from Delhi–Agra NH-19 to DND–Faridabad–Ballabhgarh Bypass (KMP Link) — Spur to Delhi–Mumbai Expressway — via Ballabhgarh–Mohna Road",
    client: "Public Works Department, Haryana",
    value: "₹163.00 Cr",
    stretch: "Delhi–Agra NH-19 to DND–Faridabad–Ballabhgarh Bypass, via Ballabhgarh–Mohna Road",
    overview:
      "Commissioned by the Public Works Department of Haryana, this package delivers an elevated road with a parallel service road linking Delhi–Agra NH-19 to the DND–Faridabad–Ballabhgarh bypass — the KMP link that forms a spur to the Delhi–Mumbai Expressway — routed via the Ballabhgarh–Mohna Road. The ₹163.00 crore corridor lifts long-distance through-traffic clear of Faridabad and Ballabhgarh's congested local network, knitting the region's arterial highways into the national expressway grid while a ground-level service road preserves access for local movement.",
    scope: [
      "Elevated carriageway from Delhi–Agra NH-19 to the DND–Faridabad–Ballabhgarh bypass",
      "Parallel service road for uninterrupted local access",
      "Spur connectivity to the Delhi–Mumbai Expressway via the KMP link",
      "Piers, pier caps, foundations and superstructure for the viaduct",
      "Drainage, road furniture, signage, lighting and safety barriers",
      "Construction to IRC / MoRTH specifications",
    ],
    gallery: [
      "/images/faridabad/1.jpg",
      "/images/faridabad/3.jpg",
      "/images/faridabad/4.jpg",
      "/images/faridabad/5.jpg",
      "/images/faridabad/6.jpg",
    ],
    facts: [
      { label: "State", value: "Haryana" },
      { label: "Authority", value: "Public Works Department" },
      { label: "Project Value", value: "₹163.00 Cr" },
      { label: "Target Completion", value: "June 2026" },
    ],
    timeline: [
      { phase: "Mobilise", label: "Survey, casting yard & setting out" },
      { phase: "Substructure", label: "Piles, foundations & pier caps" },
      { phase: "Superstructure", label: "Girders, deck & service road" },
      { phase: "Surfacing", label: "Pavement, furniture & handover" },
    ],
  },
  "aniidco-development-of-5-star-eco-tourism-resort": {
    officialName:
      "Development of 5-Star Eco-Tourism Resort at Shaheed Dweep Island, ANI on PPP basis",
    client: "ANIIDCO (Andaman & Nicobar Islands Integrated Development Corporation)",
    value: "₹250.4 Cr",
    overview:
      "Awarded by ANIIDCO on a Public-Private Partnership basis, this project involves the development of a 5-Star Eco-Tourism Resort at Shaheed Dweep Island, Andaman & Nicobar Islands. The resort will be designed, built, financed, operated and maintained by Sheeraj under a 75-year concession (inclusive of the 3-year construction period), setting a new benchmark for luxury eco-tourism in India's island territories.",
    scope: [
      "Design and construction of a 5-star eco-tourism resort on Shaheed Dweep Island",
      "Development on a Public-Private Partnership (PPP) basis",
      "Financing and project management across the full concession lifecycle",
      "Operation and maintenance for the concession period",
      "Coastal-grade civil, structural and MEP works",
      "Eco-sensitive landscaping and sustainability systems",
    ],
    gallery: [
      "/images/Shaheed/shaheed-1.jpeg",
      "/images/Shaheed/shaheed-2.jpeg",
      "/images/Shaheed/shaheed-3.jpeg",
    ],
    facts: [
      { label: "Client", value: "ANIIDCO" },
      { label: "Project Value", value: "₹250.4 Cr" },
      { label: "Construction Period", value: "3 Years" },
      { label: "Concession Period", value: "75 Yrs (Incl. Construction Period)" },
    ],
    timeline: [
      { phase: "Award", label: "LOA issued by ANIIDCO; PPP concession agreement executed" },
      { phase: "Design", label: "Architectural, structural and MEP design development" },
      { phase: "Construction", label: "Civil works, resort structures and coastal infrastructure" },
      { phase: "Commissioning", label: "MEP fit-out, landscaping and soft opening" },
      { phase: "Operations", label: "Hotel operations under the 75-year concession" },
    ],
  },
  "aniidco-design-build-finance-operate-and-transfer-of-megapode-resort": {
    officialName:
      "Design, Build, Finance, Operate and Transfer (DBFOT) of Megapode Resort at Sri Vijaya Puram through ANIIDCO",
    client: "ANIIDCO (Andaman & Nicobar Islands Integrated Development Corporation)",
    value: "₹270.9 Cr",
    overview:
      "Awarded by ANIIDCO under the DBFOT model, this project involves the design, construction, financing, operation and transfer of the Megapode Resort at Sri Vijaya Puram, Andaman & Nicobar Islands. Sheeraj holds a 50-year concession (inclusive of the 3-year construction period), delivering a premium resort that combines modern hospitality with the natural character of the island setting.",
    scope: [
      "Design and construction of Megapode Resort at Sri Vijaya Puram",
      "Full DBFOT (Design, Build, Finance, Operate and Transfer) delivery model",
      "Financing, project management and risk across the concession lifecycle",
      "Hotel operations and asset management over the concession period",
      "Civil, structural and MEP works to coastal-grade standards",
      "Landscaping, utilities and sustainability infrastructure",
    ],
    gallery: [
      "/images/megapode/megapode-1.jpeg",
      "/images/megapode/megapode-2.jpeg",
    ],
    facts: [
      { label: "Client", value: "ANIIDCO" },
      { label: "Project Value", value: "₹270.9 Cr" },
      { label: "Construction Period", value: "3 Years" },
      { label: "Concession Period", value: "50 Yrs (Incl. Construction Period)" },
    ],
    timeline: [
      { phase: "Award", label: "LOA issued by ANIIDCO; DBFOT concession agreement executed" },
      { phase: "Design", label: "Architectural, structural and MEP design development" },
      { phase: "Construction", label: "Civil works, resort structures and coastal infrastructure" },
      { phase: "Commissioning", label: "MEP fit-out, landscaping and soft opening" },
      { phase: "Operations", label: "Hotel operations under the 50-year concession" },
    ],
  },
  "state-highway-corridor": {
    overview:
      "A multi-lane state-highway corridor with service roads, drainage and safety furniture, delivered ahead of schedule to exacting IRC standards.",
    scope: ["Multi-lane carriageway", "Service roads & junctions", "Drainage & safety furniture", "Road-marking & signage"],
    gallery: ["/images/project-highway.jpg", "/images/aboutMain.jpg", "/images/project-bridge.jpg"],
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
    gallery: ["/images/aboutMain.jpg", "/images/project-highway.jpg", "/images/project-bridge.jpg"],
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
    gallery: ["/images/hero-infrastructure.jpg", "/images/aboutMain.jpg", "/images/project-highway.jpg"],
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
    gallery: ["/images/about-engineering.jpg", "/images/project-bridge.jpg", "/images/aboutMain.jpg"],
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
    gallery: ["/images/project-highway.jpg", "/images/aboutMain.jpg", "/images/project-bridge.jpg"],
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
  | "pool"
  | "real-estate";
