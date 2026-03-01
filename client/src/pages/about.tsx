import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="pt-32 pb-32 max-w-4xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-24"
      >
        <span className="text-primary tracking-[0.3em] uppercase text-xs mb-6 block">The Manifesto</span>
        <h1 className="font-serif text-5xl md:text-6xl text-glow-purple">House of UONIMIQ</h1>
      </motion.div>

      <div className="space-y-32">
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-serif text-3xl mb-8">The Philosophy</h2>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
            <p>
              UONIMIQ is not a brand; it is a kingdom forged in shadow. We believe that true luxury does not shout—it hums with latent power. 
              Our silhouettes are sharp, our palette is sacred (Obsidian, Storm Violet, Ember Gold), and our intent is absolute.
            </p>
            <p>
              We reject the throwaway culture of modern fashion. Every piece we create is a designed object, a relic of the storm, intended to empower the wearer.
            </p>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="aspect-square bg-secondary/30 relative overflow-hidden">
             <img src="https://pixabay.com/get/g3f3a8698b0f14e82a5984e92daf76ece22ccff58d448c5890dd9c4d571b547b2fab92a2bd57320191a3ef543177d2d4d7de7a5caa9b7381403dc69d60ae80997_1280.jpg" alt="Process" className="w-full h-full object-cover opacity-60 grayscale mix-blend-luminosity" />
             <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
          </div>
          <div>
            <h2 className="font-serif text-3xl mb-8">The Symbolism</h2>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              <p>
                <strong className="text-foreground">The Crowned Lion:</strong> Our central icon, representing dominance, royalty, and untamed power.
              </p>
              <p>
                <strong className="text-foreground">The Storm:</strong> Translated through our violet hues, representing chaotic energy brought under master discipline.
              </p>
              <p>
                <strong className="text-foreground">The Ember:</strong> The gold accents that signify the spark of creation, warmth in the void, and premium elevation.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
