import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const [location] = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Journal", href: "/journal" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled || !isHome || isMobileMenuOpen
          ? "bg-black/80 backdrop-blur-2xl border-b border-primary/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-8"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 flex items-center justify-between">
        
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 -ml-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav Left */}
        <nav className="hidden lg:flex items-center gap-8 flex-1">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 text-center mx-4">
          <span className="font-display text-3xl sm:text-4xl tracking-[0.25em] uppercase hover:text-primary transition-colors duration-500">
            Uonimiq
          </span>
        </Link>

        {/* Desktop Nav Right */}
        <nav className="hidden lg:flex items-center justify-end gap-8 flex-1">
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions Right */}
        <div className="flex items-center gap-4 lg:gap-6 flex-1 lg:flex-none justify-end">
          <button className="text-foreground hover:text-primary transition-colors p-2 hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <button
            className="text-foreground hover:text-primary transition-colors p-2 relative group"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-full bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-500 ease-in-out overflow-hidden h-screen",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <nav className="flex flex-col p-8 gap-8 items-center pt-20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-2xl tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-12 h-[1px] bg-border my-4" />
          <Link href="/about" className="text-sm tracking-[0.1em] uppercase text-muted-foreground hover:text-primary">About</Link>
          <Link href="/contact" className="text-sm tracking-[0.1em] uppercase text-muted-foreground hover:text-primary">Contact</Link>
          <Link href="/faq" className="text-sm tracking-[0.1em] uppercase text-muted-foreground hover:text-primary">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
