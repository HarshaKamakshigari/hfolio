// // "use client";

// // import { useEffect } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import TopNumber from "../../components/TopNumber";
// // import Footer from "../../components/Footer";
// // import Lenis from "@studio-freight/lenis";
// // import { projects } from "../../data/projectsData";
// // import Noise from "@/components/Noise";
// // import { ChevronRight, ChevronLeft } from "lucide-react";

// // export default function Works() {
// //   useEffect(() => {
// //     const lenis = new Lenis({
// //       direction: "horizontal",
// //       smooth: true,
// //       smoothTouch: true,
// //     });

// //     function raf(time: number) {
// //       lenis.raf(time);
// //       requestAnimationFrame(raf);
// //     }

// //     requestAnimationFrame(raf);
// //     return () => lenis.destroy();
// //   }, []);

// //   return (
// //     <div className="relative min-h-screen text-white font-mono overflow-hidden flex flex-col">
// //       {/* ✅ Unified Noise + Background Layer */}
// //       <div className="fixed inset-0 -z-10 bg-black">
// //         <Noise className="absolute inset-0 w-full h-full" intensity={100} />
// //       </div>

// //       {/* ✅ Fixed Top Number (like Home) */}
// //       <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20">
// //         <TopNumber />
// //       </div>

// //       {/* ✅ Horizontal Scroll Section */}
// //       <main className="flex-1 flex items-center justify-center px-40 relative">
// //         <div
// //           className="w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
// //           data-lenis-prevent
// //           style={{
// //             scrollbarWidth: "none",
// //             msOverflowStyle: "none",
// //           }}
// //         >
// //           <div
// //             className="flex gap-16 items-center ml-15 pt-20"
// //             style={{ WebkitOverflowScrolling: "touch" }}
// //           >
// //             {projects.map((project) => (
// //               <Link
// //                 href={`/projects/${project.slug}`}
// //                 key={project.slug}
// //                 className="w-screen max-w-5xl flex-shrink-0 snap-center flex flex-col items-center cursor-pointer"
// //               >
// //                 {/* Image */}
// //                 <div className="relative w-full md:w-[800px] h-[60vh] border border-gray-800 rounded-lg overflow-hidden">
// //                   <Image
// //                     src={project.image}
// //                     alt={project.title}
// //                     fill
// //                     className="object-cover"
// //                     priority
// //                   />
// //                 </div>

// //                 {/* Number + Title */}
// //                 <div className="relative w-full md:w-[800px] flex justify-center items-center mt-4">
// //                   <span className="absolute left-4 text-red-500 font-mono text-lg">
// //                     {project.index}
// //                   </span>
// //                   <span className="text-white text-2xl md:text-4xl font-light text-center">
// //                     {project.title}
// //                   </span>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>

// //         {/* 🔄 Scroll Indicator (Right Side) */}
// //         <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-60 animate-pulse pointer-events-none select-none">
// //           <ChevronRight className="w-6 h-6 mb-2 pb-2 text-gray-400" />
// //           <span className="text-xs text-gray-400 tracking-widest rotate-90">
// //             SCROLL
// //           </span>
// //         </div>

// //         {/* 🔄 Optional Left-side indicator (fades in only if you want both sides) */}
// //         {/* <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-40 animate-pulse pointer-events-none select-none">
// //           <ChevronLeft className="w-6 h-6 text-gray-400" />
// //         </div> */}
// //       </main>

// //       {/* ✅ Fixed Footer (like Home) */}
// //       <div className="bottom-6 z-20 bg-black">
// //         <Footer />
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import TopNumber from "../../components/TopNumber";
// import Footer from "../../components/Footer";
// import Lenis from "@studio-freight/lenis";
// import { projects } from "../../data/projectsData";
// import Noise from "@/components/Noise";
// import { ChevronRight } from "lucide-react";

// export default function Works() {
//   useEffect(() => {
//     // ✅ Only enable Lenis on desktop (width >= 768px)
//     if (window.innerWidth >= 768) {
//       const lenis = new Lenis({
//         direction: "horizontal",
//         smooth: true,
//         smoothTouch: true,
//       });

//       function raf(time: number) {
//         lenis.raf(time);
//         requestAnimationFrame(raf);
//       }

//       requestAnimationFrame(raf);
//       return () => lenis.destroy();
//     }
//   }, []);

//   return (
//     <div className="relative min-h-screen text-white font-mono overflow-hidden flex flex-col">
//       {/* ✅ Background Noise */}
//       {/* <div className="fixed inset-0 -z-10 bg-black">
//         <Noise className="absolute inset-0 w-full h-full" intensity={100} />
//       </div> */}
// <div className="fixed inset-0 -z-10 w-full h-full">
//   <Noise intensity={100} />
// </div>

