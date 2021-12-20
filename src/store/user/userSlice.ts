import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TUserState = {
  email: string;
};

const initialState: TUserState = {
  email: '',
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
});
