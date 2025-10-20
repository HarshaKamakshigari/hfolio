"use client";

import Link from "next/link";

export default function TopNumber() {
  return (
    <Link href="/">
      <div className="text-white/80 text-lg mt-4 tracking-widest select-none cursor-pointer hover:text-red-500 transition-colors">
        21
      </div>
    </Link>
  );
}
