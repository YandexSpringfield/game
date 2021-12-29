import React, { FC, useState } from 'react';
import { TProps } from './types';
import cn from 'classnames';

import styles from './ChangeAvatar.module.scss';

export const ChangeAvatar: FC<TProps> = ({ src }) => {
  const [labelVal, setLabelVal] = useState('Имя файла');
  const onChange = (e) => {
    const fileName = e.target.value.split('\\').pop();
    setLabelVal(fileName);
  };

  return (
    <div className={styles.container}>
      <img src={src} alt="avatar" className={styles.image} />
      <input
        type="file"
        name="file"
        id="file"
        className={styles.inputfile}
        onChange={onChange}
      />
      <label htmlFor="file">!!</label>
      <span className={styles.description}>{labelVal}</span>
    </div>
  );
};
