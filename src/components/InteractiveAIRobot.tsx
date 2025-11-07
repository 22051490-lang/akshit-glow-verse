import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import holographicAI from "@/assets/holographic-ai.png";

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

  // Enhanced ambient particles system that responds to cursor direction
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        // Update existing particles
        const updated = prev
          .map((p) => {
            // Add subtle influence from cursor position
            const influenceX = (mousePosition.x / 1000) * 0.1;
            const influenceY = (mousePosition.y / 1000) * 0.1;
            
            return {
              ...p,
              x: p.x + p.vx + influenceX,
              y: p.y + p.vy + influenceY,
              life: p.life - 0.008,
            };
          })
          .filter((p) => p.life > 0);

        // Add new particles more frequently for richer effect
        if (Math.random() > 0.6) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.3 + Math.random() * 0.7;
          const distance = Math.random() * 120;
          updated.push({
            id: Date.now() + Math.random(),
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
          });
        }

        return updated.slice(-30); // Keep max 30 particles
      });
    }, 40);

    return () => clearInterval(interval);
  }, [mousePosition]);

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

      {/* Main holographic AI figure with head tracking */}
      <motion.div
        className="relative cursor-pointer"
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.08,
          transition: { duration: 0.4 },
        }}
      >
        <motion.img
          src={holographicAI}
          alt="Minimal futuristic holographic AI figure made of flowing data particles"
          className="w-full max-w-md h-auto opacity-90"
          style={{
            filter: "drop-shadow(0 0 40px hsl(195 100% 45% / 0.4)) drop-shadow(0 0 60px hsl(280 80% 60% / 0.3))",
          }}
          animate={{
            filter: [
              "drop-shadow(0 0 40px hsl(195 100% 45% / 0.4)) drop-shadow(0 0 60px hsl(280 80% 60% / 0.3))",
              "drop-shadow(0 0 50px hsl(280 80% 60% / 0.5)) drop-shadow(0 0 70px hsl(195 100% 45% / 0.4))",
              "drop-shadow(0 0 40px hsl(195 100% 45% / 0.4)) drop-shadow(0 0 60px hsl(280 80% 60% / 0.3))",
            ],
            opacity: [0.88, 0.95, 0.88],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Multi-layered holographic glow behind figure */}
        <div 
          className="absolute inset-0 -z-10 blur-3xl opacity-50"
          style={{
            background: "radial-gradient(circle at 40% 50%, hsl(195 100% 45% / 0.4), transparent 60%)",
          }}
        />
        <div 
          className="absolute inset-0 -z-10 blur-3xl opacity-40"
          style={{
            background: "radial-gradient(circle at 60% 50%, hsl(280 80% 60% / 0.4), transparent 60%)",
          }}
        />
        <div 
          className="absolute inset-0 -z-10 blur-2xl opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 40%, hsl(329 100% 50% / 0.3), transparent 50%)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default InteractiveAIRobot;
