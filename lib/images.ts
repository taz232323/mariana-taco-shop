// Real photography downloaded from the live Mariana's Taco Shop site into
// /public/images/marianas-original. These are the only genuine photos the
// business publishes, so we build the whole visual system around them rather
// than inventing food that doesn't exist.
//
// TODO: When Mariana's provides more photography (burritos, quesadillas,
// tostadas, breakfast burritos, storefront, dining room), drop the files in
// the same folder and extend this manifest. The UI reads everything here.

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const DIR = `${BASE_PATH}/images/marianas-original`;

export const IMAGES = {
  logo: `${DIR}/logo.png`,
  // Strongest, most cinematic plate, used full-bleed.
  heroTacos: `${DIR}/food-tacos-grilled.jpg`,
  carnitas: `${DIR}/food-tacos-carnitas.jpg`,
  crispy: `${DIR}/food-tacos-crispy.jpg`,
  enchiladas: `${DIR}/food-enchiladas.jpg`,
} as const;

export type Dish = {
  id: string;
  name: string;
  kicker: string;
  copy: string;
  img: string;
  alt: string;
  // object-position tuned so the crop always frames the food nicely.
  pos: string;
};

// The four real dishes we have photographs of. Honest, specific, craveable.
export const DISHES: Dish[] = [
  {
    id: "grilled",
    name: "Grilled Street Tacos",
    kicker: "House favorite",
    copy: "Three soft corn tacos with grilled protein, onion and cilantro, plated with Mexican rice, refried beans, lime and a charred jalapeño.",
    img: IMAGES.heroTacos,
    alt: "Three grilled street tacos with Mexican rice, refried beans, lime and a grilled jalapeño on a checkered tablecloth",
    pos: "50% 60%",
  },
  {
    id: "carnitas",
    name: "Carnitas Tacos",
    kicker: "Slow-cooked",
    copy: "Tender pork carnitas piled into warm corn tortillas, finished with fresh cilantro, onion and crisp radish alongside rice.",
    img: IMAGES.carnitas,
    alt: "Carnitas street tacos topped with cilantro and onion, served with Mexican rice and sliced radish",
    pos: "40% 55%",
  },
  {
    id: "crispy",
    name: "Crispy Beef Tacos",
    kicker: "The classic",
    copy: "Crunchy shells stacked with seasoned beef, shredded lettuce, tomato and cheddar, with rice and beans on the side.",
    img: IMAGES.crispy,
    alt: "Crispy beef tacos with lettuce, tomato and shredded cheese, served with Mexican rice and refried beans",
    pos: "60% 50%",
  },
  {
    id: "enchiladas",
    name: "Enchilada Plate",
    kicker: "Saucy & warm",
    copy: "Rolled tortillas under red sauce and melted cheese, topped with lettuce, tomato and crema, served as a full plate with rice and beans.",
    img: IMAGES.enchiladas,
    alt: "Enchilada plate with red sauce, melted cheese, lettuce and crema, served with Mexican rice, beans and tortilla chips",
    pos: "55% 55%",
  },
];
