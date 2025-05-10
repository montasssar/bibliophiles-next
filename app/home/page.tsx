'use client';

import { useState } from 'react';
import SearchBar from '@/components/layout/SearchBar';
import BookCarousel from '@/components/books/BookCarousel';
import BriefReads from '@/components/quotes/BriefReads'; // ✅ Import BriefReads
import { useHomeSearchBooks } from '@/hooks/useHomeSearchBooks';

export default function Page() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showCarousel, setShowCarousel] = useState(false);

  const { books, loading, error, loadMore } = useHomeSearchBooks({
    query: searchInput,
    genre: selectedGenre,
  });

  const handleSearchFocus = () => {
    if (!showCarousel) setShowCarousel(true);
  };

  const handleRefresh = () => {
    setSearchInput('');
    setSelectedGenre('');
    setShowCarousel(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4 md:px-8 max-w-5xl mx-auto pb-20">
      {/* 🔍 Search */}
      <div className="w-full" onClick={handleSearchFocus}>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onClear={() => setSearchInput('')}
        />
      </div>

      {/* 🎭 Genre Filter + Refresh */}
      <div className="flex flex-wrap gap-4 items-center justify-between w-full">
        <select
          className="border rounded px-3 py-2 dark:bg-zinc-800 dark:text-white"
          value={selectedGenre}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedGenre(value);
            if (value) setShowCarousel(true);
          }}
        >
          <option value="">All Genres</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science">Science</option>
          <option value="Romance">Romance</option>
        </select>

        <button
          onClick={handleRefresh}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
        >
          Refresh
        </button>
      </div>

      {/* 📚 Book Carousel */}
      {showCarousel && (
        <div className="w-full overflow-hidden">
          <BookCarousel
            books={books}
            loading={loading}
            error={error}
            onLoadMore={loadMore}
          />
        </div>
      )}

      {/* ✨ Brief Reads Section */}
      <div className="w-full mt-12">
        <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
          Brief Reads
        </h2>
        <BriefReads />
      </div>
    </div>
  );
}
