import { movieGenre, YearFilter } from "../types"

export const GET_FILTER_MAPPER: movieGenre[] = [
    { id: "1", name: "All" },
    { id: "28", name: "Action" },
    { id: "35", name: "Comedy" },
    { id: "27", name: "Horror" },
    { id: "18", name: "Drama" },
    { id: "878", name: "Science Fiction" },
]

const genreFilterIdMapper: any = {
    "28": { id: "28", name: "Action" },
    "12": { id: "12", name: "Adventure" },
    "16": { id: "16", name: "Animation" },
    "35": { id: "35", name: "Comedy" },
    "80": { id: "80", name: "Crime" },
    "99": { id: "99", name: "Documentary" },
    "18": { id: "18", name: "Drama" },
    "10751": { id: "10751", name: "Family" },
    "14": { id: "14", name: "Fantasy" },
    "36": { id: "36", name: "History" },
    "27": { id: "27", name: "Horror" },
    "10402": { id: "10402", name: "Music" },
    "9648": { id: "9648", name: "Mystery" },
    "10749": { id: "10749", name: "Romance" },
    "878": { id: "878", name: "Science Fiction" },
    "10770": { id: "10770", name: "Movie" },
    "53": { id: "53", name: "Thriller" },
    "10752": { id: "10752", name: "War" },
    "37": { id: "37", name: "Western" },
}


export const genreFilterById = (id: string) => {
    return genreFilterIdMapper[id]
}


export const genreNameOnly = (id: string) => {
    if (genreFilterIdMapper[id]) {
        return genreFilterIdMapper[id].name
    }
}


export const MAX_YEAR = 2024
export const MIN_YEAR = 2013


const getYearList = () => {
    let _mapper: any = {}
    for (let index = MIN_YEAR; index < MAX_YEAR; index++) {
        _mapper[index] = true
    }
}

export const getYearFilter = {

}