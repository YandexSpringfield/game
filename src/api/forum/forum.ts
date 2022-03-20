import { instanceAxios } from '@api/axios';
import { BASE_SERVER_API_URL, PATH_API } from '@api/config';

class ForumAPI {
  createTopic = async ({ ...data }) => {
    await instanceAxios.post(
      PATH_API.FORUM.CREATE_TOPIC,
      { ...data },
      { baseURL: BASE_SERVER_API_URL },
    );
  };

  createComment = async ({ ...data }) => {
    await instanceAxios.post(
      PATH_API.FORUM.CREATE_COMMENT(data.topicId),
      { ...data },
      { baseURL: BASE_SERVER_API_URL },
    );
  };

  getTopics = async () => {
    return await instanceAxios.get(PATH_API.FORUM.GET_TOPICS, {
      baseURL: BASE_SERVER_API_URL,
    });
  };

  getComments = async (topicId) => {
    return await instanceAxios.get(PATH_API.FORUM.GET_COMMENTS(topicId), {
      baseURL: BASE_SERVER_API_URL,
    });
  };

  deleteComment = async ({ topicId, id }) => {
    await instanceAxios.delete(PATH_API.FORUM.DELETE_COMMENT(topicId, id), {
      baseURL: BASE_SERVER_API_URL,
    });
  };
}

export const forumAPI = new ForumAPI();
