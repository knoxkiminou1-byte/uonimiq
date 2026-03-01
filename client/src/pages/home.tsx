import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product-card';

export default function Home() {
  const { data: products, isLoading } = useProducts();
  
  // Safely get a featured product (e.g., the newest one)
  const featuredProduct = products?.find(p => p.isNew) || products?.[0];
  const signatureProducts = products?.filter(p => p.isSignature).slice(0, 4) || products?.slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. Cinematic Hero / Entrance */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {/* Fallback to image if video fails to load or isn't present */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            poster="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Violet/Obsidian gradient overlay for brand feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Subtle crown icon representation */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="mb-8 w-16 h-16 border border-accent/30 rounded-full flex items-center justify-center text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
              <path d="M2 20h20M12 4l-4 8H4l3 8h10l3-8h-4l-4-8z" />
            </svg>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-glow-purple tracking-wider mb-6">
            UONIMIQ
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 font-light tracking-widest uppercase max-w-2xl mx-auto mb-12">
            Built in shadow. Worn with power.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              href="/shop" 
              className="px-8 py-4 bg-foreground text-background uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:shadow-[0_0_20px_rgba(122,60,255,0.4)]"
            >
              Enter the House
            </Link>
            <Link 
              href="/collections" 
              className="px-8 py-4 border border-white/20 uppercase tracking-widest text-sm hover:border-accent hover:text-accent transition-all duration-500 backdrop-blur-sm bg-black/20"
            >
              View Campaign
            </Link>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Brand Manifesto */}
      <section className="py-32 px-6 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl md:text-4xl leading-relaxed text-foreground/90"
          >
            "We do not make clothes. We forge silhouettes from the storm. Every cut is a decree. Every thread is bound in darkness."
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "40px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-accent mx-auto mt-12"
          />
        </div>
      </section>

      {/* 3. Featured Drop (If available) */}
      {featuredProduct && (
        <section className="py-24 px-6 bg-card border-y border-white/5 relative">
           <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <span className="w-12 h-[1px] bg-primary"></span>
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary">The Latest Decree</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="aspect-[4/5] bg-secondary/30 relative overflow-hidden group"
              >
                <img 
                  src={featuredProduct.images[0] || "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80"} 
                  alt={featuredProduct.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-start"
              >
                <h3 className="font-serif text-4xl md:text-5xl mb-4">{featuredProduct.title}</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-md">
                  {featuredProduct.description.substring(0, 150)}...
                </p>
                <p className="text-2xl font-serif mb-10 text-accent">
                  ${parseFloat(featuredProduct.price as unknown as string).toFixed(2)}
                </p>
                <Link 
                  href={`/product/${featuredProduct.slug}`}
                  className="px-8 py-4 border border-border uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300"
                >
                  Examine Piece
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Signature Pieces */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-2">Signature Relics</h2>
              <p className="text-sm tracking-widest uppercase text-muted-foreground">The foundation of the house</p>
            </div>
            <Link href="/shop" className="hidden md:block text-sm tracking-widest uppercase border-b border-transparent hover:border-primary text-primary transition-all pb-1">
              View All
            </Link>
          </div>
          
          {isLoading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-[3/4] bg-secondary/50 animate-pulse"></div>
               ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {signatureProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center md:hidden">
            <Link href="/shop" className="inline-block px-8 py-4 border border-white/20 uppercase tracking-widest text-sm">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Collection Gateways */}
      <section className="grid md:grid-cols-2 border-y border-white/5">
        <Link href="/collections/obsidian-core" className="group relative aspect-square overflow-hidden border-r border-white/5">
          {/* dark elegant fashion placeholder */}
          <img src="https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80" alt="Obsidian Core" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h2 className="font-serif text-4xl mb-4 text-glow-purple">Obsidian Core</h2>
            <span className="text-sm tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-primary">Enter Collection</span>
          </div>
        </Link>
        <Link href="/collections/ember-cut" className="group relative aspect-square overflow-hidden">
          <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80" alt="Ember Cut" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h2 className="font-serif text-4xl mb-4 text-glow-gold">Ember Cut</h2>
            <span className="text-sm tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-accent">Enter Collection</span>
          </div>
        </Link>
      </section>
    </div>
  );
}
