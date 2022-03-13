import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '@types';
import { fetchForumTopics } from '@store/forum/thunks/fetchForumTopics';

export type TForumState = {
  data: [];
  requestStatus: RequestStatus;
};

export const initialState: TForumState = {
  data: [],
  requestStatus: RequestStatus.INIT,
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<TForumState>>) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForumTopics.pending, (state) => {
      state.requestStatus = RequestStatus.REQUEST;
    });

    builder.addCase(fetchForumTopics.rejected, (state) => {
      state.requestStatus = RequestStatus.ERROR;
    });

    builder.addCase(fetchForumTopics.fulfilled, (state, { payload }) => {
      state.requestStatus = RequestStatus.SUCCESS;
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    });
  },
});
