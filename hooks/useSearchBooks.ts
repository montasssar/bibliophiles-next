'use client';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      if (!query || query.trim().length < 2) {
        setBooks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error('Failed to fetch books');
        const data = await res.json();
        setBooks(data.items || []);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // Expected: fetch was aborted (e.g. query changed quickly)
          return;
        }
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, [query]);

  return { books, loading, error };
}
