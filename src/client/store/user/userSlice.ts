import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, Theme } from '@types';
import { fetchUserProfile } from './thunks';

export type TUserState = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  requestStatus: RequestStatus;
  theme: Theme;
};

export const initialState: TUserState = {
  id: 0,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
  requestStatus: RequestStatus.INIT,
  theme: Theme.Light,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TUserState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.requestStatus = RequestStatus.REQUEST;
    });

    builder.addCase(fetchUserProfile.rejected, (state) => {
      state.requestStatus = RequestStatus.ERROR;
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
      state.requestStatus = RequestStatus.SUCCESS;
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    });
  },
});
