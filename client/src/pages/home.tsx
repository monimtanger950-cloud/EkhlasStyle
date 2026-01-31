import { motion } from "framer-motion";
import { ArrowLeft, Heart, Search, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import brand from "@assets/brand.png_1769820356827.jpg";
import { useMemo, useState } from "react";

type CategoryId = "abayas" | "khimar" | "dresses" | "accessories";

type Product = {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  currency: "ر.س";
  badge?: string;
  rating: number;
  reviews: number;
  colorHint: "espresso" | "caramel" | "sand" | "olive";
};

const productsSeed: Product[] = [
  {
    id: "ab-101",
    name: "عباية لمعة كراميل",
    category: "abayas",
    price: 189,
    currency: "ر.س",
    badge: "الأكثر طلبًا",
    rating: 4.8,
    reviews: 214,
    colorHint: "caramel",
  },
  {
    id: "kh-204",
    name: "خمار حرير مطفي",
    category: "khimar",
    price: 79,
    currency: "ر.س",
    badge: "جديد",
    rating: 4.7,
    reviews: 121,
    colorHint: "sand",
  },
  {
    id: "dr-330",
    name: "فستان ساتان محتشم",
    category: "dresses",
    price: 219,
    currency: "ر.س",
    rating: 4.6,
    reviews: 88,
    colorHint: "espresso",
  },
  {
    id: "ac-090",
    name: "إكسسوار مشبك ذهبي",
    category: "accessories",
    price: 39,
    currency: "ر.س",
    badge: "عرض",
    rating: 4.5,
    reviews: 60,
    colorHint: "caramel",
  },
  {
    id: "ab-118",
    name: "عباية كلاسيك سوداء",
    category: "abayas",
    price: 159,
    currency: "ر.س",
    rating: 4.9,
    reviews: 342,
    colorHint: "espresso",
  },
  {
    id: "kh-245",
    name: "خمار شيفون يومي",
    category: "khimar",
    price: 59,
    currency: "ر.س",
    rating: 4.4,
    reviews: 73,
    colorHint: "olive",
  },
];

const categories: { id: CategoryId; label: string; desc: string }[] = [
  { id: "abayas", label: "عبايات", desc: "قصّات راقية وخامات فاخرة" },
  { id: "khimar", label: "خُمر", desc: "انسيابية وراحة طول اليوم" },
  { id: "dresses", label: "فساتين", desc: "محتشمة للمناسبات والعمل" },
  { id: "accessories", label: "إكسسوارات", desc: "تفاصيل صغيرة… فرق كبير" },
];

function colorToGradient(colorHint: Product["colorHint"]) {
  switch (colorHint) {
    case "espresso":
      return "from-[#20120c] via-[#3a2417] to-[#0f0c0a]";
    case "caramel":
      return "from-[#6d3f1b] via-[#b37736] to-[#e6c08c]";
    case "sand":
      return "from-[#e9d8bf] via-[#d8c1a1] to-[#b79a74]";
    case "olive":
      return "from-[#2b2c1f] via-[#4c4b31] to-[#b8ad7f]";
  }
}

function formatPrice(n: number) {
  return n.toLocaleString("ar", { maximumFractionDigits: 0 });
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("abayas");
  const [q, setQ] = useState("");
  const [wish, setWish] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const query = q.trim();
    return productsSeed.filter((p) => {
      const matchCategory = p.category === activeCategory;
      const matchQuery = !query || p.name.includes(query);
      return matchCategory && matchQuery;
    });
  }, [activeCategory, q]);

  return (
    <div className="min-h-screen bg-luxe">
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-5 sm:px-6 sm:pt-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-2xl ring-1 ring-border bg-card shadow-sm">
              <img
                src={brand}
                alt="متجر الإخلاص"
                className="h-full w-full object-cover"
                data-testid="img-brand"
              />
            </div>
            <div>
              <div className="text-sm text-muted-foreground" data-testid="text-tagline">
                أناقة المحجبات
              </div>
              <div className="text-display text-lg leading-tight" data-testid="text-title">
                متجر الإخلاص
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="h-10 rounded-2xl px-3"
              data-testid="button-search"
              onClick={() => {
                const el = document.getElementById("search") as HTMLInputElement | null;
                el?.focus();
              }}
            >
              <Search className="ml-2 h-4 w-4" />
              بحث
            </Button>
            <Button
              className="h-10 rounded-2xl px-3"
              data-testid="button-cart"
              onClick={() => {
                // mock interaction
              }}
            >
              <ShoppingBag className="ml-2 h-4 w-4" />
              السلة
              <span
                className="mr-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-foreground/15 px-1.5 text-xs"
                data-testid="badge-cart-count"
              >
                2
              </span>
            </Button>
          </div>
        </div>

        {/* Hero */}
        <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-12">
          <div className="grain relative overflow-hidden rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur lg:col-span-7 sm:p-8">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/40 to-transparent" />
            <Badge
              className="rounded-full px-3 py-1 text-xs"
              variant="secondary"
              data-testid="badge-promo"
            >
              توصيل سريع • تغليف هدية
            </Badge>

            <h1
              className="mt-4 text-display text-3xl leading-[1.15] sm:text-4xl"
              data-testid="text-hero-title"
            >
              لمستك الأنيقة…
              <span className="block text-primary">بتفاصيل محتشمة</span>
            </h1>
            <p
              className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base"
              data-testid="text-hero-subtitle"
            >
              اختاري من تشكيلات منتقاة بعناية: عبايات بخامات فاخرة، خُمر مريحة، فساتين
              عملية للمناسبات—وكل ذلك بذوق هادئ يليق بك.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                className="h-11 rounded-2xl px-5"
                data-testid="button-shop-now"
                onClick={() => {
                  const el = document.getElementById("section-products");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                تسوّقي الآن
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                className="h-11 rounded-2xl px-5"
                data-testid="button-view-collections"
                onClick={() => {
                  const el = document.getElementById("section-categories");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                اكتشفي الأقسام
              </Button>
              <div className="text-xs text-muted-foreground" data-testid="text-trust">
                +1200 عميلة سعيدة • تقييمات موثّقة
              </div>
            </div>

            {/* Search */}
            <div className="mt-6 flex items-center gap-2 rounded-2xl border bg-background/60 px-3 py-2 shadow-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحثي عن منتج… (مثال: عباية)"
                className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-5">
            <div className="grain overflow-hidden rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-display text-xl" data-testid="text-feature-title">
                    اختيار الأسبوع
                  </div>
                  <p
                    className="mt-1 text-sm text-muted-foreground"
                    data-testid="text-feature-subtitle"
                  >
                    قطعة واحدة تكفي لتغيّر الإطلالة بالكامل.
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-full"
                  data-testid="badge-week"
                >
                  محدود
                </Badge>
              </div>

              <div className="mt-5 rounded-2xl border bg-background/60 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm" data-testid="text-week-product">
                    عباية لمعة كراميل
                  </div>
                  <div className="text-sm font-semibold" data-testid="text-week-price">
                    {formatPrice(189)} ر.س
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span data-testid="text-week-rating">4.8</span>
                    <span className="opacity-70" data-testid="text-week-reviews">
                      (214)
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="h-9 rounded-xl"
                    data-testid="button-add-week"
                    onClick={() => {
                      // mock
                    }}
                  >
                    أضيفي للسلة
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["شحن مُؤمّن", "دفع عند الاستلام", "إرجاع سهل", "خدمة عملاء"].map(
                (t, i) => (
                  <div
                    key={t}
                    className="grain rounded-3xl border bg-card/50 p-4 shadow-sm backdrop-blur"
                    data-testid={`card-benefit-${i}`}
                  >
                    <div className="text-sm font-semibold" data-testid={`text-benefit-${i}`}>
                      {t}
                    </div>
                    <div
                      className="mt-1 text-xs leading-6 text-muted-foreground"
                      data-testid={`text-benefit-desc-${i}`}
                    >
                      تجربة شراء مطمئنة بتفاصيل محسوبة.
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div id="section-categories" className="mt-10 sm:mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-display text-2xl" data-testid="text-categories-title">
                الأقسام
              </h2>
              <p
                className="mt-1 text-sm text-muted-foreground"
                data-testid="text-categories-subtitle"
              >
                اختاري القسم المناسب ثم اكتشفي القطع.
              </p>
            </div>
            <div className="text-xs text-muted-foreground" data-testid="text-categories-hint">
              اضغطي للتبديل
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => {
              const active = c.id === activeCategory;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
                  className={cn(
                    "grain group rounded-3xl border bg-card/55 p-4 text-right shadow-sm backdrop-blur transition",
                    "hover:-translate-y-0.5 hover:shadow-md",
                    active && "border-primary/40 bg-accent/40",
                  )}
                  data-testid={`button-category-${c.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div
                        className="text-sm font-semibold"
                        data-testid={`text-category-label-${c.id}`}
                      >
                        {c.label}
                      </div>
                      <div
                        className="mt-1 text-xs leading-6 text-muted-foreground"
                        data-testid={`text-category-desc-${c.id}`}
                      >
                        {c.desc}
                      </div>
                    </div>
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-2xl border bg-background/60 text-xs text-muted-foreground",
                        "transition group-hover:bg-background/80",
                      )}
                      data-testid={`badge-category-count-${c.id}`}
                    >
                      {productsSeed.filter((p) => p.category === c.id).length}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products */}
        <div id="section-products" className="mt-10 sm:mt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-display text-2xl" data-testid="text-products-title">
                المنتجات
              </h2>
              <p
                className="mt-1 text-sm text-muted-foreground"
                data-testid="text-products-subtitle"
              >
                عرض مختصر (Mock) — سنربطه ببيانات حقيقية لاحقًا.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full" data-testid="badge-active">
                {categories.find((c) => c.id === activeCategory)?.label}
              </Badge>
              <Badge variant="secondary" className="rounded-full" data-testid="badge-results">
                {filtered.length} نتيجة
              </Badge>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => {
              const wished = !!wish[p.id];
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grain overflow-hidden rounded-3xl border bg-card/55 shadow-sm backdrop-blur"
                  data-testid={`card-product-${p.id}`}
                >
                  <div
                    className={cn(
                      "relative h-36 bg-gradient-to-br",
                      colorToGradient(p.colorHint),
                    )}
                  >
                    <div className="absolute inset-0 opacity-30" />
                    <div className="absolute right-4 top-4 flex items-center gap-2">
                      {p.badge ? (
                        <Badge
                          className="rounded-full bg-background/60 text-foreground"
                          variant="secondary"
                          data-testid={`badge-product-${p.id}`}
                        >
                          {p.badge}
                        </Badge>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setWish((w) => ({ ...w, [p.id]: !w[p.id] }))}
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center rounded-2xl border bg-background/60",
                          "transition hover:bg-background/80",
                        )}
                        aria-label="إضافة إلى المفضلة"
                        data-testid={`button-wishlist-${p.id}`}
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            wished ? "fill-primary text-primary" : "text-foreground/80",
                          )}
                        />
                      </button>
                    </div>

                    <div className="absolute bottom-4 right-4 left-4">
                      <div className="flex items-center justify-between">
                        <div
                          className="text-sm font-semibold text-white"
                          data-testid={`text-product-name-${p.id}`}
                        >
                          {p.name}
                        </div>
                        <div
                          className="text-sm font-semibold text-white"
                          data-testid={`text-product-price-${p.id}`}
                        >
                          {formatPrice(p.price)} {p.currency}
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-white/90">
                        <Star className="h-4 w-4 fill-white text-white" />
                        <span data-testid={`text-product-rating-${p.id}`}>{p.rating}</span>
                        <span className="opacity-70" data-testid={`text-product-reviews-${p.id}`}>
                          ({p.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <Button
                        className="h-10 rounded-2xl px-4"
                        data-testid={`button-addcart-${p.id}`}
                        onClick={() => {
                          // mock
                        }}
                      >
                        أضيفي للسلة
                        <ShoppingBag className="mr-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        className="h-10 rounded-2xl px-4"
                        data-testid={`button-details-${p.id}`}
                        onClick={() => {
                          // mock
                        }}
                      >
                        التفاصيل
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 rounded-3xl border bg-card/50 p-5 text-sm text-muted-foreground backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div data-testid="text-footer-brand">© متجر الإخلاص</div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="underline-offset-4 hover:underline"
                data-testid="link-policy"
              >
                سياسة الاستبدال
              </button>
              <button
                type="button"
                className="underline-offset-4 hover:underline"
                data-testid="link-support"
              >
                الدعم
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
