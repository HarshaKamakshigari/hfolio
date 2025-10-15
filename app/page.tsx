// // "use client";

// // import { useState } from "react";
// // import Image from "next/image";
// // import ImageTrail from "../components/image-trail-effect";
// // import Footer from "../components/Footer";
// // import CommandMenu from "../components/CommandMenu";

// // export default function Home() {
// //   const [isCommandOpen, setIsCommandOpen] = useState(false);

// //   // Images for trail effect (same image repeated for consistency)
// //   const trailImages = [
// //     "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
// //     "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
// //     "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
// //   ];

// //   return (
// //     <>
// //       {/* ⌘K Hint - Higher z-index to stay clickable */}
// //       <button
// //         onClick={() => setIsCommandOpen(true)}
// //         className="fixed top-4 right-4 z-50 text-xs text-gray-500 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-1 pointer-events-auto"
// //         aria-label="Open command menu (Ctrl+K)"
// //       >
// //         <kbd className="text-red-400 font-mono">Ctrl+K</kbd>
// //       </button>

// //       {/* Command Menu - Outside trail */}
// //       <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />

// //       {/* ImageTrail wraps entire main content */}
// //       <ImageTrail
// //         images={trailImages}
// //         className="fixed inset-0 w-full h-full z-10"
// //         config={{
// //           imageLifespan: 1000,      // Images stay longer
// //           mouseThreshold: 5,        // Very sensitive
// //           minMovementForImage: 1,   // Triggers on any movement
// //           minImageSize: 80,         // Smaller for full screen
// //           maxImageSize: 150,
// //           inDuration: 500,          // Fast appearance
// //           outDuration: 800,         // Smooth fade-out
// //           removalTickMs: 16,
// //           maxRotationFactor: 5,
// //           baseRotation: 20,
// //           speedSmoothingFactor: 0.1,
// //           staggerOut: 50,
// //         }}
// //       >
// //         <main className="min-h-screen flex flex-col items-center justify-between p-8 bg-black text-white font-mono relative z-0 pointer-events-auto">
// //           {/* Top number */}
// //           <div className="text-white/80 text-lg mt-4 tracking-widest relative z-20">21</div>

// //           {/* Main content */}
// //           <div className="flex flex-col md:flex-row items-center justify-center gap-10 flex-1 relative z-20">
// //             {/* Profile image */}
// //             <div className="w-72 h-72 relative grayscale overflow-hidden">
// //               <Image
// //                 src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80"
// //                 alt="Harshaa's profile"
// //                 fill
// //                 className="object-cover cursor-pointer hover:grayscale-0 transition-all duration-300"
// //               />
// //             </div>

// //             {/* Right text */}
// //             <div className="max-w-md text-left space-y-6">
// //               <div>
// //                 <h1 className="text-xl font-semibold leading-snug">
// //                   Helloww <br />
// //                   I'm <span className="text-red-500">Harshaa.</span>
// //                 </h1>
// //               </div>
// //               <p className="text-gray-300 text-sm md:text-base leading-relaxed">
// //                 I craft digital experiences that inspire curiosity and trust — where{" "}
// //                 <span className="text-red-500">design</span>,{" "}
// //                 <span className="text-red-500">security</span>, and purpose meet,
// //                 and every interface tells a story of{" "}
// //                 <span className="text-red-500">elegance</span>,{" "}
// //                 <span className="text-red-500">emotion</span>, and{" "}
// //                 <span className="text-red-500">function</span>.
// //               </p>
// //             </div>
// //           </div>

// //           {/* Footer */}
// //           <Footer />
// //         </main>
// //       </ImageTrail>
// //     </>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import ImageTrail from "../components/image-trail-effect";
// import Footer from "../components/Footer";
// import CommandMenu from "../components/CommandMenu";
// import TopNumber from "../components/TopNumber"; // ← new import

// export default function Home() {
//   const [isCommandOpen, setIsCommandOpen] = useState(false);

//   // Images for trail effect
//   const trailImages = [
//     "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
//     "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
//     "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
//   ];

//   return (
//     <>

//       <button
//         onClick={() => setIsCommandOpen(true)}
//         className="fixed top-4 right-4 z-50 text-xs text-gray-500 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-1 pointer-events-auto"
//         aria-label="Open command menu (Ctrl+K)"
//       >
//         <kbd className="text-red-400 font-mono">Ctrl+K</kbd>
//       </button>

