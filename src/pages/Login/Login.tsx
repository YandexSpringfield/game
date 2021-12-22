import React, { Component } from 'react';
import { Form, Input, MainButton, SecondaryButton, Logo } from '@components';
import { IState } from '@pages/Login/types';
import { VALIDATION_DATA as data } from '@appConstants/validationData';

import styles from './Login.module.scss';

export class Login extends Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        value: '',
        error: '',
        valid: true,
      },
      password: {
        value: '',
        error: '',
        valid: true,
      },
    };
  }

  onChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  onBlur = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    const newState = this.checkInput(name, value);

    this.setState((prevState) => ({
      ...prevState,
      [name]: {
        ...newState,
      },
    }));
  };

  checkInput = (name: string, value: string) => {
    if (data[name]) {
      const { re } = data[name];
      return {
        value,
        error: re.test(value) ? '' : data[name].message,
        valid: re.test(value),
      };
    }

    return this.state[name];
  };

  render() {
    const { login, password } = this.state;

    return (
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
            inputValid={login.valid}
            errorMessage={login.error}
            value={login.value}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
          <Input
            type="password"
            name="password"
            label="Пароль"
            inputValid={password.valid}
            errorMessage={password.error}
            value={password.value}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
          <MainButton title="Войти" />
          <SecondaryButton href="/registration" title="Нет аккаунта?" />
        </Form>
      </div>
    );
  }
}
