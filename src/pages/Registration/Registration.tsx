import React, { Component } from 'react';
import { Form, Input, MainButton, SecondaryButton, Logo } from '@components';
import { IState } from '@pages/Registration/types';
import { VALIDATION_DATA as data } from '@appConstants';

import styles from './Registration.module.scss';

export class Registration extends Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      first_name: {
        value: '',
        error: '',
        valid: true,
      },
      second_name: {
        value: '',
        error: '',
        valid: true,
      },
      login: {
        value: '',
        error: '',
        valid: true,
      },
      email: {
        value: '',
        error: '',
        valid: true,
      },
      password: {
        value: '',
        error: '',
        valid: true,
      },
      password_confirm: {
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
    let newState;

    if (name !== 'password_confirm') {
      newState = this.checkInput(name, value);
    } else {
      newState = this.checkPasswords(name, value);
    }

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

  checkPasswords = (name: string, value: string) => {
    const { password, password_confirm } = this.state;

    if (value !== password.value && data[name]) {
      return {
        value,
        error: data[name].message,
        valid: false,
      };
    }

    return password_confirm;
  };

  render() {
    const {
      first_name,
      second_name,
      login,
      email,
      password,
      password_confirm,
    } = this.state;

    return (
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
              inputValid={first_name.valid}
              errorMessage={first_name.error}
              value={first_name.value}
              onBlur={this.onBlur}
              onChange={this.onChange}
            />
            <Input
              type="text"
              name="second_name"
              label="Фамилия"
              inputValid={second_name.valid}
              errorMessage={second_name.error}
              value={second_name.value}
              onBlur={this.onBlur}
              onChange={this.onChange}
            />
          </div>
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
            type="email"
            name="email"
            label="Почта"
            inputValid={email.valid}
            errorMessage={email.error}
            value={email.value}
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
          <Input
            type="password"
            name="password_confirm"
            label="Повторите пароль"
            inputValid={password_confirm.valid}
            errorMessage={password_confirm.error}
            value={password_confirm.value}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
          <MainButton title="Зарегистрироваться" />
          <SecondaryButton href="/" title="Войти" />
        </Form>
      </div>
    );
  }
}
