import React, { FC, FocusEvent, useState } from 'react';
import { Form, Input, Logo, Button } from '@components';
import { checkInput } from '@utils/utils';

import styles from './Login.module.scss';

export const Login: FC<any> = () => {
  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onChange = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    switch (name) {
      case 'login':
        setLogin(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    const newState = checkInput(name, value);

    switch (name) {
      case 'login':
        setLoginError(newState);
        break;
      case 'password':
        setPasswordError(newState);
        break;
      default:
        break;
    }
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
            value={login}
            error={loginError}
            onBlur={onBlur}
            onChange={onChange}
          />
          <Input
            type="password"
            name="password"
            label="Пароль"
            value={password}
            error={passwordError}
            onBlur={onBlur}
            onChange={onChange}
          />
          <Button title="Войти" type="submit" view="main" />
          <Button title="Нет аккаунта?" type="button" view="secondary" />
        </Form>
      </div>
    </div>
  );
};
