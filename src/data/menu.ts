import { MenuItem, MenuCategory, Review } from '../types';

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'all',
    name: 'Tout le Menu',
    description: 'Explorez toute la richesse gastronomique de Miramar, des tentes de Fès aux douceurs de notre pâtisserie.',
    iconName: 'Utensils'
  },
  {
    id: 'moroccan',
    name: 'Spécialités Marocaines',
    description: 'Plats traditionnels préparés avec amour, héritage de la cuisine Fassie.',
    iconName: 'Flame'
  },
  {
    id: 'pizza-pasta',
    name: 'Pizzas & Pâtes',
    description: 'Pizzas artisanales cuites au four d’or et pâtes fraîches savoureuses.',
    iconName: 'Pizza'
  },
  {
    id: 'burgers-tacos',
    name: 'Fast Food & Snacks',
    description: 'Tacos lyonnais double fromage, burgers gourmets et frites gratinées.',
    iconName: 'Sandwich'
  },
  {
    id: 'breakfast-waffles',
    name: 'Brunchs & Gaufres',
    description: 'Formules petit déjeuner complètes et gaufres croustillantes débordantes de chocolat.',
    iconName: 'Coffee'
  },
  {
    id: 'pastries-desserts',
    name: 'Pâtisserie & Glacier',
    description: 'Gâteaux dôme, tartes semifreddo et desserts glacés d’exception.',
    iconName: 'Cake'
  },
  {
    id: 'drinks',
    name: 'Boissons & Cocktails',
    description: 'Jus d’avocat panaché signature, mojitos glacés et thé à la menthe traditionnel.',
    iconName: 'CupSoda'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Thé à la Menthe Royal en Théière",
    category: "moroccan",
    price: 18,
    description:
      "Le thé à la menthe traditionnel marocain servi brûlant dans une théière ciselée en argent, parfumé aux feuilles de menthe fraîches de la région et légèrement sucré.",
    image: "/assets/images/hero_miramar_1780518006911.png",
    isPopular: true,
    isChefSpecial: true,
    tags: ["Traditionnel", "Best-Seller"],
    estimatedTime: "5-7 min",
    attributes: {
      vegetarian: true,
    },
  },
  {
    id: "m2",
    name: "Couscous Royal Fassi",
    category: "moroccan",
    price: 45,
    description:
      "Semoule de blé fine cuite à la vapeur, surmontée de légumes fondants (carottes, courgettes, potiron), de pois chiches, et de Tfaya (oignons caramélisés et raisins secs parfumés à la cannelle).",
    image: "/assets/images/couscous_miramar_1780518024415.png",
    isPopular: true,
    tags: ["Signé Miramar", "Copieux"],
    estimatedTime: "15-20 min",
    attributes: {},
  },
  {
    id: "f1",
    name: "Tacos Double Fromage Savoyard",
    category: "burgers-tacos",
    price: 38,
    description:
      "Tacos garni d’aiguillettes de poulet croustillantes, frites dorées épaisses, sauce fromagère maison onctueuse, et une couche de fromage à raclette coulant.",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop",
    isPopular: true,
    tags: ["Gourmand", "Fast Food"],
    estimatedTime: "10-12 min",
    attributes: {},
  },
  {
    id: "w1",
    name: "Gaufre Suprême Miramar",
    category: "breakfast-waffles",
    price: 25,
    description:
      "Gaufre bruxelloise croustillante tapissée de Nutella chaleureux, morceaux de Kinder Bueno, éclats d’Oréo, fraises fraîches découpées et une rosace de crème fouettée.",
    image: "/assets/images/waffles_miramar_1780518039741.png",
    isPopular: true,
    isChefSpecial: true,
    tags: ["Sucré", "Signature Dessert"],
    estimatedTime: "8-10 min",
    attributes: {
      containsNuts: true,
      vegetarian: true,
    },
  },
  {
    id: "p1",
    name: "Pizza Regina au Feu d’Or",
    category: "pizza-pasta",
    price: 40,
    description:
      "Pâte à pizza fine pétrie à la main, sauce tomate basilic, mozzarella fraîche filante, champignons rôtis, jambon de dinde fumé, olives noires de Fès et filet d’huile piquante.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop",
    tags: ["Four à Pizza"],
    estimatedTime: "10 min",
    attributes: {},
  },
  {
    id: "p2",
    name: "Tagliatelles Crème de Fromages",
    category: "pizza-pasta",
    price: 35,
    description:
      "Tagliatelles fraîches liées dans une sauce crémeuse au parmesan reggiano, mozzarella fondante, fromage bleu, garnies d’un jaune d’œuf et d’une tomate cerise rôtie.",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop",
    estimatedTime: "10-12 min",
    attributes: {
      vegetarian: true,
    },
  },
  {
    id: "f2",
    name: "Gratiné de Frites Miramar",
    category: "burgers-tacos",
    price: 28,
    description:
      "Poêlon de frites maison croustillantes noyées sous une sauce cheddar fondue, mozzarella gratinée, dinde fumée rissolée et touches d’épices de la maison.",
    image:
      "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop",
    tags: ["À Partager", "Fromage addict"],
    estimatedTime: "8 min",
    attributes: {},
  },
  {
    id: "f3",
    name: "Aiguillettes Poulet Croustillantes",
    category: "burgers-tacos",
    price: 32,
    description:
      "Quatre filets de poulet panés extra-crispy servis sur un lit de salade verte avec frites épaisses croustillantes, sauce salsa douce et salade de tomates hachées.",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop",
    tags: ["Enfant & Adulte"],
    estimatedTime: "10 min",
    attributes: {},
  },
  {
    id: "b1",
    name: "Formule Brunch Miramar Complète",
    category: "breakfast-waffles",
    price: 48,
    description:
      "Un plateau colossal comprenant : œufs au plat, pain grillé, gaufre nappée de chocolat chaud, briouates croustillantes, olives de Marrakech, dinde séchée, fromage blanc local et jus d’orange frais.",
    image:
      "https://images.unsplash.com/photo-1496042399014-dc73c4f2bde1?w=800&auto=format&fit=crop",
    isChefSpecial: true,
    tags: ["Petit Déjeuner", "Royal"],
    estimatedTime: "12-15 min",
    attributes: {},
  },
  {
    id: "pf1",
    name: "Tarta Semifreddo aux Fruits Rouges",
    category: "pastries-desserts",
    price: 22,
    description:
      "Une somptueuse pâtisserie à couches comprenant un biscuit éponge léger, une crème bavaroise vanille, une gelée de framboise et des spirales de chocolat blanc sculptées en couronne.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop",
    isPopular: true,
    tags: ["Glacé", "Pâtisserie Fleurie"],
    estimatedTime: "Prêt à servir",
    attributes: {
      vegetarian: true,
    },
  },
  {
    id: "d1",
    name: "Panaché Royal à l’Avocat",
    category: "drinks",
    price: 20,
    description:
      "Cocktail de fruits pressés étagé, combinant un nectar de fraise, un coulis de mangue, et un smoothie onctueux d’avocat frais mixé au lait, surmonté de fruits frais découpés.",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop",
    isPopular: true,
    tags: ["Frais", "Vitamines"],
    estimatedTime: "5 min",
    attributes: {
      vegetarian: true,
    },
  },
  {
    id: "d2",
    name: "Mojito Exotique Kiwi-Menthe",
    category: "drinks",
    price: 18,
    description:
      "Eau gazeuse glacée infusée de jus de citron vert pressé, menthe fraîche froissée, sucre de canne roux, morceaux de kiwi frais et glace pilée.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop",
    tags: ["Sans Alcool", "Désaltérant"],
    estimatedTime: "3-4 min",
    attributes: {
      vegetarian: true,
    },
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Yassine Fès',
    rating: 5,
    text: 'Une ambiance magique à Fès ! Les gaufres couvertes de chocolat sont excellentes et le thé traditionnel est servi comme nulle part ailleurs. Je recommande vivement pour les sorties familiales !',
    date: 'Il y a 2 semaines',
    source: 'Google',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop'
  },
  {
    id: 'r2',
    author: 'Sophia Bkr',
    rating: 4,
    text: 'Le cadre moderne avec ses touches vertes est magnifique. Les tacos sont succulents et très copieux. Parfois un peu de monde en fin de soirée, mais l’accueil reste chaleureux.',
    date: 'Il y a un mois',
    source: 'Google',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop'
  },
  {
    id: 'r3',
    author: 'Marc DS',
    rating: 5,
    text: 'Great food, helpful service, and wonderful pastries! The Moroccan Mint Tea pour is an experience itself. Perfect presentation of Couscous too. Fair prices for this premium level.',
    date: 'Il y a 3 jours',
    source: 'TripAdvisor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop'
  }
];

export const POPULAR_HOURS = [
  { hour: '12:00', busy: 25 },
  { hour: '13:00', busy: 45 },
  { hour: '14:00', busy: 65 },
  { hour: '15:00', busy: 50 },
  { hour: '16:00', busy: 40 },
  { hour: '17:00', busy: 60, isCurrent: true },
  { hour: '18:00', busy: 75 },
  { hour: '19:00', busy: 85 },
  { hour: '20:00', busy: 100 },
  { hour: '21:00', busy: 95 },
  { hour: '22:00', busy: 85 },
  { hour: '23:00', busy: 55 },
  { hour: '00:00', busy: 20 },
];
