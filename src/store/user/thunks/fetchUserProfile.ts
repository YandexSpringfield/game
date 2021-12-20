import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Test util, after integration with api should be removed
 */
function sleep() {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, 1500));
}

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    console.log('START FETCHING PROFILE ..');
    await sleep();
    console.log('SUCCESS FETCHING PROFILE!');
    return {
      email: 'test@test.com',
    };
  },
);
