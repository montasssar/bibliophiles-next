import axios from 'axios';
import { Quote } from '../types/Quote';

const API_URL = 'https://api.quotable.io/quotes';
const cache = new Map<string, Quote[]>();

interface APIResponse {
  results: {
    _id: string;
    content: string;
    author: string;
    tags: string[];
  }[];
}

interface FetchOptions {
  tag?: string;         // e.g. "love|poetry"
  author?: string;
  search?: string;
  page?: number;
  limit?: number;
  matchAll?: boolean;
}

function createCacheKey({ tag, author, search, page, limit, matchAll }: FetchOptions): string {
  return [tag, author, search, page, limit, matchAll].join('|').toLowerCase();
}

export async function fetchQuotesFromAPI({
  tag,
  author,
  search,
  page = 1,
  limit = 10,
  matchAll = true,
}: FetchOptions): Promise<Quote[]> {
  const cacheKey = createCacheKey({ tag, author, search, page, limit, matchAll });
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const tags = tag?.trim() ? tag.split('|').map(t => t.trim().toLowerCase()) : [];
  const tagList = tags.length > 0 ? tags : [null]; // null triggers general fetch

  const allResults: Quote[] = [];

  for (const singleTag of tagList) {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };

    if (singleTag) params.tags = singleTag;
    if (author) params.author = author;
    if (search) params.query = search;

    try {
      const response = await axios.get<APIResponse>(API_URL, { params });
      const quotes = response.data.results.map((q) => ({
        id: q._id,
        text: q.content,
        author: q.author,
        tags: q.tags.map((t) => t.toLowerCase()),
      }));

      allResults.push(...quotes);
    } catch (error) {
      console.warn(`❌ Error fetching tag "${singleTag}":`, error);
    }
  }

  // Deduplicate by ID
  const uniqueQuotes = Array.from(new Map(allResults.map((q) => [q.id, q])).values());

  // Apply matchAll or matchAny filtering
  const filteredQuotes = tags.length
    ? uniqueQuotes.filter((q) =>
        matchAll
          ? tags.every((tag) => q.tags.includes(tag))
          : tags.some((tag) => q.tags.includes(tag))
      )
    : uniqueQuotes;

  cache.set(cacheKey, filteredQuotes);
  return filteredQuotes;
}
