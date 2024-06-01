export default class DataSetClass {
    data: any = [];
    genreBasedFilter: any = {}

    constructor() { }


    updateDataSet(result: any, yearFilter?: any) {
        this.createKeyPairValueForGenreIds(result)
        let _clonet = [...this.data];
        _clonet.push({ title: yearFilter, data: [...result] });
        this.data = _clonet
        return this;
    }

    getDataSet() {
        return this.data;
    }

    createKeyPairValueForGenreIds(result: any) {
        if (result && result.length > 0) {
            try {
                for (let i = 0; i < result.length; i++) {
                    const ielement = result[i];
                    let year = new Date(result[0].release_date).getFullYear()
                    for (let j = 0; j < ielement.genre_ids.length; j++) {
                        const jelement = ielement.genre_ids[j];

                        if (this.genreBasedFilter[jelement]) {
                            let res: any = this.genreBasedFilter[jelement].filter((v: any, i: any) => v.title == year)
                            if (res.length > 0) res[0].data.push(ielement)
                            else {
                                this.genreBasedFilter[jelement] = [...this.genreBasedFilter[jelement]]
                                this.genreBasedFilter[jelement].push({ title: year, data: [ielement] })
                            }
                        }
                        else this.genreBasedFilter[jelement] = [{ title: year, data: [ielement] }]
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    getGenreFilterResult(id: any, query?: string) {
        let result = this.genreBasedFilter[id]
        if (result) {
            if (id == -1) return this.data
            else return this.genreBasedFilter[id]
        } else[]
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