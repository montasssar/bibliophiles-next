'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

interface BookCardProps {
  book: {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      imageLinks?: {
        thumbnail?: string;
      };
      previewLink?: string;
    };
  };
  saved: boolean;
  toggleSave: () => void;
  showReadLink?: boolean;
}

export default function BookCard({ book, saved, toggleSave, showReadLink }: BookCardProps) {
  const { title, authors, imageLinks, previewLink } = book.volumeInfo;

  return (
    <div
      className="bg-white/90 border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col h-full w-[170px] sm:w-[180px] md:w-[200px]"
      role="group"
      aria-label={`Book card for ${title}`}
    >
      {/* Cover */}
      {imageLinks?.thumbnail ? (
        <div className="relative w-full h-48 rounded-md overflow-hidden mb-2">
          <Image
            src={imageLinks.thumbnail}
            alt={`Cover image for ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
      ) : (
        <div
          className="w-full h-48 bg-zinc-200 rounded-md mb-2 flex items-center justify-center text-sm text-zinc-500"
          aria-label="No cover image available"
        >
          No Image
        </div>
      )}

      {/* Title & Author */}
      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-zinc-800 leading-snug mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-zinc-600 mb-2 line-clamp-1">
          <span className="sr-only">Author:</span>
          {authors?.join(', ') || 'Unknown'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-auto">
        {showReadLink && previewLink && (
          <Link
            href={previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium transition"
            aria-label={`Read preview of ${title}`}
          >
            Read
          </Link>
        )}

        <button
          onClick={toggleSave}
          aria-label={saved ? `Unsave ${title}` : `Save ${title}`}
          className="text-red-500 hover:text-red-600 text-xl transition"
        >
          {saved ? <FaHeart /> : <FiHeart />}
        </button>
      </div>
    </div>
  );
}
