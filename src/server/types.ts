import { Request } from 'express';
import { TUserState } from '@store/user/userSlice';
import { User } from '@server/models/user.model';
import { TLeaderboardState } from '@store/leaderboard/leaderboardSlice';

export interface ServerRequest extends Request {
  user: Maybe<TUserState>;
  leaderboard: Maybe<TLeaderboardState>;
}

export interface PrivateRequest extends Request {
  user: User;
}
