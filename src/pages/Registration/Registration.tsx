import React, { Component } from 'react';
import { Form, Input, MainButton, SecondaryButton } from '@components';
import { IState } from '@pages/Registration/types';
import { Logo } from '@/icons/Logo.svg';
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
    return {
      value,
      error: '',
      valid: true,
    };
  };

  checkPasswords = (name: string, value: string) => {
    if (value !== this.state.password.value && data[name]) {
      return {
        value,
        error: data[name].message,
        valid: false,
      };
    }
    return {
      value,
      error: '',
      valid: true,
    };
  };

  render() {
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
              inputValid={this.state.first_name.valid}
              errorMessage={this.state.first_name.error}
              value={this.state.first_name.value}
              handleInput={this.handleInput}
              changeInput={this.changeInput}
            />
            <Input
              type="text"
              name="second_name"
              label="Фамилия"
              inputValid={this.state.second_name.valid}
              errorMessage={this.state.second_name.error}
              value={this.state.second_name.value}
              handleInput={this.handleInput}
              changeInput={this.changeInput}
            />
          </div>
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
            type="email"
            name="email"
            label="Почта"
            inputValid={this.state.email.valid}
            errorMessage={this.state.email.error}
            value={this.state.email.value}
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
          <Input
            type="password"
            name="password_confirm"
            label="Повторите пароль"
            inputValid={this.state.password_confirm.valid}
            errorMessage={this.state.password_confirm.error}
            value={this.state.password_confirm.value}
            handleInput={this.handleInput}
            changeInput={this.changeInput}
          />
          <MainButton title="Зарегистрироваться" />
          <SecondaryButton href="/" title="Войти" />
        </Form>
      </div>
    );
  }
}
