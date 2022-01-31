import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@types';
import { fetchUserProfile } from './thunks';
const initialState = {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: '',
    requestStatus: RequestStatus.INIT,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setState: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.requestStatus = RequestStatus.REQUEST;
        });
        builder.addCase(fetchUserProfile.rejected, (state) => {
            state.requestStatus = RequestStatus.ERROR;
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
            state.requestStatus = RequestStatus.SUCCESS;
            Object.keys(payload).forEach((key) => {
                state[key] = payload[key];
            });
        });
    },
});
