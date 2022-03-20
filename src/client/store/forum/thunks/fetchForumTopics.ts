import { createAsyncThunk } from '@reduxjs/toolkit';
import { forumAPI } from '@api';

export const fetchForumTopics = createAsyncThunk(
  'forum/fetchForumTopics',
  async (_, { rejectWithValue }) => {
    return await forumAPI
      .getTopics()
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  },
);
