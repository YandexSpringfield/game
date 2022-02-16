import { Request } from 'express';

export type TUserResponse = {
  id: 0;
  first_name: '';
  second_name: '';
  display_name: '';
  login: '';
  email: '';
  phone: '';
  avatar: '';
};

export interface ServerRequest extends Request {
  user: TUserResponse | null;
}
