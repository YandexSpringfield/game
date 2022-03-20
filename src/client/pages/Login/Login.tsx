import React, { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ViewButton,
  Form,
  Input,
  Logo,
  Error,
  YaButton,
} from '@components';
import { routes } from '@appConstants';
import { useAuth, useInput } from '@hooks';

import styles from './Login.module.scss';

const initialFields = {
  login: '',
  password: '',
};

export const Login: FC<any> = () => {
  const { fields, fieldsError, setFields, ...rest } = useInput(initialFields);
  const { error, signIn, yaGetId } = useAuth();
  const navigate = useNavigate();

  const toRegistration = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(routes.registration);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__login}>
        <div className={styles.login__header}>
          <Logo width="50" height="100%" />
          <h1 className={styles.login__title}>Авторизация (обновлено)</h1>
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
          {error && <Error title={error} />}
          <div className={styles.row}>
            <Button
              title="Войти"
              type="submit"
              view={ViewButton.main}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                signIn(fields, routes.preview);
              }}
            />
            <YaButton
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                yaGetId();
              }}
            />
          </div>
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
