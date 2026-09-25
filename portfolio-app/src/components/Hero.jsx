import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

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
      
      {/* Middle Content Layer */}
      <div className="w-full max-w-7xl px-8 flex flex-col md:flex-row justify-between items-center z-10 mt-10 md:mt-0">
        
        {/* Left Side */}
        <div className="max-w-md hero-elem">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider text-text-muted">Available for work</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4">
            AI/ML Student &<br/>
            <span className="text-accent">Full Stack MERN</span><br/>
            Developer & C++ Programmer
          </h1>
        </div>

        {/* Right Side */}
        <div className="max-w-xs mt-12 md:mt-0 hero-elem flex flex-col items-start md:items-end text-left md:text-right">
          <p className="text-text-muted text-sm leading-relaxed mb-6">
            Hi, I'm Divyansh Singh — a B.Tech AIML student passionate about Artificial Intelligence, Machine Learning, Full Stack Development, and Problem Solving.
          </p>
          <button className="group flex items-center gap-3 px-6 py-3 bg-accent text-white rounded-full font-medium hover-target transition-all hover:bg-blue-600 hover:scale-105">
            <div className="w-8 h-8 rounded-full bg-white text-accent flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight size={16} />
            </div>
            See my works
          </button>
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
