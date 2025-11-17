import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import atLogo from "@/assets/at-logo.png";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const InteractiveAIRobot = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Simplified ambient particles system
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        const updated = prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.008,
          }))
          .filter((p) => p.life > 0);

        if (Math.random() > 0.7) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.3 + Math.random() * 0.5;
          const distance = Math.random() * 100;
          updated.push({
            id: Date.now() + Math.random(),
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
          });
        }

        return updated.slice(-20);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="ai-robot-container" className="relative w-full h-full flex items-center justify-center">
      {/* Ambient particles with varied sizes and colors */}
      {particles.map((particle) => {
        const size = Math.random() > 0.5 ? 'w-1 h-1' : 'w-1.5 h-1.5';
        const color = Math.random() > 0.5 
          ? `hsl(195 100% 45% / ${particle.life})` 
          : `hsl(280 80% 60% / ${particle.life})`;
        
        return (
          <motion.div
            key={particle.id}
            className={`absolute ${size} rounded-full pointer-events-none`}
            style={{
              left: `calc(50% + ${particle.x}px)`,
              top: `calc(50% + ${particle.y}px)`,
              background: `radial-gradient(circle, ${color}, transparent)`,
              boxShadow: `0 0 15px ${color}`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        );
      })}

      {/* Floating holographic orbs */}
      <motion.div
        className="absolute w-4 h-4 rounded-full blur-sm"
        style={{
          background: "radial-gradient(circle, hsl(195 100% 45% / 0.6), transparent)",
          boxShadow: "0 0 30px hsl(195 100% 45% / 0.8)",
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.3, 0.8, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-3 h-3 rounded-full blur-sm"
        style={{
          background: "radial-gradient(circle, hsl(280 80% 60% / 0.6), transparent)",
          boxShadow: "0 0 25px hsl(280 80% 60% / 0.8)",
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.7, 1.4, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <motion.div
        className="absolute w-2 h-2 rounded-full blur-sm"
        style={{
          background: "radial-gradient(circle, hsl(329 100% 50% / 0.7), transparent)",
          boxShadow: "0 0 20px hsl(329 100% 50% / 0.9)",
        }}
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* AT Logo with light background */}
      <motion.div
        className="relative cursor-pointer p-16 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--background)) 0%, hsl(var(--background) / 0.6) 50%, transparent 100%)",
          boxShadow: "0 0 80px hsl(195 100% 45% / 0.15), 0 0 120px hsl(280 80% 60% / 0.1), inset 0 0 60px hsl(var(--background) / 0.8)",
        }}
        whileHover={{
          scale: 1.15,
          rotate: [0, -5, 5, -5, 0],
          transition: { 
            scale: { duration: 0.4, ease: "easeOut" },
            rotate: { duration: 0.6, ease: "easeInOut" }
          },
        }}
      >
        <img
          src={atLogo}
          alt="AT logo - Akshit Thakur's futuristic holographic initials with neon glow"
          className="w-full max-w-md h-auto relative z-10"
        />
      </motion.div>
    </div>
  );
};

export default InteractiveAIRobot;
