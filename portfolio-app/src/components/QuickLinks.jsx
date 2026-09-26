import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import Magnetic from './Magnetic';

const QuickLinks = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact') || document.querySelector('section:last-of-type');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass = "flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group";
  const iconClass = "w-6 h-6 mb-2 text-white/70 group-hover:text-accent transition-colors";
  const labelClass = "text-[10px] font-medium text-white/90";

  return (
    <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 transition-all duration-300 hover:border-white/20 relative opacity-0 translate-y-2 discord-fade-in shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)] hover:backdrop-blur-2xl text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <h4 className="text-[10px] uppercase tracking-widest text-text-muted mb-3 relative z-10">Quick Links</h4>
      
      <div className="grid grid-cols-2 gap-2 relative z-10">
        <Magnetic intensity={10}>
          <a 
            href="https://www.linkedin.com/in/dvyynsh/" 
            target="_blank" 
            rel="noreferrer" 
            className={linkClass}
            title="Connect with me"
            aria-label="LinkedIn Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span className={labelClass}>LinkedIn</span>
          </a>
        </Magnetic>

        <Magnetic intensity={10}>
          <a 
            href="mailto:divyansh205044@gmail.com" 
            className={linkClass}
            title="Send me an email"
            aria-label="Email Me"
          >
            <Mail className={iconClass} />
            <span className={labelClass}>Email Me</span>
          </a>
        </Magnetic>

        <Magnetic intensity={10}>
          <a 
            href="https://github.com/dvyynsh" 
            target="_blank" 
            rel="noreferrer" 
            className={linkClass}
            title="View my projects"
            aria-label="GitHub Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span className={labelClass}>GitHub</span>
          </a>
        </Magnetic>

        <Magnetic intensity={10}>
          <button 
            onClick={scrollToContact} 
            className={linkClass}
            title="Jump to Contact"
            aria-label="Let's Connect"
          >
            <MessageCircle className={iconClass} />
            <span className={labelClass}>Let's Connect</span>
          </button>
        </Magnetic>
      </div>
    </div>
  );
};

export default React.memo(QuickLinks);
