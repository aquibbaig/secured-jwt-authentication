import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import {Resolver, Query, Mutation, Arg, ObjectType, Field} from 'type-graphql';
import { User } from './entity/User';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
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
    @Arg('password') password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({email});

    if (!user) {
      throw new Error('could not find user with that email');
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Bad login")
    }
    return {
      accessToken: sign({ userId: user.id}, "my_secret", {expiresIn: "15m"}),
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
