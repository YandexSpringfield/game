import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { authAPI } from '@api/auth';
import { Theme } from '@types';
import { TUpdateThemeResponse } from '@api';

export const updateUserThemeThunk = createAsyncThunk(
  'user/updateUserTheme',
  async (theme: Theme, { rejectWithValue }) => {
    try {
      const result: AxiosResponse<TUpdateThemeResponse> =
        await authAPI.updateTheme(theme);
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
