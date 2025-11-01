import { motion } from "framer-motion";
import { Code2, Database, Brain, Blocks } from "lucide-react";

const skills = [
  { category: "Languages", icon: Code2, items: ["Python", "C++", "JavaScript", "TypeScript"] },
  { category: "Frameworks", icon: Blocks, items: ["React.js", "Next.js", "Node.js", "Express.js", "TailwindCSS"] },
  { category: "Databases", icon: Database, items: ["MongoDB", "Firebase", "PostgreSQL", "MySQL"] },
  { category: "AI/ML", icon: Brain, items: ["Hugging Face", "LangChain", "AWS SageMaker", "OpenAI API"] },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Skills = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-lavender-glow/20">
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
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-accent to-cyan-accent mx-auto" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skillGroup, idx) => {
            const Icon = skillGroup.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 0 20px hsl(330 100% 50% / 0.25)" 
                }}
                className="rounded-2xl p-6 border border-border bg-card/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pink-accent/20 to-cyan-accent/20">
                    <Icon className="w-6 h-6 text-pink-accent" />
                  </div>
                  <h3 className="text-xl font-bold">{skillGroup.category}</h3>
                </div>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + i * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-accent to-cyan-accent" />
                      <span className="text-muted-foreground">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
