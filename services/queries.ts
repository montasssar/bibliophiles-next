import { gql } from '@apollo/client';

// 🎯 Query 1: Filtered quotes (by tag or author)
export const GET_BRIEFREADS = gql`
  query GetFilteredQuotes($filter: QuoteFilterInput!) {
    quotes(filter: $filter) {
      id
      text
      author
    }
  }
`;

// 🎯 Query 2: Random quotes (fallback / no filters)
export const GET_RANDOM_BRIEFREADS = gql`
  query GetRandomQuotes($limit: Int!) {
    randomQuotes(limit: $limit) {
      id
      text
      author
    }
  }
`;
