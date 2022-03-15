import React, { useState } from 'react';
import { BaseEmoji, Picker } from 'emoji-mart';
import cn from 'classnames';
import './emoji.scss';

import styles from './styles.module.scss';

export const EmojiPanel = ({ onEmojiSelect }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = (e?) => {
    e?.preventDefault();
    setIsVisible(!isVisible);
  };

  const handleEmoji = (emoji: BaseEmoji) => {
    onEmojiSelect(emoji);
    handleVisibility();
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={handleVisibility}
      >
        <span>😀</span>
      </button>
      <div className={cn(styles.picker, { [styles.hide]: !isVisible })}>
        <Picker native onClick={handleEmoji} />
      </div>
    </div>
  );
};
