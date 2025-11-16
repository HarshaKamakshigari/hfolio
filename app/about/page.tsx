// "use client";

// import { useEffect } from "react";
// import Footer from "../../components/Footer";
// import TopNumber from "../../components/TopNumber";
// import Noise from "@/components/Noise";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// const skills = [
//   "UI/UX Design",
//   "Interactive Frontend",
//   "Next.js / React",
//   "Cybersecurity Principles",
//   "Design Systems",
//   "Creative Direction",
//   "Motion & Micro-interactions",
//   "Web3 Product Design",
// ];

// export default function About() {
//   useEffect(() => {
//     // Scroll reveal animations
//     gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((el) => {
//       gsap.fromTo(
//         el,
//         { opacity: 0, y: 80, scale: 0.96 },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 1.4,
//           ease: "cubic-bezier(.19,1,.22,1)",
//           scrollTrigger: {
//             trigger: el,
//             start: "top 85%",
//             once: true,
//           },
//         }
//       );
//     });

//     // Stagger groups
//     gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
//       gsap.fromTo(
//         group.children,
//         { opacity: 0, y: 30 },
//         {
//           opacity: 1,
//           y: 0,
//           stagger: 0.12,
//           duration: 1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: group,
//             start: "top 85%",
//             once: true,
//           },
//         }
//       );
//     });
//   }, []);

//   return (
//     <div className="relative min-h-screen text-white font-mono overflow-hidden">

//       {/* Noise */}
//       <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.15]">
//         <Noise patternSize={250} patternAlpha={15} />
//       </div>

//       {/* Top number */}
//       <div className="fixed top-8 left-1/2 -translate-x-1/2 z-30">
//         <TopNumber />
//       </div>

//       <main className="px-8 md:px-20 max-w-5xl mx-auto pb-48 pt-40 space-y-40 text-center">

//         {/* HERO */}
//         <section data-animate>
//           <h1 className="text-5xl mt-15 md:text-7xl font-light tracking-tight leading-tight">
//             Crafting Interfaces that are <br />
//             <span className="text-red-500">beautiful</span>, <span className="italic text-red-500">secure</span> & <span className="text-red-500">human</span>.
//           </h1>
//         </section>

//         {/* IDENT */}
//         <section data-animate className="max-w-3xl mx-auto space-y-3">
//           <div className="w-full h-px bg-white/20 mb-8"></div>
//           <p className="text-lg mb-8 md:text-xl uppercase tracking-wide text-gray-300">
//             HARSHAA KAMAKSHIGARI          </p>
//           <div className="w-full h-px bg-white/20"></div>
//         </section>

//         {/* STORY */}
//         <section data-animate data-stagger className="max-w-3xl mx-auto space-y-6 text-xl text-gray-300 leading-relaxed">
//           <p>
//             I design and build expressive digital experiences that inspire trust,
//             curiosity, and emotional presence.
//           </p>
//           <p className="text-gray-400">
//             I believe interfaces should breathe, respond, and resonate — intuitive, immersive, and human.
//           </p>
//         </section>

//         {/* COORDS */}
//         <section data-animate className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
//           <div className="text-xl text-gray-400 uppercase tracking-wide">Based in India</div>
//           <div className="h-20 w-px bg-white/20 hidden md:block"></div>
//           <div className="text-xl text-gray-400 uppercase tracking-wide">Creating Globally</div>
//         </section>

//         {/* SKILLS */}
//         <section data-animate data-stagger className="max-w-xl mx-auto">
//           <h2 className="text-3xl mb-10 tracking-widest text-red-500">Core Focus</h2>

//           <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-lg">
//             {skills.map((s) => (
//               <span key={s} className="hover:text-red-500 transition-all cursor-pointer">
//                 {s}
//               </span>
//             ))}
//           </div>
//         </section>

//         {/* ENDING */}
//         <section data-animate data-stagger className="max-w-3xl mx-auto pb-20">
//           <p className="text-xl text-gray-300 leading-relaxed">
//             Always evolving.<br />
//             Always refining.<br />
//             Let’s build something meaningful.
//           </p>
//         </section>

//       </main>

//       {/* Footer */}
//       <div className="fixed bottom-0 left-0 w-full bg-black z-20">
//         <Footer />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import Footer from "@/components/Footer";
import TopNumber from "@/components/TopNumber";
import Noise from "@/components/Noise";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const skills = [
  "UI/UX Design",
  "Interactive Frontend",
  "Next.js / React",
  "Cybersecurity Principles",
  "Design Systems",
  "Creative Direction",
  "Motion & Micro-interactions",
  "Web3 Product Design",
];

export default function About() {
  useEffect(() => {
    // Scroll reveal
    gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "cubic-bezier(.19,1,.22,1)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // Stagger
    gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
      gsap.fromTo(
        group.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative min-h-screen text-white font-mono overflow-hidden bg-black/50">

      {/* Noise (visible behind footer too!) */}
      <div className="fixed inset-0 -z-20 pointer-events-none opacity-40">
        {/* <Noise
        patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15} 
         /> */}
      </div>

      {/* Top number */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-30">
        <TopNumber />
      </div>

      <main className="px-8 md:px-20 max-w-5xl mx-auto pb-48 pt-40 space-y-40 text-center">

        {/* HERO */}
        <section data-animate>
          <h1 className="text-5xl mt-15 md:text-7xl font-light tracking-tight leading-tight">
            Crafting Interfaces that are <br />
            <span className="text-red-500">beautiful</span>,{" "}
            <span className="italic text-red-500">secure</span> &{" "}
            <span className="text-red-500">human</span>.
          </h1>
        </section>

        {/* IDENT */}
        <section data-animate className="max-w-3xl mx-auto space-y-3">
          <div className="w-full h-px bg-white/20 mb-8"></div>
          <p className="text-lg mb-8 md:text-xl uppercase tracking-wide text-gray-300">
            HARSHAA KAMAKSHIGARI
          </p>
          <div className="w-full h-px bg-white/20"></div>
        </section>

        {/* STORY */}
        <section
          data-animate
          data-stagger
          className="max-w-3xl mx-auto space-y-6 text-xl text-gray-300 leading-relaxed"
        >
          <p>
            I design and build expressive digital experiences that inspire trust,
            curiosity, and emotional presence.
          </p>
          <p className="text-gray-400">
            I believe interfaces should breathe, respond, and resonate — intuitive,
            immersive, and human.
          </p>
        </section>

        {/* COORDS */}
        <section
          data-animate
          className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20"
        >
          <div className="text-xl text-gray-400 uppercase tracking-wide">
            Based in India
          </div>
          <div className="h-20 w-px bg-white/20 hidden md:block"></div>
          <div className="text-xl text-gray-400 uppercase tracking-wide">
            Creating Globally
          </div>
        </section>

        {/* SKILLS */}
        <section data-animate data-stagger className="max-w-xl mx-auto">
          <h2 className="text-3xl mb-10 tracking-widest text-red-500">Core Focus</h2>

          <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-lg">
            {skills.map((s) => (
              <span
                key={s}
                className="hover:text-red-500 transition-all cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* ENDING */}
        <section data-animate data-stagger className="max-w-3xl mx-auto pb-20">
          <p className="text-xl text-gray-300 leading-relaxed">
            Always evolving.<br />
            Always refining.<br />
            Let’s build something meaningful.
          </p>
        </section>

      </main>

      {/* Footer (fixed + visible noise behind it) */}
      <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm z-20">
        <Footer />
      </div>
    </div>
  );
}
