import { Request } from 'express';
import { TUserState } from '@store/user/userSlice';
import * as core from 'express-serve-static-core';
import { User } from '@server/models/user.model';
import { TLeaderboardState } from '@store/leaderboard/leaderboardSlice';

export interface ServerRequest extends Request {
  user: Maybe<TUserState>;
  leaderboard: Maybe<TLeaderboardState>;
}

export interface PrivateRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
> extends Request<P, ResBody, ReqBody> {
  user: User;
}
