import { Request } from 'express';
import { TUserState } from '@store/user/userSlice';

export interface ServerRequest extends Request {
  user: TUserState;
}
