import React, { FC, FocusEvent, useState } from 'react';
import { Form, Input, Button, Logo } from '@components';
import { checkInput, checkPassword } from '@utils/utils';

import styles from './Registration.module.scss';

export const Registration: FC<any> = () => {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [secondName, setSecondName] = useState('');
  const [secondNameError, setSecondNameError] = useState('');
  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const onChange = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    switch (name) {
      case 'first_name':
        setFirstName(value);
        break;
      case 'second_name':
        setSecondName(value);
        break;
      case 'login':
        setLogin(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'password_confirm':
        setPasswordConfirm(value);
        break;
      default:
        break;
    }
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    let newState;

    if (name === 'password_confirm') {
      newState = checkPassword(name, value, password);
    } else {
      newState = checkInput(name, value);
    }

    switch (name) {
      case 'first_name':
        setFirstNameError(newState);
        break;
      case 'second_name':
        setSecondNameError(newState);
        break;
      case 'login':
        setLoginError(newState);
        break;
      case 'email':
        setEmailError(newState);
        break;
      case 'password':
        setPasswordError(newState);
        break;
      case 'password_confirm':
        setPasswordConfirmError(newState);
        break;
      default:
        break;
    }
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
              value={firstName}
              error={firstNameError}
              onBlur={onBlur}
              onChange={onChange}
            />
            <Input
              type="text"
              name="second_name"
              label="Фамилия"
              value={secondName}
              error={secondNameError}
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
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
            type="email"
            name="email"
            label="Почта"
            value={email}
            error={emailError}
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
          <Input
            type="password"
            name="password_confirm"
            label="Повторите пароль"
            value={passwordConfirm}
            error={passwordConfirmError}
            onBlur={onBlur}
            onChange={onChange}
          />
          <Button title="Зарегистрироваться" type="submit" view="main" />
          <Button title="Войти" type="button" view="secondary" />
        </Form>
      </div>
    </div>
  );
};
