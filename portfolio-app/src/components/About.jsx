import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text and animate line by line
      const lines = gsap.utils.toArray('.animate-line');
      
      lines.forEach((line) => {
        gsap.from(line, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Animate cards
      gsap.from('.about-card', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cards-container',
          start: "top 80%",
        }
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-screen py-24 relative z-10 bg-background/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image (Placeholder or glassmorphic frame) */}
          <div className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden glass p-4">
            <div className="w-full h-full rounded-2xl bg-secondary/30 relative overflow-hidden flex items-center justify-center border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent"></div>
              {/* Fallback avatar shape if no image provided */}
              <div className="w-32 h-32 rounded-full bg-accent/20 blur-xl absolute"></div>
              <span className="font-display text-4xl text-white/50 tracking-widest relative z-10">DIVYANSH</span>
            </div>
          </div>
          
          {/* Right: About me */}
          <div>
            <h2 className="text-accent text-sm tracking-widest uppercase mb-4 animate-line">About Me</h2>
            <h3 className="font-display text-4xl md:text-5xl mb-8 animate-line">A passionate student & developer.</h3>
            
            <p className="text-text-muted text-lg mb-6 leading-relaxed animate-line">
              I am a B.Tech AIML student passionate about Artificial Intelligence, Machine Learning, Full Stack Development and Problem Solving.
            </p>
            
            <p className="text-text-muted text-lg mb-12 leading-relaxed animate-line">
              I enjoy building modern web applications, AI-powered software and solving Data Structures & Algorithms problems.
            </p>
            
            <h4 className="text-accent text-sm tracking-widest uppercase mb-4 animate-line">Current Focus</h4>
            <div className="cards-container grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="about-card glass-card p-6 hover-target transition-colors hover:border-accent/40">
                <h4 className="text-xl font-medium mb-2 text-white">AI Resume Analyzer</h4>
                <p className="text-sm text-text-muted">Building intelligent parsing and matching systems.</p>
              </div>
              <div className="about-card glass-card p-6 hover-target transition-colors hover:border-accent/40">
                <h4 className="text-xl font-medium mb-2 text-white">Premium Portfolio</h4>
                <p className="text-sm text-text-muted">Developing this exact award-worthy animated website.</p>
              </div>
              <div className="about-card glass-card p-6 hover-target transition-colors hover:border-accent/40">
                <h4 className="text-xl font-medium mb-2 text-white">Daily LeetCode</h4>
                <p className="text-sm text-text-muted">Consistent C++ Data Structures & Algorithms practice.</p>
              </div>
              <div className="about-card glass-card p-6 hover-target transition-colors hover:border-accent/40">
                <h4 className="text-xl font-medium mb-2 text-white">MERN Stack</h4>
                <p className="text-sm text-text-muted">Building robust full-stack applications with React & Node.</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
