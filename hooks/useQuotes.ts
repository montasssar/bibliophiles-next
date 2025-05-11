import { useEffect, useState, useRef, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_BRIEFREADS, GET_RANDOM_BRIEFREADS } from '@/services/queries';

interface Quote {
  id: string;
  text: string;
  author: string;
}

interface UseQuotesResult {
  quotes: Quote[];
  loading: boolean;
  error: { message: string } | null;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  selectedAuthor: string;
  setSelectedAuthor: (author: string) => void;
  loadMore: () => void;
}

export default function useQuotes(): UseQuotesResult {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const [selectedTag, setSelectedTagState] = useState('');
  const [selectedAuthor, setSelectedAuthorState] = useState('');

  const shownIds = useRef(new Set<string>());
  const authorHistory = useRef<string[]>([]);

  const [fetchQuotes] = useLazyQuery(GET_BRIEFREADS, {
    fetchPolicy: 'no-cache',
    onError: (err) => console.error('📛 GET_BRIEFREADS error:', err),
  });

  const [fetchRandom] = useLazyQuery(GET_RANDOM_BRIEFREADS, {
    fetchPolicy: 'no-cache',
    onError: (err) => console.error('📛 GET_RANDOM_BRIEFREADS error:', err),
  });

  const reset = () => {
    setQuotes([]);
    setPage(1);
    setError(null);
    shownIds.current.clear();
    authorHistory.current = [];
  };

  const fetch = useCallback(
    async (author: string, tag: string, pageNum: number) => {
      setLoading(true);
      try {
        let incoming: Quote[] = [];

        console.log('🔥 Fetching quotes with:', { author, tag, pageNum });

        if (author || tag) {
          const filter = author ? { author, page: pageNum, limit: 6 } : { tag, page: pageNum, limit: 6 };
          const { data } = await fetchQuotes({ variables: { filter } });
          incoming = data?.quotes || [];
        } else {
          const { data } = await fetchRandom({ variables: { limit: 6 } });
          incoming = data?.randomQuotes || [];
        }

        console.log('📦 Incoming quotes:', incoming);

        const uniqueQuotes = incoming.filter((q) => {
          const isUniqueId = !shownIds.current.has(q.id);
          const isNewAuthor = !authorHistory.current.includes(q.author);
          return isUniqueId && isNewAuthor;
        });

        uniqueQuotes.forEach((q) => shownIds.current.add(q.id));

        if (uniqueQuotes.length) {
          const last = uniqueQuotes[uniqueQuotes.length - 1].author;
          authorHistory.current.push(last);
          if (authorHistory.current.length > 2) authorHistory.current.shift();
        }

        setQuotes((prev) => [...prev, ...uniqueQuotes]);
      } catch (err: any) {
        console.warn('⚠️ Quote fetch failed:', err);
        setError({ message: 'Failed to load quotes. Try again.' });
      } finally {
        setLoading(false);
      }
    },
    [fetchQuotes, fetchRandom]
  );

  useEffect(() => {
    reset();
    fetch(selectedAuthor, selectedTag, 1);
  }, [selectedAuthor, selectedTag, fetch]);

  const loadMore = () => {
    const nextPage = page + 1;
    fetch(selectedAuthor, selectedTag, nextPage);
    setPage(nextPage);
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
    loadMore,
  };
}
