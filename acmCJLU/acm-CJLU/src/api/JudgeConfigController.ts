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

// 添加评测配置的请求参数接口
export interface JudgeConfigAddRequest {
  problemId: number
  language: number
  memoryLimit: number
  timeLimit: number
}

// 更新评测配置的请求参数接口
export interface JudgeConfigUpdateRequest extends JudgeConfigAddRequest {
  configId: number
}

// 添加评测配置
export const addJudgeConfig = async (params: JudgeConfigAddRequest): Promise<BaseResponseLong> => {
  const response = await axios.post<BaseResponseLong>('/api/judge-config/', params)
  return response.data
}

// 更新评测配置
export const updateJudgeConfig = async (params: JudgeConfigUpdateRequest): Promise<BaseResponseObject> => {
  const response = await axios.put<BaseResponseObject>('/api/judge-config/', params)
  return response.data
}

// 删除评测配置
export const deleteJudgeConfig = async (configId: number): Promise<BaseResponseObject> => {
  const response = await axios.delete<BaseResponseObject>(`/judge-config/${configId}`)
  return response.data
}