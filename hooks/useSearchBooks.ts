'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
    previewLink?: string;
  };
}

export function useSearchBooks(query: string) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Debounced query (500ms delay)
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      if (!debouncedQuery || debouncedQuery.trim().length < 2) {
        setBooks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(debouncedQuery)}&maxResults=10`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error('Failed to fetch books');
        const data = await res.json();
        setBooks(data.items || []);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, [debouncedQuery]);

  return { books, loading, error };
}
