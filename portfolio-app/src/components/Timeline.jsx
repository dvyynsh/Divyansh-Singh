import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, BookOpen, Code, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const containerRef = useRef(null);
  
  const timelineData = [
    {
      year: "2025 - Present",
      title: "B.Tech in AI & ML",
      description: "Pursuing Bachelor's degree focused on Artificial Intelligence and Machine Learning.",
      icon: <BookOpen className="text-accent" />
    },
    {
      year: "2026",
      title: "Full Stack Development",
      description: "Mastered MERN stack and built several complex web applications including AI Resume Analyzer.",
      icon: <Terminal className="text-accent" />
    },
    {
      year: "Daily",
      title: "LeetCode Problem Solving",
      description: "Consistent practice in Data Structures and Algorithms using C++.",
      icon: <Code className="text-accent" />
    },
    {
      year: "Future",
      title: "AI Engineer",
      description: "Working towards becoming a leading AI Engineer and building impactful software.",
      icon: <Award className="text-accent" />
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line animation
      gsap.from('.timeline-line', {
        height: 0,
        duration: 2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1
        }
      });

      // Items stagger
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item, i) => {
        gsap.from(item, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        });
      });
      
      // Removed Leetcode Stats animation
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-24 relative z-10 bg-[#050505]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Journey Timeline */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-accent text-sm tracking-widest uppercase mb-4">My Path</h2>
            <h3 className="font-display text-4xl md:text-5xl">Journey & Education</h3>
          </div>
          
          <div className="timeline-container relative max-w-4xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2">
              <div className="timeline-line w-full bg-accent absolute top-0 left-0"></div>
            </div>
            
            <div className="flex flex-col gap-12">
              {timelineData.map((item, index) => (
                <div key={index} className={`timeline-item relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center w-full pl-12 md:pl-0`}>
                  
                  {/* Icon Node */}
                  <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-[#111] border-2 border-accent flex items-center justify-center z-10 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    {item.icon}
                  </div>
                  
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                    <div className="glass-card p-6 hover-target hover:border-accent/30 transition-colors">
                      <span className="text-accent text-sm font-mono mb-2 block">{item.year}</span>
                      <h4 className="text-xl font-medium text-white mb-2">{item.title}</h4>
                      <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Timeline;
