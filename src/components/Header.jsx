import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-background/90 backdrop-blur-sm border-b border-border/50"
      }`}
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/30">
                <span className="text-primary-foreground font-bold text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>ف</span>
              </div>
              <span className="font-bold text-xl text-foreground" style={{ fontFamily: 'Arial, sans-serif' }}>فزعة</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              الرئيسية
            </Link>
            <Link
              to="/Benefits"
              className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              المزايا والعروض
            </Link>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              مستويات العضوية
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              تواصل معنا
            </a>
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Button
              className="relative overflow-hidden hidden sm:flex bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm shadow-md shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
              asChild
            >
              <a href="#">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                اشترك الآن
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border w-72" dir="rtl">
                <div className="flex items-center gap-2 mb-8 mt-2">
                  <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">ف</span>
                  </div>
                  <span className="font-bold text-xl text-foreground">فزعة</span>
                </div>
                <nav className="flex flex-col gap-2">
                  <Link
                    to="/"
                    className="flex items-center px-4 py-3 rounded-xl text-foreground hover:bg-muted hover:text-primary transition-all duration-200 font-medium"
                  >
                    الرئيسية
                  </Link>
                  <Link
                    to="/Benefits"
                    className="flex items-center px-4 py-3 rounded-xl text-foreground hover:bg-muted hover:text-primary transition-all duration-200 font-medium"
                  >
                    المزايا والعروض
                  </Link>
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 rounded-xl text-foreground hover:bg-muted hover:text-primary transition-all duration-200 font-medium"
                  >
                    مستويات العضوية
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 rounded-xl text-foreground hover:bg-muted hover:text-primary transition-all duration-200 font-medium"
                  >
                    تواصل معنا
                  </a>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button className="w-full bg-primary text-primary-foreground rounded-xl" asChild>
                      <a href="#">اشترك الآن</a>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Live Chat Bubble (matching original) */}
      <div className="fixed bottom-6 left-6 z-50">
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-2xl shadow-xl shadow-primary/40 hover:scale-105 hover:shadow-primary/60 transition-all duration-300">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:block">Let's Chat!</span>
        </button>
      </div>
    </header>
  );
}