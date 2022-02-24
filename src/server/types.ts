import { Request } from 'express';
import { TUserState } from '@store/user/userSlice';
import { TLeaderboardState } from '@store/leaderboard/leaderboardSlice';

export interface ServerRequest extends Request {
  user: Maybe<TUserState>;
  leaderboard: Maybe<TLeaderboardState>;
}
