import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Quote {
    id: ID!
    text: String!
    author: String!
    tags: [String!]!
  }

  type Query {
    briefReads(
      tag: String
      author: String
      search: String
      page: Int
      limit: Int
      matchAll: Boolean
    ): [Quote!]!
  }
`;
