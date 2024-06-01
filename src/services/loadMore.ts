import { API_KEY, API_URL } from "../configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadMore = createAsyncThunk("api/loadMore", async (req: any) => {
    try {
        let url = `${API_URL}?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${req._key}&page=1&vote_count.gte=100`
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
})