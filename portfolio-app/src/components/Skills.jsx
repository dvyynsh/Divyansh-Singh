import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  const skills = [
    { name: 'C++', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 80 },
    { name: 'Express', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'REST API', level: 85 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress bars on scroll
      const bars = gsap.utils.toArray('.progress-bar');
      bars.forEach((bar) => {
        const targetWidth = bar.getAttribute('data-width');
        gsap.to(bar, {
          width: `${targetWidth}%`,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
          }
        });
      });

      // Stagger cards
      gsap.from('.skill-card', {
        y: 60,
        opacity: 0,
        rotationX: -15,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: "top 80%",
        }
      });
      
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  // Simple tilt effect on mouse move
  const handleMouseMove = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(target, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = (target) => {
    gsap.to(target, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.8
    });
  };

  return (
    <section ref={sectionRef} className="w-full py-24 relative z-10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-accent text-sm tracking-widest uppercase mb-4">My Arsenal</h2>
          <h3 className="font-display text-4xl md:text-5xl">Skills & Technologies</h3>
        </div>
        
        <div className="skills-grid grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-card glass-card p-6 flex flex-col justify-between hover-target cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-accent/10 rounded-full blur-xl group-hover:bg-accent/20 transition-all"></div>
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h4 className="font-medium text-lg text-white">{skill.name}</h4>
                <span className="text-xs text-accent font-mono">{skill.level}%</span>
              </div>
              
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative z-10">
                <div 
                  className="progress-bar h-full bg-gradient-to-r from-accent to-blue-400 rounded-full w-0"
                  data-width={skill.level}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Skills;
