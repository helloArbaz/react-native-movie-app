import { ActionReducerMapBuilder, createSlice, isAction, PayloadAction } from '@reduxjs/toolkit';
import { getMoviesList } from '../services/getMovieList';
import { getGenreFilter } from '../services/getGenreFilter';
import { movieGenre } from '../types';
import { GET_FILTER_MAPPER } from '../helpers/getGenreFilter';
import { convertDataToSelectionListView, sortData } from '../data/newData';
import { sortByGenreFilter } from '../helpers/sortByGenreFilter';

interface MovieAppState {
    data?: any[]
    loader?: boolean,
    selectedFilter?: movieGenre,
    rawData?: any[]
}

const initialState: MovieAppState = {
    data: [],
    loader: false,
    selectedFilter: GET_FILTER_MAPPER[0]
};


const movieAppSlice = createSlice({
    name: 'MovieAppState',
    initialState,
    reducers: {
        changeFilter: (state: MovieAppState, action: PayloadAction<any>) => {
            let filterResposne = sortByGenreFilter(state.rawData!, action.payload)
            state.selectedFilter = action.payload
            if (action.payload.id == 1) {
                let sortedDs = sortData(state.rawData)
                let final = convertDataToSelectionListView(sortedDs)
                state.data = final
            }
            else {
                state.data = filterResposne
            }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<any>): void => {
        builder.addCase(getMoviesList.pending, (state: any, action: any) => {
            state.loader = true
        });
        builder.addCase(getMoviesList.fulfilled, (state: MovieAppState, action: PayloadAction<any>) => {
            let sortedDs = sortData(action?.payload?.results)
            let final = convertDataToSelectionListView(sortedDs)
            state.loader = false
            state.data = final
            state.rawData = action?.payload?.results
        });
    }
});

export const { changeFilter } = movieAppSlice.actions;
export default movieAppSlice.reducer;