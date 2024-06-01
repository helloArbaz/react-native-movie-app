import { ActionReducerMapBuilder, createSlice, isAction, PayloadAction } from '@reduxjs/toolkit';
import { getMoviesList } from '../services/getMovieList';
import { movieGenre, yearFilterMapperType } from '../types';
import { GET_FILTER_MAPPER } from '../helpers/getGenreFilter';
import { loadMore } from '../services/loadMore';
import { FILTER_MAPPER_CONST } from '../configs/filterConst';
import { getNextYearFilterKey } from '../helpers/getNextYearFilterKey';
import DataSetClass from '../DataSet/DataSet';
import { MIN_YEAR } from '../configs/api.config';

interface MovieAppState {
    data?: any[]
    yearFilter: number
    selectedFilter?: movieGenre,
    loader: boolean
    searchQuery?: string
}

const initialState: MovieAppState = {
    data: [],
    yearFilter: MIN_YEAR,
    selectedFilter: { ...GET_FILTER_MAPPER[0], isActive: false },
    loader: false,
    searchQuery: ""
};


const DataSet = new DataSetClass()

const movieAppSlice = createSlice({
    name: 'MovieAppState',
    initialState,
    reducers: {
        changeFilter: (state: MovieAppState, action: PayloadAction<any>) => {
            state.selectedFilter = action.payload
            if (state.selectedFilter?.id != -1) {
                state.data = DataSet.getGenreFilterResult(action.payload.id, String(state.selectedFilter?.id)) || []
            } else {
                state.data = DataSet.getDataSet()
            }
        },
        searchFilter: (state: MovieAppState, action: PayloadAction<any>) => {
            state.searchQuery = action.payload
            state.data = DataSet.querySearch(action.payload) || []
            state.loader = false
        },
        showLoader: (state: MovieAppState) => {
            state.loader = true
        },
        resetDataSet: (state: MovieAppState) => {
            state.loader = false
            state.data = DataSet.getDataSet() || []
        },
        setSearchQuery: (state: MovieAppState, action: PayloadAction<any>) => {
            state.searchQuery = action.payload
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<any>): void => {
        builder.addCase(getMoviesList.pending, (state: any, action: any) => {
            state.loader = true
        });
        builder.addCase(getMoviesList.fulfilled, (state: MovieAppState, action: PayloadAction<any>) => {
            state.data = DataSet.updateDataSet(action.payload.results, state.yearFilter).getDataSet()
            state.loader = false
        });
        builder.addCase(loadMore?.fulfilled, (state: MovieAppState, action: PayloadAction<any>) => {
            state.yearFilter = state.yearFilter + 1
            state.data = DataSet.updateDataSet(action.payload.results, state.yearFilter).getDataSet()
        });
    }
});


export const { changeFilter, searchFilter, showLoader, resetDataSet, } = movieAppSlice.actions;
export default movieAppSlice.reducer;