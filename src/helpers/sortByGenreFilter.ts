import { convertDataToSelectionListView, sortData } from "../data/newData";
import { movieGenre, movieListData } from "../types"

export const sortByGenreFilter = (data: any[], filterQuery: movieGenre) => {
    let result = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        for (let j = 0; j < element.genre_ids.length; j++) {
            const elementw = element.genre_ids[j];
            if (elementw == filterQuery.id) {
                result.push(element)
            }
        }
    }
    let sortedDs = sortData(result)
    let final = convertDataToSelectionListView(sortedDs)
    return final
}