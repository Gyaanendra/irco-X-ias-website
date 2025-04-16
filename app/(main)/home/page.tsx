// app/home/page.tsx
"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Hero from '@/components/Hero';
import NoiseGradientBackground from '@/components/noise-gradient-background';
import InfoSection from '@/components/InfoSection';

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    gsap.from('.animate-section', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.animate-section',
        scroller: scrollRef.current,
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <>
      <NoiseGradientBackground 
        grainOpacity={0.15} 
        gradientDirection="top-to-bottom" 
        className="fixed inset-0 -z-10 h-full w-full object-cover" 
      />
      <div className="relative" ref={scrollRef}>
        <div className="relative" style={{ zIndex: 1 }}>
          <Hero />
        </div>
        <div className="relative h-[50vh] w-full overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
        <div className="relative" style={{ zIndex: 50, position: 'relative', background: 'rgba(0,0,0,0.95)' }}>
          <motion.section 
            className="py-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <InfoSection />
          </motion.section>
        </div>
      </div>
    </>
  );
}