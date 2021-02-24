import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { MyContext } from '../resolvers';

// authorization -> bearer 9210021

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('Not authorized');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, "access_secret");
    context.payload = payload as any;
  } catch (err) {
    throw new Error("Bad token")
  }
  return next()
}
