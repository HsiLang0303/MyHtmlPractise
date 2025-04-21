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

// 题目添加或更新请求参数接口
export interface ProblemAddOrUpdateRequest {
  title: string
  content: string
  difficulty: number
  tagIdList: number[]
}

// 题目标签接口
export interface TagVO {
  tagId: number
  name: string
  description: string
}

// 测试用例接口
export interface TestCaseVO {
  caseId: number
  problemId: number
  publicState: string
  inputCasePath: string
  outputCasePath: string
  inputCaseContent: string
  outputCaseContent: string
}

// 评测配置接口
export interface JudgeConfigVO {
  configId: number
  problemId: number
  language: string
  memoryLimit: number
  timeLimit: number
}

// 题目详情接口
export interface ProblemVO {
  problemId: number
  title: string
  content: string
  difficulty: string
  acceptCount: number
  submitCount: number
  createTime: string
  updateTime: string
  tagList: TagVO[]
  publicTestCaseList: TestCaseVO[]
  privateTestCaseList: TestCaseVO[]
  judgeConfigList: JudgeConfigVO[]
}

// 分页响应接口
export interface PageProblemVO {
  records: ProblemVO[]
  total: number
  size: number
  current: number
  orders: { column: string; asc: boolean }[]
  optimizeCountSql: boolean
  searchCount: boolean
  optimizeJoinOfCountSql: boolean
  maxLimit: number
  countId: string
  pages: number
}

// 基础响应类型
export interface BaseResponseProblemVO {
  code: number
  data: ProblemVO
  message: string
}

export interface BaseResponsePageProblemVO {
  code: number
  data: PageProblemVO
  message: string
}

export interface BaseResponseListCodingLanguageEnum {
  code: number
  data: string[]
  message: string
}

// 添加或更新题目
export const addOrUpdateProblem = async (params: ProblemAddOrUpdateRequest): Promise<BaseResponseLong> => {
  const response = await axios.post<BaseResponseLong>('/api/problem/', params)
  return response.data
}

// 根据ID获取题目详情
export const viewProblemVOById = async (problemId :string): Promise<BaseResponseProblemVO> => {
  const response = await axios.get<BaseResponseProblemVO>(`/api/problem/${problemId}`)
  return response.data
}

// 删除题目
export const deleteProblem = async (problemId: number): Promise<BaseResponseObject> => {
  const response = await axios.delete<BaseResponseObject>(`/api/problem/${problemId}`)
  return response.data
}

// 获取支持的编程语言列表
export const getSupportedLanguages = async (): Promise<BaseResponseListCodingLanguageEnum> => {
  const response = await axios.get<BaseResponseListCodingLanguageEnum>('/api/problem/languages')
  return response.data
}

// 分页查询题目列表
export const listProblemByPage = async (params: {
  tagIdList: string
  current: string
  pageSize: string
  problemId?: string
  title?: string
  difficulty?: string
  sortField?: string
  sortOrder?: string
}): Promise<BaseResponsePageProblemVO> => {
  const response = await axios.get<BaseResponsePageProblemVO>('/api/problem/page', { params })
  return response.data
}