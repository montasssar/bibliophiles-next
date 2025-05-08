// hooks/useHomeSearchBooks.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useDebounce } from 'use-debounce';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: { thumbnail?: string };
    previewLink?: string;
  };
}

interface UseHomeSearchBooksProps {
  query: string;
  genre?: string;
}

export function useHomeSearchBooks({ query, genre }: UseHomeSearchBooksProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const [debouncedQuery] = useDebounce(query, 500);
  
  const fetchBooks = useCallback(async (isInfinite = false) => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    const queryParam = debouncedQuery.trim()
      ? encodeURIComponent(debouncedQuery)
      : 'best sellers'; // default query for fresh recommendations
      
    const genreFilter = genre ? `+subject:${encodeURIComponent(genre)}` : '';
    const startIndex = isInfinite ? page * 10 : 0;

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${queryParam}${genreFilter}&startIndex=${startIndex}&maxResults=10`,
        { signal: controller.signal }
      );

      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();

      setBooks((prevBooks) => 
        isInfinite ? [...prevBooks, ...(data.items || [])] : (data.items || [])
      );

    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [debouncedQuery, genre, page]);

  useEffect(() => {
    setPage(0);
    fetchBooks();
  }, [debouncedQuery, genre, fetchBooks]);

  const loadMore = () => setPage((prev) => prev + 1);

  return { books, loading, error, loadMore };
}
