import { ApolloServer } from 'apollo-server-express'
import express from 'express';
import cors from 'cors';
import { makeExecutableSchema } from 'graphql-tools';
import * as dotenv from 'dotenv';
import {resolvers, typeDefs} from "./graphql-types";
import {connect as dbConnect} from './db';
import {getAdminByToken} from "./db/middlewares";

dotenv.config();

const app: express.Application = express();

app.use('*', cors());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
  // TODO: is cacheControl disabling right decision?
  cacheControl: false,

  context: async ({req}) => {
    const token = req.headers.authorization || '';

    const admin = await getAdminByToken(token);

    return {admin};
  },
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

dbConnect({
  isDebug: true,
  reconnectTimeout: 15000,
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Started at ::${PORT}`);
});
