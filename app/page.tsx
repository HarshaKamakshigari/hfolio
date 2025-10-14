"use client";

import { useState } from "react";
import Image from "next/image";
import ImageTrail from "../components/image-trail-effect";
import Footer from "../components/Footer";
import CommandMenu from "../components/CommandMenu";

export default function Home() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Images for trail effect (same image repeated for consistency)
  const trailImages = [
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
  ];

  return (
    <>
      {/* ⌘K Hint - Higher z-index to stay clickable */}
      <button
        onClick={() => setIsCommandOpen(true)}
        className="fixed top-4 right-4 z-50 text-xs text-gray-500 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-1 pointer-events-auto"
        aria-label="Open command menu (Ctrl+K)"
      >
        <kbd className="text-red-400 font-mono">Ctrl+K</kbd>
      </button>

      {/* Command Menu - Outside trail */}
      <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />

      {/* ImageTrail wraps entire main content */}
      <ImageTrail
        images={trailImages}
        className="fixed inset-0 w-full h-full z-10"
        config={{
          imageLifespan: 1000,      // Images stay longer
          mouseThreshold: 5,        // Very sensitive
          minMovementForImage: 1,   // Triggers on any movement
          minImageSize: 80,         // Smaller for full screen
          maxImageSize: 150,
          inDuration: 500,          // Fast appearance
          outDuration: 800,         // Smooth fade-out
          removalTickMs: 16,
          maxRotationFactor: 5,
          baseRotation: 20,
          speedSmoothingFactor: 0.1,
          staggerOut: 50,
        }}
      >
        <main className="min-h-screen flex flex-col items-center justify-between p-8 bg-black text-white font-mono relative z-0 pointer-events-auto">
          {/* Top number */}
          <div className="text-white/80 text-lg mt-4 tracking-widest relative z-20">21</div>

          {/* Main content */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 flex-1 relative z-20">
            {/* Profile image */}
            <div className="w-72 h-72 relative grayscale overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80"
                alt="Harshaa's profile"
                fill
                className="object-cover cursor-pointer hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Right text */}
            <div className="max-w-md text-left space-y-6">
              <div>
                <h1 className="text-xl font-semibold leading-snug">
                  Helloww <br />
                  I'm <span className="text-red-500">Harshaa.</span>
                </h1>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                I craft digital experiences that inspire curiosity and trust — where{" "}
                <span className="text-red-500">design</span>,{" "}
                <span className="text-red-500">security</span>, and purpose meet,
                and every interface tells a story of{" "}
                <span className="text-red-500">elegance</span>,{" "}
                <span className="text-red-500">emotion</span>, and{" "}
                <span className="text-red-500">function</span>.
              </p>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </ImageTrail>
    </>
  );
}
