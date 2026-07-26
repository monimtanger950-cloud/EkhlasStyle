import { useState } from 'react';
import { X, ShoppingBag, ZoomIn, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { t } from '@/lib/translations';

export function QuickViewModal() {
  const { lang, quickViewProduct, setQuickViewProduct, addToCart, setLightboxImage } = useStore();
  const tr = t[lang];
  const product = quickViewProduct;

  const [selectedSize, setSelectedSize] = useState(product?.sizes[2] ?? 'L');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? '');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const title = lang === 'ar' ? product.titleAr : product.titleEn;
  const description = lang === 'ar' ? product.descriptionAr : product.descriptionEn;
  const category = lang === 'ar' ? product.categoryAr : product.category;

  const handleAdd = () => {
    addToCart({ product, quantity: 1, selectedSize, selectedColor });
    setAdded(true);
    setTimeout(() => { setAdded(false); setQuickViewProduct(null); }, 1200);
  };

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[75]"
            onClick={() => setQuickViewProduct(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="fixed inset-x-4 top-12 bottom-12 max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl z-[85] flex flex-col overflow-hidden md:inset-x-auto md:w-full md:left-1/2 md:-translate-x-1/2"
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row h-full overflow-y-auto">
              {/* Image */}
              <div
                className="relative md:w-1/2 aspect-[3/4] md:aspect-auto bg-stone-100 flex-shrink-0 cursor-zoom-in group"
                onClick={() => setLightboxImage(product.image)}
              >
                <img
                  src={product.image}
                  alt={title}
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(1.03) contrast(1.02) saturate(1.08)' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm text-stone-700 text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1.5">
                    <ZoomIn size={13} /> {tr.zoomHint}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">{category}</span>
                  <h2 className="text-2xl font-bold text-stone-800 mt-3 mb-2">{title}</h2>

                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-amber-400 text-amber-400" />)}
                    <span className="text-xs text-stone-400 ms-1">(4.9)</span>
                  </div>

                  <p className="text-stone-500 text-sm leading-relaxed mb-5">{description}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="text-3xl font-bold text-amber-800">{product.price} MAD</span>
                    {product.originalPrice && (
                      <span className="text-lg text-stone-400 line-through">{product.originalPrice} MAD</span>
                    )}
                    {product.discount && (
                      <span className="text-sm font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">-{product.discount}%</span>
                    )}
                  </div>

                  {/* Color */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-stone-600 mb-2">{tr.color}</p>
                    <div className="flex gap-2">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                            selectedColor === color
                              ? 'border-amber-600 scale-110 shadow-md ring-2 ring-amber-200'
                              : 'border-white shadow-sm ring-1 ring-stone-200'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-stone-600 mb-2">{tr.size}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-10 text-sm font-semibold rounded-xl border transition-all ${
                            selectedSize === size
                              ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                              : 'text-stone-500 border-stone-200 hover:border-amber-400 hover:text-amber-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className={`w-full py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-700 hover:bg-amber-800 text-white shadow-[0_4px_20px_rgba(146,100,22,0.3)]'
                  }`}
                >
                  <ShoppingBag size={18} />
                  {added ? '✓ Added to Cart!' : tr.addToCart}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
