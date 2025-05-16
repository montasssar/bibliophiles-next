'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/layout/SearchBar';
import BookCard from '@/components/books/BookCard';
import { useSearchBooks } from '@/hooks/useSearchBooks';

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const { books, loading, error } = useSearchBooks(query);
  const handleClear = () => setQuery('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center pb-16">
      {/* 🔍 Search over Hero Image */}
      <div className="w-full px-4 relative">
        <div className="w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-xl relative h-[600px]">
          <Image
            src="/images/landing-bookshelf.png"
            alt="Bookshelf"
            fill
            className="object-cover w-full h-full"
            priority
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-16 px-4 overflow-y-auto">
            <SearchBar value={query} onChange={setQuery} onClear={handleClear} />

            {query && (
              <div className="w-full max-w-6xl mt-10 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6 drop-shadow-md">Search Results</h2>

                {loading && <p className="text-white text-sm">Searching...</p>}
                {error && <p className="text-red-300 text-sm">Error: {error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {books.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      saved={false}
                      toggleSave={() => {}}
                      showReadLink={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📝 Call-to-Action */}
      <div className="mt-20 max-w-2xl w-full bg-white shadow-xl rounded-2xl p-10 text-center space-y-6 mx-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 tracking-tight">Your warm home of words</h1>
        <p className="text-zinc-700 text-lg md:text-xl">
          SIGN UP TO READ OR WRITE ALL WHAT'S ON YOUR MIND.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/signup"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow transition font-semibold text-sm tracking-wide"
          >
            Sign Up
          </Link>
          <Link
            href="/home"
            className="border border-zinc-300 hover:border-red-600 hover:text-red-600 text-zinc-700 px-6 py-2 rounded-xl transition font-semibold text-sm tracking-wide"
          >
            Explore
          </Link>
        </div>
      </div>
    </main>
  );
}
