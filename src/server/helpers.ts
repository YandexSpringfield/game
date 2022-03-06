import { AxiosRequestHeaders } from 'axios';
import { Response } from 'express';
import { DatabaseError } from 'sequelize';

export const setAuthCookies = (
  authCookie: string,
  uuid: string,
): AxiosRequestHeaders => {
  return {
    cookie: `authCookie=${authCookie}; uuid=${uuid}`,
  };
};

export const reqErrorHandler = (err: Error, res: Response) => {
  if (err instanceof DatabaseError) {
    res.status(400).json({
      success: false,
      msg: err.message,
    });
    return;
  }
  res.sendStatus(500);
};
