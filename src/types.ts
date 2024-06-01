export type movieGenre = {
    id?: string | number;
    name?: string;
    isActive?:boolean
}

export type listOfYear = {
    year: string
}


export type movieListData = {
    adult?: Boolean; //
    backdrop_path?: string; //
    genre_ids: []
    id: string;
    original_language?: string //
    original_title?: string;
    overview?: string
    popularity?: string //
    poster_path?: string | undefined;
    release_date?: string; //
    title?: string;
    video?: string //
    vote_average?: string
    vote_count?: string
}

export type production_countries = {
    iso_3166_1?: string;
    name?: string;
}

export type production_companies = {
    id: number;
    logo_path: string
    name: string
    origin_country: string;
}

export type spoken_languages = {
    english_name?: string;
    iso_639_1?: string;
    name?: string
}

export type movieDetailsKeys = {
    adult: boolean
    backdrop_path: string;
    belongs_to_collection: []
    budget: number;
    genres: movieGenre[]
    homepage: string;
    id: number;
    imdb_id?: string;
    origin_country: [string],
    original_language: string
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: production_companies[],
    production_countries: production_countries[],
    release_date: string;
    revenue: number
    runtime: number
    spoken_languages: spoken_languages[]
    status: string
    tagline: string;
    title: string
    video: boolean;
    vote_average: number;
    vote_count: number
}

export type cast = {
    "adult": boolean,
    "gender": number | string | null,
    "id": number,
    "known_for_department": string,
    "name": string,
    "original_name": string,
    "popularity": number | string,
    "profile_path": string
    "cast_id": number | string,
    "character": string
    "credit_id": string,
    "order": 0
}

export type Cast = {
    id: number,
    cast?: cast[]
}


// https://api.themoviedb.org/3/movie/385687/credits?api_key=2dca580c2a14b55200e784d157207b4d
// https://api.themoviedb.org/3/movie/64635/credits?api_key=2dca580c2a14b55200e784d157207b4d

export type geMovieDetailsByIdRequest = {
    id: string,
}

export type getMoiveCastByIdRequest = {
    id: string,
}


export type YearFilter = {
    year: string;
    active: boolean
}


export type yearObject = {
    active: boolean
}

export type yearFilterMapperType = {
    [key: string]: yearObject
}