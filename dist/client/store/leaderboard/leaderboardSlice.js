import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@types';
import { fetchLeaderboard, addToLeaderboard } from './thunks';
const initialState = {
    data: [],
    requestStatus: RequestStatus.INIT,
};
export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setState: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLeaderboard.pending, (state) => {
            state.requestStatus = RequestStatus.REQUEST;
        });
        builder.addCase(fetchLeaderboard.rejected, (state) => {
            state.requestStatus = RequestStatus.ERROR;
        });
        builder.addCase(fetchLeaderboard.fulfilled, (state, { payload }) => {
            state.requestStatus = RequestStatus.SUCCESS;
            Object.keys(payload).forEach((key) => {
                state[key] = payload[key];
            });
        });
        builder.addCase(addToLeaderboard.pending, (state) => {
            state.requestStatus = RequestStatus.REQUEST;
        });
        builder.addCase(addToLeaderboard.rejected, (state) => {
            state.requestStatus = RequestStatus.ERROR;
        });
        builder.addCase(addToLeaderboard.fulfilled, (state) => {
            state.requestStatus = RequestStatus.SUCCESS;
        });
    },
});
