import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "./cart-drawer";
import { routes } from "@/lib/routes";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, items } = useCart();
  const [location] = useLocation();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Shop", href: routes.shop() },
    { label: "Collections", href: routes.collections() },
    { label: "Lookbook", href: routes.lookbook() },
    { label: "About", href: routes.about() },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative polished-obsidian">
      {/* Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Left Nav */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-sm tracking-[0.2em] uppercase hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link 
            href={routes.home()} 
            className="font-serif text-2xl tracking-[0.3em] font-medium hover:text-glow-purple transition-all duration-500 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            UONIMIQ
          </Link>

          {/* Desktop Right Nav & Icons */}
          <div className="flex items-center justify-end gap-6 flex-1">
            <nav className="hidden md:flex items-center gap-8 mr-4">
              {navLinks.slice(2).map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className="text-sm tracking-[0.2em] uppercase hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <button className="text-foreground hover:text-primary transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <button 
              onClick={toggleCart}
              className="text-foreground hover:text-primary transition-colors relative"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 flex flex-col h-screen"
          >
            <nav className="flex flex-col gap-8 mt-12">
              {navLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className="text-3xl font-serif tracking-widest hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-white/5 py-16 px-6 mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl tracking-[0.2em] mb-6">UONIMIQ</h3>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              The house of storm and silhouette. Built in shadow. Worn with power.
            </p>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter the House (Email)" 
                className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-primary transition-colors w-64 text-sm"
              />
              <button className="text-xs tracking-widest uppercase hover:text-primary transition-colors">
                Join
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-muted-foreground">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href={routes.shop()} className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href={routes.collections()} className="hover:text-primary transition-colors">Collections</Link></li>
              <li><Link href={routes.lookbook()} className="hover:text-primary transition-colors">Lookbook</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-muted-foreground">Client Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Contact Concierge</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-xs text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} UONIMIQ. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
