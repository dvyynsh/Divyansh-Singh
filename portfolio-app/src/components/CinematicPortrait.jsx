import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CinematicPortrait = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !image || !wrapper) return;

    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      // 1. Entrance Animation
      gsap.fromTo(container, 
        { 
          opacity: 0, 
          scale: 1.08, 
          y: 20 
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true
          }
        }
      );

      // 2. Continuous Floating Effect
      if (!prefersReducedMotion) {
        gsap.to(wrapper, {
          y: 4,
          duration: 3.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        // Initial state for yoyo
        gsap.set(wrapper, { y: -4 });
      }

      // 3. Parallax Scroll Effect
      if (!prefersReducedMotion) {
        gsap.to(image, {
          y: 15, // Subtle parallax
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // 4. 3D Hover & Image Movement
      if (!prefersReducedMotion && !isMobile) {
        let xTo = gsap.quickTo(image, "x", { duration: 0.6, ease: "power3.out" });
        let yTo = gsap.quickTo(image, "y", { duration: 0.6, ease: "power3.out" });
        let rotateXTo = gsap.quickTo(container, "rotateX", { duration: 0.6, ease: "power3.out" });
        let rotateYTo = gsap.quickTo(container, "rotateY", { duration: 0.6, ease: "power3.out" });

        const handleMouseMove = (e) => {
          const rect = container.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;
          
          const percentX = deltaX / (rect.width / 2);
          const percentY = deltaY / (rect.height / 2);

          const maxRotation = isTablet ? 2 : 4;
          const maxMovement = 6;

          // Card rotates towards cursor
          rotateXTo(-percentY * maxRotation);
          rotateYTo(percentX * maxRotation);

          // Image moves slightly opposite to cursor for depth
          xTo(-percentX * maxMovement);
          yTo(-percentY * maxMovement);
        };

        const handleMouseLeave = () => {
          rotateXTo(0);
          rotateYTo(0);
          xTo(0);
          yTo(0);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden glass p-4 perspective-1000">
      
      {/* Inner Glow (Ambient Red/Orange matching the image) */}
      <div className="absolute inset-0 bg-red-900/10 blur-[40px] mix-blend-screen pointer-events-none z-0 rounded-3xl"></div>

      <div 
        ref={containerRef} 
        className="w-full h-full rounded-2xl relative overflow-hidden border border-white/5 bg-[#111] will-change-transform transform-style-3d cursor-crosshair group"
      >
        <div ref={wrapperRef} className="w-full h-full absolute inset-0 will-change-transform scale-[1.05]">
          <img 
            ref={imageRef}
            src="/portrait.png" 
            alt="Divyansh Singh Portrait" 
            className="w-full h-full object-cover object-[center_30%] will-change-transform transition-[filter] duration-700 ease-out group-hover:brightness-110 group-hover:contrast-105 group-hover:saturate-110"
          />
        </div>

        {/* Glass Reflection (Moving Diagonal Gradient) */}
        <div className="absolute inset-[-100%] z-10 pointer-events-none opacity-[0.06] bg-gradient-to-tr from-transparent via-white to-transparent w-[300%] rotate-45 animate-reflection mix-blend-overlay"></div>

        {/* Film Grain */}
        <div className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none mix-blend-overlay animate-grain bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat"></div>

        {/* Vignette */}
        <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]"></div>
      </div>

    </div>
  );
};

export default CinematicPortrait;
