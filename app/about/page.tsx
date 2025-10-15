"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import TopNumber from "../../components/TopNumber";

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
    <div className="relative min-h-screen bg-black text-white font-mono overflow-hidden">
      <AnimatePresence>
        {showIntro ? (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50"
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
            className="relative z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <main className="p-8 max-w-6xl mx-auto w-full pb-32">
              {/* Top Number */}
              <div className="flex justify-center mb-8">
                <TopNumber />
              </div>

              {/* Hero Section */}
              <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
                <motion.div
                  className="relative w-64 h-64 md:w-72 md:h-72 rounded-xl overflow-hidden border-4 border-red-500"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <Image
                    src="/images/placeholder.jpg"
                    alt="Harshaa Kamakshigari"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Bio Text */}
                <div className="space-y-6 max-w-xl">
                  <h1 className="text-4xl font-bold text-red-500">
                    Hello, I'm <br /> Harshaa Kamakshigari
                  </h1>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                    I craft <span className="text-red-500">digital experiences</span> that
                    inspire curiosity and trust. Combining{" "}
                    <span className="text-red-500">design</span>,
                    <span className="text-red-500"> development</span>, and
                    <span className="text-red-500"> cybersecurity</span>, I create
                    interfaces that are not only beautiful but{" "}
                    <span className="text-red-500">secure</span> and{" "}
                    <span className="text-red-500"> functional</span>.
                  </p>
                </div>
              </div>

              {/* Skills Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-mono mb-6 text-red-500">My Skills</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center hover:bg-red-500 hover:text-black transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Awards / Achievements Section */}
              <section className="mb-16">
                <h2 className="text-3xl font-mono mb-6 text-red-500">
                  Awards & Achievements
                </h2>
                <ul className="space-y-4">
                  {awards.map((award, idx) => (
                    <motion.li
                      key={idx}
                      className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:bg-red-500 hover:text-black transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {award}
                    </motion.li>
                  ))}
                </ul>
              </section>

              {/* Short Bio / Contact */}
              <section className="mb-16">
                <h2 className="text-3xl font-mono mb-6 text-red-500">About Me</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  I’m a <span className="text-red-500">UI/UX designer</span> and developer
                  with a passion for crafting engaging digital experiences. My work focuses
                  on <span className="text-red-500"> interactive interfaces</span>,{" "}
                  <span className="text-red-500">secure development</span>, and{" "}
                  <span className="text-red-500">innovative design systems</span>.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I continuously explore new technologies, Web3, AI, and creative tools to
                  push the boundaries of design and development. Let’s create something
                  amazing together.
                </p>
              </section>
            </main>

            {/* Fixed Footer */}
            <footer className="fixed bottom-0 left-0 w-full bg-black border-t border-white/10 z-50">
              <Footer />
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
