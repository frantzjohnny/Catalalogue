export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[]; // Changed from single image to array
  rating: number;
  reviews: number;
  description: string;
  colors: string[];
  sizes: string[];
  stock: { [key: string]: number }; // Stock by SKU/Color/Size simplified
  isNew?: boolean;
  isSale?: boolean;
  status: 'active' | 'draft' | 'archived';
}

export interface CartItem extends Product {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  link?: string;
  badge?: string;
  order: number;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export type ViewState = 'STORE' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD';
export type AdminTab = 'OVERVIEW' | 'PRODUCTS' | 'SLIDER' | 'CATEGORIES' | 'SETTINGS';

// Props for sharing state between components
export interface SharedStateProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  slides: Slide[];
  setSlides: React.Dispatch<React.SetStateAction<Slide[]>>;
}
