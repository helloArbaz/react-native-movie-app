import { yearFilterMapperType } from "../types"

export const FILTER_MAPPER_CONST: yearFilterMapperType = {
    "2013": { active: true },
    "2014": { active: false },
    "2015": { active: false },
    "2016": { active: false },
    "2017": { active: false },
    "2018": { active: false },
    "2019": { active: false },
    "2020": { active: false },
    "2021": { active: false },
    "2022": { active: false },
    "2023": { active: false },
    "2024": { active: false },
}


export const getNextYearFilterKey = (yearFilter: any) => {
    for (var key in yearFilter) {
        if (!yearFilter[key]?.active) return key
    }
}
