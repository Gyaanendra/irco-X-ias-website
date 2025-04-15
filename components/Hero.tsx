"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { TypewriterEffectSmooth } from "./typewriter-effect";


// Import the World component with dynamic import to prevent SSR issues
const World = dynamic(
  () => import("@/components/ui/globe").then((mod) => mod.World),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

// Sample connection data for the globe
const globeConnectionData = [
  {
    order: 1,
    startLat: 37.7749,
    startLng: -122.4194,
    endLat: 40.7128,
    endLng: -74.0060,
    arcAlt: 0.3,
    color: "#4FD1C5",
  },
  {
    order: 2,
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.2,
    color: "#9F7AEA",
  },
  {
    order: 3,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.25,
    color: "#F6AD55",
  },
];

// Globe configuration
const globeConfig = {
  pointSize: 0.5,
  globeColor: "#000000", // Changed to black
  showAtmosphere: true,
  atmosphereColor: "#ffffff",
  atmosphereAltitude: 0.15,
  emissive: "#000000",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.9)", // Made more visible white
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff", // Changed to white
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.5,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const Hero = () => {
  // Refs for DOM elements and animation control
  const heroSectionRef = useRef(null);
  const globeContainerRef = useRef(null);
  const globeSectionRef = useRef(null);
  const titleRef = useRef(null); // New ref for the title
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- ScrollTrigger Animation Effect for Globe and Title ---
  useEffect(() => {
    if (!isMounted) return;

    let attempts = 0;
    const maxAttempts = 20;
    const checkInterval = setInterval(() => {
      if (
        globeContainerRef.current &&
        heroSectionRef.current &&
        globeSectionRef.current &&
        titleRef.current
      ) {
        clearInterval(checkInterval);

        // Initial animation for the globe (fade in)
        gsap.fromTo(
          globeContainerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: "power3.out" }
        );

        // Title fade out animation
        gsap.to(titleRef.current, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "25% top", // Adjust this value to control when the fade completes
            scrub: true,
          },
        });

        // Create responsive animations based on screen size
        ScrollTrigger.matchMedia({
          // Desktop and larger screens
          "(min-width: 768px)": function () {
            // Create a two-part animation sequence
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: heroSectionRef.current,
                start: "top top",
                endTrigger: globeSectionRef.current,
                end: "top center",
                scrub: 0.8,
                markers: false,
                invalidateOnRefresh: true,
              },
            });

            // Initial state
            tl.set(globeContainerRef.current, {
              position: "fixed",
              bottom: "-30vh",
              top: "auto",
              left: "50%",
              right: "auto",
              transform: "translateX(-50%)",
              width: "60vh",
              height: "60vh",
            });

            // First part: Move down only (vertical movement)
            tl.to(globeContainerRef.current, {
              bottom: "auto",
              top: "50%",
              transform: "translateX(-50%) translateY(-50%)",
              duration: 0.5,
              ease: "power1.inOut",
            });

            // Second part: Move to the right when globe section comes into view
            tl.to(
              globeContainerRef.current,
              {
                left: "75%",
                right: "10%",
                duration: 0.5,
                ease: "power1.inOut",
              },
              ">"
            );

            // Add a pin spacer to maintain scroll position
            ScrollTrigger.create({
              trigger: heroSectionRef.current,
              start: "top top",
              end: "bottom top",
              onLeaveBack: () => {
                // Reset to initial position when scrolling all the way back up
                gsap.to(globeContainerRef.current, {
                  duration: 0.3,
                  bottom: "-30vh",
                  top: "auto",
                  left: "50%",
                  right: "auto",
                  transform: "translateX(-50%)",
                  ease: "power1.out",
                });
              },
            });
          },

          // Mobile screens
          "(max-width: 767px)": function () {
            // Create a single continuous animation with consistent behavior
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: heroSectionRef.current,
                start: "top top",
                endTrigger: globeSectionRef.current,
                end: "top center",
                scrub: 0.8,
                markers: false,
                invalidateOnRefresh: true,
              },
            });

            // Initial state
            tl.set(globeContainerRef.current, {
              position: "fixed",
              bottom: "-30vh",
              top: "auto",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60vh",
              height: "60vh",
            });

            // Direct animation path: bottom center → center with scale
            tl.to(globeContainerRef.current, {
              bottom: "auto",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1.1)",
              duration: 1,
              ease: "power1.inOut",
            });

            // Add a pin spacer to maintain scroll position
            ScrollTrigger.create({
              trigger: heroSectionRef.current,
              start: "top top",
              end: "bottom top",
              onLeaveBack: () => {
                // Reset to initial position when scrolling all the way back up
                gsap.to(globeContainerRef.current, {
                  duration: 0.3,
                  bottom: "-30vh",
                  top: "auto",
                  left: "50%",
                  transform: "translateX(-50%)",
                  ease: "power1.out",
                });
              },
            });
          },
        });
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.warn("Could not find required elements after multiple attempts");
      }
      attempts++;
    }, 200);

    return () => {
      clearInterval(checkInterval);
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMounted]);

  // Title words for typewriter effect
  const titleWords = [
    { text: "We" },
    { text: "are" },
    { text: "International" },
    { text: "Affairs" },
    { text: "Society" },
    { text: "by" },
    { text: "IRCO." },
  ];

  return (
    <>
      {/* Add a style tag to hide blob elements */}
      <style jsx global>{`
        .blob-element, 
        .blob-3d, 
        .blob-glow, 
        .blob-float,
        [class*="blob"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `}</style>
        <div className="max-w-7xl mx-auto pt-12 mt-6">
        {/* Center text with responsive font size - moved down with padding/margin */}
        <div className="flex items-center justify-center">
          <div className="text-white md:text-5xl text-3xl tracking-wider text-center font-['TAN-Pearl']">
            IRCO | IAS
          </div>
        </div>
      </div>
      
  
      <section
        ref={heroSectionRef}
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="container mx-auto px-4 z-10 flex flex-col items-center">
          {/* Main title with typewriter effect - now with ref */}
          <div ref={titleRef} className="transition-opacity duration-300">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-16 font-['Sarpanch'] tracking-wider">
              <TypewriterEffectSmooth words={titleWords} />
            </h1>
          </div>

          {/* Globe container - positioned to show half at the bottom */}
          <div
            ref={globeContainerRef}
            className="w-full max-w-2xl h-[60vh] relative"  
            style={{
              position: "fixed",
              pointerEvents: "none",
              bottom: "-30vh", // Position globe so only half is visible
              left: "50%",
              transform: "translateX(-50%)", // Center horizontally
              width: "60vh", // Fixed width
              height: "60vh", // Fixed height
              zIndex: 5, // Lower z-index so it doesn't overlap content
            }}
          >
            {isMounted && (
              <World
                globeConfig={{
                  ...globeConfig,
                  globeColor: "#000000", // Ensure black globe
                  showAtmosphere: true,
                  atmosphereColor: "#ffffff",
                  atmosphereAltitude: 0.15,
                  autoRotate: true,
                  autoRotateSpeed: 0.3,
                }}
                data={globeConnectionData}
              />
            )}
          </div>
        </div>

       
      </section>

      {/* New Globe Section with no overlay */}
      <section
        ref={globeSectionRef}
        className="min-h-screen flex items-center justify-center relative overflow-visible"
        style={{ position: "relative", zIndex: 15 }} // Increased z-index to ensure proper stacking
      >
        <div className="container mx-auto px-4 flex flex-row items-center justify-between">
          {/* Left side description */}
          <div className="w-full md:w-1/2 text-left pr-8 z-20">
            <h2 className="text-4xl font-bold text-white mb-8 font-['Sarpanch']">
              Our Global Network
            </h2>
            <p className="text-xl text-gray-200 mb-6 font-['Sarpanch']">
              Connecting thought leaders, policymakers, and researchers across
              continents to address the world's most pressing challenges.
            </p>
            <p className="text-xl text-gray-200 mb-6 font-['Sarpanch']">
              Our international network spans over 50 countries, creating a
              diverse ecosystem of expertise and collaboration.
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-md hover:bg-opacity-90 transition mt-4 font-['Sarpanch']">
              Join Our Network
            </button>
          </div>

          {/* Right side - empty space for the globe to animate into */}
          <div
            className="w-full md:w-1/2 h-[60vh] relative hidden md:block"
            style={{ zIndex: 1 }}
          >
            {/* Globe will animate to this position */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
