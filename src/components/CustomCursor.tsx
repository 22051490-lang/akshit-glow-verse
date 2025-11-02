import { useEffect, useRef, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

interface TrailPoint extends CursorPosition {
  opacity: number;
  scale: number;
}

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef<CursorPosition>({ x: 0, y: 0 });
  const cursorPos = useRef<CursorPosition>({ x: 0, y: 0 });
  const trailPositions = useRef<TrailPoint[]>([]);
  const rafId = useRef<number>();

  const TRAIL_LENGTH = 12;
  const LERP_FACTOR = 0.15;

  // Initialize trail positions
  useEffect(() => {
    trailPositions.current = Array.from({ length: TRAIL_LENGTH }, (_, i) => ({
      x: 0,
      y: 0,
      opacity: 1 - (i / TRAIL_LENGTH) * 0.9,
      scale: 1 - (i / TRAIL_LENGTH) * 0.7,
    }));
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Detect hovering over interactive elements
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

  // Smooth animation loop
  useEffect(() => {
    const animate = () => {
      // Smooth cursor position with lerp (linear interpolation)
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * LERP_FACTOR;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * LERP_FACTOR;

      // Update main cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Update trail with cascading delay
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        trailPositions.current[i].x = trailPositions.current[i - 1].x;
        trailPositions.current[i].y = trailPositions.current[i - 1].y;
      }
      trailPositions.current[0].x = cursorPos.current.x;
      trailPositions.current[0].y = cursorPos.current.y;

      // Render trail
      trailRefs.current.forEach((trail, i) => {
        if (trail && trailPositions.current[i]) {
          const pos = trailPositions.current[i];
          trail.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${pos.scale})`;
          trail.style.opacity = pos.opacity.toString();
        }
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

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
      {/* Trail circles */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-screen"
          style={{
            width: isHovering ? "48px" : "32px",
            height: isHovering ? "48px" : "32px",
            borderRadius: "50%",
            background: `radial-gradient(circle, 
              hsl(250 100% 60% / ${0.4 - i * 0.03}), 
              hsl(220 100% 55% / ${0.3 - i * 0.025}),
              hsl(195 100% 45% / ${0.2 - i * 0.015}),
              transparent
            )`,
            filter: `blur(${4 + i * 0.5}px)`,
            transition: "width 0.3s ease, height 0.3s ease",
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-screen"
        style={{
          width: isHovering ? "56px" : "40px",
          height: isHovering ? "56px" : "40px",
          borderRadius: "50%",
          background: `radial-gradient(circle, 
            hsl(250 100% 60% / 0.6), 
            hsl(220 100% 55% / 0.4),
            hsl(195 100% 45% / 0.3),
            transparent
          )`,
          border: "2px solid hsl(195 100% 45% / 0.5)",
          filter: "blur(2px)",
          transition: "width 0.3s ease, height 0.3s ease, filter 0.3s ease",
          boxShadow: isHovering
            ? "0 0 30px hsl(250 100% 60% / 0.6), 0 0 60px hsl(195 100% 45% / 0.4)"
            : "0 0 20px hsl(250 100% 60% / 0.4), 0 0 40px hsl(195 100% 45% / 0.3)",
          willChange: "transform",
        }}
      />

      {/* Inner dot for precision */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[10000]"
        style={{
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: "hsl(195 100% 70%)",
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`,
          transition: "none",
          boxShadow: "0 0 8px hsl(195 100% 70% / 0.8)",
        }}
      />
    </>
  );
};

export default CustomCursor;
