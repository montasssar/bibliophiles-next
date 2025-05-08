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

export default function BookCarousel({
  books,
  loading,
  error,
  onLoadMore,
}: BookCarouselProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Infinite scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, onLoadMore]);

  // Prevent vertical scroll bubbling
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div
      ref={carouselRef}
      className="carousel-container flex gap-6 px-4 py-6 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide"
      style={{
        touchAction: 'pan-x',
        overscrollBehavior: 'contain',
        maxHeight: '360px', // ✅ constrain height
      }}
      role="region"
      aria-label="Book Carousel"
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
        <div className="min-w-[160px] h-[240px] flex items-center justify-center text-sm text-gray-500">
          Loading more books...
        </div>
      )}

      {error && (
        <p className="text-red-600 w-full text-center text-sm">Error: {error}</p>
      )}

      <div ref={loaderRef} style={{ minWidth: '1px', visibility: 'hidden' }} />
    </div>
  );
}
