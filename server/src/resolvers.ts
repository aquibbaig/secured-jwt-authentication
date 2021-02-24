import { hash } from 'bcryptjs';
import {Resolver, Query, Mutation, Arg} from 'type-graphql';
import { User } from './entity/User';

@Resolver()
export class UserResolver  {
  @Query(() => String)
  hello() {
    return "hi!";
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
