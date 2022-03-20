import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ViewButton,
  Comment,
  EmojiPanel,
} from '@components';
import { useInput, useForumComments } from '@hooks';
import { BaseEmoji } from 'emoji-mart';
import { sliceString } from '@utils/utils';
import { TInitialFields, TComment } from './types';

import styles from './styles.module.scss';

const initialFields: TInitialFields = {
  comment: '',
};

const initialState: TComment[] = [];

const initialInputState: string = 'Введите сообщение';

export const ForumModal = ({ isOpen, onClose, topic }) => {
  const { fields, setFields, fieldsError, ...rest } = useInput(initialFields);
  const { comments, setComments, getComments, createComment, deleteComment } =
    useForumComments(initialState);
  const [inputLabel, setInputLabel] = useState(initialInputState);
  const [parentIdComment, setParentIdComment] = useState(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      getComments(topic.id);
    }
  }, [isOpen]);

  const resetState = () => {
    setFields(initialFields);
    setInputLabel(initialInputState);
    setParentIdComment(null);
  };

  const onModalClose = () => {
    setComments([]);
    resetState();
    onClose();
  };

  const onEmojiSelect = (emoji: BaseEmoji) => {
    const commentWithEmoji = fields.comment + emoji.native;
    setFields({ comment: commentWithEmoji });
  };

  const sendComment = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newComment: TComment = {
      topicId: topic.id,
      parentId: parentIdComment,
      comment: fields.comment,
    };
    if (newComment.comment) {
      createComment(newComment);
    }
    resetState();
  };

  const handleAnswer = ({ id, owner, comment }) => {
    const input = formRef.current?.querySelector(
      '[name="comment"]',
    ) as HTMLInputElement;

    setInputLabel(`Введите ответ: ${owner.login} - ${sliceString(comment)}`);
    setParentIdComment(id);
    input?.focus();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      className={styles.modalContainer}
    >
      <div>
        <h3 className={styles.title}>{topic?.title}</h3>
        <p className={styles.content}>{topic?.description}</p>
      </div>
      <div className={styles.commentsField}>
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
            handleAnswer={handleAnswer}
          />
        ))}
      </div>
      <form name="forum" className={styles.commentContainer} ref={formRef}>
        <EmojiPanel onEmojiSelect={onEmojiSelect} />
        <Input
          label={inputLabel}
          error=""
          name="comment"
          value={fields.comment}
          {...rest}
        />
        <Button
          title="Отправить"
          type="submit"
          view={ViewButton.main}
          onClick={sendComment}
        />
      </form>
    </Modal>
  );
};
