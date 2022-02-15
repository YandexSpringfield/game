import { Request } from 'express';

export interface ServerRequest extends Request {
  userId: string;
  userToken: string;
}
