"use client";

import Link from "next/link";
import { FaGamepad, FaVolumeUp } from "react-icons/fa";
import Noise from "@/components/Noise"; // adjust path

export default function Footer() {
  return (
    <footer className="relative w-full flex flex-col md:flex-row items-center justify-between px-4 py-4 text-sm text-gray-400 tracking-wider gap-4 md:gap-0 overflow-hidden">
      
      {/* Noise background */}
      <div className="absolute inset-0 -z-10">
        <Noise />
      </div>

      {/* Left: Contact */}
      <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
        <Link href="#contact" className="hover:text-red-500 transition-colors">
          Contact
        </Link>
      </div>

      {/* Center: Menu */}
      <div className="flex flex-wrap justify-center items-center gap-2 w-full md:w-auto">
        <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
        <span className="text-red-500 hidden md:inline">/</span>
        <Link href="/" className="hover:text-red-500 transition-colors">About</Link>
        <span className="text-red-500 hidden md:inline">/</span>
        <Link href="/works" className="hover:text-red-500 transition-colors">Work</Link>
        <span className="text-red-500 hidden md:inline">/</span>
        <Link href="/craft" className="hover:text-red-500 transition-colors">Craft</Link>
        <span className="text-red-500 hidden md:inline">/</span>
        <Link href="/notes" className="hover:text-red-500 transition-colors">Notes</Link>
      </div>

      {/* Right: Icons */}
      <div className="flex justify-center md:justify-end items-center gap-4 w-full md:w-auto">
        <Link href="#">
          <FaGamepad size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
        </Link>
        <Link href="#">
          <FaVolumeUp size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
        </Link>
      </div>
    </footer>
  );
}
