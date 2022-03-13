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
      PATH_API.FORUM.CREATE_COMMENT(data.parentId),
      { ...data },
      { baseURL: BASE_SERVER_API_URL },
    );
  };

  getTopics = async () => {
    return await instanceAxios.get(PATH_API.FORUM.GET_TOPICS, {
      baseURL: BASE_SERVER_API_URL,
    });
  };

  getComments = async (id) => {
    return await instanceAxios.get(PATH_API.FORUM.GET_COMMENTS(id), {
      baseURL: BASE_SERVER_API_URL,
    });
  };
}

export const forumAPI = new ForumAPI();
