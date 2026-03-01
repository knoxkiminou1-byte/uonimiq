import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-24 pb-12 px-6 sm:px-12">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
        
        <div className="space-y-6">
          <Link href="/">
            <span className="font-display text-3xl tracking-[0.2em] uppercase">Uonimiq</span>
          </Link>
          <p className="text-muted-foreground text-sm tracking-wide leading-relaxed max-w-xs">
            Obsidian elegance and storm-forged aesthetics. Curating the luxury of the shadows.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="font-display tracking-[0.15em] text-lg uppercase text-primary">Discover</h4>
          <nav className="flex flex-col gap-4 text-sm tracking-widest text-muted-foreground uppercase">
            <Link href="/shop" className="hover:text-foreground transition-colors w-fit">All Pieces</Link>
            <Link href="/collections" className="hover:text-foreground transition-colors w-fit">Collections</Link>
            <Link href="/lookbook" className="hover:text-foreground transition-colors w-fit">Lookbook</Link>
            <Link href="/journal" className="hover:text-foreground transition-colors w-fit">Journal</Link>
          </nav>
        </div>

        <div className="space-y-6">
          <h4 className="font-display tracking-[0.15em] text-lg uppercase text-primary">Support</h4>
          <nav className="flex flex-col gap-4 text-sm tracking-widest text-muted-foreground uppercase">
            <Link href="/contact" className="hover:text-foreground transition-colors w-fit">Contact Us</Link>
            <Link href="/faq" className="hover:text-foreground transition-colors w-fit">FAQ</Link>
            <Link href="/shipping" className="hover:text-foreground transition-colors w-fit">Shipping</Link>
            <Link href="/returns" className="hover:text-foreground transition-colors w-fit">Returns</Link>
          </nav>
        </div>

        <div className="space-y-6">
          <h4 className="font-display tracking-[0.15em] text-lg uppercase text-primary">Newsletter</h4>
          <p className="text-muted-foreground text-sm tracking-wide">
            Join the inner circle for exclusive drops and private events.
          </p>
          <form className="flex border-b border-border focus-within:border-primary transition-colors pb-2">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="bg-transparent border-none outline-none w-full text-sm tracking-widest text-foreground placeholder:text-muted-foreground uppercase"
            />
            <button type="button" className="text-primary hover:text-primary-foreground hover:bg-primary px-4 py-1 text-xs tracking-widest transition-all uppercase">
              Join
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-[1600px] mx-auto pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs tracking-widest text-muted-foreground uppercase">
        <p>&copy; {new Date().getFullYear()} UONIMIQ. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
