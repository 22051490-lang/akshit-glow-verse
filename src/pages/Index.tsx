import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

// Lazy load components below the fold for better performance
const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-pink-accent/30 border-t-pink-accent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="relative">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
