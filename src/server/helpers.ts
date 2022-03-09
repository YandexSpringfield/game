import { AxiosRequestHeaders } from 'axios';
import { Response } from 'express';
import { DatabaseError, ValidationError } from 'sequelize';

export const setAuthCookies = (
  authCookie: string,
  uuid: string,
): AxiosRequestHeaders => {
  return {
    cookie: `authCookie=${authCookie}; uuid=${uuid}`,
  };
};

export const reqErrorHandler = (err: Error, res: Response) => {
  if (err instanceof DatabaseError || err instanceof ValidationError) {
    res.status(400).json({
      success: false,
      msg: err.message,
    });
    return;
  }
  res.sendStatus(500);
};
