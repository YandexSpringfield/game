import React, { FC, useState } from 'react';
import { Form } from '@components';
import { editProfileAPI } from '../../../api';
import { TProps } from './types';
import styles from './ChangeAvatar.module.scss';

const defaultLabel = 'Имя файла';
const errorLabel = 'Не удалось загрузить';

export const ChangeAvatar: FC<TProps> = ({ src }) => {
  const [labelVal, setLabelVal] = useState('Имя файла');

  const onChange = (e) => {
    const fileName = e.target.value.split('\\').pop();
    setLabelVal(fileName);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    editProfileAPI
      .editAvatar(formData)
      .then(() => setLabelVal(defaultLabel))
      .catch(() => setLabelVal(errorLabel));
  };

  return (
    <Form name="avatar">
      <h3 className={styles.title}>Аватар</h3>
      <div className={styles.container}>
        <img src={src} alt="avatar" className={styles.image} />
        <input
          type="file"
          name="file"
          id="fileInput"
          className={styles.inputfile}
          onChange={onChange}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.iconDownload} htmlFor="fileInput" />
        <span className={styles.description}>{labelVal}</span>
      </div>
    </Form>
  );
};
