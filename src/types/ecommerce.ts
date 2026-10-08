export type CategoryType = 
  | 'All'
  | 'Silk Slips' 
  | 'Ethereal Robes' 
  | 'Lace Chemises' 
  | 'Velvet & Lounge' 
  | 'Bridal Sleepwear';

export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  fabric: string; // e.g. "22 Momme Pure Mulberry Silk"
  fabricDensity?: string; // e.g. "Grade 6A Mulberry"
  length: 'Mini' | 'Midi' | 'Floor-Length' | 'Short';
  colors: ColorOption[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  description: string;
  features: string[];
  careInstructions: string[];
  image: string;
  detailImages: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  stockCount: number;
}

export interface CartItem {
  id: string; // unique cart line item key (prodId + color + size)
  product: Product;
  selectedColor: ColorOption;
  selectedSize: string;
  quantity: number;
}

export interface GiftBoxAddon {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface GiftBoxState {
  product: Product | null;
  selectedColor: ColorOption | null;
  selectedSize: string;
  addons: GiftBoxAddon[];
  ribbonColor: string;
  customCardMessage: string;
  recipientName: string;
}

export interface FitQuizState {
  sleepMood: 'sensual' | 'ethereal' | 'cozy' | 'luxurious' | null;
  preferredFabric: 'mulberry-silk' | 'french-lace' | 'velvet-satin' | 'all' | null;
  silhouette: 'flowing-slip' | 'wrap-robe' | 'chemise' | 'two-piece' | null;
  currentStep: number;
}
