import React, { FC, FocusEvent, useState } from 'react';
import { Button, ViewButton, Form, Input, Logo, Error } from '@components';
import { checkInput } from '@utils/utils';
import { authAPI } from '@api';
import { useAppDispatch } from '@store';
import { fetchUserProfile } from '@store/user';
import { authError } from '@appConstants';

import styles from './Login.module.scss';

const initialFields = {
  login: '',
  password: '',
};

export const Login: FC<any> = () => {
  const [fields, setFields] = useState(initialFields);
  const [fieldsError, setFieldsError] = useState(initialFields);
  const [errorAuth, setErrorAuth] = useState('');

  const dispatch = useAppDispatch();

  const onChange = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newState = checkInput(name, value);
    setFieldsError({ ...fieldsError, [name]: newState });
  };

  const onLogin = () => {
    authAPI
      .signIn(fields)
      .then(() => {
        setErrorAuth('');
        dispatch(fetchUserProfile());
      })
      .catch(() => setErrorAuth(authError));
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
            onBlur={onBlur}
            onChange={onChange}
          />
          <Input
            type="password"
            name="password"
            label="Пароль"
            value={fields.password}
            error={fieldsError.password}
            onBlur={onBlur}
            onChange={onChange}
          />
          {errorAuth && <Error title={errorAuth} />}
          <Button
            title="Войти"
            type="submit"
            view={ViewButton.main}
            onClick={onLogin}
          />
          <Button
            title="Нет аккаунта?"
            type="button"
            view={ViewButton.secondary}
          />
        </Form>
      </div>
    </div>
  );
};
