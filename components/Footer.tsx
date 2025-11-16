"use client";

import Link from "next/link";
import { FaGamepad, FaVolumeUp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

export default function Footer() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const enemiesRef = useRef<{ x: number; y: number; speed: number }[]>([]);
  const cursorRef = useRef({ x: 150, y: 100 });

  // -------------------------
  // START GAME
  // -------------------------
  const startGame = () => {
    setIsGameOver(false);
    setTimeLeft(15);
    setIsGameOpen(true);
  };

  const closeGame = () => {
    setIsGameOpen(false);
    setIsGameOver(false);
  };

  // -------------------------
  // CURSOR TRACKING
  // -------------------------
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (isGameOpen && !isGameOver) {
      window.addEventListener("mousemove", move);
    }

    return () => window.removeEventListener("mousemove", move);
  }, [isGameOpen, isGameOver]);

  // -------------------------
  // TIMER
  // -------------------------
  useEffect(() => {
    if (!isGameOpen || isGameOver) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setIsGameOpen(false);
          setIsGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOpen, isGameOver]);

  // -------------------------
  // GAME LOOP
  // -------------------------
  useEffect(() => {
    if (!isGameOpen || isGameOver || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 250;

    // Initial enemies
    enemiesRef.current = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.15 + Math.random() * 0.2,
    }));

    let animationId: number;

    const update = () => {
      if (!ctx) return;

      // Fade background trail
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cursor = cursorRef.current;

      // Cursor dot
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Difficulty scale (1x → 3.5x)
      const progress = (15 - timeLeft) / 15;
      const difficulty = 1 + progress * 2.5;

      enemiesRef.current.forEach((enemy) => {
        const angle = Math.atan2(cursor.y - enemy.y, cursor.x - enemy.x);

        enemy.x += Math.cos(angle) * enemy.speed * difficulty;
        enemy.y += Math.sin(angle) * enemy.speed * difficulty;

        ctx.fillStyle = "#ff2020";
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 7, 0, Math.PI * 2);
        ctx.fill();

        // Collision
        const dx = cursor.x - enemy.x;
        const dy = cursor.y - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 12) {
          setIsGameOpen(false);
          setIsGameOver(true);
        }
      });

      animationId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationId);
  }, [isGameOpen, isGameOver, timeLeft]);

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <>
      <footer className="relative w-full flex flex-col md:flex-row items-center justify-between 
        px-4 py-4 text-sm text-gray-400 tracking-wider gap-4 md:gap-0 bg-transparent">

        <div className="flex items-center md:justify-start w-full md:w-auto">
          <Link href="#contact" className="hover:text-red-500">Contact</Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 w-full md:w-auto">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span className="text-red-500 hidden md:inline">/</span>

          <Link href="/about" className="hover:text-red-500">About</Link>
          <span className="text-red-500 hidden md:inline">/</span>

          <Link href="/works" className="hover:text-red-500">Work</Link>
          <span className="text-red-500 hidden md:inline">/</span>

          <Link href="/craft" className="hover:text-red-500">Craft</Link>
          <span className="text-red-500 hidden md:inline">/</span>

          <Link href="/notes" className="hover:text-red-500">Notes</Link>
        </div>

        <div className="flex justify-center md:justify-end items-center gap-4 w-full md:w-auto">
          <button onClick={startGame}>
            <FaGamepad size={16} className="hover:text-red-500 cursor-pointer" />
          </button>
          <Link href="#">
            <FaVolumeUp size={16} className="hover:text-red-500 cursor-pointer" />
          </Link>
        </div>
      </footer>

      {/* GAME MODAL */}
      {isGameOpen && !isGameOver && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-black/80 p-4 rounded-xl border border-white/10 w-[430px]">
            <h2 className="text-lg font-bold text-red-500 mb-3">Laser Dodge</h2>
            <canvas ref={canvasRef} className="w-full border border-white/10 rounded-lg" />
            <p className="text-gray-400 mt-3 text-center text-sm">Time Left: {timeLeft}s</p>

            <button
              onClick={closeGame}
              className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {isGameOver && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-black/80 p-6 rounded-xl border border-white/10 w-[430px]">
            <h2 className="text-lg font-bold text-red-500 mb-4">You Got Hit!</h2>
            <p className="text-gray-300 mb-4">You survived for {15 - timeLeft}s</p>

            <div className="flex justify-between">
              <button
                onClick={startGame}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Retry
              </button>
              <button
                onClick={closeGame}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
