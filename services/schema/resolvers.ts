import { fetchQuotesFromAPI } from '../sources/quotableAPI';
import quotes from '../data/quotes.json';
import { Quote } from '../types/Quote';
import { shuffleArray } from '../utils/randomize';

interface FilterArgs {
  tag?: string;
  author?: string;
  search?: string;
  page?: number;
  limit?: number;
}

function filterAndPaginateFallback({
  tag,
  author,
  search,
  page = 1,
  limit = 10,
}: FilterArgs): Quote[] {
  let filtered = quotes as Quote[];

  if (tag) {
    filtered = filtered.filter((q) =>
      q.tags?.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  if (author) {
    filtered = filtered.filter((q) =>
      q.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (search) {
    filtered = filtered.filter((q) =>
      q.text.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  return shuffleArray(filtered).slice(start, start + limit);
}

export const resolvers = {
  Query: {
    briefReads: async (
      _: unknown,
      args: FilterArgs
    ): Promise<Quote[]> => {
      const { tag, author, search, page = 1, limit = 10 } = args;

      const apiQuotes = await fetchQuotesFromAPI({ tag, author, search, page, limit });
      if (apiQuotes.length > 0) return apiQuotes;

      console.warn('⚠️ Falling back to local quotes.json...');
      return filterAndPaginateFallback({ tag, author, search, page, limit });
    },
  },
};
