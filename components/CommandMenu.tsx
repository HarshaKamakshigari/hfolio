"use client";

import { useState, useEffect, useRef } from "react";
import { Command } from "cmdk";

interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CommandMenu({ 
  open: controlledOpen,
  onOpenChange 
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (open: boolean) => {
    onOpenChange?.(open);
    if (controlledOpen === undefined) {
      setInternalOpen(open);
    }
    if (!open) {
      setSearch("");
    }
  };

  // Enhanced keyboard handler with higher priority
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Check for Ctrl+K or Cmd+K FIRST, before browser gets it
      if (e.key === "k" && (e.metaKey || e.ctrlKey) && !e.repeat) {
        e.preventDefault();  // Prevent browser default
        e.stopPropagation(); // Stop event bubbling
        setOpen(!isOpen);
        return false;
      }
      
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setOpen(false);
      }
    };

    // Add event listener with passive: false and capture phase
    document.addEventListener("keydown", down, { 
      capture: true,  // Capture phase = higher priority
      passive: false  // Allow preventDefault
    });
    
    return () => {
      document.removeEventListener("keydown", down, { capture: true });
    };
  }, [isOpen]);

  // Focus input when opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <Command.Dialog 
      open={isOpen} 
      onOpenChange={setOpen}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      label="Global Command Menu"
    >
      <div className="w-full max-w-md mx-auto bg-black/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        <Command.Input
          ref={inputRef}
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
          className="w-full h-12 px-4 bg-transparent border-b border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-red-400"
        />
        {/* Rest of your Command.List content */}
        <Command.List className="max-h-96 overflow-auto">
          <Command.Empty className="px-4 py-6 text-gray-400 text-center">
            No results found.
          </Command.Empty>
          {/* Your items here */}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}