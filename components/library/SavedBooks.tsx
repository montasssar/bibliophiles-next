'use client';

import { useEffect, useState } from 'react';
import { useLibraryStore } from '@/hooks/useLibraryStore';
import BookCard from '@/components/books/BookCard';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { SavedBook } from '@/hooks/useLibraryStore';

export default function SavedBooks() {
  const { currentUser } = useAuth();
  const books = useLibraryStore((state) => state.savedBooks);
  const addBook = useLibraryStore((state) => state.addBook);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchBooks = async () => {
      const snapshot = await getDocs(collection(db, 'users', currentUser.uid, 'savedBooks'));
      snapshot.forEach((doc) => addBook(doc.data() as SavedBook));
      setLoading(false);
    };

    fetchBooks();
  }, [currentUser, addBook]);

  if (loading) return <p className="text-zinc-600">Loading your saved books...</p>;
  if (books.length === 0) return <p className="text-zinc-500 italic">No books saved yet.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={{
            id: book.id,
            volumeInfo: {
              title: book.title,
              authors: [book.author],
              imageLinks: {
                thumbnail: book.coverImageUrl,
              },
              previewLink: '',
            },
          }}
          saved={true}
          showReadLink={true}
        />
      ))}
    </div>
  );
}