// "use client";

// import { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import "./fonts.css";
// import Footer from "../components/Footer";
// import CommandMenu from "../components/CommandMenu";
// import TopNumber from "../components/TopNumber";
// import Crosshair from "../components/Crosshair";
// import Noise from "@/components/Noise";

// export default function About() {
//   const [isCommandOpen, setIsCommandOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Container stagger
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2, delayChildren: 0.3 },
//     },
//   };

//   // Fade up variant (no transition inside variant)
//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0 },
//   };

//   return (
//     <>
//       {/* Command Menu Button */}
//       <button
//         onClick={() => setIsCommandOpen(true)}
//         className="fixed top-4 right-4 z-50 text-xs text-gray-500 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-1 pointer-events-auto"
//         aria-label="Open command menu (Ctrl+K)"
//       >
//         <kbd className="text-red-400 font-mono">Ctrl+K</kbd>
//       </button>

//       <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />

//       {/* Crosshair overlay */}
//       <div className="pointer-events-none hidden sm:block fixed inset-0 z-40">
//         <Crosshair
//           containerRef={containerRef as React.RefObject<HTMLElement>}
//           color="#ffffff"
//         />
//       </div>

//       {/* Page content */}
//       <div
//         ref={containerRef}
//         className="relative min-h-screen flex flex-col text-white font-mono overflow-hidden"
//       >
//         {/* Noise Background */}
//         <div className="absolute inset-0 -z-10">
//           <Noise
//             patternSize={250}
//             patternScaleX={1}
//             patternScaleY={1}
//             patternRefreshInterval={2}
//             patternAlpha={15}
//           />
//         </div>

//         {/* Vertical Coordinates */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
//           className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center text-xs text-gray-500 tracking-widest select-none"
//         >
//           <span className="transform rotate-180 writing-vertical-rl [writing-mode:vertical-rl]">
//             13.6288° <span className="text-red-600">N</span>
//           </span>
//           <div className="w-px h-9 bg-gray-700 my-2"></div>
//           <span className="transform rotate-180 writing-vertical-rl [writing-mode:vertical-rl]">
//             79.4192°<span className="text-red-600">E</span>
//           </span>
//         </motion.div>

//         <main className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-between p-8 relative z-20">
//           <TopNumber />

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="show"
//             className="flex flex-col md:flex-row items-center justify-center gap-10 flex-1"
//           >
//             {/* Profile Image */}
//             <motion.div
//               variants={fadeUp}
//               transition={{ type: "spring", stiffness: 100, damping: 10 }}
//               className="w-72 h-72 relative overflow-hidden rounded-2xl"
//             >
//               <Image
//                 src="/pictures/pp.jpg"
//                 alt="Harsha Kamakshigari"
//                 fill
//                 className="object-cover cursor-pointer hover:grayscale-0 transition-all duration-700 ease-in-out"
//               />
//             </motion.div>

//             {/* Text */}
//             <motion.div
//               variants={fadeUp}
//               transition={{ duration: 1, ease: "easeInOut" }}
//               className="max-w-md text-left space-y-6 leading-snug"
//             >
//               <h1 className="text-3xl md:text-4xl font-serif tracking-tight">
//                 I explore the edges <br />
//                 where <span className="text-red-500">design</span>,
//                 <span className="text-red-500">code</span>, and{" "}
//                 <span className="text-red-500">security</span> collide.
//               </h1>
//               <p className="text-gray-300 text-sm md:text-base font-serif leading-relaxed">
//                 Minimal, raw, and purposeful. I build interfaces that don’t just look
//                 sharp — they{" "}
//                 <span className="text-red-500">protect</span>,{" "}
//                 <span className="text-red-500">inform</span>, and{" "}
//                 <span className="text-red-500">resonate</span>. Brutalism in form,
//                 elegance in function, anti-design in spirit.
//               </p>
//             </motion.div>
//           </motion.div>
//         </main>

//         {/* Footer */}
//         {/* <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
//           className="relative z-20 flex items-center justify-center"
//         >
//           <Footer />
//         </motion.div> */}
//       </div>
//       <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
//           className="relative z-20 flex items-center justify-center"
//         >
//           <Footer />
//         </motion.div>
//     </>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./fonts.css";
import Footer from "../components/Footer";
import CommandMenu from "../components/CommandMenu";
import TopNumber from "../components/TopNumber";
import Crosshair from "../components/Crosshair";
import Noise from "@/components/Noise";

export default function About() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white font-mono overflow-hidden">
      
      {/* NOISE (same as Notes) */}
      <div className="fixed inset-0 -z-10 bg-black">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
      </div>

      {/* CMD BUTTON */}
      <button
        onClick={() => setIsCommandOpen(true)}
        className="fixed top-4 right-4 z-30 text-xs text-gray-500 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-1 pointer-events-auto"
      >
        <kbd className="text-red-400 font-mono">Ctrl+K</kbd>
      </button>

      <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />

<<<<<<< ours

      {/* TOP NUMBER */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20">
        <TopNumber />
||||||| ancestor
      {/* Crosshair overlay */}
      <div className="pointer-events-none hidden sm:block fixed inset-0 z-40">
        <Crosshair
          containerRef={containerRef as React.RefObject<HTMLElement>}
          color="#ffffff"
        />
=======
      {/* CROSSHAIR */}
      <div className="pointer-events-none hidden sm:block fixed inset-0 z-40">
        <Crosshair
          containerRef={containerRef as React.RefObject<HTMLElement>}
          color="#ffffff"
        />
>>>>>>> theirs
      </div>

<<<<<<< ours
      {/* ⭐ MAIN CONTENT (flex-1 just like Notes page) */}
      <main
||||||| ancestor
      {/* Page content */}
      <div
=======
      {/* TOP NUMBER */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20">
        <TopNumber />
      </div>

      {/* ⭐ MAIN CONTENT (flex-1 just like Notes page) */}
      <main
>>>>>>> theirs
        ref={containerRef}
        className="flex-1 flex flex-col items-center justify-between p-8 pt-48 pb-16 relative z-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row items-center justify-center gap-10"
        >
          {/* IMAGE */}
          <motion.div
            variants={fadeUp}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="w-72 h-72 relative overflow-hidden rounded-2xl"
          >
            <Image
              src="/pictures/pp.jpg"
              alt="Harsha Kamakshigari"
              fill
              className="object-cover cursor-pointer hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="max-w-md text-left space-y-6 leading-snug"
          >
            <h1 className="text-3xl md:text-4xl font-serif tracking-tight">
              I explore the edges <br />
              where <span className="text-red-500">design</span>,
              <span className="text-red-500">code</span>, and{" "}
              <span className="text-red-500">security</span> collide.
            </h1>
            <p className="text-gray-300 text-sm md:text-base font-serif leading-relaxed">
              Minimal, raw, and purposeful. I build interfaces that don’t just look
              sharp — they{" "}
              <span className="text-red-500">protect</span>,{" "}
              <span className="text-red-500">inform</span>, and{" "}
              <span className="text-red-500">resonate</span>. Brutalism in form,
              elegance in function, anti-design in spirit.
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* ⭐ FOOTER → EXACT SAME STRUCTURE AS NOTES PAGE */}
      <div className="relative bottom-0 z-20">
        <Footer />
      </div>
    </div>
  );
}
