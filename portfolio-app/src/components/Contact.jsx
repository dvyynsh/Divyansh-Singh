import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Globe, Code, MessageCircle } from 'lucide-react';
import DiscordPresence from './DiscordPresence';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-elem', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full relative z-10 bg-background pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-32">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2 contact-elem">
            <h2 className="font-display text-5xl md:text-7xl mb-6">Let's work<br/>together.</h2>
            <p className="text-text-muted text-lg max-w-md mb-8">
              I'm currently available for freelance work and full-time positions. If you have a project that needs some creative magic, I'd love to hear about it.
            </p>
            <div className="mb-8">
              <a href="mailto:divyansh205044@gmail.com" className="text-xl font-medium text-white hover:text-accent transition-colors hover-target inline-block mb-2">
                divyansh205044@gmail.com
              </a>
            </div>
            
            <div className="mb-10 w-full max-w-sm">
              <DiscordPresence />
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all hover-target">
                <Code size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all hover-target">
                <Globe size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all hover-target">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          {/* Right Form */}
          <div className="w-full lg:w-1/2 contact-elem">
            <form className="glass p-8 rounded-3xl flex flex-col gap-6">
              <div className="flex flex-col gap-2 relative group">
                <label className="text-xs tracking-widest text-text-muted uppercase ml-2">Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors hover-target" placeholder="Your Name" />
              </div>
              <div className="flex flex-col gap-2 relative group">
                <label className="text-xs tracking-widest text-text-muted uppercase ml-2">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors hover-target" placeholder="your.email@example.com" />
              </div>
              <div className="flex flex-col gap-2 relative group">
                <label className="text-xs tracking-widest text-text-muted uppercase ml-2">Message</label>
                <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors hover-target resize-none" placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="button" className="mt-2 w-full py-4 bg-accent text-white rounded-xl font-medium tracking-wide hover:bg-blue-600 transition-colors hover-target flex items-center justify-center gap-2">
                Send Message <Mail size={18} />
              </button>
            </form>
          </div>
          
        </div>
        
        {/* Footer */}
        <footer className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 contact-elem">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <span className="font-display font-semibold tracking-widest">Divyansh Singh</span>
          </div>
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </p>
        </footer>
        
      </div>
    </section>
  );
};

export default Contact;
