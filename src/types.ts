export interface MenuItem {
  id: string;
  name: string;
  category: 'moroccan' | 'pizza-pasta' | 'burgers-tacos' | 'breakfast-waffles' | 'pastries-desserts' | 'drinks';
  price: number; // In MAD (Moroccan Dirham)
  description: string;
  image: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  tags?: string[];
  estimatedTime?: string;
  attributes?: {
    spicy?: boolean;
    vegetarian?: boolean;
    containsNuts?: boolean;
  };
}

export interface MenuCategory {
  id: 'all' | 'moroccan' | 'pizza-pasta' | 'burgers-tacos' | 'breakfast-waffles' | 'pastries-desserts' | 'drinks';
  name: string;
  description: string;
  iconName: string; // Dynamic rendering from Lucide Icons
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: 'Google' | 'TripAdvisor';
  avatar?: string;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface BookingState {
  fullName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  serviceType: 'dining' | 'celebration' | 'tea-time';
}

export interface CustomWaffle {
  sauce: 'none' | 'milk-chocolate' | 'white-chocolate' | 'nutella' | 'mixed';
  toppings: string[]; // 'oreos' | 'strawberries' | 'kinder-bueno' | 'whipped-cream' | 'almonds'
  extraIceCream: boolean;
}
