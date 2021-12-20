/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '@types';
import { fetchUserProfile } from './thunks';

export type TUserState = {
  email: string;
  requestStatus: RequestStatus;
};

const initialState: TUserState = {
  email: '',
  requestStatus: RequestStatus.INIT,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TUserState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      return {
        ...state,
        requestStatus: RequestStatus.REQUEST,
      };
    });

    builder.addCase(fetchUserProfile.rejected, (state) => {
      return {
        ...state,
        requestStatus: RequestStatus.ERROR,
      };
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
      return {
        ...state,
        email: payload.email,
        requestStatus: RequestStatus.SUCCESS,
      };
    });
  },
});
