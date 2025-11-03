import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import robotImage from "@/assets/abstract-robot.png";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const InteractiveRobot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const rippleCounter = useRef(0);
  const particleCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !headRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const headRect = headRef.current.getBoundingClientRect();

      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;
      const headCenterY = headRect.top + headRect.height / 3;

      const deltaX = e.clientX - containerCenterX;
      const deltaY = e.clientY - headCenterY;

      const maxRotation = 15;
      const rotateX = Math.max(-maxRotation, Math.min(maxRotation, (deltaY / containerRect.height) * maxRotation * 2));
      const rotateY = Math.max(-maxRotation, Math.min(maxRotation, (deltaX / containerRect.width) * maxRotation * 2));

      setRotation({ x: -rotateX, y: rotateY });
    };

    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = {
        id: rippleCounter.current++,
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Create particles
      const newParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const speed = 2 + Math.random() * 3;
        newParticles.push({
          id: particleCounter.current++,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        });
      }
      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    containerRef.current?.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
    >
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
          style={{
            left: particle.x,
            top: particle.y,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            x: particle.vx * 50,
            y: particle.vy * 50,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      ))}

      {/* Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border-2 border-primary"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
          }}
          initial={{ width: 20, height: 20, opacity: 1 }}
          animate={{
            width: 300,
            height: 300,
            opacity: 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Robot */}
      <motion.div
        ref={headRef}
        className="relative"
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.img
          src={robotImage}
          alt="Abstract Robot"
          className="w-full h-auto max-w-2xl drop-shadow-2xl"
          animate={{
            filter: [
              "drop-shadow(0 0 20px rgba(124, 58, 237, 0.5))",
              "drop-shadow(0 0 40px rgba(124, 58, 237, 0.8))",
              "drop-shadow(0 0 20px rgba(124, 58, 237, 0.5))",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};
