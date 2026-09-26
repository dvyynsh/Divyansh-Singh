import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import DiscordPresence from './DiscordPresence';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      });
      
      gsap.from('.massive-text', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.8
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      
      {/* Desktop Discord widget */}
      <div className="hidden md:block absolute top-[80px] right-6 z-20 w-[220px]">
        <DiscordPresence />
      </div>

      {/* Middle Content Layer */}
      <div className="w-full max-w-7xl px-8 flex flex-col md:flex-row justify-between items-center z-10 mt-0 md:-mt-24">
        
        {/* Left Side */}
        <div className="max-w-md hero-elem">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider text-text-muted">Available for work</span>
          </div>
          
          {/* Mobile Discord widget */}
          <div className="md:hidden w-[220px] mb-6 flex justify-center mx-auto sm:mx-0">
            <DiscordPresence />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4">
            AI/ML Student &<br/>
            <span className="text-accent">Full Stack MERN</span><br/>
            Developer
          </h1>
        </div>

        {/* Right Side */}
        <div className="max-w-xs mt-12 md:mt-48 flex flex-col items-start md:items-end text-left md:text-right">
          <p className="hero-elem text-text-muted text-sm leading-relaxed mb-8">
            Hi, I'm Divyansh Singh. A B.Tech AIML student on a journey to become a Data Scientist. I enjoy transforming data into intelligent solutions, building AI-powered applications, and continuously improving through problem solving and modern software development.
          </p>
          
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {['Artificial Intelligence', 'Machine Learning', 'Data Science', 'MERN Stack', 'C++', 'Problem Solving'].map((tech) => (
              <span key={tech} className="hero-elem px-3 py-1.5 text-[10px] uppercase tracking-widest rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 text-text-muted hover:text-white backdrop-blur-md cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Massive Bottom Text */}
      <div className="absolute bottom-[-5%] left-0 w-full text-center z-0 pointer-events-none massive-text">
        <h1 className="font-display text-[15vw] font-bold tracking-tighter text-white/90 uppercase leading-none mix-blend-overlay">
          Divyansh
        </h1>
      </div>
      
    </section>
  );
};

export default Hero;
