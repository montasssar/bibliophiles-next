// SearchBar.tsx
'use client';

import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

type SearchBarProps = {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
};

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <form
      role="search"
      aria-label="Search for books"
      className="relative w-[95%] sm:w-[80%] md:w-[70%] max-w-3xl mx-auto mt-12 bg-white border-[3px] border-red-700 rounded-full shadow-xl flex items-center px-6 py-4"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Looking for a Book, type here"
        aria-label="Book search input"
        className="w-full text-lg md:text-xl text-zinc-800 placeholder:text-zinc-500 italic bg-transparent outline-none pr-12"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-14 text-2xl text-red-600 hover:text-red-800 cursor-pointer"
        >
          <IoMdClose />
        </button>
      )}
      <button
        type="submit"
        aria-label="Submit search"
        className="absolute right-6 text-2xl text-red-600"
      >
        <FiSearch />
      </button>
    </form>
  );
}
