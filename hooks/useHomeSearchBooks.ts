'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { normalizeBook, Book } from '@/lib/normalizeBook';

interface UseHomeSearchBooksProps {
  query: string;
  genre?: string;
}

export function useHomeSearchBooks({ query, genre }: UseHomeSearchBooksProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState<number | null>(null);

  const [debouncedQuery] = useDebounce(query, 500);
  const abortRef = useRef<AbortController | null>(null);

  const fetchBooks = useCallback(
    async (isInfinite = false) => {
      setLoading(true);
      setError(null);
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      const queryParam = debouncedQuery.trim()
        ? encodeURIComponent(debouncedQuery)
        : 'fiction';

      const genreFilter = genre ? `+subject:${encodeURIComponent(genre)}` : '';
      const startIndex = isInfinite ? page * 10 : 0;

      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${queryParam}${genreFilter}&startIndex=${startIndex}&maxResults=10`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error('Failed to fetch books');
        const data = await res.json();
        const items = (data.items || []).map(normalizeBook);

        setBooks((prev) => (isInfinite ? [...prev, ...items] : items));
        setTotalItems(data.totalItems || null);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          setError('Something went wrong while fetching books.');
        }
      } finally {
        setLoading(false);
      }
    },
    [debouncedQuery, genre, page]
  );

  useEffect(() => {
    setPage(0);
    fetchBooks(false);
  }, [debouncedQuery, genre]);

  useEffect(() => {
    if (page > 0) fetchBooks(true);
  }, [page]);

  const loadMore = () => {
    if (!loading && (totalItems === null || books.length < totalItems)) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    books,
    loading,
    error,
    loadMore,
  };
}
