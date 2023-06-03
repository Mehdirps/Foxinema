import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice';
import MediaReducer from './home/MediasSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        medias: MediaReducer,
    }
});