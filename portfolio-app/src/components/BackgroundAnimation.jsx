import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const frameCount = 260;
    const currentFrame = index => (
      `/video-frames-new/frame_${(index + 1).toString().padStart(5, '0')}.jpg`
    );

    const images = [];
    const obj = { frame: 0 };

    // Preload first frame immediately
    const img = new Image();
    img.src = currentFrame(0);
    images[0] = img;
    
    img.onload = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    // Preload rest
    for (let i = 1; i < frameCount; i++) {
      const image = new Image();
      image.src = currentFrame(i);
      images.push(image);
    }

    const render = () => {
      if (images[obj.frame]) {
        // Draw image covering the canvas
        const i = images[obj.frame];
        const hRatio = canvas.width / i.width;
        const vRatio = canvas.height / i.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - i.width * ratio) / 2;
        const centerShift_y = (canvas.height - i.height * ratio) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(i, 0, 0, i.width, i.height,
          centerShift_x, centerShift_y, i.width * ratio, i.height * ratio);
      }
    };

    gsap.to(obj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      onUpdate: render
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <canvas ref={canvasRef} id="scroll-canvas" />
  );
};

export default BackgroundAnimation;
