"use client";

import React from 'react';

interface BackgroundBlobsProps {
  count?: number;
  className?: string;
}

export default function BackgroundBlobs({ count = 5, className = "" }: BackgroundBlobsProps) {
  // Generate random positions for the blobs
  const blobs = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 300) + 200, // Random size between 200-500px
    left: `${Math.floor(Math.random() * 80) + 10}%`, // Random position 10-90%
    top: `${Math.floor(Math.random() * 80) + 10}%`, // Random position 10-90%
    animationDuration: `${Math.floor(Math.random() * 20) + 20}s`, // Random duration 20-40s
    animationDelay: `${Math.floor(Math.random() * 10)}s`, // Random delay 0-10s
    opacity: Math.random() * 0.15 + 0.05, // Random opacity between 0.05-0.2
  }));

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className="absolute rounded-full blob-3d blob-glow blob-float"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.left,
            top: blob.top,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            filter: 'blur(60px)',
            opacity: blob.opacity,
            '--duration': blob.animationDuration,
            '--delay': blob.animationDelay,
            '--glow-duration': `${Math.floor(Math.random() * 5) + 5}s`,
            '--glow-delay': `${Math.floor(Math.random() * 5)}s`,
            '--float-duration': `${Math.floor(Math.random() * 10) + 15}s`,
            '--float-delay': `${Math.floor(Math.random() * 5)}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}