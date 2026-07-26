import { createContext, useContext } from 'react';
import type { LangCode } from './translations';
import type { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface StoreState {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  whatsappOpen: boolean;
  setWhatsappOpen: (open: boolean) => void;
  lightboxImage: string | null;
  setLightboxImage: (image: string | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

export const StoreContext = createContext<StoreState>({} as StoreState);

export const useStore = () => useContext(StoreContext);
