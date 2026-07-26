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
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-stone-800 leading-tight mb-6"
            >
              {tr.heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-stone-500 text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
            >
              {tr.heroSubtitle}
            </motion.p>

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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-8 mt-10 justify-center lg:justify-start"
            >
              {[
                { num: '500+', label: lang === 'ar' ? 'عميلة سعيدة' : 'Happy Clients' },
                { num: '9', label: lang === 'ar' ? 'تصاميم فريدة' : 'Unique Designs' },
                { num: '100%', label: lang === 'ar' ? 'قماش طبيعي' : 'Natural Fabric' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-amber-800">{stat.num}</div>
                  <div className="text-xs text-stone-400 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
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
              <div className="h-72 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/products/product1.jpg" alt="Abaya" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" style={{ filter: 'brightness(1.03) saturate(1.1)' }} />
              </div>
              <div className="h-44 rounded-3xl overflow-hidden shadow-xl">
                <img src="/products/product4.jpg" alt="Abaya" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" style={{ filter: 'brightness(1.03) saturate(1.1)' }} />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="h-44 rounded-3xl overflow-hidden shadow-xl">
                <img src="/products/product7.jpg" alt="Abaya" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" style={{ filter: 'brightness(1.03) saturate(1.1)' }} />
              </div>
              <div className="h-72 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/products/product9.jpg" alt="Abaya" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" style={{ filter: 'brightness(1.03) saturate(1.1)' }} />
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
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">دن</span>
                </div>
                <span className="font-display font-bold text-white text-lg">{tr.brand}</span>
              </div>
              <p className="text-sm leading-relaxed text-stone-400">
                {lang === 'ar'
                  ? 'متجر عبايات وأزياء محتشمة فاخرة، نؤمن أن الأناقة تبدأ من داخلك'
                  : 'Luxury abayas & modest fashion. We believe elegance starts from within.'}
              </p>
            </div>
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
            <div>
              <h4 className="font-bold text-white text-sm mb-4">{tr.contact}</h4>
              <ul className="space-y-2 text-sm">
                <li>📱 WhatsApp: +966 50 000 0000</li>
                <li>📧 info@darnisaa.com</li>
                <li>🌍 {lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-6 text-center text-xs text-stone-600">
            © 2026 {tr.brand}. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </main>
  );
}
