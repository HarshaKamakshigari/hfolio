// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import CommandMenu from "../../components/CommandMenu";
// import Footer from "../../components/Footer";
// import TopNumber from "../../components/TopNumber";
// import Noise from "@/components/Noise";

// const notes = [
//   {
//     title: "Exploring Onion Routing",
//     description: "The Key to Anonymous Internet Communication",
//     link: "https://beyond-the-firewall.hashnode.dev/exploring-onion-routing-the-key-to-anonymous-internet-communication",
//   },
//   {
//     title: "Build Your Own Shell in C",
//     description:
//       "We’ll explore how shells work and create a simple shell in C that can execute commands just like Bash.",
//     link: "https://medium.com/@harsha.kamakshigari/build-your-own-shell-in-c-748dc9c39436",
//   },
// ];

// export default function Notes() {
//   const [isCommandOpen, setIsCommandOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredNotes = notes.filter(
//     (note) =>
//       note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       note.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="relative min-h-screen text-white font-mono overflow-hidden flex flex-col">
//       {/* ✅ Unified Noise + Background Layer */}
//       {/* <div className="fixed inset-0 -z-10 bg-black">
//         <Noise className="absolute inset-0 w-full h-full" intensity={100} />
//       </div> */}
//       <div className="fixed inset-0 -z-10 w-full h-full">
//   <Noise intensity={100} />
// </div>

//       {/* ⌘K Button */}
//       <button
//         onClick={() => setIsCommandOpen(true)}
//         className="fixed top-4 right-4 z-30 text-xs text-gray-500 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-1 pointer-events-auto"
//         aria-label="Open command menu (Ctrl+K)"
//       >
//         <kbd className="text-red-400 font-mono">Ctrl+K</kbd>
//       </button>

//       <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />

//       {/* ✅ Fixed Top Number (like Home & Works) */}
//       <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20">
//         <TopNumber />
//       </div>

//       {/* ✅ Main Content */}
//       <main className="flex-1 flex items-center justify-center px-8 pt-32 pb-16">
//         <div className="w-full max-w-3xl space-y-10 text-left">
//           {/* Heading */}
//           <div>
//             <h1 className="text-3xl md:text-4xl font-light leading-snug">
//               My Notes <br />
//               <span className="text-red-500">Blog Links</span>
//             </h1>
//           </div>

//           {/* Notes List */}
//           <div className="space-y-6">
//             {filteredNotes.length > 0 ? (
//               filteredNotes.map((note, index) => (
//                 <Link
//                   key={index}
//                   href={note.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block p-5 rounded-lg   transition-all duration-300 backdrop-blur-sm"
//                 >
//                   <h2 className="text-lg md:text-xl font-medium text-white hover:text-red-400 transition-colors duration-200">
//                     {note.title}
//                   </h2>
//                   <p className="text-gray-400 text-sm mt-2">
//                     {note.description}
//                   </p>
//                 </Link>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center">No notes found.</p>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* ✅ Fixed Footer (like Home & Works) */}
//       <div className="bottom-6 z-20 bg-black">
//         <Footer />
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import CommandMenu from "../../components/CommandMenu";
import Footer from "../../components/Footer";
import TopNumber from "../../components/TopNumber";
import Noise from "@/components/Noise";

const notes = [
  {
    title: "Exploring Onion Routing",
    description: "The Key to Anonymous Internet Communication",
    link: "https://beyond-the-firewall.hashnode.dev/exploring-onion-routing-the-key-to-anonymous-internet-communication",
  },
  {
    title: "Build Your Own Shell in C",
    description:
      "We’ll explore how shells work and create a simple shell in C that can execute commands just like Bash.",
    link: "https://medium.com/@harsha.kamakshigari/build-your-own-shell-in-c-748dc9c39436",
  },
];

export default function Notes() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen text-white font-mono overflow-hidden flex flex-col">
      {/* ✅ Background Noise (fixed usage) */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-black">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
      </div>

      {/* ⌘K Button */}
      <button
        onClick={() => setIsCommandOpen(true)}
        className="fixed top-4 right-4 z-30 text-xs text-gray-500 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-1 pointer-events-auto"
        aria-label="Open command menu (Ctrl+K)"
      >
        <kbd className="text-red-400 font-mono">Ctrl+K</kbd>
      </button>

      <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />

      {/* ✅ Top Number */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20">
        <TopNumber />
      </div>

      {/* ✅ Main Content */}
      <main className="flex-1 flex items-center justify-center px-8 pt-32 pb-16">
        <div className="w-full max-w-3xl space-y-10 text-left">
          {/* Heading */}
          <div>
            <h1 className="text-3xl md:text-4xl font-light leading-snug">
              My Notes <br />
              <span className="text-red-500">Blog Links</span>
            </h1>
          </div>

          {/* Notes List */}
          <div className="space-y-6">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <Link
                  key={index}
                  href={note.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-red-500/30 hover:bg-white/5"
                >
                  <h2 className="text-lg md:text-xl font-medium text-white hover:text-red-400 transition-colors duration-200">
                    {note.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    {note.description}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center">No notes found.</p>
            )}
          </div>
        </div>
      </main>

      {/* ✅ Footer */}
      <div className="bottom-6 z-20">
        <Footer />
      </div>
    </div>
  );
}
