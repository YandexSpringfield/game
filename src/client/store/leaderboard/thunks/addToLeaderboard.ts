import { createAsyncThunk } from '@reduxjs/toolkit';
import { leaderboardAPI } from '@api/leaderboard';
import { authAPI } from '@api/auth';
import { ratingFieldName } from '@appConstants/leaderboard';

export const addToLeaderboard = createAsyncThunk(
  'leaderboard/addToLeaderboard',
  async (data: { location: string; score: number }, { rejectWithValue }) => {
    try {
      const userRes = await authAPI.getUserInfo();
      await leaderboardAPI.addUser({
        data: {
          springfieldMarioScore: data.score,
          city: data.location,
          avatar: userRes.data.avatar,
          name: userRes.data.first_name || userRes.data.display_name,
        },
        ratingFieldName,
      });
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  },
);
