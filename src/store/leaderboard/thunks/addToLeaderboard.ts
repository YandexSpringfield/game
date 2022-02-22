import { createAsyncThunk } from '@reduxjs/toolkit';
import { leaderboardAPI } from '@api/leaderboard';
import { authAPI } from '@api/auth';

export const addToLeaderboard = createAsyncThunk(
  'leaderboard/addToLeaderboard',
  async (data: { location: string; score: number }, { rejectWithValue }) => {
    try {
      const userRes = await authAPI.getUserInfo();
      await leaderboardAPI.addUser({
        data: {
          score: data.score,
          city: data.location,
          avatar: userRes.data.avatar,
          name: userRes.data.first_name || userRes.data.display_name,
        },
        ratingFieldName: 'score',
        teamName: 'SpringfieldMario',
      });
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  },
);