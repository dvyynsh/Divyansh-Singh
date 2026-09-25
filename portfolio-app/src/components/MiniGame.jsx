import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ICONS = ['⚛️', '🐍', '🚀', '🧠', '💻', '🌐'];
const DECK = [...ICONS, ...ICONS];

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const MiniGame = () => {
  const containerRef = useRef(null);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem('memoryBestScore') || '-'
  );

  useEffect(() => {
    setCards(shuffle([...DECK]));
    
    // Animate section entrance
    const ctx = gsap.context(() => {
      gsap.from('.game-title', {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      });
      gsap.from('.memory-card', {
        scale: 0, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.game-grid',
          start: "top 85%"
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setSolved(s => [...s, first, second]);
        setFlipped([]);
        
        // Check win
        if (solved.length + 2 === cards.length) {
          const finalMoves = moves + 1;
          const currentBest = localStorage.getItem('memoryBestScore');
          if (!currentBest || finalMoves < parseInt(currentBest)) {
            localStorage.setItem('memoryBestScore', finalMoves.toString());
            setBestScore(finalMoves.toString());
          }
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
    }
  };

  const handleRestart = () => {
    setCards(shuffle([...DECK]));
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  };

  return (
    <section ref={containerRef} className="w-full py-24 relative z-10 bg-background/95 backdrop-blur-md border-t border-white/5">
      <div className="max-w-3xl mx-auto px-8 text-center">
        
        <div className="mb-12 game-title">
          <h2 className="text-accent text-sm tracking-widest uppercase mb-4">Take a Break</h2>
          <h3 className="font-display text-4xl mb-4">Tech Memory Match</h3>
          <p className="text-text-muted text-sm">Match the pairs in the fewest moves possible.</p>
        </div>
        
        <div className="flex justify-center items-center gap-8 mb-8 game-title">
          <div className="glass px-6 py-3 rounded-full border border-white/10">
            <span className="text-text-muted text-xs uppercase tracking-widest">Moves: </span>
            <span className="text-white font-medium">{moves}</span>
          </div>
          <div className="glass px-6 py-3 rounded-full border border-white/10">
            <span className="text-text-muted text-xs uppercase tracking-widest">Best: </span>
            <span className="text-accent font-medium">{bestScore}</span>
          </div>
        </div>
        
        <div className="game-grid grid grid-cols-4 gap-4 max-w-md mx-auto mb-10 perspective-1000">
          {cards.map((icon, index) => {
            const isFlipped = flipped.includes(index);
            const isSolved = solved.includes(index);
            return (
              <div 
                key={index}
                onClick={() => handleCardClick(index)}
                className={`memory-card w-full aspect-square relative cursor-pointer hover-target transition-transform duration-500 transform-style-3d ${isFlipped || isSolved ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front (Hidden state) */}
                <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="w-6 h-6 rounded-full bg-white/5"></div>
                </div>
                
                {/* Back (Revealed state) */}
                <div className={`absolute inset-0 backface-hidden rounded-2xl flex items-center justify-center text-4xl shadow-lg border border-white/20 transform rotate-y-180 ${isSolved ? 'bg-accent/20 border-accent/50' : 'bg-[#111]'}`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  {icon}
                </div>
              </div>
            );
          })}
        </div>
        
        <button 
          onClick={handleRestart}
          className="game-title px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-accent transition-colors hover-target border border-white/10"
        >
          Restart Game
        </button>
        
      </div>
    </section>
  );
};

export default MiniGame;
