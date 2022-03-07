import { Router, Response } from 'express';
import { userThemeService } from '@server/services';
import { reqErrorHandler } from '@server';
import { PrivateRequest } from '@server/types';

export const userThemeRoute = Router();

async function update(req: PrivateRequest, res: Response) {
  const { body } = req;

  if (!body.theme) {
    res.sendStatus(400);
    return;
  }

  try {
    const data = await userThemeService.updateOrCreate(req.user.id, body.theme);
    res.status(200).send({
      success: true,
      data,
    });
  } catch (err) {
    reqErrorHandler(err, res);
  }
}

userThemeRoute.route('/').put(update);
