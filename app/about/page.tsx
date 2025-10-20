"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import TopNumber from "../../components/TopNumber";
import Noise from "@/components/Noise";

const skills = [
  "UI/UX Design",
  "Frontend Development",
  "React / Next.js",
  "Cybersecurity",
  "Python / Go",
  "Figma / Adobe XD",
  "NFT & Web3 Design",
  "Design Systems",
];

const awards = [
  "Infinitus 25 Website - Awwwards Honorable Mention",
  "VigilX Project - SecureX Hackathon Finalist",
  "ArtVault NFT DApp - Featured on Product Hunt",
];

export default function About() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen mt-20 text-white font-mono overflow-hidden flex flex-col">

      {/* Noise overlay */}
     <div className="fixed inset-0 -z-10 w-full h-full">
  <Noise
    patternSize={250}
    patternScaleX={1}
    patternScaleY={1}
    patternRefreshInterval={2}
    patternAlpha={15}
  />
</div>


      {/* Top Number (fixed like Home) */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20">
        <TopNumber />
      </div>

      <AnimatePresence>
        {showIntro ? (
          // Intro animation
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <motion.p
              className="text-2xl md:text-4xl text-red-500 tracking-widest text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              So you made it here… guess the pixels worked.
            </motion.p>
            <motion.p
              className="text-lg md:text-2xl text-gray-400 mt-4 tracking-widest"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Lessgooo
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            className="relative z-10 flex flex-col flex-1 overflow-y-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <main className="flex-1 p-8 max-w-6xl mx-auto w-full flex flex-col justify-start pb-32">
              {/* Hero Section */}
              <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
                <motion.div
                  className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  whileHover={{ scale: 1.03 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80"
                    alt="Harshaa Kamakshigari"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Bio Text */}
                <div className="space-y-6 max-w-xl">
                  <h1 className="text-3xl font-light">
                    Hello, I’m{" "}
                    <span className="text-red-500">Harshaa Kamakshigari</span>
                  </h1>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed uppercase">
                    I CRAFT <span className="text-red-500 font-serif">DIGITAL EXPERIENCES</span> THAT
                    INSPIRE CURIOSITY AND TRUST. COMBINING{" "}
                    <span className="text-red-500 font-serif">DESIGN</span>,
                    <span className="text-red-500 font-serif"> DEVELOPMENT</span>, AND
                    <span className="text-red-500 font-serif"> CYBERSECURITY</span>, I CREATE
                    INTERFACES THAT ARE NOT ONLY BEAUTIFUL BUT{" "}
                    <span className="text-red-500 font-serif">SECURE</span> AND{" "}
                    <span className="text-red-500 font-serif">FUNCTIONAL</span>.
                  </p>
                </div>
              </div>

              {/* Skills Section */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-mono mb-6 text-red-500">
                  My Skills
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center hover:bg-red-500 hover:text-black transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill.toUpperCase()}
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Awards / Achievements Section */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-mono mb-6 text-red-500">
                  Awards & Achievements
                </h2>
                <ul className="space-y-4">
                  {awards.map((award, idx) => (
                    <motion.li
                      key={idx}
                      className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:bg-red-500 hover:text-black transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {award.toUpperCase()}
                    </motion.li>
                  ))}
                </ul>
              </section>

              {/* Short Bio / Contact */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-mono mb-6 text-red-500">
                  About Me
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4 uppercase">
                  I’m a <span className="text-red-500">UI/UX DESIGNER</span> AND DEVELOPER
                  WITH A PASSION FOR CRAFTING ENGAGING DIGITAL EXPERIENCES. MY WORK FOCUSES
                  ON <span className="text-red-500">INTERACTIVE INTERFACES</span>,{" "}
                  <span className="text-red-500">SECURE DEVELOPMENT</span>, AND{" "}
                  <span className="text-red-500">INNOVATIVE DESIGN SYSTEMS</span>.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed uppercase">
                  I CONTINUOUSLY EXPLORE NEW TECHNOLOGIES, WEB3, AI, AND CREATIVE TOOLS TO
                  PUSH THE BOUNDARIES OF DESIGN AND DEVELOPMENT. LET’S CREATE SOMETHING
                  AMAZING TOGETHER.
                </p>
              </section>
            </main>

            {/* Footer — fixed like other pages */}
            <div className="fixed bottom-0 left-0 w-full z-20 bg-black">
  <Footer />
</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
