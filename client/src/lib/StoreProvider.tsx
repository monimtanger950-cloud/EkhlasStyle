import { useState, useEffect, type ReactNode } from 'react';
import { StoreContext, type CartItem } from './store';
import type { LangCode } from './translations';
import type { Product } from './products';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('ar');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const setLang = (newLang: LangCode) => {
    setLangState(newLang);
    const isRtl = ['ar'].includes(newLang);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.product.id === item.product.id &&
             i.selectedSize === item.selectedSize &&
             i.selectedColor === item.selectedColor
      );
      if (existing) {
        return prev.map(i =>
          i.product.id === item.product.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: number, size: string, color: string) => {
    setCart(prev => prev.filter(
      i => !(i.product.id === productId && i.selectedSize === size && i.selectedColor === color)
    ));
  };

  const updateQuantity = (productId: number, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart(prev => prev.map(i =>
      i.product.id === productId && i.selectedSize === size && i.selectedColor === color
        ? { ...i, quantity }
        : i
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{
      lang, setLang,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartOpen, setCartOpen,
      whatsappOpen, setWhatsappOpen,
      lightboxImage, setLightboxImage,
      quickViewProduct, setQuickViewProduct,
    }}>
      {children}
    </StoreContext.Provider>
  );
}
