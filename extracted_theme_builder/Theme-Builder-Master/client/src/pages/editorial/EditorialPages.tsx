// Consolidating About, Journal, Contact, FAQ into simple beautiful editorial pages
import { Link } from "wouter";

export function About() {
  return (
    <div className="min-h-screen pt-40 pb-24 px-6 sm:px-12 max-w-4xl mx-auto text-center">
      <span className="text-primary tracking-[0.3em] text-xs uppercase mb-8 block">The Origin</span>
      <h1 className="font-display text-5xl md:text-7xl tracking-widest uppercase mb-16 leading-tight">
        Forged in the Shadows
      </h1>
      
      <div className="space-y-12 text-muted-foreground tracking-wide leading-loose text-sm sm:text-base text-left">
        <p>
          UONIMIQ was established with a singular vision: to redefine luxury through the lens of stark, unapologetic brutalism. We do not design clothes; we architect armor for the modern metropolis.
        </p>
        <p>
          Every collection is an exploration of contrast. The deep void of obsidian black paired with the vibrant flash of ember gold. The soft drape of premium cotton against the rigid structure of tailored outerwear.
        </p>
        <div className="border-l border-primary pl-8 my-16 py-4">
          <p className="font-display text-2xl sm:text-3xl text-foreground uppercase tracking-widest leading-relaxed">
            "Elegance is not the absence of darkness, but the mastery of it."
          </p>
        </div>
        <p>
          Our manufacturing process is intensely rigorous. Each piece is constructed in limited quantities to ensure absolute quality control and exclusivity. Once a drop is gone, it rarely returns.
        </p>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="min-h-screen pt-40 pb-24 px-6 sm:px-12 max-w-3xl mx-auto text-center">
      <h1 className="font-display text-5xl md:text-6xl tracking-widest uppercase mb-8">
        Concierge
      </h1>
      <p className="text-muted-foreground tracking-[0.2em] uppercase text-sm mb-16">
        Private client services & inquiries
      </p>

      <form className="space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs tracking-widest uppercase text-muted-foreground">Name</label>
            <input type="text" className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 transition-colors text-foreground" />
          </div>
          <div className="space-y-2">
            <label className="text-xs tracking-widest uppercase text-muted-foreground">Email</label>
            <input type="email" className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 transition-colors text-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs tracking-widest uppercase text-muted-foreground">Subject</label>
          <input type="text" className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 transition-colors text-foreground" />
        </div>
        <div className="space-y-2">
          <label className="text-xs tracking-widest uppercase text-muted-foreground">Message</label>
          <textarea rows={5} className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 transition-colors text-foreground resize-none" />
        </div>
        <button className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground py-5 tracking-[0.2em] uppercase text-sm transition-colors duration-300">
          Send Dispatch
        </button>
      </form>
    </div>
  );
}

export function Journal() {
  return (
    <div className="min-h-screen pt-40 pb-24 px-6 sm:px-12 text-center">
      <h1 className="font-display text-5xl md:text-6xl tracking-widest uppercase mb-8">
        The Journal
      </h1>
      <p className="text-muted-foreground tracking-[0.2em] uppercase text-sm mb-16">
        Dispatches from the atelier
      </p>
      <div className="max-w-2xl mx-auto py-32 border border-border bg-card/50">
        <p className="text-muted-foreground tracking-widest uppercase">No entries published yet.</p>
      </div>
    </div>
  );
}
