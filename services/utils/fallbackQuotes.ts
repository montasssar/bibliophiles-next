import { Quote, FilterArgs } from '../types/Quote';
import rawQuotes from '../data/quotes.json';

// Shuffle utility
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Normalize raw quotes
interface RawQuote {
  Quote?: string;
  Author?: string;
  Tags?: string[];
  text?: string;
  author?: string;
  tags?: string[];
}

const quotes: Quote[] = (rawQuotes as RawQuote[]).map((q, index) => ({
  id: `fallback-${index}`,
  text: q.Quote || q.text || 'No quote text',
  author: q.Author || q.author || 'Unknown',
  tags: q.Tags || q.tags || [],
}));

// Main logic with shuffle
export function filterAndPaginateFallback({
  tag,
  author,
  search,
  page = 1,
  limit = 10,
  matchAll = false,
}: FilterArgs): Quote[] {
  let filtered = shuffleArray([...quotes]); //Always fresh on each visit

  if (author) {
    filtered = filtered.filter((q) =>
      q.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (tag) {
    const tags = tag.toLowerCase().split('|').map(t => t.trim());

    filtered = filtered.filter((q) => {
      const qTags = q.tags.map((t) => t.toLowerCase());
      return matchAll
        ? tags.every((t) => qTags.includes(t))
        : tags.some((t) => qTags.includes(t));
    });
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter((q) =>
      q.text.toLowerCase().includes(searchLower) ||
      q.author.toLowerCase().includes(searchLower)
    );
  }

  const start = (page - 1) * limit;
  return filtered.slice(start, start + limit);
}
