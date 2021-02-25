import { hash, compare } from 'bcryptjs';
import {Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Int} from 'type-graphql';
import { User } from './entity/User';
import { Request, Response } from 'express';
import { createAccessToken, createRefreshToken } from './utils/auth';
import { isAuth } from './middlewares/isAuth';
import { getConnection } from 'typeorm';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

export interface MyContext {
  req: Request,
  res: Response,
  payload?: { userId: string }
}

@Resolver()
export class UserResolver  {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @UseMiddleware(isAuth)
  @Query(() => String)
  protected(
    @Ctx() {payload}: MyContext
  ) {
    return `Your user id is ${payload!.userId}`
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg('userId', () => Int) userId: number
  ) {
    await getConnection().getRepository(User).increment({id: userId}, 'tokenVersion', 1);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() {res}: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({email});

    if (!user) {
      throw new Error('could not find user with that email');
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Bad login")
    }

    // refresh token
    res.cookie(
      'jwid',
      createRefreshToken(user),
      {
        httpOnly: true
      }
    )
    // access token
    return {
      accessToken: createAccessToken(user),
    }
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    try {
      const hashedPwd = await hash(password, 12);

      await User.insert({
        email,
        password: hashedPwd
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
