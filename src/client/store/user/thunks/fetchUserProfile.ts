import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '@api/auth';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    return await authAPI
      .getUserInfo()
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  },
);
