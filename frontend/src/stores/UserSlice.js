import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {}
    },
    reducers: {
        addUser: (state, action) => {
            state.value = action.payload
        },
        deleteUser: state => {
            state.value = {}
        }
    }
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;