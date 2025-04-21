import axios from "axios";

export interface RankRequestv0 {
    current:string,
    pageSize:string,
    userId?:string,
    nickname?:string,
    sortField?:string,
    sortOrder?:string,
}

export const getRankList = async (params: RankRequestv0) => {
    const response = await axios.get<any>('/api/ranklist/', {params})
    return response.data
}

