import { Router, Response, Request } from 'express';
import { topicService } from '@server/services';
import { reqErrorHandler } from '@server';

export const topicRoute = Router();

async function create(req: Request, res: Response) {
  try {
    const { cookies, body } = req;
    const { title, description } = body;
    const data = await topicService.create({
      uuid: cookies.uuid,
      title,
      description,
    });
    res.send({
      success: true,
      data,
    });
  } catch (err) {
    reqErrorHandler(err, res);
  }
}

topicRoute.route('/').post(create);
