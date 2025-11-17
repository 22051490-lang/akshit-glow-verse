import { motion, useMotionValue, useSpring } from "framer-motion";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lightIntensity, setLightIntensity] = useState(0.5);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 120 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Track mouse movement for sphere rotation and light intensity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("ai-robot-container")?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Calculate distance from center for light intensity
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);
      const intensity = Math.max(0.3, Math.min(1, 1 - (distance / maxDistance) * 1.5));
      setLightIntensity(intensity);
      
      const maxRotation = 12;
      const rotX = Math.max(-maxRotation, Math.min(maxRotation, (deltaY / window.innerHeight) * 25));
      const rotY = Math.max(-maxRotation, Math.min(maxRotation, (deltaX / window.innerWidth) * 25));
      
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

      {/* Main AI sphere core with motion-reactive lighting */}
      <motion.div
        className="relative cursor-pointer"
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5, ease: "easeOut" },
        }}
      >
        <motion.img
          src={atLogo}
          alt="AT logo - Akshit Thakur's futuristic holographic initials with neon glow"
          className="w-full max-w-lg h-auto"
          style={{
            filter: `brightness(${0.85 + lightIntensity * 0.3}) drop-shadow(0 0 ${30 + lightIntensity * 40}px hsl(195 100% 45% / ${0.5 + lightIntensity * 0.3})) drop-shadow(0 0 ${40 + lightIntensity * 50}px hsl(280 80% 60% / ${0.4 + lightIntensity * 0.3}))`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            rotate: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
        
        {/* Dynamic multi-layered glow that responds to cursor proximity */}
        <motion.div 
          className="absolute inset-0 -z-10 blur-3xl"
          style={{
            background: `radial-gradient(circle at 40% 50%, hsl(195 100% 45% / ${0.3 + lightIntensity * 0.3}), transparent 70%)`,
            opacity: 0.6 + lightIntensity * 0.2,
          }}
        />
        <motion.div 
          className="absolute inset-0 -z-10 blur-3xl"
          style={{
            background: `radial-gradient(circle at 60% 50%, hsl(280 80% 60% / ${0.3 + lightIntensity * 0.3}), transparent 70%)`,
            opacity: 0.5 + lightIntensity * 0.2,
          }}
        />
        <motion.div 
          className="absolute inset-0 -z-10 blur-2xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, hsl(329 100% 50% / ${0.2 + lightIntensity * 0.4}), transparent 60%)`,
            opacity: 0.4 + lightIntensity * 0.3,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Pulsing core glow */}
        <motion.div
          className="absolute inset-0 -z-10 blur-xl"
          style={{
            background: `radial-gradient(circle, hsl(329 100% 50% / ${0.4 + lightIntensity * 0.5}), transparent 40%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default InteractiveAIRobot;
