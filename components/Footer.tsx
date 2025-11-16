<<<<<<< ours
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
||||||| ancestor
// "use client";

// import Link from "next/link";
// import { FaGamepad, FaVolumeUp } from "react-icons/fa";
// import Noise from "@/components/Noise"; // adjust path

// export default function Footer() {
//   return (
//     <footer className="relative w-full flex flex-col md:flex-row items-center justify-between px-4 py-4 text-sm text-gray-400 tracking-wider gap-4 md:gap-0 overflow-hidden">
      
//       {/* Noise background */}
//       <div className="absolute inset-0 -z-10">
//         <Noise />
//       </div>

//       {/* Left: Contact */}
//       <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
//         <Link href="#contact" className="hover:text-red-500 transition-colors">
//           Contact
//         </Link>
//       </div>

//       {/* Center: Menu */}
//       <div className="flex flex-wrap justify-center items-center gap-2 w-full md:w-auto">
//         <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
//         <span className="text-red-500 hidden md:inline">/</span>
//         <Link href="/" className="hover:text-red-500 transition-colors">About</Link>
//         <span className="text-red-500 hidden md:inline">/</span>
//         <Link href="/works" className="hover:text-red-500 transition-colors">Work</Link>
//         <span className="text-red-500 hidden md:inline">/</span>
//         <Link href="/craft" className="hover:text-red-500 transition-colors">Craft</Link>
//         <span className="text-red-500 hidden md:inline">/</span>
//         <Link href="/notes" className="hover:text-red-500 transition-colors">Notes</Link>
//       </div>

//       {/* Right: Icons */}
//       <div className="flex justify-center md:justify-end items-center gap-4 w-full md:w-auto">
//         <Link href="#">
//           <FaGamepad size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
//         </Link>
//         <Link href="#">
//           <FaVolumeUp size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
//         </Link>
//       </div>
//     </footer>
//   );
// }
// "use client";

// import Link from "next/link";
// import { FaGamepad, FaVolumeUp } from "react-icons/fa";
// import Noise from "@/components/Noise"; // adjust path
// import { useState, useEffect, useRef } from "react";

// export default function Footer() {
//   const [isGameOpen, setIsGameOpen] = useState(false);
//   const [isGameOver, setIsGameOver] = useState(false);
//   const [score, setScore] = useState(0);
//   const [target, setTarget] = useState({ x: 0, y: 0 });
//   const [timeLeft, setTimeLeft] = useState(15); // 15-second timer
//   const canvasRef = useRef(null);
//   const timerRef = useRef(null);

//   // Encapsulated canvas drawing logic
//   const drawCanvas = (canvas, ctx, targetX, targetY, currentScore, currentTime) => {
//     try {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = "#1a1a1a"; // Dark background
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = "#ff0000"; // Red target
//       ctx.beginPath();
//       ctx.arc(targetX, targetY, 10, 0, Math.PI * 2);
//       ctx.fill();
//       ctx.fillStyle = "#e5e5e5"; // Light gray text
//       ctx.font = "16px Arial";
//       ctx.fillText(`Score: ${currentScore}`, 10, 20);
//       ctx.fillText(`Time: ${currentTime}s`, canvas.width - 60, 20);
//     } catch (error) {
//       console.error("Error drawing canvas:", error);
//     }
//   };

//   // Initialize canvas and draw when game is open
//   useEffect(() => {
//     if (isGameOpen && canvasRef.current && !isGameOver) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       canvas.width = 300;
//       canvas.height = 200;

//       // Draw canvas with current target, score, and time
//       drawCanvas(canvas, ctx, target.x, target.y, score, timeLeft);

//       return () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       };
//     }
//   }, [isGameOpen, score, target, timeLeft, isGameOver]);

//   // Timer logic
//   useEffect(() => {
//     if (isGameOpen && !isGameOver) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timerRef.current);
//             setIsGameOpen(false); // Close game modal
//             setIsGameOver(true); // Show game over modal
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       return () => clearInterval(timerRef.current); // Cleanup timer
//     }
//   }, [isGameOpen, isGameOver]);

//   // Handle canvas click
//   const handleCanvasClick = (e) => {
//     if (!canvasRef.current || timeLeft <= 0 || isGameOver) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
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

//   // Toggle game modal and initialize/reset game state
//   const toggleGame = () => {
//     if (!isGameOpen && !isGameOver) {
//       // Initialize game state when opening
//       setTarget({
//         x: Math.random() * (300 - 40) + 20, // Canvas width: 300
//         y: Math.random() * (200 - 40) + 20, // Canvas height: 200
//       });
//       setScore(0);
//       setTimeLeft(15); // Reset timer to 15 seconds
//       setIsGameOpen(true);
//     } else if (isGameOver) {
//       // Close game over modal
//       setIsGameOver(false);
//     } else {
//       // Close game modal
//       setIsGameOpen(false);
//     }
//   };

