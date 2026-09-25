import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import CustomCursor from './components/CustomCursor';
import BackgroundAnimation from './components/BackgroundAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import MiniGame from './components/MiniGame';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen selection:bg-accent selection:text-white">
      <CustomCursor />
      <BackgroundAnimation />
      <Navbar />
      
      <main className="w-full relative z-10 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <MiniGame />
        <Contact />
      </main>
    </div>
  );
}

export default App;
