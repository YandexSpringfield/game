import React, { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ViewButton, Form, Input, Logo, Error } from '@components';
import { isEmpty, omit } from 'src/client/utils/utils';
import { routes } from '@appConstants';
import { useInput, useAuth } from '@hooks';

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
  const { fields, fieldsError, setFields, ...rest } = useInput(initialFields);
  const { error, signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isEmpty(fieldsError)) {
      signUp(omit(fields, 'password_confirm'), routes.preview);
    }
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
          {error && <Error title={error} />}
          <Button
            title="Зарегистрироваться"
            type="submit"
            view={ViewButton.main}
            onClick={handleRegistration}
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
