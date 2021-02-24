import "reflect-metadata";
// import {createConnection} from "typeorm";
import express from 'express';
// import {User} from "./entity/User";
import { ApolloServer } from 'apollo-server-express';

(async () => {
  const app = express();
  app.get('/', (_, res) => res.send('Hello world'));

  const apolloServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String!
        }
    `,
    resolvers: {
        Query: {
            hello: () => "hello world"
        }
    }
  });

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('express server started');
  });
})()
