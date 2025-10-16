// app/craft/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TopNumber from "../../components/TopNumber";
import Footer from "../../components/Footer";
import Noise from "@/components/Noise"; // optional, keep if available

type GalleryItem = {
  id: string;
  title: string;
  subtitle?: string;
  src: string;
  category: "Photography" | "Posters";
};

const gallery: GalleryItem[] = [
  // Temporary placeholders (replace with real images later)
  { id: "p1", title: "Golden Hour", subtitle: "Photography", src: "/images/placeholder.jpg", category: "Photography" },
  { id: "p2", title: "Street Mood", subtitle: "Photography", src: "/images/placeholder.jpg", category: "Photography" },
  { id: "p3", title: "Portrait Study", subtitle: "Photography", src: "/images/placeholder.jpg", category: "Photography" },
  { id: "o1", title: "Poster — Neon Night", subtitle: "Poster Design", src: "/images/placeholder.jpg", category: "Posters" },
  { id: "o2", title: "Poster — Retro", subtitle: "Poster Design", src: "/images/placeholder.jpg", category: "Posters" },
  { id: "o3", title: "Poster — Minimal", subtitle: "Poster Design", src: "/images/placeholder.jpg", category: "Posters" },
];

export default function CraftPage() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<"All" | "Photography" | "Posters">("All");

  const filtered = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <div className="relative min-h-screen bg-black text-white font-mono">
      {/* Noise background if available */}
      <div className="absolute inset-0 -z-10">
        {/* keep Noise if you have shadcn component */}
        <Noise className="w-full h-full" intensity={0.08} />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Top number */}
        <div className="flex justify-center mb-8">
          <TopNumber />
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-red-500">Craft — Photography & Posters</h1>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            A curated selection of photographs and poster experiments. (Temporary images for now — swap them later.)
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {(["All", "Photography", "Posters"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f ? "bg-red-500 text-black" : "bg-gray-900/40 text-gray-300 hover:bg-white/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                className="relative rounded-xl overflow-hidden border border-white/10 bg-black/30 hover:scale-[1.02] transform transition-transform duration-400 shadow-lg"
              >
                <button
                  onClick={() => setSelected(item)}
                  className="relative block w-full h-64 md:h-56 lg:h-64"
                  aria-label={`Open ${item.title}`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </button>

                <div className="p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{item.subtitle}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky footer like your design (accessible) */}
      <footer className="fixed bottom-0 left-0 w-full bg-black border-t border-white/10 z-40">
        <Footer />
      </footer>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-[90vw] max-h-[90vh] w-full md:w-[70vw] lg:w-[60vw] rounded-xl overflow-hidden border border-white/10 bg-black"
            >
              <div className="relative w-full h-[60vh] md:h-[70vh]">
                <Image src={selected.src} alt={selected.title} fill className="object-contain bg-black" />
              </div>

              <div className="p-4 flex items-center justify-between bg-black/80">
                <div>
                  <h4 className="text-lg font-semibold">{selected.title}</h4>
                  <p className="text-xs text-gray-400">{selected.subtitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelected(null)}
                    className="px-3 py-2 text-sm rounded-md bg-white/5 hover:bg-white/10 transition"
                  >
                    Close
                  </button>
                  {/* optional: download link (if you later provide real image urls) */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
