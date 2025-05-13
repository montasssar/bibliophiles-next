// ✅ quotableAPI.ts
import axios from 'axios';
import { Quote } from '../types/Quote';
import { normalizeQuoteList } from '../utils/normalizeQuote';

interface QuoteAPIParams {
  tag?: string;
  author?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function fetchQuotesFromAPI({
  tag,
  author,
  search,
  page = 1,
  limit = 6,
}: QuoteAPIParams): Promise<Quote[]> {
  const url = 'https://api.quotable.io/quotes';
  const params: Record<string, string | number> = { page, limit };

  if (tag) params.tags = tag;
  if (author) params.author = author;
  if (search) params.query = search;

  try {
    const res = await axios.get<{ results: unknown[] }>(url, { params });
    return normalizeQuoteList(res.data.results);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('❌ fetchQuotesFromAPI failed:', err.message);
    } else {
      console.error('❌ fetchQuotesFromAPI failed with unknown error.');
    }
    return [];
  }
}
