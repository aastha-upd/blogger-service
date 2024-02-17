import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './src/schema';
import resolvers from './src/resolver';

const app = express();
const PORT = process.env.PORT || 4000;


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
