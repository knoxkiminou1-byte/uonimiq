import React from 'react';
import { useRoute } from 'wouter';
import { useCollection } from '@/hooks/use-collections';
import { ProductCard } from '@/components/product-card';
import { motion } from 'framer-motion';

export default function CollectionDetail() {
  const [, params] = useRoute('/collections/:slug');
  const slug = params?.slug || '';
  const { data: collection, isLoading } = useCollection(slug);

  if (isLoading) return <div className="min-h-screen pt-32 text-center animate-pulse">Entering collection...</div>;
  if (!collection) return <div className="min-h-screen pt-32 text-center font-serif text-2xl">Collection hidden.</div>;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <img 
            src={collection.image} 
            alt={collection.title}
            className="w-full h-full object-cover opacity-50 grayscale mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-3xl"
        >
          <span className="text-primary tracking-[0.3em] uppercase text-xs mb-6 block">Collection View</span>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 drop-shadow-xl">{collection.title}</h1>
          <p className="text-lg text-white/80 font-light leading-relaxed">
            {collection.description}
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {collection.products && collection.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {collection.products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground font-serif text-xl py-12">
            The pieces for this ritual are not yet revealed.
          </div>
        )}
      </section>
    </div>
  );
}
