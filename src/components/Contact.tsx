import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

// 🔑 Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "thxkursaabz@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message Sent! 🚀",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-24 px-6 md:px-16 bg-lavender-glow/10 relative overflow-hidden">
      {/* Background Blobs */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-accent/20 to-cyan-accent/20 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Collaborate 💬
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-accent to-cyan-accent mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            I'm open to freelance projects, collaborations, and AI-based web ideas
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="rounded-xl border-2 border-border focus:border-pink-accent transition-colors duration-300 bg-background"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="rounded-xl border-2 border-border focus:border-cyan-accent transition-colors duration-300 bg-background"
              />
            </div>
          </div>
          <div>
            <Textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="rounded-xl border-2 border-border focus:border-pink-accent transition-colors duration-300 bg-background resize-none"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isSending}
            className="w-full rounded-full bg-pink-accent hover:bg-gradient-to-r hover:from-pink-accent hover:to-cyan-accent text-primary-foreground transition-all duration-300 glow-pink disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </motion.form>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-6 mt-12"
        >
          {[
            { icon: Github, url: "https://github.com", label: "GitHub" },
            { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" },
            { icon: Mail, url: "mailto:akshit@example.com", label: "Email" },
          ].map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-4 rounded-full bg-card border-2 border-border hover:border-gradient-to-r hover:from-pink-accent hover:to-cyan-accent hover:glow-pink transition-all duration-300"
                aria-label={social.label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-gradient-to-r from-pink-accent/20 to-cyan-accent/20 text-center text-muted-foreground"
        >
          <p>© 2025 Akshit Thakur. Crafted with AI & passion.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
