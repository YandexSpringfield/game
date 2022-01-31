import { createAsyncThunk } from '@reduxjs/toolkit';
import { leaderboardAPI } from '@api/leaderboard';
export const fetchLeaderboard = createAsyncThunk('leaderboard/fetchLeaderboard', async (_, { rejectWithValue }) => {
    return await leaderboardAPI
        .getAllUsers()
        .then((res) => {
        return res;
    })
        .catch((err) => rejectWithValue(err.response.data));
});
