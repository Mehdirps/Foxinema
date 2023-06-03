import { createSlice } from '@reduxjs/toolkit';

const MediaSlice = createSlice({
    name: 'medias',
    initialState: {
        favoriteSerieList: [],
        favoriteMovieList: []
    },
    reducers: {
        setFavoriteSerieList: (state, action) => {
            state.favoriteSerieList = action.payload
        },
        setFavoriteMovieList: (state, action) => {
            state.favoriteMovieList = action.payload
        }
    },
});

export const { setFavoriteSerieList, setFavoriteMovieList } = MediaSlice.actions;

export default MediaSlice.reducer;