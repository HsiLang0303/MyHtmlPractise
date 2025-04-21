import axios from 'axios'

// 通用响应接口
export interface BaseResponseObject {
  code: number
  data: any
  message: string
}

// 长整型响应接口
export interface BaseResponseLong {
  code: number
  data: number
  message: string
}

// 提交请求参数接口
export interface SubmitRequest {
  userId: string
  problemId: string
  contestId: string
  language: string
  code: string
  submitIP: string
}

// 执行详情VO接口
export interface ExecutionDetailVO {
  detailId: number
  submissionId: number
  caseId: number
  timeUsed: number
  memoryUsed: number
  judgeResult: string
  output: string
}

// 提交VO接口
export interface SubmissionVO {
  submissionId: number
  userId: number
  problemId: number
  language: string
  code: string
  status: string
  judgeResult: string
  executionMessage: string
  timeUsed: number
  memoryUsed: number
  simId: number
  simPercentage: number
  executionDetailVOList: ExecutionDetailVO[]
}

// 分页排序接口
export interface Order {
  column: string
  asc: boolean
}

// 分页响应接口
export interface PageSubmissionVO {
  records: SubmissionVO[]
  total: number
  size: number
  current: number
  orders: Order[]
  optimizeCountSql: object
  searchCount: object
  optimizeJoinOfCountSql: boolean
  maxLimit: number
  countId: string
  pages: number
}

// 分页响应包装接口
export interface BaseResponsePageSubmissionVO {
  code: number
  data: PageSubmissionVO
  message: string
}

// 提交VO响应包装接口
export interface BaseResponseSubmissionVO {
  code: number
  data: SubmissionVO
  message: string
}

// 提交代码
export const submit = async (params: SubmitRequest): Promise<BaseResponseLong> => {
  const response = await axios.post<BaseResponseLong>('/api/submission/', params)
  return response.data
}

// 查看提交详情
export const viewSubmission = async (submissionId: number): Promise<BaseResponseSubmissionVO> => {
  const response = await axios.get<BaseResponseSubmissionVO>(`/api/submission/${submissionId}`)
  return response.data
}

// 删除提交记录
export const deleteSubmission = async (submissionId: number): Promise<BaseResponseObject> => {
  const response = await axios.delete<BaseResponseObject>(`/api/submission/${submissionId}`)
  return response.data
}

// 分页查询提交列表
export const getSubmissionVOPage = async (params: {
  userId?: number
  problemId?: number
  language?: number
  status?: number
  executionStatus?: number
  current?: number
  pageSize?: number
  sortField?: string
  sortOrder?: string
}): Promise<BaseResponsePageSubmissionVO> => {
  const response = await axios.get<BaseResponsePageSubmissionVO>('/api/submission/page', { params })
  return response.data
}