import React, { FC, FocusEvent, MouseEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, ChangeAvatar, ViewButton } from '@components';
import { useAppDispatch, fetchUserProfile, useUserSelector } from '@store';
import { authAPI, editProfileAPI } from '@api';
import { checkInput, checkPassword } from '@utils/utils';
import { resourcesUrl, routes } from '@appConstants';
import defaultAvatar from '@assets/images/default-avatar.png';

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
  const [fields, setFields] = useState(initialFields);
  const [fieldsError, setFieldsError] = useState(initialFields);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  const user = useUserSelector();

  useEffect(() => {
    setFields({ ...initialFields, ...user });
  }, [user]);

  const onChange = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newState;

    if (name === 'newPasswordConfirm') {
      newState = checkPassword(name, value, fields.newPassword);
    } else {
      newState = checkInput(name, value);
    }

    setFieldsError({ ...fieldsError, [name]: newState });
  };

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

    editProfileAPI.editPassword(data).then(() =>
      setFields({
        ...fields,
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      }),
    );
  };

  const onLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    authAPI.logout().then(() => {
      navigate(routes.login);
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
              onBlur={onBlur}
              onChange={onChange}
            />
            <Input
              type="password"
              name="newPasswordConfirm"
              label="Повторите новый пароль"
              value={fields.newPasswordConfirm}
              error={fieldsError.newPasswordConfirm}
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
          <div className={styles.column}>
            <Input
              type="password"
              name="newPassword"
              label="Новый пароль"
              value={fields.newPassword}
              error={fieldsError.newPassword}
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
            onClick={onEditPassword}
          />
          <Button
            title="Выход"
            type="submit"
            view={ViewButton.exit}
            onClick={onLogout}
          />
        </div>
      </Form>
    </div>
  );
};
