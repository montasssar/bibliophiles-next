'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}
    >
      <div className="relative w-12 h-12 flex items-center justify-center group">
        <div className="absolute inset-0 rounded-full bg-peach/20 blur-xl animate-pulse" />
        <FaArrowUp className="relative z-10 text-red-600 text-2xl group-hover:-translate-y-1 transition-transform duration-300" />
      </div>
    </button>
  );
}
