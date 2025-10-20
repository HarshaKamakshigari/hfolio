"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "../../../data/projectsData";
import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";

// ✅ Correct font setup for Regular 400 Italic
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

interface Props {
  params: { slug: string };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Link href="/works" className="mt-4 text-red-500 underline">
          Back to Works
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black text-white font-mono flex flex-col overflow-hidden">
      <main className="flex-1 flex flex-col md:flex-row w-full h-screen">
        {/* Left: Text Section */}
        <motion.div
          className="flex-1 flex flex-col justify-center px-10 md:px-20 space-y-8"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Red Italic Title */}
          <h1
            className={`${playfair.className} text-red-500 italic text-6xl md:text-8xl leading-tight`}
          >
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
            {project.description}
          </p>

          {/* Back to Works */}
          <Link
            href="/works"
            className="group relative inline-flex items-center gap-2 text-red-500 font-semibold hover:text-white transition-all"
          >
            <span>Back to Works</span>
            <span className="block w-0 h-0 border-t-2 border-red-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.div>

        {/* Right: Scrollable Image Section */}
        {/* Right: Scrollable Image Section */}
<motion.div
  className="flex-1 h-full overflow-y-scroll no-scrollbar relative"
  initial={{ opacity: 0, x: 80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
>
  <div className="flex flex-col gap-8 p-10 md:p-8 items-center">
    {project.images && project.images.length > 0 ? (
      project.images.map((img, i) => (
        <div
          key={i}
          className="relative w-[650px] md:w-[750px] h-[55vh] md:h-[65vh] rounded-3xl overflow-hidden"
        >
          <Image
            src={img}
            alt={`${project.title} image ${i + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-3xl" />
        </div>
      ))
    ) : (
      <div className="relative w-[500px] md:w-[500px] h-[55vh] md:h-[65vh] rounded-3xl overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover rounded-3xl hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-3xl" />
      </div>
    )}
  </div>
</motion.div>

      </main>
    </div>
  );
}