//       {/* ✅ Top Number */}
//       <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20">
//         <TopNumber />
//       </div>

//       {/* ✅ Main Content */}
//       <main className="flex-1 flex items-center justify-center px-4 md:px-40 relative">
//         <div
//           className="w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden md:snap-x md:snap-mandatory flex md:block"
//           data-lenis-prevent
//           style={{
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           <div
//             className="flex flex-col md:flex-row gap-12 md:gap-16 items-center pt-16 md:pt-20 md:ml-15"
//             style={{ WebkitOverflowScrolling: "touch" }}
//           >
//             {projects.map((project) => (
//               <Link
//                 href={`/projects/${project.slug}`}
//                 key={project.slug}
//                 className="w-full md:w-screen md:max-w-5xl flex-shrink-0 snap-center flex flex-col items-center cursor-pointer"
//               >
//                 {/* ✅ Image */}
//                 <div className="relative w-full md:w-[800px] aspect-[4/3] md:h-[60vh] border border-gray-800 rounded-xl overflow-hidden">
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-105"
//                     priority
//                   />
//                 </div>

//                 {/* ✅ Text Alignment */}
//                 {/* <div className="relative flex flex-col items-center md:items-start mt-4 md:w-[800px] text-center md:text-left">
//                   <span className="text-red-500 font-mono text-sm md:text-lg mb-1 md:mb-0">
//                     {project.index}
//                   </span>
//                   <span className="text-white text-xl md:text-4xl font-light">
//                     {project.title}
//                   </span>
//                 </div> */}
//                 <div className="relative flex items-center justify-center gap-4 mt-4 md:w-[800px]">
//   {/* Project index (left side) */}
//   <span className="text-red-500 font-mono text-sm md:text-lg">
//     {project.index}
//   </span>

//   {/* Project title (centered) */}
//   <span className="text-white text-xl md:text-4xl font-light text-center">
//     {project.title}
//   </span>
// </div>
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* ✅ Scroll Indicator — Desktop Only */}
//         <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-2 opacity-60 animate-pulse pointer-events-none select-none">
//           <ChevronRight className="w-6 h-6 mb-2 pb-2 text-gray-400" />
//           <span className="text-xs text-gray-400 tracking-widest rotate-90">
//             SCROLL
//           </span>
//         </div>
//       </main>

//       {/* ✅ Footer */}
//       <div className="bottom-6 z-20 bg-black">
//         <Footer />
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TopNumber from "../../components/TopNumber";
import Footer from "../../components/Footer";
import Lenis from "lenis";
import { projects } from "../../data/projectsData";
import Noise from "@/components/Noise";
import { ChevronRight } from "lucide-react";

export default function Works() {
  useEffect(() => {
    if (window.innerWidth >= 768) {
      // Updated Lenis initialization
      const lenis = new Lenis({
        duration: 1.2, // Scroll speed/duration
        easing: (t: number) => t, // Linear easing (can customize)
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      return () => lenis.destroy();
    }
  }, []);

  return (
    <div className="relative min-h-screen text-white font-mono overflow-hidden flex flex-col">
      {/* ✅ Background Noise */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-black">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
      </div>

      {/* ✅ Top Number */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20">
        <TopNumber />
      </div>

      {/* ✅ Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-40 relative">
        <div
          className="w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden md:snap-x md:snap-mandatory flex md:block"
          data-lenis-prevent
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div
            className="flex flex-col md:flex-row gap-12 md:gap-16 items-center pt-16 md:pt-20 md:ml-24"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.slug}
                className="w-full md:w-screen md:max-w-5xl flex-shrink-0 snap-center flex flex-col items-center cursor-pointer"
              >
                <div className="relative w-full md:w-[800px] aspect-[4/3] md:h-[60vh] border border-gray-800 rounded-xl overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-105"
                    priority
                  />
                </div>

                <div className="relative flex items-center justify-center gap-4 mt-4 md:w-[800px]">
                  <span className="text-red-500 font-mono text-sm md:text-lg">
                    {project.index}
                  </span>
                  <span className="text-white text-xl md:text-4xl font-light text-center">
                    {project.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ✅ Scroll Indicator — Desktop Only */}
        <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-2 opacity-60 animate-pulse pointer-events-none select-none">
          <ChevronRight className="w-6 h-6 mb-2 pb-2 text-gray-400" />
          <span className="text-xs text-gray-400 tracking-widest rotate-90">
            SCROLL
          </span>
        </div>
      </main>

      {/* ✅ Footer */}
      <div className="bottom-6 z-20 bg-black">
        <Footer />
      </div>
    </div>
  );
}
