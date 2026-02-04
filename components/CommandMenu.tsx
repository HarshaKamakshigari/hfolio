// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Command } from "cmdk";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Home, User, FolderKanban, Mail, FileText } from "lucide-react";

// interface CommandMenuProps {
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
// }

// export default function CommandMenu({ open: controlledOpen, onOpenChange }: CommandMenuProps) {
//   const [internalOpen, setInternalOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   const isOpen = controlledOpen ?? internalOpen;
//   const setOpen = (open: boolean) => {
//     onOpenChange?.(open);
//     if (controlledOpen === undefined) setInternalOpen(open);
//     if (!open) setSearch("");
//   };

//   const links = [
//     { href: "/", label: "Home", icon: Home, key: "h" },
//     { href: "/about", label: "About", icon: User, key: "a" },
//     { href: "/works", label: "Works", icon: FolderKanban, key: "w" },
//     { href: "/contact", label: "Contact", icon: Mail, key: "c" },
//     { href: "/resume.pdf", label: "Resume", icon: FileText, key: "r" },
//   ];

//   // Open menu and handle shortcuts
//   useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       // Toggle menu: Cmd/Ctrl + K
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         setOpen(!isOpen);
//         return;
//       }

//       // Close on Escape
//       if (e.key === "Escape" && isOpen) {
//         e.preventDefault();
//         setOpen(false);
//         return;
//       }

//       // Navigation Shortcuts (Cmd/Ctrl + Letter)
//       const shortcut = links.find((link) => e.key.toLowerCase() === link.key);
//       if (shortcut && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         router.push(shortcut.href);
//         setOpen(false);
//       }
//     };

//     document.addEventListener("keydown", down);
//     return () => document.removeEventListener("keydown", down);
//   }, [isOpen, links, router]);

//   // Auto-focus input when opened
//   useEffect(() => {
//     if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
//   }, [isOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <Command.Dialog
//           open={isOpen}
//           onOpenChange={setOpen}
//           label="Command Menu"
//           className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
//         >
//           {/* Background Overlay */}
//           <motion.div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           />

//           {/* Command Box */}
//           <motion.div
//             initial={{ y: 40, opacity: 0, scale: 0.98 }}
//             animate={{ y: 0, opacity: 1, scale: 1 }}
//             exit={{ y: 10, opacity: 0, scale: 0.98 }}
//             transition={{ duration: 0.2 }}
//             className="relative w-full max-w-lg mx-auto bg-[rgba(10,10,10,0.9)] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
//             style={{
//               backgroundImage: "url('/noise.png')",
//               backgroundBlendMode: "overlay",
//             }}
//           >
//             {/* Input */}
//             <div className="flex items-center border-b border-white/10">
//               <Command.Input
//                 ref={inputRef}
//                 value={search}
//                 onValueChange={setSearch}
//                 placeholder="Search or jump to..."
//                 className="w-full h-12 px-4 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-none"
//               />
//               <span className="text-gray-400 text-xs pr-4 opacity-70">Esc</span>
//             </div>

//             {/* List */}
//             <Command.List className="max-h-80 overflow-y-auto">
//               <Command.Empty className="px-4 py-6 text-gray-400 text-center">
//                 No matches found.
//               </Command.Empty>

//               {links.map((item) => (
//                 <Command.Item key={item.href} asChild>
//                   <Link
//                     href={item.href}
//                     className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 transition-colors"
//                     onClick={() => setOpen(false)}
//                   >
//                     <item.icon className="w-5 h-5 text-red-400" />
//                     <span className="font-medium tracking-wide">{item.label}</span>
//                     <span className="ml-auto text-xs text-gray-500">
//                       ⌘ + {item.key.toUpperCase()}
//                     </span>
//                   </Link>
//                 </Command.Item>
//               ))}
//             </Command.List>
//           </motion.div>
//         </Command.Dialog>
//       )}
//     </AnimatePresence>
//   );
// }
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 💎 Premium Lucide Icon Set
import {
  House,
  Fingerprint,
  FolderKanban,
  Send,
  FileUser,
} from "lucide-react";

interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CommandMenu({ open: controlledOpen, onOpenChange }: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const isOpen = controlledOpen ?? internalOpen;

  const setOpen = useCallback((open: boolean) => {
    onOpenChange?.(open);
    if (controlledOpen === undefined) setInternalOpen(open);
    if (!open) setSearch("");
  }, [controlledOpen, onOpenChange]);

  // ⭐ Links with beautiful icons
  const links = useMemo(() => [
    { href: "/", label: "Home", icon: House, key: "h" },
    { href: "/about", label: "About", icon: Fingerprint, key: "a" },
    { href: "/works", label: "Works", icon: FolderKanban, key: "w" },
    { href: "/contact", label: "Contact", icon: Send, key: "c" },
    { href: "/resume.pdf", label: "Resume", icon: FileUser, key: "r" },
  ], []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!isOpen);
        return;
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setOpen(false);
        return;
      }

      const shortcut = links.find((link) => e.key.toLowerCase() === link.key);
      if (shortcut && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push(shortcut.href);
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, links, router, setOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Command.Dialog
          open={isOpen}
          onOpenChange={setOpen}
          label="Command Menu"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Command Box */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg mx-auto bg-[rgba(10,10,10,0.9)] 
                       border border-white/10 rounded-2xl shadow-2xl 
                       overflow-hidden backdrop-blur-xl"
            style={{
              backgroundImage: "url('/noise.png')",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Input */}
            <div className="flex items-center border-b border-white/10">
              <Command.Input
                ref={inputRef}
                value={search}
                onValueChange={setSearch}
                placeholder="Search or jump to..."
                className="w-full h-12 px-4 bg-transparent text-white placeholder-gray-500 
                           focus:outline-none focus:ring-0"
              />
              <span className="text-gray-400 text-xs pr-4 opacity-70">Esc</span>
            </div>

            {/* List */}
            <Command.List className="max-h-80 overflow-y-auto">
              <Command.Empty className="px-4 py-6 text-gray-400 text-center">
                No results.
              </Command.Empty>

              {links.map((item) => (
                <Command.Item key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 
                               hover:bg-white/10 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="w-5 h-5 text-red-400" />
                    <span className="font-medium tracking-wide">{item.label}</span>
                    <span className="ml-auto text-xs text-gray-500">
                      ⌘ + {item.key.toUpperCase()}
                    </span>
                  </Link>
                </Command.Item>
              ))}
            </Command.List>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}
