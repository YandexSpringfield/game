import React, { FC, FocusEvent, useState } from 'react';
import { Button, Form, Input, ChangeAvatar } from '@components';
import { checkInput, checkPassword } from '@utils/utils';
import { ViewButton } from '@components/Button';

import styles from './Profile.module.scss';

const avatarMock =
  'https://v1.popcornnews.ru/k2/news/1200/upload/news/623023559448.jpg';

const initialFields = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  old_password: '',
  new_password: '',
  new_password_confirm: '',
};

export const Profile: FC<any> = () => {
  const [fields, setFields] = useState(initialFields);
  const [fieldsError, setFieldsError] = useState(initialFields);

  const onChange = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newState;

    if (name === 'new_password_confirm') {
      newState = checkPassword(name, value, fields.new_password);
    } else {
      newState = checkInput(name, value);
    }

    setFieldsError({ ...fieldsError, [name]: newState });
  };

  return (
    <div className={styles.container}>
      <Form name="avatar">
        <h3 className={styles.title}>Аватар</h3>
        <div className={styles.row}>
          <ChangeAvatar src={avatarMock} />
        </div>
      </Form>
      <Form name="details">
        <h3 className={styles.title}>Информация</h3>
        <div className={styles.row}>
          <div className={styles.column}>
            <Input
              type="text"
              name="first_name"
              label="Имя"
              value={fields.first_name}
              error={fieldsError.first_name}
              onBlur={onBlur}
              onChange={onChange}
            />
            <Input
              type="email"
              name="email"
              label="Почта"
              value={fields.email}
              error={fieldsError.email}
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
          <div className={styles.column}>
            <Input
              type="text"
              name="second_name"
              label="Фамилия"
              value={fields.second_name}
              error={fieldsError.second_name}
              onBlur={onBlur}
              onChange={onChange}
            />
            <Input
              type="text"
              name="login"
              label="Логин"
              value={fields.login}
              error={fieldsError.login}
              disabled
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <Button title="Обновить" type="submit" view={ViewButton.main} />
        </div>
      </Form>
      <Form name="password">
        <h3 className={styles.title}>Изменение пароля</h3>
        <div className={styles.row}>
          <div className={styles.column}>
            <Input
              type="password"
              name="old_password"
              label="Старый пароль"
              value={fields.old_password}
              error={fieldsError.old_password}
              onBlur={onBlur}
              onChange={onChange}
            />
            <Input
              type="password"
              name="new_password_confirm"
              label="Повторите новый пароль"
              value={fields.new_password_confirm}
              error={fieldsError.new_password_confirm}
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
          <div className={styles.column}>
            <Input
              type="password"
              name="new_password"
              label="Новый пароль"
              value={fields.new_password}
              error={fieldsError.new_password}
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <Button
            title="Обновить пароль"
            type="submit"
            view={ViewButton.main}
          />
        </div>
      </Form>
    </div>
  );
};
