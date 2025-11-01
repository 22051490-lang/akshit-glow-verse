import { motion } from "framer-motion";
import aboutShape from "@/assets/about-shape.png";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-accent to-cyan-accent mx-auto" />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              x: 10,
              transition: { duration: 0.4 }
            }}
            className="space-y-6 cursor-pointer"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm <span className="gradient-text font-semibold">Akshit Thakur</span>, 
              an AI & MERN Developer passionate about crafting intelligent, responsive 
              web experiences that push the boundaries of what's possible.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I work with <span className="text-pink-accent font-medium">React.js</span>, 
              <span className="text-cyan-accent font-medium"> Next.js</span>, 
              <span className="text-pink-accent font-medium"> Node.js</span>, and integrate 
              cutting-edge AI models through <span className="text-cyan-accent font-medium">Hugging Face</span> & 
              <span className="text-pink-accent font-medium"> AWS SageMaker</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My mission is to bridge the gap between powerful AI capabilities and 
              intuitive user experiences, creating applications that feel natural and 
              empowering.
            </p>
          </motion.div>

          {/* Right - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              whileHover={{
                scale: 1.15,
                rotate: 15,
                filter: "drop-shadow(0 0 30px hsl(195 100% 45% / 0.6))",
                transition: { duration: 0.5 }
              }}
              className="relative cursor-pointer"
            >
              <img 
                src={aboutShape} 
                alt="Abstract gradient shape"
                className="w-full max-w-md h-auto drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-accent/20 to-cyan-accent/20 blur-3xl animate-pulse-glow" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
