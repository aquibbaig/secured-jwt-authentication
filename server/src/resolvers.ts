import { hash, compare } from 'bcryptjs';
import {Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx} from 'type-graphql';
import { User } from './entity/User';
import { Request, Response } from 'express';
import { createAccessToken, createRefreshToken } from './utils/auth';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

interface MyContext {
  req: Request,
  res: Response
}

@Resolver()
export class UserResolver  {
  @Query(() => [User])
  users() {
    return User.find();
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
