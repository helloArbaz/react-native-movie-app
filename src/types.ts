export type movieGenre = {
    id?: string | number;
    name?: string;
}

export type listOfYear = {
    year: string
}


export type movieListData = {
    adult?: Boolean;
    backdrop_path?: string;
    genre_ids: []
    id: string;
    original_language?: string
    original_title?: string;
    overview?: string
    popularity?: string
    poster_path?: string | undefined;
    release_date?: string;
    title?: string;
    video?: string
    vote_average?: string
    vote_count?: string
}