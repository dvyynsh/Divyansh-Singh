import React from 'react';
import { Menu } from 'lucide-react';
import Magnetic from './Magnetic';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center">
      <Magnetic intensity={5}>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover-target cursor-pointer transition-colors hover:bg-black/60">
          <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>
          <span className="font-display text-sm tracking-widest font-semibold ml-2">Divyansh</span>
          <Menu size={16} className="ml-4 text-white/70" />
        </div>
      </Magnetic>
      
      {/* Right side contact button */}
      <Magnetic intensity={5}>
        <div className="hidden md:flex items-center px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover-target cursor-pointer transition-colors hover:bg-black/60">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
          <span className="text-xs uppercase tracking-widest font-medium">Available for work</span>
        </div>
      </Magnetic>
    </nav>
  );
};

export default Navbar;
