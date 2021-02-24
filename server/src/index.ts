import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
// import {User} from "./entity/User";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers";

(async () => {
  const app = express();
  app.get('/', (_, res) => res.send('Hello world'));

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
        resolvers: [UserResolver]
    }),
    context: ({req, res}) => ({req, res})
  });

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('express server started');
  });
})()
