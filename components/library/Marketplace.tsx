'use client';

import { useLibraryStore } from '@/hooks/useLibraryStore';
import Image from 'next/image';

export default function Marketplace() {
  const books = useLibraryStore((state) => state.marketplaceBooks);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="border rounded-xl p-3 shadow bg-white flex flex-col"
        >
          <div className="relative w-full h-40 mb-2 rounded-md overflow-hidden">
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>

          <h3 className="font-semibold text-sm line-clamp-2">{book.title}</h3>
          <p className="text-xs text-zinc-500">{book.author}</p>
          <p className="mt-1 text-sm font-medium text-green-600">{book.mockPrice}</p>
          <button className="mt-auto text-xs bg-zinc-100 hover:bg-zinc-200 rounded-md px-2 py-1">
            Pretend to Sell
          </button>
        </div>
      ))}
    </div>
  );
}
