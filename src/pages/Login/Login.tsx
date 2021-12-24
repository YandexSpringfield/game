import React, { FC, FocusEvent, useState } from 'react';
import { Button, Form, Input, Logo } from '@components';
import { checkInput } from '@utils/utils';
import { ViewButton } from '@components/Button';

import styles from './Login.module.scss';

const initialFields = {
  login: '',
  password: '',
};

export const Login: FC<any> = () => {
  const [fields, setFields] = useState(initialFields);
  const [fieldsError, setFieldsError] = useState(initialFields);

  const onChange = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newState = checkInput(name, value);
    setFieldsError({ ...fieldsError, [name]: newState });
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
          <Button title="Войти" type="submit" view={ViewButton.main} />
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
