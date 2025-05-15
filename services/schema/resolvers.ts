import { fetchQuotesFromAPI } from '../sources/quotableAPI';
import { filterAndPaginateFallback } from '../utils/fallbackQuotes';
import { Quote } from '../types/Quote';
import type { FilterArgs } from '../types/Quote';

export const resolvers = {
  Query: {
    briefReads: async (
      _: unknown,
      args: FilterArgs
    ): Promise<Quote[]> => {
      const { tag, author, search, page = 1, limit = 10, matchAll = false } = args;

      try {
        const apiQuotes = await fetchQuotesFromAPI({ tag, author, search, page, limit, matchAll });
        if (apiQuotes.length > 0) return apiQuotes;
      } catch (err) {
        console.warn('❌ Error fetching from API:', err);
      }

      console.warn('⚠️ Falling back to local quotes.json...');
      return filterAndPaginateFallback({ tag, author, search, page, limit, matchAll });
    },
  },
};
