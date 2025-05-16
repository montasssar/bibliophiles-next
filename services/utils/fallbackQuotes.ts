import { Quote, FilterArgs } from '../types/Quote';
import rawQuotes from '../data/quotes.json';

// ✅ Normalize the raw quotes to match the expected Quote[] format
const quotes: Quote[] = (rawQuotes as any[]).map((q, index) => ({
  id: `fallback-${index}`,
  text: q.Quote || q.text || 'No quote text',
  author: q.Author || q.author || 'Unknown',
  tags: q.Tags || q.tags || [],
}));

// ✅ Filter and paginate the fallback quotes
export function filterAndPaginateFallback({
  tag,
  author,
  search,
  page = 1,
  limit = 10,
  matchAll = false,
}: FilterArgs): Quote[] {
  let filtered = quotes;

  // ✅ Filter by author
  if (author) {
    filtered = filtered.filter((q) =>
      q.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  // ✅ Filter by tag(s)
  if (tag) {
    const tags = tag.toLowerCase().split('|').map(t => t.trim());

    filtered = filtered.filter((q) => {
      const qTags = q.tags.map((t) => t.toLowerCase());
      return matchAll
        ? tags.every((t) => qTags.includes(t)) // AND logic
        : tags.some((t) => qTags.includes(t)); // OR logic
    });
  }

  // ✅ Filter by search text
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter((q) =>
      q.text.toLowerCase().includes(searchLower) ||
      q.author.toLowerCase().includes(searchLower)
    );
  }

  // 🚫 Do not shuffle — causes infinite scroll bugs

  // ✅ Paginate
  const start = (page - 1) * limit;
  return filtered.slice(start, start + limit);
}
