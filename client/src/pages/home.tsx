import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/lib/store';
import { t } from '@/lib/translations';
import { products, categories } from '@/lib/products';

type SortKey = 'newest' | 'priceLow' | 'priceHigh' | 'popular';

export default function Home() {
  const { lang } = useStore();
  const tr = t[lang];
  const isRtl = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortKey>('newest');

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    switch (sortBy) {
      case 'priceLow':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        list.sort((a, b) => (b.badge === 'bestseller' ? 1 : 0) - (a.badge === 'bestseller' ? 1 : 0));
        break;
      default:
        break;
    }

    return list;
  }, [activeCategory, sortBy]);

  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <main className="min-h-screen bg-[#FDFAF6]">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100/60" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-300/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-amber-200"
            >
              <Sparkles size={13} />
              {tr.newArrival} ✨
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-stone-800 leading-tight mb-4"
            >
              متجر إخلاص
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="text-amber-700 text-xl font-bold font-display mb-4"
            >
              بيع جميع أنواع العبايات والخمارات
            </motion.p>

            {/* Brand product tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6"
            >
              {[
                'عبايات أنيقة',
                'نقابات راقية',
                'خمارات متنوعة',
                'قفازات مميزة',
                'وكل ما تحتاجه المرأة المسلمة',
              ].map((tag) => (
                <span
                  key={tag}
                  className="glass-panel inline-flex items-center gap-1 text-amber-800 text-sm font-semibold px-3 py-1.5 rounded-full"
                >
                  <span className="text-amber-500">✦</span> {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(146,100,22,0.3)] hover:shadow-[0_6px_30px_rgba(146,100,22,0.4)] hover:-translate-y-0.5"
              >
                {tr.heroBtn}
                <Arrow size={16} />
              </a>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 bg-white border border-stone-200 text-stone-700 hover:border-amber-400 hover:text-amber-800 px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                {tr.categories}
              </a>
            </motion.div>

            {/* Social quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-3 mt-8 justify-center lg:justify-start"
            >
              <a href="https://www.instagram.com/matjar_elikhlass" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-pink-600 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                matjar_elikhlass
              </a>
              <span className="text-stone-200">|</span>
              <a href="https://www.tiktok.com/@matjarelikhlass" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-black transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>
                @matjarelikhlass
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex gap-8 mt-6 justify-center lg:justify-start"
            >
              {[
                { num: '500+', label: lang === 'ar' ? 'عميلة سعيدة' : 'Happy Clients' },
                { num: '9+', label: lang === 'ar' ? 'تصاميم فريدة' : 'Unique Designs' },
                { num: '100%', label: lang === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-amber-800">{stat.num}</div>
                  <div className="text-xs text-stone-400 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Keep the product-led banner visible on phones and tablets too. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="lg:hidden relative mt-8 mx-auto w-full max-w-md h-48 sm:h-60"
              aria-label={lang === 'ar' ? 'تشكيلة متجر إخلاص' : 'Matjar Elikhlass collection'}
            >
              <div className="hero-float hero-tile-glow absolute left-[8%] top-0 h-full w-[42%] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/products/product1.jpg"
                  alt={lang === 'ar' ? 'عباية زرقاء أنيقة' : 'Elegant blue abaya'}
                  className="h-full w-full object-cover object-top"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <div
                className="hero-float hero-tile-glow absolute right-[8%] top-3 h-[90%] w-[42%] overflow-hidden rounded-3xl shadow-2xl"
                style={{ animationDelay: '-3s' }}
              >
                <img
                  src="/products/product4.jpg"
                  alt={lang === 'ar' ? 'عباية زمردية فاخرة' : 'Luxury emerald abaya'}
                  className="h-full w-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:grid grid-cols-2 gap-4 h-[520px]"
          >
            <div className="space-y-4">
              <div className="hero-float hero-tile-glow h-72 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/products/product1.jpg" alt="Abaya" loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" style={{ filter: 'brightness(1.03) saturate(1.1)' }} />
              </div>
              <div className="hero-float hero-tile-glow h-44 rounded-3xl overflow-hidden shadow-xl">
                <img src="/products/product4.jpg" alt="Abaya" loading="lazy" decoding="async" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" style={{ filter: 'brightness(1.03) saturate(1.1)' }} />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="hero-float hero-tile-glow h-44 rounded-3xl overflow-hidden shadow-xl">
                <img src="/products/product7.jpg" alt="Abaya" loading="lazy" decoding="async" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" style={{ filter: 'brightness(1.03) saturate(1.1)' }} />
              </div>
              <div className="hero-float hero-tile-glow h-72 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/products/product9.jpg" alt="Abaya" loading="lazy" decoding="async" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" style={{ filter: 'brightness(1.03) saturate(1.1)' }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-300"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-bold px-4 py-2 rounded-full mb-4 border border-amber-100">
            <Sparkles size={12} />
            {tr.featured}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-800 mb-3">
            {lang === 'ar' ? 'تشكيلتنا الفاخرة' : 'Our Luxury Collection'}
          </h2>
          <p className="text-stone-400 max-w-md mx-auto">
            {lang === 'ar'
              ? 'اكتشفي أرقى التصاميم المحتشمة المصنوعة بأيدٍ خبيرة'
              : 'Discover the finest modest designs crafted with expert hands'}
          </p>
        </motion.div>

        {/* Filters */}
        <div id="categories" className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-700 text-white shadow-[0_4px_15px_rgba(146,100,22,0.3)]'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:text-amber-700'
                }`}
              >
                {lang === 'ar' ? cat.ar : cat.en}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortKey)}
              className="appearance-none bg-white border border-stone-200 text-stone-600 text-sm font-medium px-4 py-2.5 rounded-xl pe-8 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent cursor-pointer hover:border-stone-300 transition-all"
            >
              <option value="newest">{tr.newest}</option>
              <option value="priceLow">{tr.priceLow}</option>
              <option value="priceHigh">{tr.priceHigh}</option>
              <option value="popular">{tr.popular}</option>
            </select>
            <ChevronDown size={14} className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-3' : 'right-3'} text-stone-400 pointer-events-none`} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            <p className="text-lg font-medium">{lang === 'ar' ? 'لا توجد منتجات في هذا التصنيف' : 'No products in this category'}</p>
          </div>
        )}
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-t border-stone-100 py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: '🚚', titleAr: 'شحن مجاني', titleEn: 'Free Shipping', descAr: 'لجميع الطلبات', descEn: 'On all orders' },
            { icon: '💎', titleAr: 'جودة فاخرة', titleEn: 'Premium Quality', descAr: 'أقمشة طبيعية عالية الجودة', descEn: 'Natural high-quality fabrics' },
            { icon: '🔒', titleAr: 'دفع آمن', titleEn: 'Secure Payment', descAr: 'واتساب مباشر وآمن', descEn: 'Direct & secure WhatsApp' },
            { icon: '↩️', titleAr: 'إرجاع مجاني', titleEn: 'Free Returns', descAr: 'خلال 7 أيام من الاستلام', descEn: 'Within 7 days of receipt' },
          ].map(badge => (
            <motion.div
              key={badge.titleEn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl mb-3">{badge.icon}</div>
              <h4 className="font-bold text-stone-700 text-sm mb-1">
                {lang === 'ar' ? badge.titleAr : badge.titleEn}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {lang === 'ar' ? badge.descAr : badge.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-amber-600/40 flex-shrink-0">
                  <img src="/logo.jpg" alt="متجر إخلاص" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-base leading-none">متجر إخلاص</div>
                  <div className="text-[10px] text-amber-500 tracking-wide mt-0.5">matjar_elikhlass</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-stone-400 mb-4">
                {lang === 'ar'
                  ? 'بيع جميع أنواع العبايات والخمارات — عبايات أنيقة، نقابات راقية، خمارات متنوعة، وكل ما تحتاجه المرأة المسلمة.'
                  : 'Selling all types of abayas and khimars — elegant abayas, refined niqabs, diverse khimars, and everything a Muslim woman needs.'}
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/matjar_elikhlass" target="_blank" rel="noopener noreferrer"
                   title="Instagram"
                   className="w-9 h-9 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@matjarelikhlass" target="_blank" rel="noopener noreferrer"
                   title="TikTok"
                   className="w-9 h-9 bg-black border border-stone-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>
                </a>
                <a href="https://wa.me/212649660614" target="_blank" rel="noopener noreferrer"
                   title="WhatsApp"
                   className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4">{tr.categories}</h4>
              <ul className="space-y-2 text-sm">
                {categories.slice(1).map(cat => (
                  <li key={cat.id}>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      {lang === 'ar' ? cat.ar : cat.en}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4">{tr.contact}</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">📱</span>
                  <div>
                    <a href="https://wa.me/212649660614" className="hover:text-amber-400 transition-colors block" dir="ltr">+212 649-660614</a>
                    <a href="https://wa.me/212658208396" className="hover:text-amber-400 transition-colors block" dir="ltr">+212 658-208396</a>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <a href="mailto:Imadikhlas7@gmail.com" className="hover:text-amber-400 transition-colors break-all">
                    Imadikhlas7@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-pink-400 flex-shrink-0"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  <a href="https://www.instagram.com/matjar_elikhlass" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                    @matjar_elikhlass
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-stone-300 flex-shrink-0"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>
                  <a href="https://www.tiktok.com/@matjarelikhlass" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                    @matjarelikhlass
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>🌍</span>
                  <span>{lang === 'ar' ? 'المغرب 🇲🇦' : 'Morocco 🇲🇦'}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-6 text-center text-xs text-stone-600">
            © 2026 متجر إخلاص — matjar_elikhlass. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </main>
  );
}
