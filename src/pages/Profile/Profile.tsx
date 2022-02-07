import React, { FC, MouseEvent, useEffect } from 'react';
import { Button, Form, Input, ChangeAvatar, ViewButton } from '@components';
import { useAppDispatch, fetchUserProfile, useUserSelector } from '@store';
import { resourcesUrl, routes } from '@appConstants';
import { useInput, useAuth } from '@hooks';
import { editProfileAPI } from '@api';
import defaultAvatar from '@/assets/images/default-avatar.png';

import styles from './Profile.module.scss';

const initialFields = {
  avatar: '',
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  phone: '',
  display_name: '',
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

export const Profile: FC<any> = () => {
  const { fields, fieldsError, setFields, ...rest } = useInput(initialFields);
  const { logout } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  const user = useUserSelector();

  useEffect(() => {
    setFields({ ...initialFields, ...user });
  }, [user]);

  const onEditProfile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { avatar, oldPassword, newPassword, newPasswordConfirm, ...data } =
      fields;

    editProfileAPI.editProfile(data);
  };

  const onEditPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { oldPassword, newPassword } = fields;
    const data = { oldPassword, newPassword };

    editProfileAPI.editPassword(data).then(() => {
      setFields({
        ...fields,
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
    });
  };

  return (
    <div className={styles.container}>
      <ChangeAvatar
        src={fields.avatar ? resourcesUrl + fields.avatar : defaultAvatar}
      />
      <Form name="profile" onSubmit={onEditProfile}>
        <h3 className={styles.title}>Информация</h3>
        <div className={styles.row}>
          <div className={styles.column}>
            <Input
              type="text"
              name="first_name"
              label="Имя"
              value={fields.first_name}
              error={fieldsError.first_name}
              {...rest}
            />
            <Input
              type="email"
              name="email"
              label="Почта"
              value={fields.email}
              error={fieldsError.email}
              {...rest}
            />
          </div>
          <div className={styles.column}>
            <Input
              type="text"
              name="second_name"
              label="Фамилия"
              value={fields.second_name}
              error={fieldsError.second_name}
              {...rest}
            />
            <Input
              type="text"
              name="login"
              label="Логин"
              value={fields.login}
              error={fieldsError.login}
              disabled
              {...rest}
            />
          </div>
        </div>
        <div className={styles.row}>
          <Button
            title="Обновить"
            type="submit"
            view={ViewButton.main}
            onClick={onEditProfile}
          />
        </div>
      </Form>
      <Form name="password" onSubmit={onEditPassword}>
        <h3 className={styles.title}>Изменение пароля</h3>
        <div className={styles.row}>
          <div className={styles.column}>
            <Input
              type="password"
              name="oldPassword"
              label="Старый пароль"
              value={fields.oldPassword}
              error={fieldsError.oldPassword}
              {...rest}
            />
            <Input
              type="password"
              name="newPasswordConfirm"
              label="Повторите новый пароль"
              value={fields.newPasswordConfirm}
              error={fieldsError.newPasswordConfirm}
              {...rest}
            />
          </div>
          <div className={styles.column}>
            <Input
              type="password"
              name="newPassword"
              label="Новый пароль"
              value={fields.newPassword}
              error={fieldsError.newPassword}
              {...rest}
            />
          </div>
        </div>
        <div className={styles.row}>
          <Button
            title="Обновить пароль"
            type="submit"
            view={ViewButton.main}
            onClick={onEditPassword}
          />
          <Button
            title="Выход"
            type="button"
            view={ViewButton.exit}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              logout(routes.login)
            }}
          />
        </div>
      </Form>
    </div>
  );
};
