import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { store } from '@store';
import { Profile } from '@pages';

describe('Profile', () => {
  it('Profile: render input value after dispatch', () => {
    const component: ReactTestRenderer = create(
      <BrowserRouter>
        <Provider store={store}>
          <Profile />
        </Provider>
      </BrowserRouter>,
    );

    const payload = {
      id: 107936,
      first_name: 'Test',
      second_name: 'Testov',
      display_name: 'Test',
      login: 'test',
      avatar: 'test',
      email: 'email@test.com',
      phone: '+7999999999',
    };

    act(() => {
      store.dispatch({
        type: 'user/fetchUserProfile/fulfilled',
        payload,
      });
    });

    expect(component.root.findByProps({ name: 'first_name' }).props.value).toBe(
      payload.first_name,
    );

    const tree = component.toTree();
    expect(tree).toMatchSnapshot();
  });
});
