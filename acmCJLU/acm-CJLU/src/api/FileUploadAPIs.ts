import axios from 'axios'

// 文件上传相关接口类型定义
export interface BaseResponseObject {
  code: number
  data: any
  message: string
}

// 上传图片
export function uploadImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  return axios.post<BaseResponseObject>('/api/file/upload/img', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}