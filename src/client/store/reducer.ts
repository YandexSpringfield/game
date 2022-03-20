import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from '@store/user';
import { leaderboardSlice } from '@store/leaderboard';
import { forumSlice } from '@store/forum/forumSlice';

export const reducer = combineReducers({
  user: userSlice.reducer,
  leaderboard: leaderboardSlice.reducer,
  forum: forumSlice.reducer,
});
