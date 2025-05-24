'use client';

import { useEffect, useState } from 'react';
import { useLibraryStore } from '@/hooks/useLibraryStore';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { SavedQuote } from '@/hooks/useLibraryStore';

export default function SavedQuotes() {
  const { currentUser } = useAuth();
  const quotes = useLibraryStore((state) => state.savedQuotes);
  const addQuote = useLibraryStore((state) => state.addQuote);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchQuotes = async () => {
      const snapshot = await getDocs(collection(db, 'users', currentUser.uid, 'savedQuotes'));
      snapshot.forEach((doc) => addQuote(doc.data() as SavedQuote));
      setLoading(false);
    };

    fetchQuotes();
  }, [currentUser, addQuote]);

  if (loading) return <p className="text-zinc-600">Loading your saved quotes...</p>;
  if (quotes.length === 0) return <p className="text-zinc-500 italic">No quotes saved yet.</p>;

  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="bg-white shadow rounded-lg p-4 border relative"
        >
          <button
            onClick={() => useLibraryStore.getState().removeQuote(quote.id)}
            className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
          >
            Remove
          </button>
          <p className="text-base italic">“{quote.quoteText}”</p>
          <p className="text-sm text-right text-zinc-600">
            — {quote.sourceAuthor}, <em>{quote.sourceBookTitle}</em>
          </p>
        </div>
      ))}
    </div>
  );
}