import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopProps {
  showAfter?: number; // Số pixel scroll trước khi hiện button (default: 400)
  variant?: 'lamborghini' | 'minimal'; // Style variant
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  showAfter = 400,
  variant = 'lamborghini' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  if (variant === 'minimal') {
    return (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-full shadow-lg hover:scale-110"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    );
  }

  // Lamborghini variant - luxury style matching the brand
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 group animate-fadeIn"
      aria-label="Scroll to top"
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-lambo-primary/20 blur-xl group-hover:bg-lambo-primary/30 transition-all duration-300" />
      
      {/* Main button */}
      <div className="relative flex flex-col items-center gap-1">
        <div className="w-12 h-12 bg-lambo-dark-light border-2 border-lambo-primary rounded-full flex items-center justify-center group-hover:bg-lambo-primary group-hover:scale-110 transition-all duration-300 shadow-2xl">
          <ChevronUp className="w-5 h-5 text-lambo-primary group-hover:text-lambo-bold-black transition-colors duration-300" />
        </div>
        
        {/* Label */}
        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#8e826b] group-hover:text-lambo-primary transition-colors duration-300 whitespace-nowrap">
          Top
        </span>
      </div>
    </button>
  );
};

export default ScrollToTop;