//       <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />

//       {/* Limit trail area to exclude footer */}
//       <div className="relative min-h-screen flex flex-col bg-black text-white font-mono overflow-hidden">
//         <div className="relative flex-1">
//           <ImageTrail
//             images={trailImages}
//             className="absolute inset-0 w-full h-full z-10 pointer-events-none"
//             config={{
//               imageLifespan: 100,
//               mouseThreshold: 5,
//               minMovementForImage: 1,
//               minImageSize: 80,
//               maxImageSize: 100,
//               inDuration: 500,
//               outDuration: 800,
//               removalTickMs: 5,
//               maxRotationFactor: 5,
//               baseRotation: 20,
//               speedSmoothingFactor: 0.1,
//               staggerOut: 10,
//             }}
//           >
//             <main className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-between p-8 relative z-20 pointer-events-auto">
//               {/* Top number component */}
//               <TopNumber />

//               {/* Main content */}
//               <div className="flex flex-col md:flex-row items-center justify-center gap-10 flex-1">
//                 {/* Profile image */}
//                 <div className="w-72 h-72 relative grayscale overflow-hidden">
//                   <Image
//                     src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80"
//                     alt="Harshaa's profile"
//                     fill
//                     className="object-cover cursor-pointer hover:grayscale-0 transition-all duration-300"
//                   />
//                 </div>

//                 {/* Right text */}
//                 <div className="max-w-md text-left space-y-6">
//                   <h1 className="text-xl font-mono leading-snug">
//                     Helloww <br />
//                     I'm <span className="text-red-500">Harshaa.</span>
//                   </h1>
//                   <p className="text-gray-300 text-sm md:text-base leading-relaxed">
//                     I craft digital experiences that inspire curiosity and trust — where{" "}
//                     <span className="text-red-500">design</span>,{" "}
//                     <span className="text-red-500">security</span>, and purpose meet,
//                     and every interface tells a story of{" "}
//                     <span className="text-red-500">elegance</span>,{" "}
//                     <span className="text-red-500">emotion</span>, and{" "}
//                     <span className="text-red-500">function</span>.
//                   </p>
//                 </div>
//               </div>
//             </main>
//           </ImageTrail>
//         </div>

//         {/* Footer stays clean, centered, and not under trail */}
//         <div className="relative z-30 flex items-center justify-center bg-black">
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import CommandMenu from "../components/CommandMenu";
import TopNumber from "../components/TopNumber";
import Crosshair from "../components/Crosshair";
import Noise from "@/components/Noise"; // imported from shadcn/reactbits

export default function Home() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Command Menu trigger */}
      <button
        onClick={() => setIsCommandOpen(true)}
        className="fixed top-4 right-4 z-50 text-xs text-gray-500 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-1 pointer-events-auto"
        aria-label="Open command menu (Ctrl+K)"
      >
        <kbd className="text-red-400 font-mono">Ctrl+K</kbd>
      </button>

      {/* Command Menu */}
      <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />

      {/* Crosshair overlay (hidden on mobile) */}
      <div className="pointer-events-none hidden sm:block fixed inset-0 z-40">
        <Crosshair containerRef={containerRef} color="#ffffff" />
      </div>

      {/* Page content */}
      <div
        ref={containerRef}
        className="relative min-h-screen flex flex-col bg-black text-white font-mono overflow-hidden"
      >
        {/* Noise background */}
        <Noise className="absolute inset-0 -z-10" intensity={0.1} />

        <main className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-between p-8 relative z-20">
          <TopNumber />

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 flex-1">
            {/* Profile image */}
            <div className="w-72 h-72 relative grayscale overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80"
                alt="Harshaa's profile"
                fill
                className="object-cover cursor-pointer hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Text */}
            <div className="max-w-md text-left space-y-6">
              <h1 className="text-xl font-mono leading-snug">
                Helloww <br />
                I'm <span className="text-red-500">Harshaa.</span>
              </h1>
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
        </main>

        {/* Footer */}
        <div className="relative z-20 flex items-center justify-center bg-black">
          <Footer />
        </div>
      </div>
    </>
  );
}
