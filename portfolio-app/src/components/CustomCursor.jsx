import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    // Smooth interpolation for the ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      gsap.set(ring, {
        x: ringX,
        y: ringY
      });
      
      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(render);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .hover-target');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
      gsap.to(ring, { scale: 0.8, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.1 });
      gsap.to(ring, { scale: 1, duration: 0.1 });
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block"></div>
      <div ref={ringRef} className="custom-cursor-ring hidden md:block"></div>
    </>
  );
};

export default CustomCursor;
