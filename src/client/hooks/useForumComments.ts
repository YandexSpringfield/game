import { useState } from 'react';
import { useUserSelector } from '@store';
import { forumAPI } from '@api';
import { TComment } from '@containers/Forum/ForumModal/types';

export const useForumComments = (initialState) => {
  const [comments, setComments] = useState(initialState);
  const user = useUserSelector();

  const getComments = (id: number) => {
    forumAPI.getComments(id).then((data) => {
      setComments(data.data.data);
    });
  };

  const createComment = (comment: TComment) => {
    forumAPI.createComment(comment).then(() => {
      getComments(comment.topicId);
    });
  };

  const deleteComment = (comment: TComment) => {
    if (comment && comment.ownerId === user.id) {
      forumAPI
        .deleteComment({ topicId: comment.topicId, id: comment.id })
        .then(() => {
          getComments(comment.topicId);
        });
    }
  };

  return {
    comments,
    setComments,
    getComments,
    createComment,
    deleteComment,
  };
};
