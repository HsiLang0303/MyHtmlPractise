import axios from 'axios'

// 竞赛相关接口类型定义
export interface ContestAddRequest {
  title: string
  contestDescription: string
  creatorId: number
  encrypted: number
  encryptPassword: string
  visibleState: number
  startTime: string
  endTime: string
}

export interface ContestProblemAddRequest {
  contestId: number
  problemId: number
  displayOrder: number
}

export interface ContestUpdateRequest extends ContestAddRequest {
  contestId: number
  contestProblemAddRequestList: ContestProblemAddRequest[]
}

export interface ContestPasswordVerificationRequest {
  contestId: number
  password: string
}

export interface ProblemContestVO {
  problemId: number
  displayOrder: number
  title: string
  difficulty: string
  acceptCount: number
  submitCount: number
}

export interface ContestVO {
  contestId: number
  title: string
  contestDescription: string
  encrypted: string
  visibleState: string
  startTime: string
  endTime: string
  problemContestVOList: ProblemContestVO[]
}

// 添加竞赛
export function addContest(data: ContestAddRequest) {
  return axios({
    url: '/contest/',
    method: 'post',
    data
  })
}

// 更新竞赛
export function updateContest(data: ContestUpdateRequest) {
  return axios({
    url: '/contest/',
    method: 'put',
    data
  })
}

// 删除竞赛
export function deleteContest(contestId: number) {
  return axios({
    url: `/contest/${contestId}`,
    method: 'delete'
  })
}

// 获取竞赛详情
export function getContestVOById(contestId: string) {
  return axios({
    url: `/api/contest/${contestId}/vo`,
    method: 'get'
  })
}

// 验证竞赛凭证
export function verifyContestPassword(data: ContestPasswordVerificationRequest) {
  return axios({
    url: '/api/contest/verify',
    method: 'post',
    data
  })
}

// 分页获取竞赛列表
export function getContestVOPage(params: {
  title?: string
  startTime?: string
  endTime?: string
  current: number
  pageSize: number
  sortField?: string
  sortOrder?: string
}) {
  return axios({
    url: '/api/contest/vo/page',
    method: 'get',
    params
  })
}