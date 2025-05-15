import quotes from '../data/quotes.json';
import { Quote, FilterArgs } from '../types/Quote';

export function filterAndPaginateFallback({
  tag,
  author,
  search,
  page = 1,
  limit = 10,
  matchAll = false,
}: FilterArgs): Quote[] {
  let filtered = quotes as Quote[];

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

  // 🚫 DO NOT shuffle — causes infinite scroll bugs

  // ✅ Paginate
  const start = (page - 1) * limit;
  return filtered.slice(start, start + limit);
}
