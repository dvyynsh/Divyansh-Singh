import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Code } from 'lucide-react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  
  const projects = [
    {
      title: "AI Resume Analyzer",
      category: "Full Stack AI",
      description: "An intelligent platform that analyzes resumes against job descriptions using Google Gemini API, providing match percentages, missing keywords, and profile summaries.",
      tech: ["React", "Node.js", "Express", "Gemini API", "Tailwind"],
      link: "#",
      github: "#"
    },
    {
      title: "Premium Portfolio",
      category: "Frontend Development",
      description: "An award-winning inspired personal portfolio with smooth scroll animations, glassmorphism, and dynamic 3D interactions using GSAP and React.",
      tech: ["React", "GSAP", "Lenis", "Tailwind CSS"],
      link: "#",
      github: "#"
    },
    {
      title: "Future AI Project",
      category: "Machine Learning",
      description: "Upcoming platform integrating advanced machine learning models for predictive analysis and automated workflow generation.",
      tech: ["Python", "TensorFlow", "React", "MongoDB"],
      link: "#",
      github: "#"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');
      
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-24 relative z-10 bg-background/95 backdrop-blur-xl border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-accent text-sm tracking-widest uppercase mb-4">Selected Work</h2>
            <h3 className="font-display text-4xl md:text-6xl">Featured Projects</h3>
          </div>
          <p className="text-text-muted max-w-sm mt-6 md:mt-0 text-sm">
            A selection of my recent works focusing on web development, artificial intelligence, and user experience.
          </p>
        </div>
        
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <Magnetic key={index} intensity={3}>
              <div className="project-card group relative w-full rounded-3xl overflow-hidden bg-[#111] border border-white/5 flex flex-col md:flex-row hover-target">
                
                {/* Image Container (placeholder with gradient) */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-secondary/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-50"></div>
                  {/* Decorative Pattern instead of image */}
                  <div className="w-full h-full opacity-30 transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out flex items-center justify-center">
                    <div className="text-9xl text-white/5 font-display font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-20">
                  <span className="text-accent text-xs uppercase tracking-widest font-semibold mb-2">{project.category}</span>
                  <h4 className="text-3xl font-display mb-4 text-white group-hover:text-accent transition-colors duration-300">{project.title}</h4>
                  <p className="text-text-muted mb-6 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                    <a href={project.link} className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors hover-target">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                    <a href={project.github} className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-white transition-colors hover-target">
                      <Code size={16} /> Source Code
                    </a>
                  </div>
                </div>
                
              </div>
            </Magnetic>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Projects;
