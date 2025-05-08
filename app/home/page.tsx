'use client';

import { useState } from 'react';
import { useHomeSearchBooks } from '@/hooks/useHomeSearchBooks';
import BookCarousel from '@/components/books/BookCarousel';
import SearchBar from '@/components/layout/SearchBar';

export default function Page() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showCarousel, setShowCarousel] = useState(false);

  const { books, loading, error, loadMore } = useHomeSearchBooks({
    query: searchInput,
    genre: selectedGenre,
  });

  const handleClear = () => setSearchInput('');
  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setShowCarousel(true);
  };

  return (
    <div className="home-page flex flex-col items-center gap-4">
      <div className="w-full" onClick={() => setShowCarousel(true)}>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onClear={handleClear}
        />
      </div>

      <select
        onChange={(e) => handleGenreChange(e.target.value)}
        value={selectedGenre}
        className="genre-selector px-4 py-2 border rounded"
      >
        <option value="">All Genres</option>
        <option value="Fiction">Fiction</option>
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
