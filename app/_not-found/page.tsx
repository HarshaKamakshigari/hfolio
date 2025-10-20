// app/not-found.tsx
"use client";

import Link from "next/link";
import FaultyTerminal from "@/components/FaultyTerminal";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-mono p-6">
      
      <div style={{ width: "100%", maxWidth: "1000px", height: "400px", position: "relative" }}>
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#ffffff"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={1}
        />
      </div>

      <div className="mt-8 text-center">
        <h1 className="text-red-500 text-2xl md:text-4xl mb-4">
          OOPS! YOU GOT LOST.
        </h1>
        <p className="text-gray-300 mb-6">
          Looks like you tried to hack the matrix… or just went to a wrong page.
        </p>
        <Link
          href="/"
          className="text-white bg-red-500 px-6 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
