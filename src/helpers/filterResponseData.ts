export const sortDateData = () => {
    // let _cache: any = {}
    // return (data: [movieData]) => {
    //     let _filtetData = data.map((movie: movieData, index: number) => {
    //         let _date = new Date(String(movie.release_date))
    //         if (String(_date.getFullYear()) in _cache) { movie["year"] = "" }
    //         else {
    //             _cache[String(_date.getFullYear())] = String(_date.getFullYear())
    //             movie["year"] = String(_date.getFullYear())
    //         }
    //         if (movie.genre_ids && movie.genre_ids.length > 0) {
    //             let _newPush: any = [];
    //             movie.genre_ids.map((val: any, i: any) => {
    //                 if (val == MOVIE_GENRE_MAPPER[val].id) _newPush.push(MOVIE_GENRE_MAPPER[val].name)
    //             })
    //             movie.genre_ids = [..._newPush]

    //         }
    //         return movie;
    //     })
    //     return { results: _filtetData }
    // }

}