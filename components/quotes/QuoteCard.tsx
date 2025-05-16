'use client';

import { motion } from 'framer-motion';
import { FaQuoteLeft, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useState } from 'react';

interface Quote {
  id?: string;
  text: string;
  author: string;
}

interface QuoteCardProps {
  quote: Quote;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  const [saved, setSaved] = useState(false);

  const toggleSave = () => {
    setSaved(prev => !prev);
    // TODO: Hook up to Firebase
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative bg-white dark:bg-zinc-800 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg border border-zinc-200 dark:border-zinc-700 w-full max-w-3xl mx-auto mb-6 transition-all duration-300"
    >
      {/* Quotation icon in background */}
      <FaQuoteLeft className="absolute top-4 left-4 text-red-100 dark:text-zinc-600 text-4xl opacity-30 z-0" />

      {/* Save icon */}
      <button
        onClick={toggleSave}
        className="absolute top-4 right-4 z-10 text-red-400 hover:text-red-600 transition"
        aria-label={saved ? 'Unsave quote' : 'Save quote'}
      >
        {saved ? <FaBookmark className="text-lg" /> : <FaRegBookmark className="text-lg" />}
      </button>

      {/* Quote content with subtle hover */}
      <motion.p
        whileHover={{ scale: 1.02, color: '#dc2626' }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-base md:text-lg font-medium leading-relaxed text-gray-800 dark:text-gray-100 relative z-10"
      >
        “{quote.text}”
      </motion.p>

      {/* Author */}
      <p className="text-sm text-gray-600 dark:text-gray-300 italic text-right mt-4 z-10 relative">
        — {quote.author}
      </p>
    </motion.div>
  );
}
