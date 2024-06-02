import cloneDeep from 'lodash/cloneDeep';


export default class DataSetClass {
    data: any = [];
    genreBasedFilter: any = {}
    que_keyMapper: any[] = []

    constructor() { }


    updateDataSet(result: any, yearFilter?: any) {
        // setTimeout(() => this.createKeyPairValueForGenreIds(result), 200)
        this.que_keyMapper.push(result)
        let _clonet = [...this.data];
        _clonet.push({ title: yearFilter, data: [...result] });
        this.data = _clonet
        this.createKeyPairValueForGenreIds()
        return this;
    }

    getDataSet() {
        return this.data;
    }

    createKeyPairValueForGenreIds() {
    }

    getGenreFilterResult(id: any) {
        if (id == -1) return this.data
        let _cloneData = cloneDeep(this.data)
        for (let i = 0; i < _cloneData.length; i++) {
            let _filterResult = []
            const ielement = _cloneData[i];
            for (let j = 0; j < ielement.data.length; j++) {
                const jelement = ielement.data[j];
                if (jelement.genre_ids.includes(parseInt(id))) {
                    _filterResult.push(jelement)
                }
            }
            _cloneData[i]['data'].length = 0;
            _cloneData[i]['data'].push(..._filterResult)
            if (_cloneData[i]['data'] && _cloneData[i]['data'].length == 0) {
                _cloneData[i] = null
            }
        }
        return _cloneData.filter((v: any, i: number) => v?.title);
    }

    querySearch(query?: any) {
        let search_result: any = {}
        let returnResult: any = []
        let regex = new RegExp(query, 'gi')
        for (let i = 0; i < this.data.length; i++) {
            const element = this.data[i];
            search_result[element.title] = {};
            let res = element.data.filter((v: any, i: number) => regex.test(v.title))
            if (res.length > 0) {
                search_result[element.title] = { title: element.title, data: res }
            }
            else delete search_result[element.title]
        }
        Object.keys(search_result).map((v, i) => returnResult.push(search_result[v]))

        return returnResult
    }



}