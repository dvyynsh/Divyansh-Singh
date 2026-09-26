import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const useMagnetic = (intensity = 5) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // Disable on mobile/touch
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isMobile = window.innerWidth < 768;
    if (isTouchDevice || isMobile) return;

    // Reduce intensity on tablet
    const actualIntensity = window.innerWidth <= 1024 ? intensity * 0.5 : intensity;

    let boundingRect = null;

    const handleMouseEnter = () => {
      boundingRect = element.getBoundingClientRect();
      document.body.classList.add('magnetic-active');
    };

    const handleMouseMove = (e) => {
      if (!boundingRect) return;
      
      const elementCenterX = boundingRect.left + boundingRect.width / 2;
      const elementCenterY = boundingRect.top + boundingRect.height / 2;
      
      const deltaX = e.clientX - elementCenterX;
      const deltaY = e.clientY - elementCenterY;

      // Calculate movement based on cursor distance from center
      const moveX = (deltaX / (boundingRect.width / 2)) * actualIntensity;
      const moveY = (deltaY / (boundingRect.height / 2)) * actualIntensity;

      gsap.to(element, {
        x: moveX,
        y: moveY,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      boundingRect = null;
      document.body.classList.remove('magnetic-active');
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(element);
    };
  }, [intensity]);

  return ref;
};

export default useMagnetic;
