import { gql } from '@apollo/client';

export const GET_BRIEFREADS = gql`
  query GetBriefReads(
    $tag: String
    $author: String
    $search: String
    $page: Int
    $limit: Int
  ) {
    briefReads(
      tag: $tag
      author: $author
      search: $search
      page: $page
      limit: $limit
    ) {
      id
      text
      author
      tags
    }
  }
`;
