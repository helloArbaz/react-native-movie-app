import { ActionReducerMapBuilder, createSlice, isAction, PayloadAction } from '@reduxjs/toolkit';
import { getMoviesList } from '../services/getMovieList';
import { getGenreFilter } from '../services/getGenreFilter';
import { movieGenre } from '../types';
import { GET_FILTER_MAPPER } from '../helpers/getGenreFilter';
import { convertDataToSelectionListView, sortData } from '../data/newData';
import { sortByGenreFilter } from '../helpers/sortByGenreFilter';
import { loadMore } from '../services/loadMore';
import { querBySearchFilter } from '../helpers/querdySearchFilter';

interface MovieAppState {
    data?: any[]
    loader?: boolean,
    selectedFilter?: movieGenre,
    rawData?: any[],
    maxYear: number
}

const initialState: MovieAppState = {
    data: [],
    loader: false,
    selectedFilter: GET_FILTER_MAPPER[0],
    maxYear: 2024
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
        },
        searchFilter: (state: MovieAppState, action: PayloadAction<any>) => {
            if (action.payload) {
                let result = querBySearchFilter(action.payload, state.rawData)
                let final_result = dataSorting(result)
                state.data = final_result
            } else {
                let final_result = dataSorting(state.rawData)
                state.data = final_result
                state.rawData = action?.payload?.results
            }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<any>): void => {
        builder.addCase(getMoviesList.pending, (state: any, action: any) => {
            state.loader = false
        });
        builder.addCase(getMoviesList.fulfilled, (state: MovieAppState, action: PayloadAction<any>) => {
            let final_result = dataSorting(action?.payload?.results, state.data)
            state.loader = false
            state.data = final_result
            state.rawData = action?.payload?.results
        });
        builder.addCase(loadMore.fulfilled, (state: MovieAppState, action: PayloadAction<any>) => {
            let final_result = dataSorting(action?.payload?.results)
            let _clone: any[] = [...state.data!];
            _clone.push(...final_result)
            state.data = _clone
            state
        });
    }
});

const dataSorting = (data?: any[], storeData?: any) => {
    let sortedDs = sortData(data, storeData)
    let final = convertDataToSelectionListView(sortedDs)
    return final
}

export const { changeFilter, searchFilter } = movieAppSlice.actions;
export default movieAppSlice.reducer;