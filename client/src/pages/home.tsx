import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product-card';
import { getHeroVideoUrl } from '@/lib/shopify';
import { routes } from '@/lib/routes';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data: products, isLoading } = useProducts();
  const heroVideoSrc = getHeroVideoUrl();
  
  const handleEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Video play failed:", err);
        // Fallback if video can't play
        setHasEntered(true);
      });
    }
  };

  const handleVideoEnd = () => {
    setHasEntered(true);
  };

  // Safely get a featured product (e.g., the newest one)
  const featuredProduct = products?.find(p => p.isNew) || products?.[0];
  const signatureProducts = products?.filter(p => p.isSignature).slice(0, 4) || products?.slice(0, 4);

  return (
    <div className="w-full bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div 
            key="entrance"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            <video 
              ref={videoRef}
              onEnded={handleVideoEnd}
              playsInline 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>

            <AnimatePresence>
              {!isPlaying && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="mb-12 w-24 h-24 border border-accent/30 rounded-full flex items-center justify-center text-accent"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-12 h-12">
                      <path d="M2 20h20M12 4l-4 8H4l3 8h10l3-8h-4l-4-8z" />
                    </svg>
                  </motion.div>
                  
                  <h1 className="text-6xl md:text-8xl font-serif text-glow-purple tracking-[0.2em] mb-12">
                    UONIMIQ
                  </h1>

                  <button 
                    onClick={handleEnter}
                    className="group relative px-12 py-5 overflow-hidden border border-white/20 uppercase tracking-[0.4em] text-sm transition-all duration-700 hover:border-primary/50"
                  >
                    <span className="relative z-10 text-white group-hover:text-primary-foreground transition-colors duration-500">Enter the House</span>
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ambient lighting even before play */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-black pointer-events-none" />
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full"
          >
            {/* 1. Cinematic Hero / Secondary Entrance */}
            <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0 bg-black">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                  poster="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80"
                >
                  <source src={heroVideoSrc} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-serif text-glow-purple tracking-wider mb-6">
                  UONIMIQ
                </h2>
                <p className="text-lg text-foreground/60 font-light tracking-[0.3em] uppercase mb-12">
                  Built in shadow. Worn with power.
                </p>
                <Link 
                  href={routes.shop()} 
                  className="inline-block px-10 py-4 bg-white text-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all duration-500"
                >
                  Explore Collection
                </Link>
              </div>
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

            {/* 3. Featured Drop */}
            {featuredProduct && (
              <section className="py-24 px-6 bg-card border-y border-white/5 relative carved-stone">
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
                        href={routes.product(featuredProduct.slug)}
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
                  <Link href={routes.shop()} className="hidden md:block text-sm tracking-widest uppercase border-b border-transparent hover:border-primary text-primary transition-all pb-1">
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
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
