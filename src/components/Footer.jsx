import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background" dir="rtl">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>ف</span>
              </div>
              <span className="font-bold text-2xl text-background" style={{ fontFamily: 'Arial, sans-serif' }}>فزعة</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              بطاقة فزعة — عالم من المزايا الحصرية والخصومات الغير محدودة للمواطنين والمقيمين في الإمارات العربية المتحدة.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-background/10 hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="w-4 h-4 text-background" />
              </a>
              <a href="#" className="w-9 h-9 bg-background/10 hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter className="w-4 h-4 text-background" />
              </a>
              <a href="#" className="w-9 h-9 bg-background/10 hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="w-4 h-4 text-background" />
              </a>
              <a href="#" className="w-9 h-9 bg-background/10 hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Youtube className="w-4 h-4 text-background" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-background text-base mb-5" style={{ fontFamily: 'Arial, sans-serif' }}>روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary text-sm transition-colors duration-200">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/Benefits" className="text-background/70 hover:text-primary text-sm transition-colors duration-200">
                  المزايا والعروض
                </Link>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary text-sm transition-colors duration-200">
                  مستويات العضوية
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary text-sm transition-colors duration-200">
                  كيفية الاشتراك
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary text-sm transition-colors duration-200">
                  الشركاء
                </a>
              </li>
            </ul>
          </div>

          {/* Membership */}
          <div>
            <h4 className="font-bold text-background text-base mb-5" style={{ fontFamily: 'Arial, sans-serif' }}>العضوية</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/70 hover:text-primary text-sm transition-colors duration-200">
                  عضوية فضية
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary text-sm transition-colors duration-200">
                  عضوية ذهبية
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary text-sm transition-colors duration-200">
                  عضوية بلاتينية
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary text-sm transition-colors duration-200">
                  شروط العضوية
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary text-sm transition-colors duration-200">
                  تجديد الاشتراك
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-bold text-background text-base mb-5" style={{ fontFamily: 'Arial, sans-serif' }}>تواصل معنا</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>info@fazaa.ae</span>
              </div>
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>800-FAZAA</span>
              </div>
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>الإمارات العربية المتحدة</span>
              </div>
            </div>
            <div>
              <p className="text-background/70 text-xs mb-3">اشترك لتلقي أحدث العروض</p>
              <div className="flex gap-2">
                <Input
                  placeholder="بريدك الإلكتروني"
                  className="bg-background/10 border-background/20 text-foreground placeholder:text-background/40 text-sm rounded-xl flex-1"
                />
                <Button className="bg-primary text-primary-foreground rounded-xl px-3 text-sm hover:scale-105 transition-transform duration-300">
                  أرسل
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-background/50 text-xs">
            © 2024 فزعة. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-background/50 hover:text-primary text-xs transition-colors duration-200">سياسة الخصوصية</a>
            <a href="#" className="text-background/50 hover:text-primary text-xs transition-colors duration-200">شروط الاستخدام</a>
            <a href="#" className="text-background/50 hover:text-primary text-xs transition-colors duration-200">إخلاء المسؤولية</a>
          </div>
        </div>
      </div>
    </footer>
  );
}