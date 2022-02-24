import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Router } from 'src/client/router/Router';
import { create, ReactTestRenderer } from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { store } from '@store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

describe('Router', () => {
  test('should navigate to Error page when get wrong path', () => {
    const component: ReactTestRenderer = create(
      <MemoryRouter initialEntries={['/some-wrong-path']} initialIndex={0}>
        <Router />
      </MemoryRouter>,
    );
    const errorTitle = component.root.findByType('h1').children;

    expect(errorTitle).toStrictEqual(['Страница не найдена']);
  });

  test('should navigate to Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Router />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText(/Авторизация/i)).toBeInTheDocument();
  });

  test('should navigate to Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/registration']} initialIndex={0}>
          <Router />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText(/Регистрация/i)).toBeInTheDocument();
  });
});
