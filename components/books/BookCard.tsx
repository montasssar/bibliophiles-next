'use client';

import Image from 'next/image';
import Link from 'next/link';

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
    <div className="bg-white/90 border border-zinc-200 rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between h-full">
      {/* Cover */}
      {imageLinks?.thumbnail ? (
        <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden mb-4">
          <Image
            src={imageLinks.thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
      ) : (
        <div className="w-full aspect-[2/3] bg-zinc-200 rounded-lg mb-4 flex items-center justify-center text-sm text-zinc-500">
          No Image
        </div>
      )}

      {/* Title & Author */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-zinc-800 leading-snug mb-1 line-clamp-2">{title}</h3>
        {authors && (
          <p className="text-sm text-zinc-600 mb-3 line-clamp-1">
            <span className="font-medium">Author:</span> {authors.join(', ')}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-2">
        {showReadLink && previewLink && (
          <Link
            href={previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition"
          >
            Read
          </Link>
        )}

        <button
          onClick={toggleSave}
          className={`text-xs px-3 py-1 rounded-full ${
            saved
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          } font-medium transition`}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}
