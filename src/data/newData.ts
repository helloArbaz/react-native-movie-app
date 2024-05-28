const deleteUnwantedKeys = ["adult", "original_language", "original_title", "video"]


export const convertDataToSelectionListView = (data: any[]) => {
    let _finalResult: any = []
    Object.keys(data).map((va: any, i) => {
        _finalResult.push({
            title: va,
            data: data[va]
        })
    })
    return _finalResult
}

export const sortData = (data: any) => {
    let _mySet: any = {}
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let _yearCast = new Date(element.release_date).getFullYear();
        if (_yearCast) {
            if (_mySet[_yearCast]) {
                let _clone = _mySet[_yearCast];
                _clone.push(element);
                _mySet[_yearCast] = _clone
            }
            else {
                _mySet[_yearCast] = []
                _mySet[_yearCast].push(element)
            }
        }
    }
    return _mySet
}

