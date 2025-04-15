// app/home/page.tsx
"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/Hero';
import NoiseGradientBackground from '@/components/noise-gradient-background';
import InfoSection from '@/components/InfoSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    // Dynamically import LocomotiveScroll to ensure it only runs on the client side.
    import('locomotive-scroll').then((module) => {
      const LocomotiveScroll = module.default;
      const locoScroll = new LocomotiveScroll({
        el: scrollRef.current as HTMLElement,
        smooth: true,
        multiplier: 1,
      });

      locoScroll.on('scroll', ScrollTrigger.update);

      // Proxy for GSAP's ScrollTrigger to work with Locomotive Scroll
      ScrollTrigger.scrollerProxy(scrollRef.current, {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollRef.current.style.transform ? 'transform' : 'fixed',
      });

      // Refresh ScrollTrigger and update Locomotive Scroll on window updates
      ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
      ScrollTrigger.refresh();

      // Cleanup on unmount
      return () => {
        locoScroll.destroy();
        ScrollTrigger.removeEventListener('refresh', () => locoScroll.update());
      };
    });
  }, []);

  // GSAP animation for sections with the "animate-section" class
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
    {/* Fixed background canvas */}
    <NoiseGradientBackground 
      grainOpacity={0.15} 
      gradientDirection="top-to-bottom" 
      className="fixed inset-0 -z-10 h-full w-full object-cover" 
    />
    
    {/* Main content */}
    <div className="relative">
      {/* Hero section with globe */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Hero />
      </div>
    
      {/* Transition section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    
      {/* Add the InfoSection component with higher z-index to appear above globe */}
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
