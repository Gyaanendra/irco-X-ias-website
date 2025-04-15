"use client"

import { useEffect, useState, useRef } from "react"
import Aurora from "./ui/Aurora"
interface NoiseGradientBackgroundProps {
  className?: string
  blobCount?: number
  seed?: number
  interactive?: boolean
  starCount?: number
}

// Seeded random number generator
function seededRandom(seed: number) {
  let value = seed;
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  }
}

export default function NoiseGradientBackground({
  className = "",
  blobCount = 12,
  seed = 12345,
  interactive = true,
  starCount = 150
}: NoiseGradientBackgroundProps) {
  const [blobs, setBlobs] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    blur: number;
    opacity: number;
    color: string;
    animationDuration: number;
    animationDelay: number;
    zIndex: number;
    transform: string;
  }>>([]);
  
  const [stars, setStars] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    opacity: number;
    depth: number;
    twinkleSpeed: number;
  }>>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Create a seeded random function for consistent generation
    const random = seededRandom(seed);
    
    // Generate random blobs with white/grey colors
    const newBlobs = Array.from({ length: blobCount }, (_, i) => {
      // Create white to grey color variations
      const brightness = 80 + Math.floor(random() * 20); // 80-100% brightness (white to light grey)
      
      // Calculate z position for 3D effect (between -100 and 100)
      const zPos = -100 + random() * 200;
      
      return {
        id: i,
        size: 15 + random() * 35,
        x: random() * 100,
        y: random() * 100,
        blur: 30 + random() * 70,
        opacity: 0.1 + random() * 0.3,
        color: `rgba(${brightness}%, ${brightness}%, ${brightness}%, 0.8)`,
        animationDuration: 20 + random() * 40,
        animationDelay: -random() * 15,
        zIndex: Math.floor(zPos),
        transform: `translateZ(${zPos}px) rotateX(${random() * 360}deg) rotateY(${random() * 360}deg)`
      };
    });
    
    // Generate stars with different depths for parallax
    const newStars = Array.from({ length: starCount }, (_, i) => {
      const depth = random() * 5; // 0-5 depth factor (higher = more parallax)
      
      return {
        id: i,
        size: 1 + random() * 2, // Small stars 1-3px
        x: random() * 100,
        y: random() * 100,
        opacity: 0.5 + random() * 0.5, // 50-100% opacity
        depth: depth,
        twinkleSpeed: 1 + random() * 4, // Random twinkle speed
      };
    });
    
    setBlobs(newBlobs);
    setStars(newStars);
    
    // Add mouse interaction for 3D parallax effect
    if (interactive && containerRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        mousePosition.current = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        };
        
        // Parallax for blobs
        document.querySelectorAll('.blob-element').forEach((blob, index) => {
          if (index >= newBlobs.length) return;
          
          const zPos = newBlobs[index].zIndex;
          const moveFactor = (zPos + 100) / 200 * 0.05;
          
          const xOffset = (mousePosition.current.x - 50) * moveFactor;
          const yOffset = (mousePosition.current.y - 50) * moveFactor;
          
          const blobElement = blob as HTMLElement;
          blobElement.style.transform = `
            translate3d(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px), 0)
            ${newBlobs[index].transform}
          `;
        });
        
        // Parallax for stars
        document.querySelectorAll('.star-particle').forEach((star, index) => {
          if (index >= newStars.length) return;
          
          const depth = newStars[index].depth;
          const moveFactor = depth * 0.03; // More depth = more movement
          
          const xOffset = (mousePosition.current.x - 50) * moveFactor;
          const yOffset = (mousePosition.current.y - 50) * moveFactor;
          
          const starElement = star as HTMLElement;
          starElement.style.transform = `
            translate3d(${xOffset}px, ${yOffset}px, 0)
          `;
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [blobCount, seed, interactive, starCount]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 -z-10 overflow-hidden bg-black ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Base gradient - darker for better contrast with white blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900"></div>
      
      {/* Aurora background effect */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Aurora 
          colorStops={["#ffffff", "#d1d5db", "#9ca3af"]} 
          amplitude={1.5}
          blend={0.8}
        />
      </div>
      
      {/* Star particles with parallax effect */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full star-particle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: '#ffffff',
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
            opacity: star.opacity,
            animation: `twinkle ${star.twinkleSpeed}s infinite alternate ease-in-out`,
            zIndex: 5,
            transition: 'transform 0.1s ease-out',
          }}
        />
      ))}
      
      {/* White/Grey Blobs without glow */}
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className="absolute rounded-full blob-element"
          style={{
            width: `${blob.size}vw`,
            height: `${blob.size}vw`,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            backgroundColor: blob.color,
            filter: `blur(${blob.blur}px)`,
            opacity: blob.opacity,
            animation: `blob-transform-3d ${blob.animationDuration}s infinite alternate-reverse ease-in-out`,
            animationDelay: `${blob.animationDelay}s`,
            transform: `translate3d(-50%, -50%, 0) ${blob.transform}`,
            zIndex: blob.zIndex,
            transition: 'transform 0.3s ease-out',
            mixBlendMode: 'screen'
          }}
        />
      ))}
      
      {/* Overlay to add texture */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Add depth vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.7) 100%)'
        }}
      />
      
      {/* Add CSS animation for twinkling stars */}
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: ${0.3};
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
