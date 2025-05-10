const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

// ✅ Type definitions (GraphQL schema)
const typeDefs = gql`
  type Quote {
    id: ID!
    text: String!
    author: String!
  }

  input QuoteFilterInput {
    tag: String
    author: String
    page: Int
    limit: Int
  }

  type Query {
    quotes(filter: QuoteFilterInput): [Quote]
    randomQuotes(limit: Int!): [Quote]
  }
`;

// ✅ Sample quote data
const mockQuotes = [
  { id: '1', text: 'Stay hungry, stay foolish.', author: 'Steve Jobs' },
  { id: '2', text: 'Be yourself; everyone else is already taken.', author: 'Oscar Wilde' },
  { id: '3', text: 'You miss 100% of the shots you don’t take.', author: 'Wayne Gretzky' },
  { id: '4', text: 'To be or not to be, that is the question.', author: 'William Shakespeare' },
  { id: '5', text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { id: '6', text: 'Life is what happens when you’re busy making other plans.', author: 'John Lennon' },
];

// ✅ Resolver logic
const resolvers = {
  Query: {
    quotes: (_, { filter }) => {
      const { author, tag, page = 1, limit = 6 } = filter || {};
      let filtered = mockQuotes;

      if (author) {
        filtered = filtered.filter((q) =>
          q.author.toLowerCase().includes(author.toLowerCase())
        );
      }

      // If tag filtering is needed, simulate with keywords in text (optional)
      if (tag) {
        const tags = tag.split('|');
        filtered = filtered.filter((q) =>
          tags.some((t) => q.text.toLowerCase().includes(t.toLowerCase()))
        );
      }

      // Simple mock pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      return filtered.slice(start, end);
    },

    randomQuotes: (_, { limit }) => {
      return mockQuotes
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
    },
  },
};

// ✅ Start Express + Apollo Server
async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();
