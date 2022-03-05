import { TopicModel } from '@server/models';

export type CreateTopicReq = {
  uuid: string;
  title: string;
  description: string;
};

class TopicService {
  public async create(topic: CreateTopicReq) {
    const { title, uuid, description } = topic;
    return TopicModel.create({
      title,
      description,
      ownerId: uuid,
    });
  }
}

export const topicService = new TopicService();
