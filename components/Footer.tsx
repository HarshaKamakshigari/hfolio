"use client";

import Link from "next/link";
import { FaGamepad, FaVolumeUp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

export default function Footer() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(15);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const drawCanvas = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    targetX: number,
    targetY: number,
    currentScore: number,
    currentTime: number
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(targetX, targetY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e5e5e5";
    ctx.font = "16px Arial";
    ctx.fillText(`Score: ${currentScore}`, 10, 20);
    ctx.fillText(`Time: ${currentTime}s`, canvas.width - 60, 20);
  };

  useEffect(() => {
    if (isGameOpen && canvasRef.current && !isGameOver) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 300;
      canvas.height = 200;

      drawCanvas(canvas, ctx, target.x, target.y, score, timeLeft);

      return () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
    }
  }, [isGameOpen, score, target, timeLeft, isGameOver]);

  useEffect(() => {
    if (isGameOpen && !isGameOver) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current !== null) clearInterval(timerRef.current);
            setIsGameOpen(false);
            setIsGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current !== null) clearInterval(timerRef.current);
      };
    }
  }, [isGameOpen, isGameOver]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || timeLeft <= 0 || isGameOver) return;
    const canvas = canvasRef.current;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const distance = Math.sqrt(
      Math.pow(mouseX - target.x, 2) + Math.pow(mouseY - target.y, 2)
    );

    if (distance < 10) {
      setScore((prev) => prev + 1);
      setTarget({
        x: Math.random() * (canvas.width - 40) + 20,
        y: Math.random() * (canvas.height - 40) + 20,
      });
    }
  };

  const toggleGame = () => {
    if (!isGameOpen && !isGameOver) {
      setTarget({ x: Math.random() * 260 + 20, y: Math.random() * 160 + 20 });
      setScore(0);
      setTimeLeft(15);
      setIsGameOpen(true);
    } else if (isGameOver) {
      setIsGameOver(false);
    } else {
      setIsGameOpen(false);
    }
  };

  const handleReplay = () => {
    setIsGameOver(false);
    setIsGameOpen(true);
    setScore(0);
    setTimeLeft(15);
    setTarget({ x: Math.random() * 260 + 20, y: Math.random() * 160 + 20 });
  };

  return (
    <>
      <footer className="relative w-full flex flex-col md:flex-row items-center justify-between px-4 py-4 text-sm 
      text-gray-400 tracking-wider gap-4 md:gap-0 overflow-hidden 
      bg-transparent">

        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
          <Link href="#contact" className="hover:text-red-500 transition-colors">Contact</Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 w-full md:w-auto">
          <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
          <span className="text-red-500 hidden md:inline">/</span>
          <Link href="/about" className="hover:text-red-500 transition-colors">About</Link>
          <span className="text-red-500 hidden md:inline">/</span>
          <Link href="/works" className="hover:text-red-500 transition-colors">Work</Link>
          <span className="text-red-500 hidden md:inline">/</span>
          <Link href="/craft" className="hover:text-red-500 transition-colors">Craft</Link>
          <span className="text-red-500 hidden md:inline">/</span>
          <Link href="/notes" className="hover:text-red-500 transition-colors">Notes</Link>
        </div>

        <div className="flex justify-center md:justify-end items-center gap-4 w-full md:w-auto">
          <button onClick={toggleGame}>
            <FaGamepad size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
          </button>
          <Link href="#">
            <FaVolumeUp size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
          </Link>
        </div>
      </footer>

      {isGameOpen && !isGameOver && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-[320px] text-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-red-500">Click the Target!</h2>
              <button onClick={toggleGame} className="text-gray-400 hover:text-red-500">Close</button>
            </div>
            <canvas ref={canvasRef} onClick={handleCanvasClick} className="border border-gray-700" />
            <p className="text-sm text-gray-400 mt-2">Time left: {timeLeft}s</p>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[320px] text-gray-200">
            <h2 className="text-lg font-bold text-red-500 mb-4">Game Over!</h2>
            <p className="text-gray-200 mb-4">Your Score: {score}</p>
            <div className="flex justify-between">
              <button onClick={handleReplay} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Replay</button>
              <button onClick={toggleGame} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
