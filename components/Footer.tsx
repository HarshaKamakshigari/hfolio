// "use client";

// import Link from "next/link";
// import { FaGamepad, FaVolumeUp } from "react-icons/fa";
// import { useState, useEffect, useRef } from "react";

// export default function Footer() {
//   const [isGameOpen, setIsGameOpen] = useState(false);
//   const [isGameOver, setIsGameOver] = useState(false);
//   const [score, setScore] = useState(0);
//   const [target, setTarget] = useState({ x: 0, y: 0 });
//   const [timeLeft, setTimeLeft] = useState(15);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const timerRef = useRef<number | null>(null);

//   const drawCanvas = (
//     canvas: HTMLCanvasElement,
//     ctx: CanvasRenderingContext2D,
//     targetX: number,
//     targetY: number,
//     currentScore: number,
//     currentTime: number
//   ) => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "#1a1a1a";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.fillStyle = "#ff0000";
//     ctx.beginPath();
//     ctx.arc(targetX, targetY, 10, 0, Math.PI * 2);
//     ctx.fill();

//     ctx.fillStyle = "#e5e5e5";
//     ctx.font = "16px Arial";
//     ctx.fillText(`Score: ${currentScore}`, 10, 20);
//     ctx.fillText(`Time: ${currentTime}s`, canvas.width - 60, 20);
//   };

//   useEffect(() => {
//     if (isGameOpen && canvasRef.current && !isGameOver) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       canvas.width = 300;
//       canvas.height = 200;

//       drawCanvas(canvas, ctx, target.x, target.y, score, timeLeft);

//       return () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       };
//     }
//   }, [isGameOpen, score, target, timeLeft, isGameOver]);

//   useEffect(() => {
//     if (isGameOpen && !isGameOver) {
//       timerRef.current = window.setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             if (timerRef.current !== null) clearInterval(timerRef.current);
//             setIsGameOpen(false);
//             setIsGameOver(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       return () => {
//         if (timerRef.current !== null) clearInterval(timerRef.current);
//       };
//     }
//   }, [isGameOpen, isGameOver]);

//   const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!canvasRef.current || timeLeft <= 0 || isGameOver) return;
//     const canvas = canvasRef.current;

//     const rect = canvas.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;
//     const distance = Math.sqrt(
//       Math.pow(mouseX - target.x, 2) + Math.pow(mouseY - target.y, 2)
//     );

//     if (distance < 10) {
//       setScore((prev) => prev + 1);
//       setTarget({
//         x: Math.random() * (canvas.width - 40) + 20,
//         y: Math.random() * (canvas.height - 40) + 20,
//       });
//     }
//   };

//   const toggleGame = () => {
//     if (!isGameOpen && !isGameOver) {
//       setTarget({ x: Math.random() * 260 + 20, y: Math.random() * 160 + 20 });
//       setScore(0);
//       setTimeLeft(15);
//       setIsGameOpen(true);
//     } else if (isGameOver) {
//       setIsGameOver(false);
//     } else {
//       setIsGameOpen(false);
//     }
//   };

//   const handleReplay = () => {
//     setIsGameOver(false);
//     setIsGameOpen(true);
//     setScore(0);
//     setTimeLeft(15);
//     setTarget({ x: Math.random() * 260 + 20, y: Math.random() * 160 + 20 });
//   };

//   return (
//     <>
//       <footer className="relative w-full flex flex-col md:flex-row items-center justify-between px-4 py-4 text-sm 
//       text-gray-400 tracking-wider gap-4 md:gap-0 overflow-hidden 
//       bg-transparent">

//         <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
//           <Link href="#contact" className="hover:text-red-500 transition-colors">Contact</Link>
//         </div>

//         <div className="flex flex-wrap justify-center items-center gap-2 w-full md:w-auto">
//           <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
//           <span className="text-red-500 hidden md:inline">/</span>
//           <Link href="/about" className="hover:text-red-500 transition-colors">About</Link>
//           <span className="text-red-500 hidden md:inline">/</span>
//           <Link href="/works" className="hover:text-red-500 transition-colors">Work</Link>
//           <span className="text-red-500 hidden md:inline">/</span>
//           <Link href="/craft" className="hover:text-red-500 transition-colors">Craft</Link>
//           <span className="text-red-500 hidden md:inline">/</span>
//           <Link href="/notes" className="hover:text-red-500 transition-colors">Notes</Link>
//         </div>

//         <div className="flex justify-center md:justify-end items-center gap-4 w-full md:w-auto">
//           <button onClick={toggleGame}>
//             <FaGamepad size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
//           </button>
//           <Link href="#">
//             <FaVolumeUp size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
//           </Link>
//         </div>
//       </footer>

//       {isGameOpen && !isGameOver && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-[320px] text-gray-200">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-bold text-red-500">Click the Target!</h2>
//               <button onClick={toggleGame} className="text-gray-400 hover:text-red-500">Close</button>
//             </div>
//             <canvas ref={canvasRef} onClick={handleCanvasClick} className="border border-gray-700" />
//             <p className="text-sm text-gray-400 mt-2">Time left: {timeLeft}s</p>
//           </div>
//         </div>
//       )}

//       {isGameOver && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[350px] text-gray-200">
//             <h2 className="text-lg font-bold text-red-500 mb-4">Game Over!</h2>
//             <p className="text-gray-200 mb-4">Your Score: {score}</p>
//             <div className="flex justify-between">
//               <button onClick={handleReplay} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Replay</button>
//               <button onClick={toggleGame} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
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
<<<<<<< HEAD
  // START GAME
  // -------------------------
