"use client";

import { useState } from "react";
import Link from "next/link";
import CommandMenu from "../../components/CommandMenu";
import Footer from "../../components/Footer";
import TopNumber from "../../components/TopNumber";

const notes = [
  {
    title: "Exploring Onion Routing",
    description: "The Key to Anonymous Internet Communication",
    link: "https://beyond-the-firewall.hashnode.dev/exploring-onion-routing-the-key-to-anonymous-internet-communication",
  },
  {
    title: "Build Your Own Shell in C",
    description: "we’ll explore how shells work and create a simple shell in C that can execute commands just like Bash.",
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
    <>
      {/* ⌘K Hint */}
      <button
        onClick={() => setIsCommandOpen(true)}
        className="fixed top-4 right-4 z-50 text-xs text-gray-500 bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-1 pointer-events-auto"
        aria-label="Open command menu (Ctrl+K)"
      >
        <kbd className="text-red-400 font-mono">Ctrl+K</kbd>
      </button>

      <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />

      <main className="min-h-screen flex flex-col items-center justify-between p-8 bg-black text-white font-mono relative">
        {/* Top Number linked to home */}
        <TopNumber />

        {/* Main content */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 flex-1 w-full max-w-3xl mt-6">
          <div className="w-full text-left space-y-6">
            <div>
              <h1 className="text-xl font-mono leading-snug">
                My Notes <br />
                <span className="text-red-500">Blog Links</span>
              </h1>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => (
                  <Link
                    key={index}
                    href={note.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-black/30 border border-white/10 rounded-lg hover:bg-black/50 hover:border-red-500 transition-all duration-200"
                  >
                    <h2 className="text-lg font-semibold text-white hover:text-red-400 transition-colors duration-200">
                      {note.title}
                    </h2>
                    <p className="text-gray-300 text-sm">{note.description}</p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-center">No notes found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
