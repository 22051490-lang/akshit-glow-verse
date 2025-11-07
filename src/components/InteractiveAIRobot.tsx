import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import aiRobot from "@/assets/ai-robot.png";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const InteractiveAIRobot = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Track mouse movement for head rotation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("ai-robot-container")?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const maxRotation = 15;
      const rotX = Math.max(-maxRotation, Math.min(maxRotation, (deltaY / window.innerHeight) * 30));
      const rotY = Math.max(-maxRotation, Math.min(maxRotation, (deltaX / window.innerWidth) * 30));
      
      rotateX.set(-rotX);
      rotateY.set(rotY);
      
      setMousePosition({ x: deltaX, y: deltaY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rotateX, rotateY]);

  // Ambient particles system
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        // Update existing particles
        const updated = prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.01,
          }))
          .filter((p) => p.life > 0);

        // Add new particle occasionally
        if (Math.random() > 0.7) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.5 + Math.random() * 0.5;
          updated.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
          });
        }

        return updated.slice(-20); // Keep max 20 particles
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="ai-robot-container" className="relative w-full h-full flex items-center justify-center">
      {/* Ambient particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            left: `calc(50% + ${particle.x}px)`,
            top: `calc(50% + ${particle.y}px)`,
            background: `radial-gradient(circle, hsl(195 100% 45% / ${particle.life}), transparent)`,
            boxShadow: `0 0 10px hsl(195 100% 45% / ${particle.life * 0.8})`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Glowing orbs floating around */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-cyan-accent/40 blur-sm"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: "0 0 20px hsl(195 100% 45% / 0.6)",
        }}
      />
      
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-pink-accent/40 blur-sm"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          boxShadow: "0 0 20px hsl(329 100% 50% / 0.6)",
        }}
      />

      {/* Main robot image with head tracking */}
      <motion.div
        className="relative cursor-pointer"
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        <motion.img
          src={aiRobot}
          alt="Futuristic AI humanoid robot at holographic workstation"
          className="w-full max-w-md h-auto drop-shadow-2xl"
          animate={{
            filter: [
              "drop-shadow(0 0 20px hsl(195 100% 45% / 0.3))",
              "drop-shadow(0 0 30px hsl(329 100% 50% / 0.4))",
              "drop-shadow(0 0 20px hsl(195 100% 45% / 0.3))",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Glow effect behind robot */}
        <div 
          className="absolute inset-0 -z-10 blur-3xl opacity-60"
          style={{
            background: "radial-gradient(circle, hsl(195 100% 45% / 0.3), hsl(329 100% 50% / 0.3), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default InteractiveAIRobot;
