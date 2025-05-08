'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: { thumbnail?: string };
    previewLink?: string;
  };
}

interface BookCarouselProps {
  books: Book[];
  loading: boolean;
  error: string | null;
  onLoadMore: () => void;
}

export default function BookCarousel({ books, loading, error, onLoadMore }: BookCarouselProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        onLoadMore();
      }
    }, { threshold: 1 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, onLoadMore]);

  return (
    <div
      className="carousel-container flex gap-6 px-4 py-6 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide"
      onWheel={(e) => {
        if (e.deltaY === 0) return;
        e.currentTarget.scrollLeft += e.deltaY;
        e.preventDefault();
      }}
    >
      {books.map((book) => (
        <div
          key={book.id}
          className="book-card snap-start min-w-[160px] max-w-[160px] flex-shrink-0 flex flex-col items-center"
        >
          <div className="w-[160px] h-[240px] bg-gray-100 rounded-lg shadow-md overflow-hidden relative flex items-center justify-center">
            <Image
              src={book.volumeInfo.imageLinks?.thumbnail || '/fallback-image.png'}
              alt={book.volumeInfo.title}
              fill
              sizes="160px"
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/fallback-image.png';
              }}
            />
          </div>
          <h3 className="text-sm mt-2 font-medium text-center line-clamp-2 max-w-full">
            {book.volumeInfo.title}
          </h3>
        </div>
      ))}

      {loading && (
        <p className="text-center w-full text-sm text-gray-500">Loading more books...</p>
      )}
      {error && (
        <p className="text-red-600 w-full text-center text-sm">Error: {error}</p>
      )}
      <div ref={loaderRef} style={{ minWidth: '1px', visibility: 'hidden' }} />
    </div>
  );
}
