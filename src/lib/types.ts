export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  collection: string;
  image: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: { name: string; hex: string; image?: string }[];
  fabric: string;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviews: number;
  sku?: string;
  careInstructions?: string[];
  fittingNote?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
  tagline?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  verifiedBuyer?: boolean;
  dressPurchased?: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  products: string[];
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  tag?: string;
}

export interface OrderReservation {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: "Confirmed" | "Preparing" | "Dispatched" | "Delivered";
  createdAt: string;
  estimatedDelivery: string;
  notes?: string;
  whatsappUrl?: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
}
