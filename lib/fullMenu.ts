export type FullMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceHasUpgrades: boolean;
};

export type FullMenuCategory = {
  id: string;
  name: string;
  items: readonly FullMenuItem[];
};

export const FULL_MENU = [
  {
    id: "421977",
    name: "BREAKFAST",
    items: [
      { id: "4393975", name: "Steak Burrito", description: "2 eggs scrambled w/ carne asada, beans , cheese", price: 10.99, priceHasUpgrades: true },
      { id: "4394032", name: "Taco De Huevo", description: "Egg taco w/ cheese", price: 3.15, priceHasUpgrades: true },
      { id: "4394036", name: "CHILAQUILES", description: "Marinated tortilla chips w/ your choice of red or green salsa topped w/ either egg or pollo asado, along w/ queso fresco, crema, onion,cilantro Served w/ a side of beans", price: 13.99, priceHasUpgrades: true },
      { id: "4394037", name: "FRIJOL Y QUESO TACO", description: "Bean & cheese taco", price: 2.5, priceHasUpgrades: true },
      { id: "4394038", name: "PAPA TACO", description: "Egg scrambled w/ potatoes, topped w/ cheese", price: 4.25, priceHasUpgrades: true },
      { id: "4394039", name: "CHORIZO TACO", description: "Scrambled egg w/ chorizo, topped cheese", price: 4.25, priceHasUpgrades: true },
      { id: "4394040", name: "TOSINO TACO", description: "Eggs scrambled w/ bacon topped w/ cheese", price: 4.25, priceHasUpgrades: true },
      { id: "4394041", name: "PAPA BURRITO", description: "2 eggs scrambled w/ potatoes , beans , cheese", price: 9.99, priceHasUpgrades: true },
      { id: "4394042", name: "CHORIZO BURRITO", description: "Egg scrambled with chorizo, beans, cheese", price: 9.99, priceHasUpgrades: true },
      { id: "4394043", name: "TOSINO BURRITO", description: "2 eggs scrambled w/ bacon , beans , cheese", price: 9.99, priceHasUpgrades: true },
      { id: "4394044", name: "HUEVOS A LA MEXICANA", description: "2 scrambled eggs w/ tomato, onion,& jalapeno served w/ side potatoes and beans Your choice of tortilla", price: 11.99, priceHasUpgrades: true },
      { id: "4394045", name: "HUEVOS CON CHORIZO", description: "2 scrambled egg w/ chorizo served w/ side of potatoes & beans Your choice of tortilla", price: 11.99, priceHasUpgrades: true },
      { id: "4394046", name: "HUEVOS RANCHEROS", description: "2 eggs cooked to your liking wet w/ Ranchera salsa over eggs, served w/ side of potatoes & beans Your choice of tortilla", price: 11.99, priceHasUpgrades: true },
      { id: "6664950", name: "8 oz Potato", description: "Breakfast potatoes", price: 2.99, priceHasUpgrades: false },
    ],
  },
  {
    id: "421978",
    name: "SATURDAY AND SUNDAY",
    items: [
      { id: "4394091", name: "MENUDO (BEEF STEW)", description: "SATURDAY and SUNDAY", price: 14.99, priceHasUpgrades: false },
    ],
  },
  {
    id: "421984",
    name: "BURRITOS",
    items: [
      { id: "4393995", name: "Chile Relleno  Burrito", description: "Chile relleno, red enchilada sauce, sour cream, cheese, beans", price: 11.99, priceHasUpgrades: true },
      { id: "4393996", name: "Hot & Spicy Burrito", description: "Pollo asado, cheese, salsa roja, pico, crema", price: 10.99, priceHasUpgrades: true },
      { id: "4394001", name: "Mixed Burrito", description: "Bean and cheese with choice of Shredded Chicken or Ground Beef", price: 8.99, priceHasUpgrades: true },
      { id: "4394015", name: "FISH burrito", description: "Tilapia breaded-fried fish, tarter sauce, cabbage, pico, and rice", price: 11.5, priceHasUpgrades: true },
      { id: "4394084", name: "BEAN AND CHEESE BURRITO", description: "Bean and cheese only", price: 6.5, priceHasUpgrades: true },
      { id: "4394085", name: "WET BURRITOS", description: "Inside: rice , beans, either shredded chicken or ground beef Topped with: red enchilada sauce, cheese, lettuce, tomato, sour cream, queso fresco", price: 11.99, priceHasUpgrades: true },
      { id: "4394086", name: "VEGGIE", description: "Rice, beans, sour cream, cheese, lettuce, tomato", price: 10.99, priceHasUpgrades: true },
      { id: "4394087", name: "HELL BILLY", description: "Ground beef, rice, cheese, grilled onion, cilantro, and sour cream", price: 10.99, priceHasUpgrades: true },
      { id: "4394088", name: "CALIFORNIA", description: "Carne asada, cheese, French fries, guac, sour cream, pico", price: 11.99, priceHasUpgrades: true },
      { id: "4394089", name: "BURRITO SUPREME", description: "14\" TORTILLA Rice, beans, cheese, sour cream, guac and 1 choice of meat (more than one meat will be up charge)", price: 11.99, priceHasUpgrades: true },
    ],
  },
  {
    id: "421995",
    name: "TORTAS",
    items: [
      { id: "4394083", name: "TORTAS", description: "Avocado slices, beans, cheese, lettuce, onion, tomato, and choice of meat Side of pickled jalapeno", price: 11.49, priceHasUpgrades: true },
    ],
  },
  {
    id: "421982",
    name: "TACOS",
    items: [
      { id: "4393987", name: "Soft Taco Flour (Indiv)", description: "6-inch flour tortilla, choice of meat, cilantro, onion, lime", price: 3.59, priceHasUpgrades: true },
      { id: "4393991", name: "3 Flour Tacos", description: "6-inch flour tortillas, choice of meat (up to 3 different), topped with cilantro and onion with a side of lime", price: 10.75, priceHasUpgrades: true },
      { id: "4394000", name: "TACO TUESDAY", description: "ONLY ON TUESDAY!!! Carnitas on corn tortilla with cilantro onion and side of lime", price: 1.95, priceHasUpgrades: false },
      { id: "4394047", name: "Soft Taco (Indiv)", description: "Corn tortilla, choice of meat, cilantro, onion, lime", price: 3.1, priceHasUpgrades: true },
      { id: "4394080", name: "5 ROLLED TACOS", description: "Fried Rolled chicken tacos topped with guac, lettuce, tomato and cheese", price: 8.99, priceHasUpgrades: true },
      { id: "4394081", name: "HARD SHELL TACO", description: "Hardshell corn tortilla w/ shredded beef topped w/ lettuce, tomatoes, cheese", price: 3.25, priceHasUpgrades: true },
      { id: "4394082", name: "3 SOFT TACOS", description: "Street tacos on corn tortilla, with choice of meat (up to 3 meats), cilantro and onions with a side of limes", price: 9.25, priceHasUpgrades: true },
      { id: "14242707", name: "3 Mix & Match Flour Tacos", description: "", price: 10.75, priceHasUpgrades: true },
      { id: "14242708", name: "3 Mix & Match Soft Tacos", description: "For orders of 2 OR MORE", price: 9.25, priceHasUpgrades: true },
    ],
  },
  {
    id: "421985",
    name: "COMBINATIONS PLATES",
    items: [
      { id: "4394014", name: "#10 - CHILE RELLENO PLATE", description: "Chile relleno smothered in red enchilada sauce, cheese, and sour cream, served with 3 tortillas", price: 12.5, priceHasUpgrades: true },
      { id: "4394071", name: "#9 - FAJITA PLATE", description: "Carne asada or pollo asado fajitas, served with a side salad and 3 tortillas (ONLY ONE CHOICE OF MEAT )!!!!", price: 13.99, priceHasUpgrades: true },
      { id: "4394072", name: "#8 - FISH TACO PLATE", description: "2 fish tacos topped with cabbage, tarter sauce, pico de gallo", price: 13, priceHasUpgrades: true },
      { id: "4394073", name: "#7 - 3 STREET TACO PLATE", description: "3 soft tacos with choice of meat", price: 12.5, priceHasUpgrades: true },
      { id: "4394074", name: "#6 - CARNITAS PLATE", description: "Carnitas served with a side salad, and 3 tortillas", price: 11.99, priceHasUpgrades: false },
      { id: "4394075", name: "#5 - CHIMICHANGA PLATE", description: "Beef or chicken chimichanga", price: 12.5, priceHasUpgrades: true },
      { id: "4394076", name: "#4 - ENCHILADAS VERDES PLATE", description: "2 verde enchiladas with shredded chicken topped w/ sour cream, and queso fresco", price: 11.99, priceHasUpgrades: false },
      { id: "4394077", name: "#3 - RED ENCHILADA PLATE", description: "2 red enchiladas w/ beef, shredded chicken, or cheese, topped w/ lettuce, tomato, sour cream, and queso fresco", price: 12.5, priceHasUpgrades: false },
      { id: "4394078", name: "#2 - 5 ROLLED TACO PLATE", description: "5 chicken rolled tacos w/ sour cream, lettuce,tomato, and cheese", price: 12.5, priceHasUpgrades: true },
      { id: "4394079", name: "#1 - HARDSHELL TACO PLATE", description: "Two hard-shell shredded beef tacos", price: 12.5, priceHasUpgrades: true },
    ],
  },
  {
    id: "421986",
    name: "A LA CARTE",
    items: [
      { id: "4394000", name: "TACO TUESDAY", description: "ONLY ON TUESDAY!!! Carnitas on corn tortilla with cilantro onion and side of lime", price: 1.95, priceHasUpgrades: false },
      { id: "4394003", name: "1 Enchilada Verde", description: "Shredded chicken enchilada smothered in green chile sauce topped w/ crema ,queso fresco, shredded cheese", price: 3.25, priceHasUpgrades: false },
      { id: "4394004", name: "1 Red Enchilada", description: "Enchilada sauce, shredded cheese, lettuce, tomato, sour cream, queso fresco", price: 3.5, priceHasUpgrades: true },
      { id: "4394018", name: "2 Enciladas Verdes", description: "Shredded chicken enchilada smothered in green chile sauce topped w/ crema ,queso fresco, shredded cheese", price: 6.5, priceHasUpgrades: false },
      { id: "4394031", name: "Taco Salad", description: "10 inch deep fried flour tortilla in bowl shape, rice, beans, choice of meat, lettuce,tomato, sour cream, and mixed cheese", price: 9.75, priceHasUpgrades: true },
      { id: "4394058", name: "FRENCH FRIES", description: "Seasoned fries", price: 4.5, priceHasUpgrades: false },
      { id: "4394059", name: "SOPE", description: "Corn dough base, choice of meat, beans, lettuce, tomato, sour cream, queso fresco", price: 4.75, priceHasUpgrades: true },
      { id: "4394060", name: "FISH TACO", description: "Double corn tortilla, tarter sauce, breaded tilapia fish, cabbage, pico, lime", price: 4.5, priceHasUpgrades: false },
      { id: "4394061", name: "CHIMICHANGA", description: "Deep-fried burrito stuffed w/ beans your choice of meat, topped w/ crema, shredded cheese, guacamole", price: 7.49, priceHasUpgrades: true },
      { id: "4394062", name: "2  RED ENCHILADAS", description: "Enchilada sauce, shredded cheese, lettuce, tomato, sour cream, queso fresco", price: 7, priceHasUpgrades: true },
      { id: "7147583", name: "Chile Relleno", description: "Chile stuffed w mozzarella cheese, smothered in red enchilada sauce topped w / crema,queso fresco CONTAINS EGG", price: 6, priceHasUpgrades: true },
    ],
  },
  {
    id: "421981",
    name: "CHIPS AND NACHOS",
    items: [
      { id: "4394006", name: "Chips N Queso", description: "", price: 5.5, priceHasUpgrades: false },
      { id: "4394007", name: "Chips N Salsa", description: "", price: 4.49, priceHasUpgrades: false },
      { id: "4394010", name: "Chips & Guacamole", description: "", price: 6.99, priceHasUpgrades: false },
      { id: "4394017", name: "Bean and Cheese Nachos", description: "Chips topped with refried beans and melted shredded cheese", price: 6.49, priceHasUpgrades: true },
      { id: "4394065", name: "CARNE ASADA FRIES", description: "French fries loaded with carne asada, melted shredded cheese, sour cream, and guac", price: 11.99, priceHasUpgrades: true },
      { id: "4394066", name: "CHEESE NACHOS", description: "Tortilla chips topped with queso dip", price: 5.5, priceHasUpgrades: true },
      { id: "4394067", name: "CHIPS SUPREME", description: "One choice of meat only! Extra will be charged at store Loaded nachos: beans, shredded cheese, choice of meat, pico, sour cream, guac", price: 12.5, priceHasUpgrades: true },
      { id: "6664949", name: "Tortilla Chips", description: "", price: 2, priceHasUpgrades: false },
    ],
  },
  {
    id: "421993",
    name: "TOSTADAS",
    items: [
      { id: "4394064", name: "TOSTADA", description: "Refried beans, choice of meat, lettuce, tomato, sour cream, cheese", price: 3.75, priceHasUpgrades: true },
    ],
  },
  {
    id: "421994",
    name: "QUESADILLAS",
    items: [
      { id: "4394068", name: "CHEESE QUESADILLA", description: "Only cheese", price: 6.99, priceHasUpgrades: false },
      { id: "4394069", name: "QUESADILLA SUPREME", description: "Vegetarian: cheese, lettuce, tomato, sour cream, and beans", price: 10.49, priceHasUpgrades: true },
      { id: "4394070", name: "QUESADILLA", description: "Cheese, choice of meat, and guac", price: 10.49, priceHasUpgrades: true },
    ],
  },
  {
    id: "421992",
    name: "KIDS MEALS",
    items: [
      { id: "4394055", name: "5 PIECES OF CHICKEN NUGGETS", description: "", price: 6.49, priceHasUpgrades: true },
      { id: "4394056", name: "MINI BEANS & CHEESE PLATE", description: "", price: 6.49, priceHasUpgrades: true },
      { id: "4394057", name: "KIDS  MINI QUESADILLA PLATE", description: "", price: 6.49, priceHasUpgrades: true },
    ],
  },
  {
    id: "421975",
    name: "DRINKS",
    items: [
      { id: "4393973", name: "MELON", description: "", price: 0, priceHasUpgrades: true },
      { id: "4394008", name: "BOTTLE COKE", description: "", price: 3.75, priceHasUpgrades: false },
      { id: "4394028", name: "BOTTLE WATER", description: "", price: 1.25, priceHasUpgrades: false },
      { id: "4394048", name: "CAN SODA", description: "", price: 1.75, priceHasUpgrades: false },
      { id: "4394049", name: "JARRITOS", description: "", price: 2.99, priceHasUpgrades: false },
      { id: "4394050", name: "JAMAICA", description: "", price: 0, priceHasUpgrades: true },
      { id: "4394051", name: "HORCHATA", description: "", price: 0, priceHasUpgrades: true },
      { id: "7175958", name: "BOTTLE FANTA", description: "", price: 3.75, priceHasUpgrades: false },
      { id: "11052044", name: "POWERADE", description: "", price: 2.99, priceHasUpgrades: false },
      { id: "11052045", name: "GOLD PEAK TEA", description: "", price: 3.25, priceHasUpgrades: false },
      { id: "12368140", name: "ORANGE JUICE", description: "", price: 2.89, priceHasUpgrades: false },
      { id: "12534484", name: "BOTTLE SPRITE", description: "", price: 3.75, priceHasUpgrades: false },
    ],
  },
  {
    id: "421990",
    name: "Salads",
    items: [
      { id: "4394031", name: "Taco Salad", description: "10 inch deep fried flour tortilla in bowl shape, rice, beans, choice of meat, lettuce,tomato, sour cream, and mixed cheese", price: 9.75, priceHasUpgrades: true },
    ],
  },
  {
    id: "421980",
    name: "EXTRAS",
    items: [
      { id: "4394002", name: "3 Tortillas", description: "PLEASE LET US KNOW IF YOU WANT CORN OR FLOUR", price: 1.49, priceHasUpgrades: false },
      { id: "4394005", name: "32oz Frijol", description: "", price: 10.99, priceHasUpgrades: false },
      { id: "4394021", name: "Chile Toreado", description: "", price: 0.99, priceHasUpgrades: false },
      { id: "4394023", name: "32 oz arroz", description: "", price: 10.99, priceHasUpgrades: false },
      { id: "4394024", name: "8 oz frijol", description: "", price: 3, priceHasUpgrades: false },
      { id: "4394025", name: "32 oz Salsa", description: "", price: 10, priceHasUpgrades: false },
      { id: "4394026", name: "8 oz Side", description: "", price: 2.75, priceHasUpgrades: true },
      { id: "4394054", name: "8 oz arroz", description: "", price: 3, priceHasUpgrades: false },
      { id: "6546958", name: "Sabritas", description: "", price: 4.15, priceHasUpgrades: false },
      { id: "9986170", name: "8 Oz Side Meat", description: "", price: 5, priceHasUpgrades: false },
      { id: "13299170", name: "2 Oz Side", description: "", price: 0, priceHasUpgrades: true },
      { id: "14228714", name: "32 Oz Side", description: "", price: 0, priceHasUpgrades: true },
    ],
  },
  {
    id: "762068",
    name: "Botanas/desserts",
    items: [
      { id: "9410738", name: "Cake Pop", description: "", price: 3.25, priceHasUpgrades: false },
      { id: "4394029", name: "Churro", description: "", price: 1.99, priceHasUpgrades: false },
      { id: "12423800", name: "Flan", description: "", price: 5.99, priceHasUpgrades: false },
      { id: "13777516", name: "CONCHAS DE DULCE", description: "", price: 8.5, priceHasUpgrades: false },
      { id: "13909080", name: "Mihai Dulces", description: "", price: 0, priceHasUpgrades: true },
      { id: "14005471", name: "Sabritas", description: "", price: 4.15, priceHasUpgrades: false },
    ],
  },
] as const satisfies readonly FullMenuCategory[];

export const FULL_MENU_ITEM_COUNT = FULL_MENU.reduce(
  (total, category) => total + category.items.length,
  0
);
