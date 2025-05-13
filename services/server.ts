import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

const PORT = process.env.PORT || 4000;

async function startApolloServer() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      console.error('❌ GraphQL Error:', err);
      return err;
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer().catch((err) => {
  console.error('❌ Failed to start server:', err);
});
