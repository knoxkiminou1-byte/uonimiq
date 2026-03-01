import React from 'react';
import { Link } from 'wouter';
import { useCollections } from '@/hooks/use-collections';
import { motion } from 'framer-motion';

export default function Collections() {
  const { data: collections, isLoading } = useCollections();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h1 className="font-serif text-5xl mb-4 text-glow-gold">The Houses</h1>
        <p className="text-muted-foreground tracking-widest uppercase text-sm max-w-xl mx-auto">
          Galleries within the house. Distinct expressions of the same shadow.
        </p>
      </div>

      {isLoading ? (
        <div className="max-w-5xl mx-auto px-6 space-y-24">
          {[1,2].map(i => (
            <div key={i} className="aspect-video md:aspect-[21/9] bg-secondary/30 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 space-y-16 lg:space-y-32">
          {collections?.map((collection, index) => (
            <motion.div 
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <Link href={`/collections/${collection.slug}`} className="block relative aspect-[4/5] md:aspect-[21/9] overflow-hidden">
                <img 
                  src={collection.image || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"} 
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-xs tracking-[0.4em] uppercase text-primary mb-6">Collection {index + 1}</span>
                  <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 drop-shadow-lg">{collection.title}</h2>
                  <div className="overflow-hidden">
                    <span className="block px-8 py-3 border border-white text-sm tracking-widest uppercase bg-black/20 backdrop-blur-md translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      View Ritual
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
