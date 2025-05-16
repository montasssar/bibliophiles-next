import { Quote, FilterArgs } from '../types/Quote';
import rawQuotes from '../data/quotes.json';

// Define the structure of the raw data from quotes.json
interface RawQuote {
  Quote?: string;
  Author?: string;
  Tags?: string[];
  text?: string;
  author?: string;
  tags?: string[];
}

// Transform the raw quotes into normalized Quote[]
const quotes: Quote[] = (rawQuotes as RawQuote[]).map((q, index) => ({
  id: `fallback-${index}`,
  text: q.Quote || q.text || 'No quote text',
  author: q.Author || q.author || 'Unknown',
  tags: q.Tags || q.tags || [],
}));

// Main filtering and pagination logic
export function filterAndPaginateFallback({
  tag,
  author,
  search,
  page = 1,
  limit = 10,
  matchAll = false,
}: FilterArgs): Quote[] {
  let filtered = quotes;

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
