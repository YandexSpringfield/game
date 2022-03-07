import { Router, Response } from 'express';
import { TopicModel, UserModel } from '@server/models';
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

async function get(req: PrivateRequest, res: Response) {
  try {
    const data = await TopicModel.findAll({
      include: [
        {
          model: UserModel,
          nested: true,
        },
      ],
    });
    res.send({
      success: true,
      data,
    });
  } catch (err) {
    console.log('ERROR', err);
    reqErrorHandler(err, res);
  }
}

topicRoute.route('/create').post(create);
topicRoute.route('/').get(get);
