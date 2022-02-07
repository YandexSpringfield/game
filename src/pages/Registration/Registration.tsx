import React, { FC, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ViewButton, Form, Input, Logo, Error } from '@components';
import { omit } from '@utils/utils';
import { authAPI, TSignUp } from '@api';
import { useAppDispatch, fetchUserProfile } from '@store';
import { registrationError, routes } from '@appConstants';
import { useInput } from '@hooks/useInput';

import styles from './Registration.module.scss';

const initialFields = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  phone: '',
  password: '',
  password_confirm: '',
};

export const Registration: FC<any> = () => {
  const [errorAuth, setErrorAuth] = useState('');
  const { fields, fieldsError, setFields, ...rest } = useInput(initialFields);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = omit(fields, 'password_confirm') as TSignUp;
    authAPI
      .signUp(data)
      .then(() => {
        setErrorAuth('');
        dispatch(fetchUserProfile());
      })
      .then(() => {
        navigate(routes.game.root);
      })
      .catch(() => setErrorAuth(registrationError));
  };

  const toLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(routes.login);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__registration}>
        <div className={styles.registration__header}>
          <Logo width="50" height="100%" />
          <h1 className={styles.registration__title}>Регистрация</h1>
        </div>
        <Form name="registration">
          <div className={styles.form__username}>
            <Input
              type="text"
              name="first_name"
              label="Имя"
              value={fields.first_name}
              error={fieldsError.first_name}
              {...rest}
            />
            <Input
              type="text"
              name="second_name"
              label="Фамилия"
              value={fields.second_name}
              error={fieldsError.second_name}
              {...rest}
            />
          </div>
          <Input
            type="text"
            name="login"
            label="Логин"
            value={fields.login}
            error={fieldsError.login}
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
          <Input
            type="phone"
            name="phone"
            label="Телефон"
            value={fields.phone}
            error={fieldsError.phone}
            {...rest}
          />
          <Input
            type="password"
            name="password"
            label="Пароль"
            value={fields.password}
            error={fieldsError.password}
            {...rest}
          />
          <Input
            type="password"
            name="password_confirm"
            label="Повторите пароль"
            value={fields.password_confirm}
            error={fieldsError.password_confirm}
            {...rest}
          />
          {errorAuth && <Error title={errorAuth} />}
          <Button
            title="Зарегистрироваться"
            type="submit"
            view={ViewButton.main}
            onClick={onClick}
          />
          <Button
            title="Войти"
            type="button"
            view={ViewButton.secondary}
            onClick={toLogin}
          />
        </Form>
      </div>
    </div>
  );
};
