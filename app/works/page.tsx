"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import TopNumber from "../../components/TopNumber";

const projects = [
  {
    title: "Zen Zone",
    description: "A meditation app with AI-driven personalized routines.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
  {
    title: "ArtVault",
    description: "NFT Minting & Gallery DApp for artists and collectors.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
  {
    title: "Mythix",
    description: "Aggregated anime, manga, and movie links in one place.",
    image: "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
];

export default function Works() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-mono">
      <main className="flex-1 p-8">
        {/* Top number centered */}
        <div className="flex justify-center mb-8">
          <TopNumber />
        </div>

        {/* <h1 className="text-3xl font-mono mb-8 text-red-500 text-center md:text-left">
          My Works
        </h1> */}

        {/* Horizontal scroll container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {projects.map((project, index) => (
            <Link
              href={project.link}
              key={index}
              className="snap-center flex-shrink-0 w-[90vw] md:w-[700px] relative block overflow-hidden rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-300"
            >
              <div className="relative w-full h-[350px] md:h-[450px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-6">
                <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                <p className="text-gray-300 text-base">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
