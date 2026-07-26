import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { t } from '@/lib/translations';

export function CartDrawer() {
  const {
    lang, cart, cartOpen, setCartOpen,
    updateQuantity, removeFromCart, setWhatsappOpen
  } = useStore();
  const tr = t[lang];
  const isRtl = lang === 'ar';

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    setWhatsappOpen(true);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                  <ShoppingBag size={20} className="text-amber-700" />
                </div>
                <div>
                  <h2 className="font-bold text-stone-800 text-lg">{tr.yourCart}</h2>
                  {itemCount > 0 && (
                    <p className="text-xs text-stone-400">
                      {itemCount} {tr.itemsInCart}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all"
              >
                <X size={22} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center">
                    <ShoppingBag size={36} className="text-stone-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-600 text-lg">{tr.cartEmpty}</p>
                    <p className="text-stone-400 text-sm mt-1">{tr.continueShop}</p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-2 px-6 py-3 bg-amber-700 text-white rounded-2xl font-semibold text-sm hover:bg-amber-800 transition-all shadow-[0_4px_15px_rgba(146,100,22,0.3)]"
                  >
                    {tr.shopNow}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => {
                    const title = lang === 'ar' ? item.product.titleAr : item.product.titleEn;
                    return (
                      <motion.div
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: isRtl ? '-100%' : '100%' }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 bg-stone-50 rounded-2xl p-4"
                      >
                        {/* Image */}
                        <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                          <img
                            src={item.product.image}
                            alt={title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-stone-800 text-sm line-clamp-2 mb-1">{title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[11px] text-stone-500 bg-white px-2 py-0.5 rounded-full border border-stone-200">
                              {item.selectedSize}
                            </span>
                            <div
                              className="w-3.5 h-3.5 rounded-full border border-white shadow-sm ring-1 ring-stone-200"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-800">
                              {(item.product.price * item.quantity).toFixed(0)} MAD
                            </span>
                            {/* Qty Controls */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:border-amber-400 hover:text-amber-700 transition-all"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-7 text-center text-sm font-semibold text-stone-700">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:border-amber-400 hover:text-amber-700 transition-all"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          className="self-start p-1.5 text-stone-300 hover:text-rose-500 transition-colors rounded-lg"
                        >
                          <Trash2 size={15} />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-stone-100 p-6 space-y-4 bg-white">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>{tr.subtotal}</span>
                    <span>{subtotal.toFixed(0)} MAD</span>
                  </div>
                  <div className="flex justify-between text-sm text-emerald-600 font-medium">
                    <span>{tr.shipping}</span>
                    <span>{tr.freeShipping}</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-800 text-lg pt-2 border-t border-stone-100">
                    <span>{tr.total}</span>
                    <span className="text-amber-800">{subtotal.toFixed(0)} MAD</span>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.4)]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {tr.orderWhatsapp}
                </button>

                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full py-3 border border-stone-200 text-stone-600 rounded-2xl font-medium text-sm hover:bg-stone-50 transition-all"
                >
                  {tr.continueShop}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