//   // Replay game
//   const handleReplay = () => {
//     setIsGameOver(false);
//     setIsGameOpen(true);
//     setScore(0);
//     setTimeLeft(15);
//     setTarget({
//       x: Math.random() * (300 - 40) + 20,
//       y: Math.random() * (200 - 40) + 20,
//     });
//   };

//   return (
//     <>
//       <footer className="relative w-full flex flex-col md:flex-row items-center justify-between px-4 py-4 text-sm text-gray-400 tracking-wider gap-4 md:gap-0 overflow-hidden">
//         {/* Noise background */}
//         <div className="absolute inset-0 -z-10">
//           <Noise />
//         </div>

//         {/* Left: Contact */}
//         <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
//           <Link href="#contact" className="hover:text-red-500 transition-colors">
//             Contact
//           </Link>
//         </div>

//         {/* Center: Menu */}
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

//         {/* Right: Icons */}
//         <div className="flex justify-center md:justify-end items-center gap-4 w-full md:w-auto">
//           <button onClick={toggleGame}>
//             <FaGamepad size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
//           </button>
//           <Link href="#">
//             <FaVolumeUp size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
//           </Link>
//         </div>
//       </footer>

//       {/* Game Modal */}
//       {isGameOpen && !isGameOver && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-[320px] text-gray-200">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-bold text-red-500">Click the Target!</h2>
//               <button
//                 onClick={toggleGame}
//                 className="text-gray-400 hover:text-red-500 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//             <canvas
//               ref={canvasRef}
//               onClick={handleCanvasClick}
//               className="border border-gray-700"
//             />
//             <p className="text-sm text-gray-400 mt-2">
//               Click the red circle to score points! Time left: {timeLeft}s
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Game Over Modal */}
//       {isGameOver && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[320px] text-gray-200">
//             <h2 className="text-lg font-bold text-red-500 mb-4">Game Over!</h2>
//             <p className="text-gray-200 mb-4">Your Score: {score}</p>
//             <div className="flex justify-between">
//               <button
//                 onClick={handleReplay}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
//               >
//                 Replay
//               </button>
//               <button
//                 onClick={toggleGame}
//                 className="bg-gray-700 text-gray-200 px-4 py-2 rounded hover:bg-gray-600 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

=======
>>>>>>> theirs
"use client";

import Link from "next/link";
import { FaGamepad, FaVolumeUp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

export default function Footer() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
<<<<<<< ours
  const [timeLeft, setTimeLeft] = useState(15);

||||||| ancestor
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(15); // 15-second timer
=======
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(15);
>>>>>>> theirs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
<<<<<<< ours
  const enemiesRef = useRef<{ x: number; y: number; speed: number }[]>([]);
  const cursorRef = useRef({ x: 150, y: 100 });

  // -------------------------
  // GAME CONTROLS
  // -------------------------

  const startGame = () => {
    setIsGameOver(false);
    setTimeLeft(15);
    setIsGameOpen(true);
||||||| ancestor
  const timerRef = useRef<number | null>(null); // <- browser timer returns number

  const drawCanvas = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    targetX: number,
    targetY: number,
    currentScore: number,
    currentTime: number
  ) => {
    try {
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
    } catch (error) {
      console.error("Error drawing canvas:", error);
    }
=======
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
>>>>>>> theirs
  };

  const closeGame = () => {
    setIsGameOver(false);
    setIsGameOpen(false);
  };

  // -------------------------
  // CURSOR TRACKING
  // -------------------------

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (isGameOpen && !isGameOver) {
<<<<<<< ours
      window.addEventListener("mousemove", handleMove);
||||||| ancestor
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current !== null) {
              clearInterval(timerRef.current); // <- now correctly typed
            }
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
=======
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
>>>>>>> theirs
    }

    return () => window.removeEventListener("mousemove", handleMove);
  }, [isGameOpen, isGameOver]);

  // -------------------------
  // GAME LOOP + DIFFICULTY SCALING
  // -------------------------

  useEffect(() => {
    if (!isGameOpen || isGameOver || !canvasRef.current) return;

    const canvas = canvasRef.current;
<<<<<<< ours
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
||||||| ancestor
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
=======

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
>>>>>>> theirs
      });

<<<<<<< ours
      animationId = requestAnimationFrame(update);
    };
