// Single source of truth for all real Mariana's Taco Shop facts.
// Do NOT invent prices, awards, or history. Keep this factual.

export const BUSINESS = {
  name: "Mariana's Taco Shop",
  shortName: "Mariana's",
  tagline: "California-style Mexican, made fresh in Frisco.",
  cuisine: "California-style Mexican food",
  address: {
    street: "8981 5th St",
    city: "Frisco",
    state: "TX",
    zip: "75034",
    full: "8981 5th St, Frisco, TX 75034",
  },
  phone: {
    display: "(214) 705-9059",
    tel: "+12147059059",
  },
  // Real hours from the business.
  hours: [
    { days: "Mon-Sat", time: "8:00 AM-8:40 PM" },
    { days: "Sunday", time: "9:00 AM-3:40 PM" },
  ],
  amenities: [
    "Free parking lot",
    "Outdoor seating",
    "Dine-in & takeout",
    "Order online",
  ],
  links: {
    // Direct online-ordering URL from the current restaurant site.
    order: "https://www.marianastacoshoptx.com/order",
    delivery:
      "https://www.favordelivery.com/order-delivery/marianas-taco-shop-5103/8981-5th-street-frisco-tx-75033-10443/",
    website: "https://www.marianastacoshoptx.com/",
    googleReviews:
      "https://www.google.com/search?q=Mariana%27s+Taco+Shop+8981+5th+St+Frisco+TX+reviews",
    leaveReview:
      "https://www.google.com/search?q=Mariana%27s+Taco+Shop+Frisco+TX+leave+a+review",
    // Google Maps directions to the exact address.
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=8981+5th+St+Frisco+TX+75034",
  },
} as const;

// Menu categories. Copy is descriptive, never priced or invented beyond the
// real category list provided by the business.
export type MenuCategory = {
  id: string;
  title: string;
  kicker: string;
  copy: string;
  cta: string;
  // Which 3D food object represents this category in the selector.
  model: "taco" | "burrito" | "quesadilla" | "plate";
  accent: string; // tailwind color token used for the accent
};

export const MENU: MenuCategory[] = [
  {
    id: "breakfast-burritos",
    title: "Breakfast Burritos",
    kicker: "Served early",
    copy: "Eggs, potato, and your fillings rolled warm in a flour tortilla. The way a morning in Frisco should start.",
    cta: "Order breakfast",
    model: "burrito",
    accent: "masa",
  },
  {
    id: "burritos",
    title: "Burritos",
    kicker: "The big one",
    copy: "California-style and packed tight with rice, beans, protein, and salsa, all wrapped to hold together to the last bite.",
    cta: "Build a burrito",
    model: "burrito",
    accent: "cilantro",
  },
  {
    id: "tacos",
    title: "Tacos",
    kicker: "The classic",
    copy: "Soft or crisp, stacked with fresh protein, onion, cilantro, and a squeeze of lime. Simple, done right.",
    cta: "Order tacos",
    model: "taco",
    accent: "salsa",
  },
  {
    id: "enchiladas",
    title: "Enchiladas",
    kicker: "Saucy & warm",
    copy: "Rolled tortillas under sauce and melted cheese, baked until the edges catch. Comfort on a plate.",
    cta: "Order enchiladas",
    model: "plate",
    accent: "salsa",
  },
  {
    id: "tostadas",
    title: "Tostadas",
    kicker: "Crunch first",
    copy: "A crisp flat shell loaded high with beans, protein, lettuce, and crema. Every bite has an edge.",
    cta: "Order tostadas",
    model: "plate",
    accent: "lime",
  },
  {
    id: "quesadillas",
    title: "Quesadillas",
    kicker: "Melt city",
    copy: "Griddled tortilla folded over molten cheese and your protein, cut into wedges made for sharing.",
    cta: "Order quesadillas",
    model: "quesadilla",
    accent: "masa",
  },
];

// Craving selector for the hero product-configurator picks.
export const CRAVINGS = [
  {
    id: "taco",
    label: "Taco",
    model: "taco" as const,
    blurb: "Fresh, stacked, and gone in three bites.",
  },
  {
    id: "burrito",
    label: "Burrito",
    model: "burrito" as const,
    blurb: "California-style and built to hold.",
  },
  {
    id: "quesadilla",
    label: "Quesadilla",
    model: "quesadilla" as const,
    blurb: "Griddled, folded, full of melt.",
  },
];

// Guest reviews shown on the original Mariana's Taco Shop website.
export const TESTIMONIALS = [
  {
    quote:
      "Great little taco shop. Very traditional Mexican street tacos, nice patio and friendly service.",
    name: "Todd L.",
    detail: "Guest review",
    rating: 5,
  },
  {
    quote:
      "This is our go to Mexican takeout restaurant. The food is consistently very good, and the staff is always friendly.",
    name: "Bob k.",
    detail: "Guest review",
    rating: 5,
  },
  {
    quote:
      "Ordered 2 chicken tacos and 2 tostadas. The tacos were smoke flavored and delicious.",
    name: "L K",
    detail: "Guest review",
    rating: 5,
  },
];
