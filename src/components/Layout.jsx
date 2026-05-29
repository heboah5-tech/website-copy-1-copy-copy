import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="bg-background text-foreground min-h-screen" dir="rtl">
      <main className="pt-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}