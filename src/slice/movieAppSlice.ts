import { ActionReducerMapBuilder, createSlice, isAction, PayloadAction } from '@reduxjs/toolkit';
import { getMoviesList } from '../services/getMovieList';
import { getGenreFilter } from '../services/getGenreFilter';

interface MovieAppState {
    data?: [] | {};
    searchResult?: []
    loader?: boolean
}

const initialState: MovieAppState = {
    data: [],
    loader: false
};


const movieAppSlice = createSlice({
    name: 'MovieAppState',
    initialState,
    reducers: {

    },
    extraReducers: (builder: ActionReducerMapBuilder<any>): void => {
        builder.addCase(getMoviesList.pending, (state: any, action: any) => {
            state.loader = true
        });
        builder.addCase(getMoviesList.fulfilled, (state: MovieAppState, action: PayloadAction<any>) => {
            state.loader = false
            state.data = action?.payload
        });
        // builder.addCase(getGenreFilter.pending, (state: any, action: any) => {
        //     state.loader = true
        // });
        // builder.addCase(getGenreFilter.fulfilled, (state: MovieAppState, action: PayloadAction<any>) => {
        //     state.loader = false
        //     state.data = action?.payload
        // });
    }
});

export const { } = movieAppSlice.actions;
export default movieAppSlice.reducer;