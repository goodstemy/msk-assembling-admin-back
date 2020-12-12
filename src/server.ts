import { ApolloServer } from 'apollo-server-express'
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { makeExecutableSchema } from 'graphql-tools';
import * as dotenv from 'dotenv';
import {resolvers, typeDefs} from "./graphql-types";

dotenv.config();

const app: express.Application = express();

app.use('*', cors());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/msk-assembling';

mongoose.set('debug', true);
mongoose
  .connect(MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(() => {
    console.log('Db init success');
  })
  .catch(err => {
    console.error(`Error on init db: ${err}`);
  });

app.listen(PORT, () => {
  console.log(`Started at ::${PORT}`);
});
