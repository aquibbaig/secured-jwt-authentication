import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
// import {User} from "./entity/User";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./utils/auth";

(async () => {
  const app = express();
  app.use(cookieParser());

  app.get('/', (_, res) => res.send('Hello world'));

  // refresh token only works in
  // this route.
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jwid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }
    let payload = null;

    try {
      payload = verify(token, "refresh_secret");
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }


    // token is valid.
    // send an access token.
    const user = await User.findOne({ id: (payload as any).userId });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    // create a new refresh token also when user
    // issues a new access token
    res.cookie("jwid", createRefreshToken(user), {
      httpOnly: true
    });

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

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
