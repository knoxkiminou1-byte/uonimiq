import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Lock } from "lucide-react";
import heroVideo from '@assets/c904sh0rr1rmy0cwn25trz20mr_result__1772355237460.mp4';
import { motion, AnimatePresence } from "framer-motion";

export function Landing({ onEnter }: { onEnter: () => void }) {
  const [isEntering, setIsEntering] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useState<HTMLVideoElement | null>(null)[0];

  const handleEnter = () => {
    setIsEntering(true);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!isEntering ? (
          <motion.div 
            key="pre-enter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative w-full h-full flex flex-col items-center justify-center bg-[#050505]"
          >
            {/* Static Initial State - Deep Obsidian Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,30,109,0.05)_0%,transparent_70%)]" />
            
            <div className="relative z-10 flex flex-col items-center gap-12 text-center px-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] text-foreground uppercase tracking-[0.3em] drop-shadow-[0_0_30px_rgba(182,138,42,0.2)]">
                  UONIMIQ
                </h1>
                <p className="mt-4 text-primary tracking-[0.5em] uppercase text-xs sm:text-sm font-light">
                  Royal Storm & Obsidian Ritual
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                onClick={handleEnter}
                className="group relative flex items-center justify-center w-64 h-20 overflow-hidden border border-primary/30 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-primary"
              >
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <span className="relative z-10 text-xs tracking-[0.4em] uppercase font-light group-hover:text-primary-foreground transition-colors duration-500">
                  Enter the House
                </span>
              </motion.button>
            </div>
            
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40">
              <div className="w-12 h-[1px] bg-border" />
              <span>Est. MMXXVI</span>
              <div className="w-12 h-[1px] bg-border" />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="video-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-[110] bg-black flex items-center justify-center"
          >
             <video 
                autoPlay 
                playsInline 
                onEnded={handleVideoEnd}
                className="w-full h-full object-cover scale-100"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
              
              {/* Optional skip for user experience if video is long */}
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                whileHover={{ opacity: 1 }}
                onClick={handleVideoEnd}
                className="absolute bottom-12 right-12 text-[10px] tracking-widest uppercase text-white/50 border-b border-white/20 pb-1"
              >
                Skip Intro
              </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
