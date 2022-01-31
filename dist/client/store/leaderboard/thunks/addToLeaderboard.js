import { createAsyncThunk } from '@reduxjs/toolkit';
import { leaderboardAPI } from '@api/leaderboard';
import { authAPI } from '@api/auth';
export const addToLeaderboard = createAsyncThunk('leaderboard/addToLeaderboard', async (data, { rejectWithValue }) => {
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
        });
    }
    catch (err) {
        rejectWithValue(err.response.data);
    }
});
