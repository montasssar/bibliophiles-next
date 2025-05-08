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
      <div className="w-full" onClick={handleSearchFocus}>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onClear={() => setSearchInput('')}
        />
      </div>

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
