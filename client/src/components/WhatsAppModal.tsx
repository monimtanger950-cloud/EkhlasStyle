import { useState } from 'react';
import { X, Send, ShoppingBag, User, Phone, MapPin, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { t } from '@/lib/translations';

// Primary WhatsApp number for Matjar Elikhlass
const WHATSAPP_NUMBER = '212649660614';

export function WhatsAppModal() {
  const { lang, cart, whatsappOpen, setWhatsappOpen, clearCart } = useStore();
  const tr = t[lang];
  const isRtl = lang === 'ar';

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = '!';
    if (!form.phone.trim()) errs.phone = '!';
    if (!form.city.trim()) errs.city = '!';
    if (!form.address.trim()) errs.address = '!';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Build order message
    const orderLines = cart.map((item, i) => {
      const title = lang === 'ar' ? item.product.titleAr : item.product.titleEn;
      return `${i + 1}. ${title} — ${tr.size}: ${item.selectedSize} — ${tr.quantity}: ${item.quantity} — ${item.product.price * item.quantity} MAD`;
    }).join('\n');

    const divider = '─────────────────────';
    const message = [
      `🛍️ *${lang === 'ar' ? 'طلب جديد من دار نساء' : 'New Order – Dar Nisaa'}*`,
      divider,
      `👤 *${tr.fullName}:* ${form.fullName}`,
      `📱 *${tr.phone}:* ${form.phone}`,
      `🏙️ *${tr.city}:* ${form.city}`,
      `📍 *${tr.address}:* ${form.address}`,
      form.notes ? `📝 *${tr.notes}:* ${form.notes}` : null,
      divider,
      `🧾 *${tr.orderDetails}:*`,
      orderLines,
      divider,
      `💰 *${tr.total}: ${subtotal.toFixed(0)} MAD*`,
      `🚚 *${tr.shipping}: ${tr.freeShipping}*`,
      divider,
    ].filter(Boolean).join('\n');

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(url, '_blank');
      clearCart();
      setWhatsappOpen(false);
      setForm({ fullName: '', phone: '', city: '', address: '', notes: '' });
      setSubmitting(false);
    }, 600);
  };

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white ${
      errors[field]
        ? 'border-rose-300 bg-rose-50'
        : 'border-stone-200 hover:border-stone-300'
    }`;

  return (
    <AnimatePresence>
      {whatsappOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
            onClick={() => setWhatsappOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="fixed inset-x-4 top-6 bottom-6 max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl z-[90] flex flex-col overflow-hidden md:inset-x-auto md:w-full md:left-1/2 md:-translate-x-1/2"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-6 text-white flex-shrink-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">{tr.orderWhatsapp}</h2>
                    <p className="text-white/70 text-xs">{tr.customerInfo}</p>
                  </div>
                </div>
                <button
                  onClick={() => setWhatsappOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Order Summary */}
                {cart.length > 0 && (
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ShoppingBag size={16} className="text-amber-700" />
                      <h3 className="font-bold text-amber-800 text-sm">{tr.orderSummary}</h3>
                    </div>
                    <div className="space-y-2">
                      {cart.map((item) => {
                        const title = lang === 'ar' ? item.product.titleAr : item.product.titleEn;
                        return (
                          <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                               className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 min-w-0">
                              <img src={item.product.image} alt={title}
                                   className="w-10 h-12 object-cover object-top rounded-lg flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-medium text-stone-700 truncate text-xs">{title}</p>
                                <p className="text-stone-400 text-[11px]">
                                  {tr.size}: {item.selectedSize} · ×{item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-amber-800 flex-shrink-0 ms-2">
                              {item.product.price * item.quantity} MAD
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 pt-3 border-t border-amber-100 flex justify-between font-bold text-amber-800">
                      <span>{tr.total}</span>
                      <span>{subtotal.toFixed(0)} MAD</span>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-600 mb-1.5">
                      <User size={13} className="inline me-1" />{tr.fullName} *
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                      placeholder={lang === 'ar' ? 'أدخلي اسمك الكامل' : 'Enter your full name'}
                      className={inputCls('fullName')}
                      dir={isRtl ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-600 mb-1.5">
                      <Phone size={13} className="inline me-1" />{tr.phone} *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+966 5X XXX XXXX"
                      className={inputCls('phone')}
                      dir="ltr"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-stone-600 mb-1.5">
                        <MapPin size={13} className="inline me-1" />{tr.city} *
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                        placeholder={lang === 'ar' ? 'المدينة' : 'City'}
                        className={inputCls('city')}
                        dir={isRtl ? 'rtl' : 'ltr'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-600 mb-1.5">
                        {tr.deliveryAddress} *
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                        placeholder={lang === 'ar' ? 'الحي / الشارع' : 'Street / Area'}
                        className={inputCls('address')}
                        dir={isRtl ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-600 mb-1.5">
                      <MessageSquare size={13} className="inline me-1" />{tr.specialNotes}
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                      placeholder={lang === 'ar' ? 'أي ملاحظات خاصة...' : 'Any special requests...'}
                      rows={3}
                      className={`${inputCls('notes')} resize-none`}
                      dir={isRtl ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2.5 transition-all text-sm mt-2 ${
                      submitting
                        ? 'bg-emerald-400 cursor-not-allowed'
                        : 'bg-[#25D366] hover:bg-[#20ba59] shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.45)]'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        {lang === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        {tr.sendWhatsapp}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
