import { Quote } from '../types/Quote';

export function normalizeQuote(raw: Record<string, unknown>, index: number): Quote {
  const id =
    typeof raw.id === 'string'
      ? raw.id
      : typeof raw._id === 'string'
      ? raw._id
      : `fallback-${index}`;

  const text =
    typeof raw.text === 'string'
      ? raw.text
      : typeof raw.content === 'string'
      ? raw.content
      : '';

  const author = typeof raw.author === 'string' ? raw.author : 'Unknown';

  const tags =
    Array.isArray(raw.tags) && raw.tags.every((t) => typeof t === 'string')
      ? raw.tags
      : [];

  return { id, text, author, tags };
}

export function normalizeQuoteList(quotes: unknown[] = []): Quote[] {
  return quotes
    .map((q, i) => normalizeQuote(q as Record<string, unknown>, i))
    .filter((q) => q.text.trim() !== '');
}
