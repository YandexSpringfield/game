import { authAPI } from '@api/auth';
import { leaderboardAPI } from '@api/leaderboard';
import { editProfileAPI } from '@api/editProfile';

describe('API', () => {
  test('AuthAPI should log in', async () => {
    const data = {
      login: 'vfgbvq',
      password: 'Qwerty123',
    };

    await authAPI.signIn(data);
    const user = await authAPI.getUserInfo();

    expect(user.data.login).toBe(data.login);
  });

  test('editProfileAPI should edit user data', async () => {
    const oldUser = await authAPI.getUserInfo();

    const data = {
      ...oldUser.data,
      first_name: 'Test',
      second_name: 'Testov',
    };

    await editProfileAPI.editProfile(data);
    const user = await authAPI.getUserInfo();

    expect(user.data.first_name).toBe(data.first_name);
  });

  test('LeaderboardAPI should return users', async () => {
    const leaderboardUsers = await leaderboardAPI.getAllUsers();

    expect(leaderboardUsers.statusText).toBe('OK');
  });
});
