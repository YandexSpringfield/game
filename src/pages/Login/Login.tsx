import React, { FC, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ViewButton, Form, Input, Logo, Error } from '@components';
import { authAPI } from '@api';
import { useAppDispatch, fetchUserProfile } from '@store';
import { authError, routes } from '@appConstants';
import { useInput } from '@hooks/useInput';

import styles from './Login.module.scss';

const initialFields = {
  login: '',
  password: '',
};

export const Login: FC<any> = () => {
  const [errorAuth, setErrorAuth] = useState('');
  const { fields, fieldsError, setFields, ...rest } = useInput(initialFields);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    authAPI
      .signIn(fields)
      .then(() => {
        setErrorAuth('');
        dispatch(fetchUserProfile());
      })
      .then(() => {
        navigate(routes.game.root);
      })
      .catch(() => setErrorAuth(authError));
  };

  const toRegistration = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(routes.registration);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__login}>
        <div className={styles.login__header}>
          <Logo width="50" height="100%" />
          <h1 className={styles.login__title}>Авторизация</h1>
        </div>
        <Form name="login">
          <Input
            type="text"
            name="login"
            label="Логин"
            value={fields.login}
            error={fieldsError.login}
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
          {errorAuth && <Error title={errorAuth} />}
          <Button
            title="Войти"
            type="submit"
            view={ViewButton.main}
            onClick={onClick}
          />
          <Button
            title="Нет аккаунта?"
            type="button"
            view={ViewButton.secondary}
            onClick={toRegistration}
          />
        </Form>
      </div>
    </div>
  );
};
