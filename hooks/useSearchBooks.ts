'use client';

import { useEffect, useState, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { normalizeBook, Book } from '@/lib/normalizeBook';

export function useSearchBooks(query: string) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery] = useDebounce(query, 300); // ⚡ Faster debounce
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (!trimmedQuery || trimmedQuery.length < 2) {
      setBooks([]);
      return;
    }

    const controller = new AbortController();
    abortRef.current?.abort(); // ❌ Cancel previous request if needed
    abortRef.current = controller;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(trimmedQuery)}&maxResults=10`,
          {
            signal: controller.signal,
            cache: 'no-store', // ⚡ Always get fresh results
          }
        );

        if (!res.ok) throw new Error('Failed to fetch books');
        const data = await res.json();
        const items = (data.items || []).map(normalizeBook); // ✅ Consistent shape
        setBooks(items);
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
