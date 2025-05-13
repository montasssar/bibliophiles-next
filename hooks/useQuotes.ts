'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_BRIEFREADS } from '@/services/queries';
import { useDebounce } from 'use-debounce';

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

type CacheKey = string;
type QuoteCache = Map<CacheKey, Quote[]>;

export default function useQuotes(): UseQuotesResult {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [selectedTag, setSelectedTagState] = useState('');
  const [selectedAuthor, setSelectedAuthorState] = useState('');
  const [search, setSearch] = useState('');

  const [debouncedTag] = useDebounce(selectedTag, 300);
  const [debouncedAuthor] = useDebounce(selectedAuthor, 300);
  const [debouncedSearch] = useDebounce(search, 300);

  const shownQuoteIds = useRef(new Set<string>());
  const isFetchingRef = useRef(false);
  const quoteCache = useRef<QuoteCache>(new Map());

  const [fetchQuotes] = useLazyQuery(GET_BRIEFREADS, {
    fetchPolicy: 'no-cache',
    onError: (err) => {
      console.error('❌ GET_BRIEFREADS error:', err.message);
      setError('Failed to fetch quotes. Try again later.');
    },
  });

  const makeCacheKey = useCallback(
    (page: number): CacheKey =>
      `tag=${debouncedTag}|author=${debouncedAuthor}|search=${debouncedSearch}|page=${page}`,
    [debouncedTag, debouncedAuthor, debouncedSearch]
  );

  const reset = useCallback(() => {
    setQuotes([]);
    setPage(1);
    shownQuoteIds.current.clear();
    setError(null);
  }, []);

  const fetch = useCallback(
    async (pageNum: number, isPrefetch = false) => {
      const key = makeCacheKey(pageNum);
      const cached = quoteCache.current.get(key);

      if (cached && !isPrefetch) {
        const unique = cached.filter((q) => !shownQuoteIds.current.has(q.id));
        unique.forEach((q) => shownQuoteIds.current.add(q.id));
        setQuotes((prev) => [...prev, ...unique]);
        return;
      }

      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      if (!isPrefetch) setLoading(true);

      try {
        const { data } = await fetchQuotes({
          variables: {
            tag: debouncedTag,
            author: debouncedAuthor,
            search: debouncedSearch,
            page: pageNum,
            limit: 6,
          },
        });

        const incoming: Quote[] = data?.briefReads || [];
        quoteCache.current.set(key, incoming);

        if (!isPrefetch) {
          const unique = incoming.filter((q) => !shownQuoteIds.current.has(q.id));
          unique.forEach((q) => shownQuoteIds.current.add(q.id));
          setQuotes((prev) => [...prev, ...unique]);
        }

        // Prefetch next page if current page succeeded
        if (!isPrefetch && incoming.length > 0) {
          fetch(pageNum + 1, true);
        }
      } catch {
        if (!isPrefetch) {
          setError('Could not load quotes.');
        }
      } finally {
        if (!isPrefetch) setLoading(false);
        isFetchingRef.current = false;
      }
    },
    [makeCacheKey, fetchQuotes, debouncedTag, debouncedAuthor, debouncedSearch]
  );

  useEffect(() => {
    reset();
    fetch(1);
  }, [debouncedTag, debouncedAuthor, debouncedSearch, fetch, reset]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetch(nextPage);
  }, [page, fetch]);

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