||||||| ancestor
  const toggleGame = () => {
    if (!isGameOpen && !isGameOver) {
      setTarget({ x: Math.random() * (300 - 40) + 20, y: Math.random() * (200 - 40) + 20 });
      setScore(0);
      setTimeLeft(15);
      setIsGameOpen(true);
    } else if (isGameOver) {
      setIsGameOver(false);
    } else {
      setIsGameOpen(false);
    }
  };
=======
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
>>>>>>> theirs

<<<<<<< ours
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
||||||| ancestor
  const handleReplay = () => {
    setIsGameOver(false);
    setIsGameOpen(true);
    setScore(0);
    setTimeLeft(15);
    setTarget({ x: Math.random() * (300 - 40) + 20, y: Math.random() * (200 - 40) + 20 });
  };
=======
  const handleReplay = () => {
    setIsGameOver(false);
    setIsGameOpen(true);
    setScore(0);
    setTimeLeft(15);
    setTarget({ x: Math.random() * 260 + 20, y: Math.random() * 160 + 20 });
  };
>>>>>>> theirs

  return (
    <>
<<<<<<< ours
      {/* FOOTER BAR */}
      <footer className="relative w-full flex flex-col md:flex-row items-center justify-between 
        px-4 py-4 text-sm text-gray-400 tracking-wider gap-4 md:gap-0 bg-transparent">

||||||| ancestor
      <footer className="relative w-full flex flex-col md:flex-row items-center justify-between px-4 py-4 text-sm text-gray-400 tracking-wider gap-4 md:gap-0 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Noise />
        </div>
=======
      <footer className="relative w-full flex flex-col md:flex-row items-center justify-between px-4 py-4 text-sm 
      text-gray-400 tracking-wider gap-4 md:gap-0 overflow-hidden 
      bg-transparent">

>>>>>>> theirs
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
          <button onClick={startGame}>
            <FaGamepad size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
          </button>
          <Link href="#">
            <FaVolumeUp size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
          </Link>
        </div>
      </footer>

      {/* GAME MODAL */}
      {isGameOpen && !isGameOver && (
<<<<<<< ours
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-black/80 p-4 rounded-xl border border-white/10 w-[430px]">
            <h2 className="text-lg font-bold text-red-500 mb-3">Laser Dodge</h2>
            <p className="text-gray-400 mb-2 text-sm">Survive the red lasers.</p>

            <canvas ref={canvasRef} className="w-full border border-white/10 rounded-lg" />

            <p className="text-gray-400 mt-3 text-center text-sm">
              Time Left: {timeLeft}s
            </p>

            <button
              onClick={closeGame}
              className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              Close
            </button>
||||||| ancestor
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-[320px] text-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-red-500">Click the Target!</h2>
              <button onClick={toggleGame} className="text-gray-400 hover:text-red-500 transition-colors">Close</button>
            </div>
            <canvas ref={canvasRef} onClick={handleCanvasClick} className="border border-gray-700" />
            <p className="text-sm text-gray-400 mt-2">Click the red circle to score points! Time left: {timeLeft}s</p>
=======
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-[320px] text-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-red-500">Click the Target!</h2>
              <button onClick={toggleGame} className="text-gray-400 hover:text-red-500">Close</button>
            </div>
            <canvas ref={canvasRef} onClick={handleCanvasClick} className="border border-gray-700" />
            <p className="text-sm text-gray-400 mt-2">Time left: {timeLeft}s</p>
>>>>>>> theirs
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {isGameOver && (
<<<<<<< ours
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-black/80 p-6 rounded-xl border border-white/10 w-[430px]">
            <h2 className="text-lg font-bold text-red-500 mb-4">You Got Hit!</h2>
            <p className="text-gray-300 mb-4">You survived for {15 - timeLeft}s</p>

||||||| ancestor
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[320px] text-gray-200">
            <h2 className="text-lg font-bold text-red-500 mb-4">Game Over!</h2>
            <p className="text-gray-200 mb-4">Your Score: {score}</p>
=======
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[320px] text-gray-200">
            <h2 className="text-lg font-bold text-red-500 mb-4">Game Over!</h2>
            <p className="text-gray-200 mb-4">Your Score: {score}</p>
>>>>>>> theirs
            <div className="flex justify-between">
<<<<<<< ours
              <button
                onClick={startGame}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Retry
              </button>

              <button
                onClick={closeGame}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Close
              </button>
||||||| ancestor
              <button onClick={handleReplay} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">Replay</button>
              <button onClick={toggleGame} className="bg-gray-700 text-gray-200 px-4 py-2 rounded hover:bg-gray-600 transition-colors">Close</button>
=======
              <button onClick={handleReplay} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Replay</button>
              <button onClick={toggleGame} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">Close</button>
>>>>>>> theirs
            </div>
          </div>
        </div>
      )}
    </>
  );
}
