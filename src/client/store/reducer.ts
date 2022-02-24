import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from '@store/user';
import { leaderboardSlice } from '@store/leaderboard';

export const reducer = combineReducers({
  user: userSlice.reducer,
  leaderboard: leaderboardSlice.reducer,
});
