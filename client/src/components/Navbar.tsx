import { useState, useEffect } from 'react';
import { ShoppingBag, Search, X, Menu, Globe, ChevronDown } from 'lucide-react';
import { useStore } from '@/lib/store';
import { t, languages } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { lang, setLang, cart, setCartOpen } = useStore();
  const tr = t[lang];
  const isRtl = lang === 'ar';
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { key: 'home', label: tr.home },
    { key: 'shop', label: tr.shop },
    { key: 'categories', label: tr.categories },
    { key: 'aboutUs', label: tr.aboutUs },
    { key: 'contact', label: tr.contact },
  ];

  const currentLang = languages.find(l => l.code === lang)!;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_40px_rgba(0,0,0,0.08)] border-b border-amber-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">

          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm font-display">دن</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-amber-800 text-lg leading-none tracking-tight">{tr.brand}</div>
                <div className="text-[10px] text-amber-600 tracking-widest uppercase font-medium">Modest Fashion</div>
              </div>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.key}
                href="#"
                className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-xl text-stone-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-stone-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200 text-sm font-medium"
              >
                <span className="text-base">{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.nativeName}</span>
                <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-amber-100/80 overflow-hidden z-50`}
                    >
                      <div className="p-1.5">
                        {languages.map(l => (
                          <button
                            key={l.code}
                            onClick={() => { setLang(l.code); setLangOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                              lang === l.code
                                ? 'bg-amber-50 text-amber-800 font-semibold'
                                : 'text-stone-600 hover:bg-stone-50 hover:text-stone-800'
                            }`}
                          >
                            <span className="text-xl">{l.flag}</span>
                            <span className="flex-1 text-start">{l.nativeName}</span>
                            {l.rtl && <span className="text-[10px] text-amber-500 font-medium">RTL</span>}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl text-stone-600 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200"
              aria-label="Cart"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 bg-amber-600 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl text-stone-600 hover:text-amber-700 hover:bg-amber-50 transition-all"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden pb-3"
            >
              <div className="relative">
                <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-stone-400 ${isRtl ? 'right-4' : 'left-4'}`} />
                <input
                  autoFocus
                  type="text"
                  placeholder={tr.search}
                  className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-amber-100 bg-white overflow-hidden"
          >
            <nav className="p-4 space-y-1">
              {navLinks.map(link => (
                <a
                  key={link.key}
                  href="#"
                  className="block px-4 py-3 text-stone-700 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
