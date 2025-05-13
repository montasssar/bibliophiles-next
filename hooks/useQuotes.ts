'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_BRIEFREADS } from '@/services/queries';

interface Quote {
  id: string;
  text: string;
  author: string;
  tags: string[];
}

interface UseQuotesResult {
  quotes: Quote[];
  loading: boolean;
  error: string | null;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  selectedAuthor: string;
  setSelectedAuthor: (author: string) => void;
  search: string;
  setSearch: (val: string) => void;
  loadMore: () => void;
}

export default function useQuotes(): UseQuotesResult {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [selectedTag, setSelectedTagState] = useState('');
  const [selectedAuthor, setSelectedAuthorState] = useState('');
  const [search, setSearch] = useState('');

  const shownQuoteIds = useRef(new Set<string>());

  const [fetchQuotes] = useLazyQuery(GET_BRIEFREADS, {
    fetchPolicy: 'no-cache',
    onError: (err) => {
      console.error('❌ GET_BRIEFREADS error:', err.message);
      setError('Failed to fetch quotes. Try again later.');
    },
  });

  const reset = () => {
    setQuotes([]);
    setPage(1);
    shownQuoteIds.current.clear();
    setError(null);
  };

  const fetch = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      try {
        const { data } = await fetchQuotes({
          variables: {
            tag: selectedTag,
            author: selectedAuthor,
            search,
            page: pageNum,
            limit: 6,
          },
        });

        const incoming: Quote[] = data?.briefReads || [];

        const unique = incoming.filter((q) => !shownQuoteIds.current.has(q.id));
        unique.forEach((q) => shownQuoteIds.current.add(q.id));

        setQuotes((prev) => [...prev, ...unique]);
      } catch (err) {
        console.warn('⚠️ Fallback used:', err);
        setError('Could not load quotes.');
      } finally {
        setLoading(false);
      }
    },
    [selectedTag, selectedAuthor, search, fetchQuotes]
  );

  useEffect(() => {
    reset();
    fetch(1);
  }, [selectedTag, selectedAuthor, search, fetch]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetch(nextPage);
  };

  const setSelectedTag = (tag: string) => {
    setSelectedTagState(tag);
    setSelectedAuthorState('');
  };

  const setSelectedAuthor = (author: string) => {
    setSelectedAuthorState(author);
    setSelectedTagState('');
  };

  return {
    quotes,
    loading,
    error,
    selectedTag,
    setSelectedTag,
    selectedAuthor,
    setSelectedAuthor,
    search,
    setSearch,
    loadMore,
  };
}