=======
  // GAME CONTROLS
  // -------------------------

>>>>>>> c5163fe394d3e9bfb4f08605f653b93ff8317415
  const startGame = () => {
    setIsGameOver(false);
    setTimeLeft(15);
    setIsGameOpen(true);
  };

  const closeGame = () => {
<<<<<<< HEAD
    setIsGameOpen(false);
    setIsGameOver(false);
=======
    setIsGameOver(false);
    setIsGameOpen(false);
>>>>>>> c5163fe394d3e9bfb4f08605f653b93ff8317415
  };

  // -------------------------
  // CURSOR TRACKING
  // -------------------------
<<<<<<< HEAD
  useEffect(() => {
    const move = (e: MouseEvent) => {
=======

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
>>>>>>> c5163fe394d3e9bfb4f08605f653b93ff8317415
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (isGameOpen && !isGameOver) {
<<<<<<< HEAD
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
=======
      window.addEventListener("mousemove", handleMove);
    }

    return () => window.removeEventListener("mousemove", handleMove);
  }, [isGameOpen, isGameOver]);

  // -------------------------
  // GAME LOOP + DIFFICULTY SCALING
  // -------------------------

  useEffect(() => {
    if (!isGameOpen || isGameOver || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 250;

    // Initial enemies (balanced base speed)
    enemiesRef.current = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.12 + Math.random() * 0.22, // BASE SPEED
    }));

    let animationId: number;

    const update = () => {
      if (!ctx) return;

      // fade trail background
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cursor = cursorRef.current;

      // Draw cursor dot
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // DIFFICULTY SCALING (1x → 3x)
      const progress = (15 - timeLeft) / 15; // 0 → 1
      const difficulty = 1 + progress * 2;   // multiplier grows over time

      enemiesRef.current.forEach((enemy) => {
        const angle = Math.atan2(cursor.y - enemy.y, cursor.x - enemy.x);

        // scaled movement
        enemy.x += Math.cos(angle) * enemy.speed * difficulty;
        enemy.y += Math.sin(angle) * enemy.speed * difficulty;

        // draw enemy
        ctx.fillStyle = "#ff2020";
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 7, 0, Math.PI * 2);
        ctx.fill();

        // collision detection
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
  // TIMER
  // -------------------------

  useEffect(() => {
    if (!isGameOpen || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOpen(false);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOpen, isGameOver]);
>>>>>>> c5163fe394d3e9bfb4f08605f653b93ff8317415

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
<<<<<<< HEAD
=======
      {/* FOOTER BAR */}
>>>>>>> c5163fe394d3e9bfb4f08605f653b93ff8317415
      <footer className="relative w-full flex flex-col md:flex-row items-center justify-between 
        px-4 py-4 text-sm text-gray-400 tracking-wider gap-4 md:gap-0 bg-transparent">

        <div className="flex items-center md:justify-start w-full md:w-auto">
          <Link href="#contact" className="hover:text-red-500">Contact</Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 w-full md:w-auto">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <span className="text-red-500 hidden md:inline">/</span>

<<<<<<< HEAD
          <Link href="/about" className="hover:text-red-500">About</Link>
          <span className="text-red-500 hidden md:inline">/</span>

          <Link href="/works" className="hover:text-red-500">Work</Link>
          <span className="text-red-500 hidden md:inline">/</span>

          <Link href="/craft" className="hover:text-red-500">Craft</Link>
          <span className="text-red-500 hidden md:inline">/</span>

          <Link href="/notes" className="hover:text-red-500">Notes</Link>
=======
          <Link href="/about" className="hover:text-red-500 transition-colors">About</Link>
          <span className="text-red-500 hidden md:inline">/</span>

          <Link href="/works" className="hover:text-red-500 transition-colors">Work</Link>
          <span className="text-red-500 hidden md:inline">/</span>

          <Link href="/craft" className="hover:text-red-500 transition-colors">Craft</Link>
          <span className="text-red-500 hidden md:inline">/</span>

          <Link href="/notes" className="hover:text-red-500 transition-colors">Notes</Link>
>>>>>>> c5163fe394d3e9bfb4f08605f653b93ff8317415
        </div>

        <div className="flex justify-center md:justify-end items-center gap-4 w-full md:w-auto">
          <button onClick={startGame}>
<<<<<<< HEAD
            <FaGamepad size={16} className="hover:text-red-500 cursor-pointer" />
=======
            <FaGamepad size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
>>>>>>> c5163fe394d3e9bfb4f08605f653b93ff8317415
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
<<<<<<< HEAD
            <canvas ref={canvasRef} className="w-full border border-white/10 rounded-lg" />
            <p className="text-gray-400 mt-3 text-center text-sm">Time Left: {timeLeft}s</p>
=======
            <p className="text-gray-400 mb-2 text-sm">Survive the red lasers.</p>

            <canvas ref={canvasRef} className="w-full border border-white/10 rounded-lg" />

            <p className="text-gray-400 mt-3 text-center text-sm">
              Time Left: {timeLeft}s
            </p>
>>>>>>> c5163fe394d3e9bfb4f08605f653b93ff8317415

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
<<<<<<< HEAD
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Retry
              </button>
              <button
                onClick={closeGame}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
=======
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Retry
              </button>

              <button
                onClick={closeGame}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
>>>>>>> c5163fe394d3e9bfb4f08605f653b93ff8317415
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
