import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { userSlice } from '@store/user';
import { leaderboardSlice } from '@store/leaderboard';
const reducer = combineReducers({
    user: userSlice.reducer,
    leaderboard: leaderboardSlice.reducer,
});
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
});
