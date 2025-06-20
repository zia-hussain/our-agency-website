import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold text-cream tracking-tight">
              Zumetrix Labs
            </span>
            <p className="text-stone-light mt-2">
              Crafting exceptional software experiences
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-stone-light hover:text-terracotta transition-colors duration-200">
              <Github size={20} />
            </a>
            <a href="#" className="text-stone-light hover:text-terracotta transition-colors duration-200">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-stone-light hover:text-terracotta transition-colors duration-200">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-stone/20 mt-8 pt-8 text-center">
          <p className="text-stone text-sm">
            © 2025 Zumetrix Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;