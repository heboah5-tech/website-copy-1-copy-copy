import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plane, ShoppingBag, Hotel, UtensilsCrossed, Heart, Star, ChevronLeft, ChevronRight, CheckCircle, Award, Shield, Users } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: '0px 0px 200px 0px' });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className || ''}`}>
      {children}
    </div>
  );
};

const iconMap = { Plane, ShoppingBag, Hotel, UtensilsCrossed, Heart, Star };

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background" dir="rtl">
      {/* Ambient glow orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full blur-xl pointer-events-none" style={{ animation: 'floatA 8s ease-in-out infinite' }} />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent/15 rounded-full blur-2xl pointer-events-none" style={{ animation: 'floatB 6s ease-in-out 2s infinite' }} />
      <div className="absolute top-1/2 left-4 w-8 h-8 bg-primary/30 rounded-full pointer-events-none" style={{ animation: 'floatC 9s ease-in-out 4s infinite' }} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Hero Card Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-2xl mb-8"
          >
            <img
              src="https://media.base44.com/images/public/6a1908e5cd52b6a8fe5b8021/f6c95ee16_static_wixstatic_com___edited_edited_17b23933.jpg"
              alt="بطاقة فزعة"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Badge className="bg-primary/10 text-primary border border-primary/30 text-sm px-4 py-1 mb-4 rounded-full">
              بطاقة فزعة الحصرية
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground leading-tight mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                عالم من المزايا الحصرية
              </span>
              <br />
              <span className="text-foreground">والخصومات الغير محدودة</span>
              <br />
              <span className="text-foreground">مع بطاقة فزعة</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              انضم إلى مجتمع فزعة واستمتع بأفضل العروض والخصومات الحصرية للمواطنين والمقيمين في الإمارات
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="relative overflow-hidden bg-primary text-primary-foreground px-8 py-4 text-lg rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                اشترك الآن
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg rounded-2xl transition-all duration-300">
                اعرف أكثر
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MembershipSection() {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.MembershipTier.list('-tier_level', 10)
      .then(setTiers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const staticFallback = [
    { name_ar: "عضوية فضية", name_en: "Silver Membership", eligibility_ar: "للأسرة الإماراتية الجديدة من دون أبناء", color: "silver", tier_level: 1 },
    { name_ar: "عضوية ذهبية", name_en: "Gold Membership", eligibility_ar: "للأسرة الإماراتية من 1-3 أبناء", color: "gold", tier_level: 2 },
    { name_ar: "عضوية بلاتينية", name_en: "Platinum Membership", eligibility_ar: "للأسرة الإماراتية التي تضم 4 أبناء فأكثر أو التي يكون أحد أفرادها من أصحاب الهمم", color: "platinum", tier_level: 3 },
  ];
  const items = tiers.length > 0 ? tiers : staticFallback;

  const tierColors = {
    silver: { bg: "from-secondary to-muted", border: "border-border", badge: "bg-muted text-muted-foreground", label: "فضي" },
    gold: { bg: "from-primary/10 to-primary/5", border: "border-primary/30", badge: "bg-primary/20 text-primary", label: "ذهبي" },
    platinum: { bg: "from-accent/10 to-accent/5", border: "border-accent/30", badge: "bg-accent/20 text-accent", label: "بلاتيني" },
  };

  return (
    <section className="py-20 bg-secondary relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <AnimatedElement>
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border border-primary/30 px-4 py-1 rounded-full mb-4">
              بطاقة مميّزة للمواطنين والمقيمين
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              بطاقة فزعة لكل الأسر الإماراتية
            </h2>
            <p className="text-xl text-primary font-semibold">مربوطة بعدد الأبناء</p>
          </div>
        </AnimatedElement>

        {/* Card Tiers Image */}
        <AnimatedElement delay={100}>
          <div className="w-full max-w-3xl mx-auto mb-16">
            <img
              src="https://media.base44.com/images/public/6a1908e5cd52b6a8fe5b8021/fb31ff7e9_static_wixstatic_com_1_4c363b09.jpg"
              alt="مستويات بطاقة فزعة"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </AnimatedElement>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((tier, index) => {
            const colors = tierColors[tier.color] || tierColors.silver;
            return (
              <AnimatedElement key={tier.id || index} delay={index * 120}>
                <div className={`p-px rounded-3xl bg-gradient-to-br ${index === 2 ? 'from-accent/50 via-primary/30 to-accent/50' : index === 1 ? 'from-primary/40 via-transparent to-primary/40' : 'from-border via-transparent to-border'} hover:-translate-y-2 hover:shadow-2xl transition-all duration-500`}>
                  <div className={`rounded-3xl bg-gradient-to-br ${colors.bg} border ${colors.border} p-6 h-full`}>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${colors.badge} rounded-full px-3 py-1 text-sm`}>
                        {tier.name_ar}
                      </Badge>
                      <Award className={`w-6 h-6 ${index === 2 ? 'text-accent' : index === 1 ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <p className="text-foreground text-sm leading-relaxed">{tier.eligibility_ar}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${index === 2 ? 'text-accent' : 'text-primary'}`} />
                      <span className="text-xs text-muted-foreground">مزايا حصرية</span>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BenefitCategory.list('-created_date', 10)
      .then(setBenefits)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const staticFallback = [
    { title_ar: "خصومات السفر", title_en: "Travel Discounts", description_ar: "خصومات حصرية على تذاكر الطيران وحجز السفر", icon: "Plane" },
    { title_ar: "تسوق ومتاجر", title_en: "Shopping & Stores", description_ar: "عروض حصرية في تشكيلة واسعة من المتاجر", icon: "ShoppingBag" },
    { title_ar: "عروض الفنادق", title_en: "Hotel Offers", description_ar: "خصومات حصرية في أفخم الفنادق الإماراتية", icon: "Hotel" },
    { title_ar: "مطاعم وكافيهات", title_en: "Dining & Cafes", description_ar: "خصومات في مطاعم وكافيهات ثابتة على منصة فزعة", icon: "UtensilsCrossed" },
    { title_ar: "خدمات صحية", title_en: "Health Services", description_ar: "خدمات صحية وثنائية ورعاية مخفضة التكلفة", icon: "Heart" },
    { title_ar: "ترفيه وفعاليات", title_en: "Entertainment & Events", description_ar: "تذاكر الفعاليات وأماكن الترفيه بأسعار خاصة", icon: "Star" },
  ];
  const items = benefits.length > 0 ? benefits : staticFallback;

  return (
    <section className="py-20 bg-background relative overflow-hidden" dir="rtl">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <AnimatedElement>
          <div className="text-center mb-16">
            <Badge className="bg-accent/10 text-accent border border-accent/30 px-4 py-1 rounded-full mb-4">
              مزايا وعروض بطاقة فزعة
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FAZAA CARD BENEFITS
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              استمتع بمئات المزايا والخصومات الحصرية في مختلف القطاعات
            </p>
          </div>
        </AnimatedElement>

        {/* Benefits Image */}
        <AnimatedElement delay={100}>
          <div className="w-full max-w-4xl mx-auto mb-16">
            <img
              src="https://media.base44.com/images/public/6a1908e5cd52b6a8fe5b8021/f726a8e2a_static_wixstatic_com_324c17458e25fff168c09bde9bda81e2bedbd4c3_8729109c.jpg"
              alt="مزايا وعروض بطاقة فزعة"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </AnimatedElement>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {items.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Star;
            return (
              <AnimatedElement key={benefit.id || index} delay={index * 80}>
                <div className="group backdrop-blur-sm bg-card/80 border border-border/50 rounded-2xl p-5 shadow-md hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.2)] hover:border-primary/30 transition-all duration-500 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{benefit.title_ar}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description_ar}</p>
                </div>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CardShowcaseSection() {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden" dir="rtl">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <AnimatedElement>
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border border-primary/30 px-4 py-1 rounded-full">
                بطاقة فزعة الحصرية
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontFamily: 'Arial, sans-serif' }}>
                بطاقتك نحو عالم من الامتيازات
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                بطاقة فزعة هي بطاقتك الذكية للوصول إلى عالم من المزايا والخصومات الحصرية. مصممة خصيصاً للمواطنين والمقيمين في الإمارات العربية المتحدة.
              </p>
              <div className="space-y-3">
                {[
                  "خصومات تصل إلى 50% في المطاعم والمتاجر",
                  "عروض حصرية على السفر والفنادق",
                  "خدمات صحية مميزة لجميع أفراد الأسرة",
                  "ترفيه وفعاليات بأسعار مخفضة"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="relative overflow-hidden bg-primary text-primary-foreground px-8 py-3 rounded-2xl shadow-lg shadow-primary/30 hover:scale-105 hover:shadow-primary/40 transition-all duration-300">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                اشترك الآن واستمتع بالمزايا
              </Button>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={200}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl transform scale-95" />
              <img
                src="https://media.base44.com/images/public/6a1908e5cd52b6a8fe5b8021/f726a8e2a_static_wixstatic_com_324c17458e25fff168c09bde9bda81e2bedbd4c3_8729109c.jpg"
                alt="بطاقة فزعة في اليد"
                className="w-full h-auto rounded-3xl shadow-2xl relative z-10 hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "+500", label: "شريك تجاري", icon: Users },
    { value: "+50%", label: "خصم أقصى", icon: Award },
    { value: "3", label: "مستويات عضوية", icon: Shield },
    { value: "UAE", label: "الإمارات العربية", icon: Star },
  ];

  return (
    <section className="py-16 bg-primary relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedElement key={index} delay={index * 100}>
              <div className="text-center group">
                <div className="w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-primary-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />

      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <AnimatedElement>
          <Badge className="bg-primary/10 text-primary border border-primary/30 px-4 py-1 rounded-full mb-6">
            انضم إلى مجتمع فزعة
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
            ابدأ رحلتك مع{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              بطاقة فزعة
            </span>{" "}
            اليوم
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            اشترك الآن واستمتع بعالم من الامتيازات والخصومات الحصرية المصممة خصيصاً للأسر الإماراتية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="relative overflow-hidden bg-primary text-primary-foreground px-10 py-4 text-lg rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              اشترك الآن
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-muted px-10 py-4 text-lg rounded-2xl transition-all duration-300">
              تواصل معنا
            </Button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-background text-foreground" dir="rtl">
      <HeroSection />
      <MembershipSection />
      <BenefitsSection />
      <CardShowcaseSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}