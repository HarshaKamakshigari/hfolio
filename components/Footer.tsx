"use client";

import Link from "next/link";
import { FaGamepad, FaVolumeUp } from "react-icons/fa";
import { useState, useEffect, useRef, useCallback } from "react";

// Game constants
const CELL_SIZE = 20;
const COLS = 19;
const ROWS = 13;
const CANVAS_WIDTH = COLS * CELL_SIZE;
const CANVAS_HEIGHT = ROWS * CELL_SIZE;

// Pac-Man maze (0 = wall, 1 = dot, 2 = empty, 3 = power pellet)
const MAZE = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 3, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

interface Ghost {
  x: number;
  y: number;
  color: string;
  direction: { dx: number; dy: number };
}

export default function Footer() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [won, setWon] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mazeRef = useRef<number[][]>([]);
  const pacmanRef = useRef({ x: 9, y: 7, direction: { dx: 0, dy: 0 }, mouthOpen: true });
  const ghostsRef = useRef<Ghost[]>([]);
  const animationRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const powerModeRef = useRef(false);
  const powerTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("pacmanHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    mazeRef.current = MAZE.map((row) => [...row]);
    pacmanRef.current = { x: 9, y: 7, direction: { dx: 0, dy: 0 }, mouthOpen: true };
    ghostsRef.current = [
      { x: 1, y: 1, color: "#ff0000", direction: { dx: 1, dy: 0 } },
      { x: 17, y: 1, color: "#00ffff", direction: { dx: -1, dy: 0 } },
      { x: 1, y: 11, color: "#ffb8ff", direction: { dx: 1, dy: 0 } },
      { x: 17, y: 11, color: "#ffb852", direction: { dx: -1, dy: 0 } },
    ];
    scoreRef.current = 0;
    setScore(0);
    powerModeRef.current = false;
    if (powerTimerRef.current) clearTimeout(powerTimerRef.current);
  }, []);

  // Start game
  const startGame = () => {
    setIsGameOver(false);
    setWon(false);
    initGame();
    setIsGameOpen(true);
  };

  // Close game
  const closeGame = () => {
    setIsGameOpen(false);
    setIsGameOver(false);
    setWon(false);
    cancelAnimationFrame(animationRef.current);
    if (powerTimerRef.current) clearTimeout(powerTimerRef.current);
  };

  // End game
  const endGame = useCallback((didWin: boolean) => {
    setIsGameOver(true);
    setIsGameOpen(false);
    setWon(didWin);
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
      localStorage.setItem("pacmanHighScore", scoreRef.current.toString());
    }
    cancelAnimationFrame(animationRef.current);
  }, [highScore]);

  // Handle direction change
  const changeDirection = useCallback((dx: number, dy: number) => {
    const pacman = pacmanRef.current;
    const newX = pacman.x + dx;
    const newY = pacman.y + dy;

    if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS) {
      if (mazeRef.current[newY][newX] !== 0) {
        pacman.direction = { dx, dy };
      }
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGameOpen || isGameOver) return;

      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          e.preventDefault();
          changeDirection(0, -1);
          break;
        case "ArrowDown":
        case "KeyS":
          e.preventDefault();
          changeDirection(0, 1);
          break;
        case "ArrowLeft":
        case "KeyA":
          e.preventDefault();
          changeDirection(-1, 0);
          break;
        case "ArrowRight":
        case "KeyD":
          e.preventDefault();
          changeDirection(1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameOpen, isGameOver, changeDirection]);

  // Touch controls
  const handleTouch = (direction: string) => {
    switch (direction) {
      case "up": changeDirection(0, -1); break;
      case "down": changeDirection(0, 1); break;
      case "left": changeDirection(-1, 0); break;
      case "right": changeDirection(1, 0); break;
    }
  };

  // Game loop
  useEffect(() => {
    if (!isGameOpen || isGameOver || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    let frameCount = 0;

    const drawMaze = () => {
      mazeRef.current.forEach((row, y) => {
        row.forEach((cell, x) => {
          const px = x * CELL_SIZE;
          const py = y * CELL_SIZE;

          if (cell === 0) {
            // Wall
            ctx.fillStyle = "#1a1a6e";
            ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
            ctx.strokeStyle = "#3333cc";
            ctx.lineWidth = 2;
            ctx.strokeRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
          } else {
            // Path
            ctx.fillStyle = "#000";
            ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);

            if (cell === 1) {
              // Dot
              ctx.fillStyle = "#ffb8ae";
              ctx.beginPath();
              ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, 3, 0, Math.PI * 2);
              ctx.fill();
            } else if (cell === 3) {
              // Power pellet
              ctx.fillStyle = "#ffb8ae";
              ctx.beginPath();
              ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, 6, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });
    };

    const drawPacman = () => {
      const pacman = pacmanRef.current;
      const px = pacman.x * CELL_SIZE + CELL_SIZE / 2;
      const py = pacman.y * CELL_SIZE + CELL_SIZE / 2;

      ctx.fillStyle = "#ffff00";
      ctx.beginPath();

      const mouthAngle = pacman.mouthOpen ? 0.25 : 0.05;
      const startAngle = mouthAngle * Math.PI;
      const endAngle = (2 - mouthAngle) * Math.PI;

      // Rotate based on direction
      const dir = pacman.direction;
      let rotation = 0;
      if (dir.dx === 1) rotation = 0;
      else if (dir.dx === -1) rotation = Math.PI;
      else if (dir.dy === -1) rotation = -Math.PI / 2;
      else if (dir.dy === 1) rotation = Math.PI / 2;

      ctx.arc(px, py, CELL_SIZE / 2 - 2, startAngle + rotation, endAngle + rotation);
      ctx.lineTo(px, py);
      ctx.closePath();
      ctx.fill();

      // Eye
      const eyeX = px + Math.cos(rotation - 0.5) * 4;
      const eyeY = py + Math.sin(rotation - 0.5) * 4 - 3;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawGhosts = () => {
      ghostsRef.current.forEach((ghost) => {
        const px = ghost.x * CELL_SIZE + CELL_SIZE / 2;
        const py = ghost.y * CELL_SIZE + CELL_SIZE / 2;

        // Ghost body
        ctx.fillStyle = powerModeRef.current ? "#0000ff" : ghost.color;
        ctx.beginPath();
        ctx.arc(px, py - 2, CELL_SIZE / 2 - 2, Math.PI, 0);
        ctx.lineTo(px + CELL_SIZE / 2 - 2, py + CELL_SIZE / 2 - 4);

        // Wavy bottom
        for (let i = 0; i < 3; i++) {
          const waveX = px + CELL_SIZE / 2 - 2 - (i + 1) * (CELL_SIZE - 4) / 3;
          ctx.quadraticCurveTo(waveX + (CELL_SIZE - 4) / 6, py + CELL_SIZE / 2 - 8, waveX, py + CELL_SIZE / 2 - 4);
        }
        ctx.closePath();
        ctx.fill();

        // Eyes
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(px - 4, py - 3, 4, 0, Math.PI * 2);
        ctx.arc(px + 4, py - 3, 4, 0, Math.PI * 2);
        ctx.fill();

        if (!powerModeRef.current) {
          ctx.fillStyle = "#000";
          ctx.beginPath();
          ctx.arc(px - 3, py - 2, 2, 0, Math.PI * 2);
          ctx.arc(px + 5, py - 2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const moveGhosts = () => {
      ghostsRef.current.forEach((ghost) => {
        const directions = [
          { dx: 0, dy: -1 },
          { dx: 0, dy: 1 },
          { dx: -1, dy: 0 },
          { dx: 1, dy: 0 },
        ];

        // Filter valid directions
        const validDirs = directions.filter((d) => {
          const newX = ghost.x + d.dx;
          const newY = ghost.y + d.dy;
          if (newX < 0 || newX >= COLS || newY < 0 || newY >= ROWS) return false;
          return mazeRef.current[newY][newX] !== 0;
        });

        // Prefer not to reverse
        const nonReverse = validDirs.filter(
          (d) => !(d.dx === -ghost.direction.dx && d.dy === -ghost.direction.dy)
        );

        const choices = nonReverse.length > 0 ? nonReverse : validDirs;
        if (choices.length > 0) {
          const choice = choices[Math.floor(Math.random() * choices.length)];
          ghost.direction = choice;
          ghost.x += choice.dx;
          ghost.y += choice.dy;
        }
      });
    };

    const update = () => {
      frameCount++;

      // Clear
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw maze
      drawMaze();

      // Move Pacman every 8 frames
      if (frameCount % 8 === 0) {
        pacmanRef.current.mouthOpen = !pacmanRef.current.mouthOpen;

        const pacman = pacmanRef.current;
        const newX = pacman.x + pacman.direction.dx;
        const newY = pacman.y + pacman.direction.dy;

        if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS) {
          if (mazeRef.current[newY][newX] !== 0) {
            pacman.x = newX;
            pacman.y = newY;

            // Eat dot
            if (mazeRef.current[newY][newX] === 1) {
              mazeRef.current[newY][newX] = 2;
              scoreRef.current += 10;
              setScore(scoreRef.current);
            }
            // Eat power pellet
            else if (mazeRef.current[newY][newX] === 3) {
              mazeRef.current[newY][newX] = 2;
              scoreRef.current += 50;
              setScore(scoreRef.current);
              powerModeRef.current = true;
              if (powerTimerRef.current) clearTimeout(powerTimerRef.current);
              powerTimerRef.current = setTimeout(() => {
                powerModeRef.current = false;
              }, 5000);
            }
          }
        }
      }

      // Move ghosts every 12 frames
      if (frameCount % 12 === 0) {
        moveGhosts();
      }

      // Draw everything
      drawPacman();
      drawGhosts();

      // Check collision with ghosts
      const pacman = pacmanRef.current;
      for (const ghost of ghostsRef.current) {
        if (ghost.x === pacman.x && ghost.y === pacman.y) {
          if (powerModeRef.current) {
            // Eat ghost - respawn it
            ghost.x = 9;
            ghost.y = 6;
            scoreRef.current += 200;
            setScore(scoreRef.current);
          } else {
            endGame(false);
            return;
          }
        }
      }

      // Check win condition
      const dotsLeft = mazeRef.current.flat().filter((c) => c === 1 || c === 3).length;
      if (dotsLeft === 0) {
        endGame(true);
        return;
      }

      // Draw score
      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`Score: ${scoreRef.current}`, 5, 12);

      animationRef.current = requestAnimationFrame(update);
    };

    update();
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isGameOpen, isGameOver, endGame]);

  return (
    <>
      {/* RESPONSIVE FOOTER */}
      <footer className="relative w-full flex flex-col md:flex-row items-center justify-between 
        px-4 py-4 text-sm text-gray-400 tracking-wider bg-transparent gap-4 md:gap-0">

        {/* Contact - Left on Desktop */}
        <div className="flex items-center w-full md:w-auto justify-center md:justify-start order-2 md:order-1">
          <Link href="#contact" className="hover:text-red-500 transition-colors">Contact</Link>
        </div>

        {/* Navigation links - Center on Desktop */}
        <div className="flex flex-wrap justify-center items-center gap-2 order-3 md:order-2 w-full md:w-auto">
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

        {/* Icons - Right on Desktop */}
        <div className="flex items-center w-full md:w-auto justify-center md:justify-end gap-4 order-1 md:order-3">
          <button onClick={startGame} aria-label="Play Pac-Man Game">
            <FaGamepad size={16} className="hover:text-red-500 cursor-pointer transition-colors" />
          </button>
          <Link href="#" aria-label="Volume">
            <FaVolumeUp size={16} className="hover:text-red-500 cursor-pointer transition-colors" />
          </Link>
        </div>
      </footer>

      {/* GAME MODAL */}
      {isGameOpen && !isGameOver && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black p-3 sm:p-4 rounded-xl border border-red-500/30 w-full max-w-[420px]">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <h2 className="text-base sm:text-lg font-bold text-red-500">🟡 PAC-MAN</h2>
              <div className="text-xs sm:text-sm text-gray-400">Best: {highScore}</div>
            </div>

            <div className="flex justify-center bg-black rounded-lg p-1 sm:p-2">
              <canvas
                ref={canvasRef}
                className="rounded border border-red-900/50"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>

            <div className="flex justify-between items-center mt-2 sm:mt-3">
              <p className="text-gray-400 text-xs sm:text-sm">
                Score: <span className="text-red-500 font-bold">{score}</span>
              </p>
              <p className="text-gray-500 text-xs hidden sm:block">Arrow keys / WASD to move</p>
            </div>

            {/* Touch controls for mobile */}
            <div className="grid grid-cols-3 gap-1 mt-8 mb-10 sm:hidden max-w-[150px] mx-auto">
              <div />
              <button
                onTouchStart={() => handleTouch("up")}
                onClick={() => handleTouch("up")}
                className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded p-2 text-lg text-red-500"
              >
                ▲
              </button>
              <div />
              <button
                onTouchStart={() => handleTouch("left")}
                onClick={() => handleTouch("left")}
                className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded p-2 text-lg text-red-500"
              >
                ◀
              </button>
              <button
                onTouchStart={() => handleTouch("down")}
                onClick={() => handleTouch("down")}
                className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded p-2 text-lg text-red-500"
              >
                ▼
              </button>
              <button
                onTouchStart={() => handleTouch("right")}
                onClick={() => handleTouch("right")}
                className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded p-2 text-lg text-red-500"
              >
                ▶
              </button>
            </div>

            <button
              onClick={closeGame}
              className="mt-3 sm:mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded text-xs sm:text-sm transition-colors text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {isGameOver && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6 rounded-xl border border-red-500/30 w-full max-w-[420px] text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {won ? (
                <span className="text-green-500">🎉 You Win!</span>
              ) : (
                <span className="text-red-500">👻 Game Over!</span>
              )}
            </h2>

            <div className="bg-white/5 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <p className="text-3xl sm:text-4xl font-bold text-red-500 mb-1">{score}</p>
              <p className="text-gray-400 text-xs sm:text-sm">Your Score</p>
            </div>

            {score >= highScore && score > 0 && (
              <p className="text-green-400 mb-3 sm:mb-4 animate-pulse text-sm sm:text-base">🏆 New High Score!</p>
            )}

            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
              Best: <span className="text-red-500">{highScore}</span>
            </p>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={startGame}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
              >
                Play Again
              </button>
              <button
                onClick={closeGame}
                className="flex-1 bg-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base text-white"
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
