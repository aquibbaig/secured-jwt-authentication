import { User } from '../entity/User';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: User): string => {
  return sign({ userId: user.id}, "access_secret", {expiresIn: "15m"});
}

export const createRefreshToken = (user: User): string => {
  return sign({userId: user.id}, "refresh_secret", {expiresIn: "7d"});
}
