import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { userSlice } from 'src/client/store/user';
import { leaderboardSlice } from 'src/client/store/leaderboard';

const reducer = combineReducers({
  user: userSlice.reducer,
  leaderboard: leaderboardSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
