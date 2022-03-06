import { Router, Response, Request } from 'express';
import { userThemeService } from '@server/services';
import { reqErrorHandler } from '@server';

export const userThemeRoute = Router();

async function update(req: Request, res: Response) {
  const { cookies, body } = req;

  if (!body.theme) {
    res.sendStatus(400);
  }

  try {
    const data = await userThemeService.updateOrCreate(
      cookies.uuid,
      body.theme,
    );
    res.status(200).send({
      success: true,
      data,
    });
  } catch (err) {
    reqErrorHandler(err, res);
  }
}

userThemeRoute.route('/').put(update);
