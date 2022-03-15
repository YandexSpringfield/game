import React from 'react';
import cn from 'classnames';
import { useUserSelector } from '@store';
import { sliceString } from '@utils/utils';
import { IoClose } from 'react-icons/io5';

import styles from './Comment.module.scss';

export const Comment = ({ comment, deleteComment, handleAnswer }) => {
  let parentComment: JSX.Element | null = null;
  const user = useUserSelector();
  const date = new Date(comment.createdAt).toUTCString();
  const commentStyle =
    comment.ownerId === user.id ? styles.sentComment : styles.receivedComment;

  if (comment.parentId !== null) {
    parentComment = (
      <span className={styles.answer_label}>
        Ответ комментатору: {comment.parent.owner.login} -{' '}
        {sliceString(comment.parent.comment)}
      </span>
    );
  }

  return (
    <div className={cn(styles.container, commentStyle)}>
      <button
        type="button"
        className={styles.deleteIcon}
        onClick={() => deleteComment(comment)}
      >
        <IoClose />
      </button>
      {parentComment}
      <span className={styles.login}>{comment.owner.login}</span>
      <p className={styles.text}>{comment.comment}</p>
      <div className={styles.answer_wrapper}>
        <button
          type="button"
          className={styles.answer}
          onClick={() => handleAnswer(comment)}
        >
          Ответить
        </button>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
  );
};
