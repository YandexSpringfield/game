import { Router, Response } from 'express';
import { TopicModel } from '@server/models';
import { reqErrorHandler } from '@server';
import { PrivateRequest } from '@server/types';

export const topicRoute = Router();

async function create(req: PrivateRequest, res: Response) {
  try {
    const { body, user } = req;
    const { title, description } = body;
    const data = await TopicModel.create({
      ownerId: user.id,
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
