// Types for the eyewear e-commerce application

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: 'sunglasses' | 'eyeglasses' | 'reading' | 'sports';
  gender: 'men' | 'women' | 'unisex';
  frameShape: string;
  frameMaterial: string;
  color: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface CustomerReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}
