import { store } from '@store';
import { act } from 'react-test-renderer';

describe('Store', () => {
  test('should dispatch user data', () => {
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

    expect(store.getState().user.id).toBe(payload.id);
  });

  test('should dispatch leaderboard data', () => {
    const payload = {
      data: [
        {
          data: {
            city: 'Test',
            name: 'Testov',
            score: 12345,
          },
        },
        {
          data: {
            city: 'Test2',
            name: 'Testov2',
            score: 67890,
          },
        },
      ],
    };

    act(() => {
      store.dispatch({
        type: 'leaderboard/fetchLeaderboard/fulfilled',
        payload,
      });
    });

    expect(store.getState().leaderboard.data).toBe(payload.data);
  });
});
