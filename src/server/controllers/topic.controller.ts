import { Router, Response } from 'express';
import { TopicModel, UserModel, TopicCommentModel } from '@server/models';
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
    reqErrorHandler(err, res);
  }
}

async function createComment(
  req: PrivateRequest<
    { id: number },
    any,
    { parentId?: number; message: string }
  >,
  res: Response,
) {
  try {
    const { body, params } = req;

    const data = await TopicCommentModel.create({
      ownerId: req.user.id,
      topicId: params.id,
      parentId: body.parentId || null,
      message: body.message,
    });

    res.send({
      success: true,
      data,
    });
  } catch (err) {
    reqErrorHandler(err, res);
  }
}

async function commentsByTopic(
  req: PrivateRequest<{ id: number }>,
  res: Response,
) {
  try {
    const { id } = req.params;

    const data = await TopicCommentModel.findAll({
      where: {
        topicId: id,
      },
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
    reqErrorHandler(err, res);
  }
}

topicRoute.route('/create').post(create);
topicRoute.route('/').get(get);
topicRoute.route('/:id/comments').post(createComment);
topicRoute.route('/:id/comments').get(commentsByTopic);
