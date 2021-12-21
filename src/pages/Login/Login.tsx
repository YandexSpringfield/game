import React, { Component } from 'react';
import { Form, Input, MainButton, SecondaryButton } from '@components';
import { IState } from '@pages/Login/types';
import { VALIDATION_DATA as data } from '@appConstants/validationData';
import { Logo } from '@/icons/Logo';

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

  changeInput = (e) => {
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

  handleInput = (e) => {
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
  };

  render() {
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
            inputValid={this.state.login.valid}
            errorMessage={this.state.login.error}
            value={this.state.login.value}
            handleInput={this.handleInput}
            changeInput={this.changeInput}
          />
          <Input
            type="password"
            name="password"
            label="Пароль"
            inputValid={this.state.password.valid}
            errorMessage={this.state.password.error}
            value={this.state.password.value}
            handleInput={this.handleInput}
            changeInput={this.changeInput}
          />
          <MainButton title="Войти" />
          <SecondaryButton href="/registration" title="Нет аккаунта?" />
        </Form>
      </div>
    );
  }
}
