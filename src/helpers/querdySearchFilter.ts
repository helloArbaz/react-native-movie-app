import { movieListData } from "../types"


export const querdySearchFilter = (query?: string, data?: any[]) => {
    let _result = data?.filter((val: movieListData, index: number) => val?.title?.indexOf(String(query))! > -1)
    return _result;
}