import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_GET_MOVIE_DETAILS, API_KEY } from "../configs/api.config";
import { geMovieDetailsByIdRequest } from "../types";

export const getMovieDetailsById = createAsyncThunk("api/fetchMovieDetails", async (reqData: any) => {
    try {
        let url = `${API_GET_MOVIE_DETAILS}${reqData?.id}?api_key=${API_KEY}`
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
})