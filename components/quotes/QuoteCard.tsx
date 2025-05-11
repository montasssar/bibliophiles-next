'use client';

import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

interface Quote {
  id?: string;
  text: string;
  author: string;
}

interface QuoteCardProps {
  quote: Quote;
  index: number;
}

export default function QuoteCard({ quote, index }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700"
    >
      <div className="flex items-start gap-3 mb-3">
        <FaQuoteLeft className="text-red-500 text-xl mt-1 shrink-0" />
        <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-100">
          “{quote.text}”
        </p>
      </div>
      <p className="text-right text-sm text-gray-600 dark:text-gray-300 italic">
        — {quote.author}
      </p>
    </motion.div>
  );
}
