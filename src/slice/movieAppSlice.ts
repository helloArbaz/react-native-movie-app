import { ActionReducerMapBuilder, createSlice, isAction, PayloadAction } from '@reduxjs/toolkit';
import { getMoviesList } from '../services/getMovieList';
import { getGenreFilter } from '../services/getGenreFilter';
import { movieGenre, YearFilter, yearFilterMapperType } from '../types';
import { GET_FILTER_MAPPER, getYearFilter } from '../helpers/getGenreFilter';
import { convertDataToSelectionListView, sortData } from '../data/newData';
import { sortByGenreFilter } from '../helpers/sortByGenreFilter';
import { loadMore } from '../services/loadMore';
import { querdySearchFilter } from '../helpers/querdySearchFilter';
import { FILTER_MAPPER_CONST } from '../configs/filterConst';
import { getNextYearFilterKey } from '../helpers/getNextYearFilterKey';

interface MovieAppState {
    data?: any[]
    loader?: boolean,
    selectedFilter?: movieGenre,
    rawData?: any[],
    yearFilterMapper?: yearFilterMapperType
}

const initialState: MovieAppState = {
    data: [],
    loader: false,
    selectedFilter: GET_FILTER_MAPPER[0],
    yearFilterMapper: { ...FILTER_MAPPER_CONST }
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
                let result = querdySearchFilter(action.payload, state.rawData)
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
            state.loader = true
        });
        builder.addCase(getMoviesList.fulfilled, (state: MovieAppState, action: PayloadAction<any>) => {
            let _key = getNextYearFilterKey(state.yearFilterMapper);
            if (_key) {
                let mapaData: any = { title: _key, data: [...action.payload.results] }
                state.data = [mapaData]
                state.loader = false
                state.yearFilterMapper![_key!]!.active = true
            }
            state;

        });
        builder.addCase(loadMore?.fulfilled, (state: MovieAppState, action: PayloadAction<any>) => {
            let _key = getNextYearFilterKey(state.yearFilterMapper);
            if (_key) {
                let mapaData: any = { title: _key, data: [...action.payload.results] }
                state.data?.push(mapaData)
                state.yearFilterMapper![_key!]!.active = true
                state.loader = false
            }
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