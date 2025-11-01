import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Code2, Terminal } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-16">
      {/* Floating Gradient Blobs */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 20, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-pink-accent to-cyan-accent rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, -30, 30, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-r from-lavender-glow to-cyan-accent rounded-full blur-3xl opacity-25"
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-5 gap-12 items-center">
        {/* Left Content - 60% */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-3 space-y-6"
        >
          {/* Developer Tag */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-cyan-accent font-mono"
          >
            &lt;developer /&gt;
          </motion.p>

          {/* Name - Draggable */}
          <motion.h1
            drag
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            whileDrag={{ 
              scale: 1.05,
              cursor: "grabbing",
              filter: "drop-shadow(0 0 25px hsl(250 100% 60% / 0.6))"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight cursor-grab select-none"
          >
            AKSHIT{" "}
            <span className="gradient-text">THAKUR</span>
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-muted-foreground">
              AI & Full Stack Developer
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-pink-accent to-cyan-accent mt-2" />
          </motion.div>

          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 text-lg text-muted-foreground max-w-2xl"
          >
            <p>
              Crafting intelligent, responsive web experiences that blend cutting-edge AI
              with seamless full-stack development.
            </p>
            <p>
              Specializing in React.js, Next.js, Node.js, and AI integration through
              Hugging Face, AWS SageMaker, and OpenAI.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-full px-8 bg-pink-accent hover:bg-gradient-to-r hover:from-pink-accent hover:to-cyan-accent text-primary-foreground transition-all duration-300 glow-pink"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-2 border-cyan-accent text-foreground hover:bg-cyan-accent/10 hover:glow-cyan transition-all duration-300"
                onClick={() => window.open("#", "_blank")}
              >
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Visual - 40% */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-2 relative h-[500px] flex items-center justify-center"
        >
          {/* Floating Code Symbol */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Main Code Icon */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <Code2 
                className="w-64 h-64 text-cyan-accent opacity-20" 
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Code2 
                  className="w-48 h-48 gradient-text opacity-80 glow-cyan" 
                  strokeWidth={2}
                />
              </div>
            </motion.div>

            {/* Orbiting Geometric Shapes */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-gradient-to-r from-pink-accent to-cyan-accent opacity-60 blur-sm" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-cyan-accent opacity-40 blur-sm" />
            </motion.div>

            {/* Terminal Icon - Top Right */}
            <motion.div
              animate={{
                y: [0, 10, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -top-12 -right-12"
            >
              <Terminal className="w-16 h-16 text-pink-accent opacity-30" strokeWidth={1.5} />
            </motion.div>

            {/* Brackets - Bottom Left */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-8 -left-8 text-6xl font-mono gradient-text"
            >
              {"{ }"}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ArrowDown className="w-6 h-6 text-cyan-accent animate-pulse-glow" />
          <span className="text-xs text-muted-foreground">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
