import React from 'react';
import { useLookbooks } from '@/hooks/use-lookbooks';
import { motion } from 'framer-motion';

export default function Lookbook() {
  const { data: lookbooks, isLoading } = useLookbooks();

  if (isLoading) {
    return <div className="min-h-screen bg-black pt-32 px-6 text-center text-muted-foreground animate-pulse">Loading campaign...</div>;
  }

  // Use the first lookbook as the primary campaign page
  const campaign = lookbooks?.[0];

  if (!campaign) {
    return <div className="min-h-screen bg-black pt-32 px-6 text-center font-serif text-2xl">No campaigns active.</div>;
  }

  // Masonry layout simulation arrays
  const images = [
    campaign.image,
    "https://images.unsplash.com/photo-1543132220-4bf5292c58a5?w=800&q=80",
    "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=800&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    "https://images.unsplash.com/photo-1550614000-4b95d4662130?w=800&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="h-screen relative flex items-center justify-center overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="relative z-10 text-center"
        >
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] italic opacity-90 tracking-tighter mix-blend-screen text-white/80">
            {campaign.title}
          </h1>
          <p className="mt-8 text-sm tracking-[0.3em] uppercase text-primary/80">A Digital Fashion Film</p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="font-serif text-2xl md:text-3xl leading-relaxed text-white/80">
          {campaign.description}
        </p>
      </div>

      {/* Editorial Masonry Grid */}
      <div className="max-w-[1400px] mx-auto px-6 pb-32">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: i % 3 * 0.2 }}
              className="break-inside-avoid relative group overflow-hidden bg-white/5"
            >
              <img src={img} alt="Campaign shot" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              {/* Optional shoppable hot zone overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
                <button className="text-xs uppercase tracking-widest border-b border-white pb-1">Shop The Look</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
