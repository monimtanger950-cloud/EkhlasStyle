import { useState } from 'react';
import { ShoppingBag, Eye, Star, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { t } from '@/lib/translations';
import type { Product } from '@/lib/products';

interface Props {
  product: Product;
  index: number;
}

const COLOR_NAMES: Record<string, string> = {
  '#3B4BC8': 'Blue',
  '#2D2D2D': 'Black',
  '#8B6914': 'Gold',
  '#1a1a1a': 'Jet Black',
  '#6B3A9C': 'Purple',
  '#C4705A': 'Terracotta',
  '#9B7EC8': 'Lavender',
  '#1B7D78': 'Teal',
  '#8B4513': 'Brown',
  '#C9A227': 'Mustard',
  '#D4A0A0': 'Rose',
  '#E8C8A0': 'Beige',
  '#C9B8D4': 'Lilac',
  '#7EC8A0': 'Mint',
  '#4A90C8': 'Sky Blue',
  '#D4956A': 'Caramel',
  '#1B6B8C': 'Ocean',
};

export function ProductCard({ product, index }: Props) {
  const { lang, addToCart, setLightboxImage, setQuickViewProduct } = useStore();
  const tr = t[lang];
  const isRtl = lang === 'ar';

  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      selectedSize,
      selectedColor,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const badgeConfig = {
    new: { label: tr.newArrival, className: 'bg-emerald-600 text-white' },
    bestseller: { label: tr.bestSeller, className: 'bg-amber-600 text-white' },
    sale: { label: `${product.discount}${tr.off}`, className: 'bg-rose-600 text-white' },
  };

  const title = lang === 'ar' ? product.titleAr : product.titleEn;
  const description = lang === 'ar' ? product.descriptionAr : product.descriptionEn;
  const categoryLabel = lang === 'ar' ? product.categoryAr : product.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_50px_rgba(0,0,0,0.13)] transition-all duration-500 border border-stone-100/80"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-stone-50 to-stone-100 cursor-pointer"
           onClick={() => setLightboxImage(product.image)}>
        <img
          src={product.image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          style={{
            filter: 'brightness(1.03) contrast(1.02) saturate(1.08)',
          }}
        />

        {/* Overlay on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        />

        {/* Zoom hint */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-stone-700 text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1.5 shadow-lg pointer-events-none"
        >
          <ZoomIn size={13} />
          {tr.zoomHint}
        </motion.div>

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm ${badgeConfig[product.badge].className}`}>
            {badgeConfig[product.badge].label}
          </div>
        )}

        {/* Quick View Button */}
        <motion.button
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-stone-700 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-white shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
        >
          <Eye size={13} />
          {tr.quickView}
        </motion.button>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full tracking-wide">
            {categoryLabel}
          </span>
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={10} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-stone-800 text-[15px] leading-snug mb-1.5 line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[12px] text-stone-500 leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-[11px] text-stone-400 font-medium">{tr.color}:</span>
          <div className="flex gap-1">
            {product.colors.map(color => (
              <button
                key={color}
                title={COLOR_NAMES[color] || color}
                onClick={() => setSelectedColor(color)}
                className={`w-5 h-5 rounded-full border-2 transition-all hover:scale-110 ${
                  selectedColor === color
                    ? 'border-amber-600 scale-110 shadow-md'
                    : 'border-white shadow-sm ring-1 ring-stone-200'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-[11px] text-stone-400 font-medium">{tr.size}:</span>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border transition-all ${
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

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-800">{product.price} MAD</span>
            {product.originalPrice && (
              <span className="text-sm text-stone-400 line-through">{product.originalPrice} MAD</span>
            )}
          </div>
          {product.discount && (
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            addedFeedback
              ? 'bg-emerald-600 text-white shadow-[0_4px_15px_rgba(5,150,105,0.3)]'
              : 'bg-amber-700 hover:bg-amber-800 text-white shadow-[0_4px_15px_rgba(146,100,22,0.25)] hover:shadow-[0_6px_25px_rgba(146,100,22,0.35)]'
          }`}
        >
          <ShoppingBag size={16} />
          {addedFeedback ? '✓ Added!' : tr.addToCart}
        </motion.button>
      </div>
    </motion.div>
  );
}
