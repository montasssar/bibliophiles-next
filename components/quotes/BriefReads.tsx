'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import useQuotes from '@/hooks/useQuotes';
import MoodSelector from '@/components/quotes/MoodSelector';
import QuoteCard from '@/components/quotes/QuoteCard';
import { mindsByTag } from '@/lib/authorSuggestions';

export default function BriefReads() {
  const { currentUser } = useAuth();

  const {
    quotes,
    loading,
    error,
    selectedTag,
    setSelectedTag,
    selectedAuthor,
    setSelectedAuthor,
    loadMore,
  } = useQuotes();

  const [typedAuthor, setTypedAuthor] = useState('');

  const suggestions = mindsByTag[selectedTag] || [];
  const filteredSuggestions = typedAuthor
    ? suggestions.filter((name) =>
        name.toLowerCase().includes(typedAuthor.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loading
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadMore]);

  const handleAuthorSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && typedAuthor.trim()) {
      setSelectedAuthor(typedAuthor.trim());
    }
  };

  const clearFilters = () => {
    setTypedAuthor('');
    setSelectedAuthor('');
    setSelectedTag('');
  };

  return (
    <section className="px-4 md:px-8 max-w-3xl mx-auto mt-12">
      <MoodSelector
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        typedAuthor={typedAuthor}
        setTypedAuthor={setTypedAuthor}
        setSelectedAuthor={setSelectedAuthor}
        filteredSuggestions={filteredSuggestions}
        suggestions={suggestions}
        onSubmit={handleAuthorSubmit}
      />

      {(selectedTag || selectedAuthor) && (
        <div className="flex justify-between items-center text-sm mt-4 text-zinc-600 dark:text-zinc-300">
          <p>
            Showing{' '}
            {selectedTag && (
              <span>
                mood: <strong>{selectedTag}</strong>{' '}
              </span>
            )}
            {selectedAuthor && (
              <span>
                author: <strong>{selectedAuthor}</strong>
              </span>
            )}
          </p>
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:underline"
          >
            Reset
          </button>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {quotes.map((quote, index) => (
          <QuoteCard
            key={quote.id || `${quote.text}-${index}`}
            quote={quote}
            index={index}
          />
        ))}

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading more quotes...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500">
            Error: {error.message}
          </p>
        )}

        {!loading && quotes.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No quotes found.
          </p>
        )}
      </div>
    </section>
  );
}
