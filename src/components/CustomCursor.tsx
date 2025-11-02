import { useEffect, useRef, useState } from "react";

interface GridSquare {
  x: number;
  y: number;
  size: number;
  opacity: number;
  createdAt: number;
  hue: number;
}

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const gridSquares = useRef<GridSquare[]>([]);
  const rafId = useRef<number>();
  const lastSquareTime = useRef(0);

  // Configuration - adjustable for intensity
  const GRID_SIZE = 20; // Size of each grid square
  const FADE_DURATION = 800; // ms
  const SPAWN_INTERVAL = 50; // ms between spawns
  const SPAWN_INTERVAL_HOVER = 30; // ms between spawns when hovering
  const MAX_SQUARES = 60;

  // Track mouse movement and hover state
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Setup canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();
      
      // Spawn new grid squares
      const spawnInterval = isHovering ? SPAWN_INTERVAL_HOVER : SPAWN_INTERVAL;
      if (now - lastSquareTime.current > spawnInterval && gridSquares.current.length < MAX_SQUARES) {
        // Snap to grid
        const gridX = Math.floor(mousePos.current.x / GRID_SIZE) * GRID_SIZE;
        const gridY = Math.floor(mousePos.current.y / GRID_SIZE) * GRID_SIZE;
        
        // Create grid pattern around cursor
        const offsets = [
          { dx: 0, dy: 0 },
          { dx: 1, dy: 0 },
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 },
        ];
        
        const numSquares = isHovering ? 3 : 1;
        for (let i = 0; i < numSquares && i < offsets.length; i++) {
          const offset = offsets[i];
          gridSquares.current.push({
            x: gridX + offset.dx * GRID_SIZE,
            y: gridY + offset.dy * GRID_SIZE,
            size: GRID_SIZE,
            opacity: 1,
            createdAt: now,
            hue: 230 + Math.random() * 30, // Blue to purple range
          });
        }
        
        lastSquareTime.current = now;
      }

      // Update and render grid squares
      gridSquares.current = gridSquares.current.filter((square) => {
        const age = now - square.createdAt;
        const progress = age / FADE_DURATION;
        
        if (progress >= 1) return false;
        
        // Fade out
        square.opacity = 1 - progress;
        
        // Render square
        const glowIntensity = isHovering ? 0.6 : 0.4;
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${square.hue}, 100%, 60%, ${square.opacity * glowIntensity})`;
        
        // Main square
        ctx.fillStyle = `hsla(${square.hue}, 100%, 60%, ${square.opacity * 0.3})`;
        ctx.fillRect(square.x, square.y, square.size, square.size);
        
        // Border
        ctx.strokeStyle = `hsla(${square.hue}, 100%, 70%, ${square.opacity * 0.6})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(square.x, square.y, square.size, square.size);
        
        // Inner glow
        ctx.fillStyle = `hsla(${square.hue}, 100%, 80%, ${square.opacity * 0.2})`;
        ctx.fillRect(
          square.x + square.size * 0.25,
          square.y + square.size * 0.25,
          square.size * 0.5,
          square.size * 0.5
        );
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        return true;
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isHovering]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
    const elements = document.querySelectorAll("a, button");
    elements.forEach((el) => {
      (el as HTMLElement).style.cursor = "none";
    });

    return () => {
      document.body.style.cursor = "auto";
      elements.forEach((el) => {
        (el as HTMLElement).style.cursor = "";
      });
    };
  }, []);

  return (
    <>
      {/* Canvas for grid trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ mixBlendMode: "screen" }}
      />
      
      {/* Precision dot cursor */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: isHovering ? "8px" : "6px",
          height: isHovering ? "8px" : "6px",
          borderRadius: "50%",
          background: "hsl(230 100% 70%)",
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`,
          transition: "width 0.2s ease, height 0.2s ease",
          boxShadow: isHovering
            ? "0 0 12px hsl(230 100% 70% / 0.9), 0 0 24px hsl(260 100% 60% / 0.6)"
            : "0 0 8px hsl(230 100% 70% / 0.8)",
        }}
      />
    </>
  );
};

export default CustomCursor;
