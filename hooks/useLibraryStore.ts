'use client';
import { create } from 'zustand';

export interface SavedBook {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  description?: string;
  dateSaved: string;
}

export interface SavedQuote {
  id: string;
  quoteText: string;
  sourceBookTitle: string;
  sourceAuthor: string;
  dateSaved: string;
}

export interface MarketplaceBook {
  id: string;
  title: string;
  author: string;
  mockPrice: string;
  image: string;
  description?: string;
}

interface LibraryState {
  savedBooks: SavedBook[];
  savedQuotes: SavedQuote[];
  marketplaceBooks: MarketplaceBook[];
  addBook: (book: SavedBook) => void;
  removeBook: (id: string) => void;
  addQuote: (quote: SavedQuote) => void;
  removeQuote: (id: string) => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  savedBooks: [],
  savedQuotes: [],
  marketplaceBooks: [],

  addBook: (book) =>
    set((state) => ({ savedBooks: [...state.savedBooks, book] })),
  removeBook: (id) =>
    set((state) => ({ savedBooks: state.savedBooks.filter((b) => b.id !== id) })),
  addQuote: (quote) =>
    set((state) => ({ savedQuotes: [...state.savedQuotes, quote] })),
  removeQuote: (id) =>
    set((state) => ({ savedQuotes: state.savedQuotes.filter((q) => q.id !== id) })),
}));
