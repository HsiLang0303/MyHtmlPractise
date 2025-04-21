// 测试用例相关接口
import axios from 'axios'

// 测试用例记录添加请求类型
interface TestCaseAddRequest {
  caseId: number
  problemId: number
  publicState: number
  inputCasePath: string
  outputCasePath: string
}

// 测试用例文件内容更新请求类型
interface TestCaseFileContentUpdateRequest {
  caseId: number
  fileType: number
  content: string
}

// 测试用例VO对象类型
interface TestCaseVO {
  caseId: number
  problemId: number
  publicState: string
  inputCasePath: string
  outputCasePath: string
  inputCaseContent: string
  outputCaseContent: string
}

// 测试用例文件上传请求类型
interface TestCaseUploadRequest {
  caseId: number
  problemId: number
  publicState: number
  fileUploadType: number
}

// 基础响应类型
interface BaseResponse<T> {
  code: number
  data: T
  message: string
}

// 添加测试用例记录
export const addTestCase = (params: TestCaseAddRequest): Promise<BaseResponse<number>> => {
  return axios.post('/test-case/', params)
}

// 编辑用例文件内容
export const updateTestCaseContent = (params: TestCaseFileContentUpdateRequest): Promise<BaseResponse<object>> => {
  return axios.put('/test-case/', params)
}

// 获取测试用例VO对象
export const getTestCaseVO = (caseId: number): Promise<BaseResponse<TestCaseVO>> => {
  return axios.get(`/test-case/${caseId}`)
}

// 删除测试用例记录
export const deleteTestCase = (caseId: number): Promise<BaseResponse<object>> => {
  return axios.delete(`/test-case/${caseId}`)
}

// 获取指定测试用例的内容
export const getTestCaseContent = (caseId: number, fileType: number): Promise<BaseResponse<string>> => {
  return axios.get(`/api/test-case/${caseId}/content`, {
    params: { fileType }
  })
}

// 生成用例id
export const generateTestCaseId = (): Promise<BaseResponse<number>> => {
  return axios.post('/test-case/id')
}

// 上传测试用例文件
export const uploadTestCaseFile = (params: TestCaseUploadRequest, file: File): Promise<BaseResponse<string>> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('testCaseUploadRequest', JSON.stringify(params))
  return axios.post('/test-case/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}