'use client';

import { useState } from 'react';
import SearchBar from '@/components/layout/SearchBar';
import BookCarousel from '@/components/books/BookCarousel';
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

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Search Bar */}
      <div className="w-full" onClick={handleSearchFocus}>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onClear={() => setSearchInput('')}
        />
      </div>

      {/* Genre Filter + Refresh Button */}
      <div className="flex gap-4 items-center">
        <select
          className="border rounded px-3 py-2"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science">Science</option>
          <option value="Romance">Romance</option>
        </select>

        <button
          onClick={() => {
            setShowCarousel(false);
            setSearchInput('');
            setSelectedGenre('');
          }}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          Refresh
        </button>
      </div>

      {/* Book Carousel */}
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
    </div>
  );
}
