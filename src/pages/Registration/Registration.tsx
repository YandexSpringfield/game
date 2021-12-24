import React, { FC, FocusEvent, useState } from 'react';
import { Button, Form, Input, Logo } from '@components';
import { checkInput, checkPassword } from '@utils/utils';
import { ViewButton } from '@components/Button';

import styles from './Registration.module.scss';

const initialFields = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  password: '',
  password_confirm: '',
};

export const Registration: FC<any> = () => {
  const [fields, setFields] = useState(initialFields);
  const [fieldsError, setFieldsError] = useState(initialFields);

  const onChange = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newState;

    if (name === 'password_confirm') {
      newState = checkPassword(name, value, fields.password);
    } else {
      newState = checkInput(name, value);
    }

    setFieldsError({ ...fieldsError, [name]: newState });
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
              onBlur={onBlur}
              onChange={onChange}
            />
            <Input
              type="text"
              name="second_name"
              label="Фамилия"
              value={fields.second_name}
              error={fieldsError.second_name}
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
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
            type="email"
            name="email"
            label="Почта"
            value={fields.email}
            error={fieldsError.email}
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
          <Input
            type="password"
            name="password_confirm"
            label="Повторите пароль"
            value={fields.password_confirm}
            error={fieldsError.password_confirm}
            onBlur={onBlur}
            onChange={onChange}
          />
          <Button
            title="Зарегистрироваться"
            type="submit"
            view={ViewButton.main}
          />
          <Button title="Войти" type="button" view={ViewButton.secondary} />
        </Form>
      </div>
    </div>
  );
};
