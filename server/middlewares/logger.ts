import { NextFunction, Response } from 'express';

export default function Logger() {
  return (req: any, _res: Response, next: NextFunction) => {
    req.logger = () => {
      console.log(req);
    };
    next();
  };
}
