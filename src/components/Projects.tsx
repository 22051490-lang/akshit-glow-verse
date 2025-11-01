import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Algo-Vision",
    description: "An interactive sorting algorithm visualizer built with React and Framer Motion, helping users understand algorithms through beautiful animations.",
    tags: ["React.js", "Framer Motion", "TailwindCSS", "Algorithms"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Interview Sim",
    description: "AI-powered interview coach using MERN stack and NLP models from Hugging Face to provide real-time feedback and practice scenarios.",
    tags: ["MERN", "Hugging Face", "NLP", "WebRTC"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Meet-Sphere",
    description: "Real-time meeting platform with AI-generated transcripts, leveraging Hugging Face transformers and WebRTC for seamless collaboration.",
    tags: ["Next.js", "WebRTC", "Hugging Face", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-accent to-cyan-accent mx-auto mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work blending AI capabilities with modern web technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl p-6 border-2 border-transparent bg-card/70 backdrop-blur-sm hover:border-pink-accent hover:glow-pink transition-all duration-300"
              style={{
                background: "linear-gradient(white, white) padding-box, linear-gradient(90deg, hsl(330 100% 50%), hsl(195 100% 50%)) border-box",
              }}
            >
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-accent via-cyan-accent to-pink-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
              
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-bold gradient-text">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-pink-accent/10 to-cyan-accent/10 text-foreground border border-pink-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    size="sm"
                    className="flex-1 rounded-full bg-pink-accent hover:bg-gradient-to-r hover:from-pink-accent hover:to-cyan-accent text-primary-foreground transition-all duration-300"
                    onClick={() => window.open(project.liveUrl, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 rounded-full border-2 border-cyan-accent hover:bg-cyan-accent/10 transition-all duration-300"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
